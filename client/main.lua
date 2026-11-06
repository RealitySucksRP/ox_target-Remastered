if not lib.checkDependency('ox_lib', '3.30.0', true) then return end

lib.locale()

local utils = require 'client.utils'
local state = require 'client.state'
local options = require 'client.api'.getTargetOptions()

require 'client.debug'
require 'client.defaults'
require 'client.compat.qtarget'

local SendNuiMessage = SendNuiMessage
local GetEntityCoords = GetEntityCoords
local GetEntityType = GetEntityType
local HasEntityClearLosToEntity = HasEntityClearLosToEntity
local GetEntityBoneIndexByName = GetEntityBoneIndexByName
local GetEntityBonePosition_2 = GetEntityBonePosition_2
local GetEntityModel = GetEntityModel
local IsDisabledControlJustPressed = IsDisabledControlJustPressed
local DisableControlAction = DisableControlAction
local DisablePlayerFiring = DisablePlayerFiring
local GetModelDimensions = GetModelDimensions
local GetOffsetFromEntityInWorldCoords = GetOffsetFromEntityInWorldCoords
local currentTarget = {}
local currentMenu
local menuChanged
local menuHistory = {}
local nearbyZones

-- Toggle ox_target, instead of holding the hotkey
local toggleHotkey = GetConvarInt('ox_target:toggleHotkey', 0) == 1
local mouseButton = GetConvarInt('ox_target:leftClick', 1) == 1 and 24 or 25
local debug = GetConvarInt('ox_target:debug', 0) == 1
local vec0 = vec3(0, 0, 0)
-- Optional RS vehicle interaction halo. Set ox_target:rsVehicleHalo 0 to restore
-- upstream single-ray vehicle-part selection without touching registered actions.
local vehicleHalo = GetConvarInt('ox_target:rsVehicleHalo', 1) == 1
-- Show the entire vehicle's eligible parts, while clearly marking actions
-- that remain outside their resource-defined interaction distance.
local vehicleOverviewRange = math.max(3, GetConvarInt('ox_target:rsVehicleOverviewRange', 8))
-- Only the native ox_target door/hood/trunk controls gain a modest reach extension.
-- Third-party distances and all canInteract/group/item checks are unchanged.
local builtinVehicleReach = math.max(2, GetConvarInt('ox_target:rsBuiltinVehicleReach', 4))
local vehicleGraceMs = 175 -- tolerate one missed camera ray; do not retain a different entity
local GetScreenCoordFromWorldCoord = GetScreenCoordFromWorldCoord

-- Returns the closest defined vehicle part, without creating new target options.
-- Selecting a car part still requires distance, groups, items and canInteract.
local function getVehiclePart(option, entity, model, playerCoords)
    local bones = option.bones

    if bones then
        if type(bones) == 'string' then bones = { bones } end
        local nearest, nearestIndex, nearestDistance
        for i = 1, #bones do
            local index = GetEntityBoneIndexByName(entity, bones[i])
            if index ~= -1 then
                local position = GetEntityBonePosition_2(entity, index)
                local distance = #(playerCoords - position)
                if not nearestDistance or distance < nearestDistance then
                    nearest, nearestIndex, nearestDistance = position, index, distance
                end
            end
        end
        return nearest, nearestIndex
    end

    if option.offset then
        local offset = option.offset
        if not option.absoluteOffset then
            local minimum, maximum = GetModelDimensions(model)
            offset = (maximum - minimum) * offset + minimum
        end
        return GetOffsetFromEntityInWorldCoords(entity, offset.x, offset.y, offset.z)
    end
end

-- Display-only anchor must be deterministic. Choosing the bone nearest to
-- the moving player caused door labels to jump between door/seat positions.
local function getVehicleDisplayPoint(option, entity, model)
    if option.bones then
        local bones = type(option.bones) == 'string' and { option.bones } or option.bones
        for i = 1, #bones do
            local index = GetEntityBoneIndexByName(entity, bones[i])
            if index ~= -1 then return GetEntityBonePosition_2(entity, index) end
        end
    end
    if option.offset then
        local offset = option.offset
        if not option.absoluteOffset then
            local minimum, maximum = GetModelDimensions(model)
            offset = (maximum - minimum) * offset + minimum
        end
        return GetOffsetFromEntityInWorldCoords(entity, offset.x, offset.y, offset.z)
    end
    local label = ('%s %s %s'):format(option.label or '', option.name or '', option.icon or ''):lower()
    local boneName
    if label:find('trunk', 1, true) or label:find('boot', 1, true)
        or label:find('stash', 1, true) or label:find('storage', 1, true)
        or label:find('luggage', 1, true) or label:find('ramp-box', 1, true) then
        boneName = 'boot'
    elseif label:find('hood', 1, true) or label:find('bonnet', 1, true)
        or label:find('engine', 1, true) then
        boneName = 'bonnet'
    end
    if boneName then
        local index = GetEntityBoneIndexByName(entity, boneName)
        if index ~= -1 then return GetEntityBonePosition_2(entity, index) end
    end
    return GetOffsetFromEntityInWorldCoords(entity, 0.0, 0.0, 0.45)
end

local function projectVehicleOptions(entity, model, anchors)
    local pins = {}
    local center = GetOffsetFromEntityInWorldCoords(entity, 0.0, 0.0, 0.55)
    local centerVisible, cx, cy = GetScreenCoordFromWorldCoord(center.x, center.y, center.z)
    pins.__center = centerVisible and { x = cx, y = cy } or { x = 0.5, y = 0.5 }

    for group, entries in pairs(options) do
        local groupPins = {}
        for index = 1, #entries do
            local option = entries[index]
            if not option.hide then
                local point = anchors[option] or getVehicleDisplayPoint(option, entity, model)
                local visible, sx, sy = GetScreenCoordFromWorldCoord(point.x, point.y, point.z)
                if visible and sx >= 0 and sx <= 1 and sy >= 0 and sy <= 1 then
                    groupPins[tostring(index)] = { x = sx, y = sy }
                end
            end
        end
        pins[group] = groupPins
    end

    return pins -- never collapse the halo into the grid on one offscreen bone
end

---@param option OxTargetOption
---@param distance number
---@param endCoords vector3
---@param entityHit? number
---@param entityType? number
---@param entityModel? number | false
---@param playerCoords? vector3
local function shouldHide(option, distance, endCoords, entityHit, entityType, entityModel, playerCoords, allowOverview)
    if option.menuName ~= currentMenu then return true end
    if option.groups and not utils.hasPlayerGotGroup(option.groups) then return true end
    if option.items and not utils.hasPlayerGotItems(option.items, option.anyItem) then return true end

    -- Outside vehicle mode the upstream bone, offset and max-distance
    -- behavior remains unchanged.
    local spatial = allowOverview and entityType == 2 and entityHit and entityHit > 0
        and entityModel and playerCoords
    local anchor, resolvedBone, preview
    if spatial and (option.bones or option.offset) then
        anchor, resolvedBone = getVehiclePart(option, entityHit, entityModel, playerCoords)
        if not anchor then return true end
        local partDistance = #(playerCoords - anchor)
        local reach = option.distance or 7
        if option.resource == 'ox_target' and option.name and option.name:find('^ox_target:') then
            reach = math.max(reach, builtinVehicleReach)
        end
        if partDistance > vehicleOverviewRange then return true end
        preview = partDistance > reach
        endCoords = anchor
        distance = partDistance
    elseif distance > (option.distance or 7) then
        return true
    end

    if not spatial and distance > (option.distance or 7) then return true end
    local bone = entityModel and option.bones or nil

    if resolvedBone then
        bone = resolvedBone
    elseif bone then
        local _type = type(bone)
        if _type == 'string' then
            local boneId = GetEntityBoneIndexByName(entityHit, bone)
            if boneId ~= -1 and #(endCoords - GetEntityBonePosition_2(entityHit, boneId)) <= 2 then
                bone = boneId
            else return true end
        elseif _type == 'table' then
            local closestBone, boneDistance
            for j = 1, #bone do
                local boneId = GetEntityBoneIndexByName(entityHit, bone[j])
                if boneId ~= -1 then
                    local dist = #(endCoords - GetEntityBonePosition_2(entityHit, boneId))
                    if dist <= (boneDistance or 1) then
                        closestBone, boneDistance = boneId, dist
                    end
                end
            end
            if closestBone then bone = closestBone else return true end
        end
    end

    local offset = not anchor and entityModel and option.offset or nil
    if offset then
        if not option.absoluteOffset then
            local min, max = GetModelDimensions(entityModel)
            offset = (max - min) * offset + min
        end
        offset = GetOffsetFromEntityInWorldCoords(entityHit, offset.x, offset.y, offset.z)
        if #(endCoords - offset) > (option.offsetSize or 1) then return true end
    end

    if option.canInteract then
        local success, allowed = pcall(option.canInteract, entityHit, distance, endCoords, option.name, bone)
        if not success or not allowed then return true end
    end

    -- Preview is display-only. A player still must walk into range before
    -- its existing callback can be triggered.
    return false, anchor, preview or false
end

local function startTargeting()
    if state.isDisabled() or state.isActive() or IsNuiFocused() or IsPauseMenuActive() then return end

    state.setActive(true)

    local flag = 511
    local hit, entityHit, endCoords, distance, lastEntity, entityType, entityModel, hasTarget, zonesChanged
    local zones = {}
    local vehicleSpatialActive = false
    local lastVehicleSeen, lastVehicleCoords = 0, nil

    CreateThread(function()
        local dict, texture = utils.getTexture()
        local lastCoords

        while state.isActive() do
            lastCoords = endCoords == vec0 and lastCoords or endCoords or vec0

            if debug then
                DrawMarker(28, lastCoords.x, lastCoords.y, lastCoords.z, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.2,
                    0.2,
                    ---@diagnostic disable-next-line: param-type-mismatch
                    255, 42, 24, 100, false, false, 0, true, false, false, false)
            end

            utils.drawZoneSprites(dict, texture)
            DisablePlayerFiring(cache.playerId, true)
            DisableControlAction(0, 25, true)
            DisableControlAction(0, 140, true)
            DisableControlAction(0, 141, true)
            DisableControlAction(0, 142, true)

            if state.isNuiFocused() then
                DisableControlAction(0, 1, true)
                DisableControlAction(0, 2, true)

                if not hasTarget or options and IsDisabledControlJustPressed(0, 25) then
                    state.setNuiFocus(false, false)
                end
            elseif hasTarget and IsDisabledControlJustPressed(0, mouseButton) then
                state.setNuiFocus(true, true)
            end

            Wait(0)
        end

        SetStreamedTextureDictAsNoLongerNeeded(dict)
    end)

    while state.isActive() do
        if not state.isNuiFocused() and lib.progressActive() then
            state.setActive(false)
            break
        end

        local playerCoords = GetEntityCoords(cache.ped)
        hit, entityHit, endCoords = lib.raycast.fromCamera(flag, 4, 20)
        distance = #(playerCoords - endCoords)

        if entityHit ~= 0 and entityHit ~= lastEntity then
            local success, result = pcall(GetEntityType, entityHit)
            entityType = success and result or 0
        end

        if entityType == 0 then
            local _flag = flag == 511 and 26 or 511
            local _hit, _entityHit, _endCoords = lib.raycast.fromCamera(_flag, 4, 20)
            local _distance = #(playerCoords - _endCoords)

            if _distance < distance then
                flag, hit, entityHit, endCoords, distance = _flag, _hit, _entityHit, _endCoords, _distance

                if entityHit ~= 0 then
                    local success, result = pcall(GetEntityType, entityHit)
                    entityType = success and result or 0
                end
            end
        end

        -- Camera rays can miss thin/open vehicle panels for a single tick.
        -- A short grace period prevents option teardown/recreation flicker.
        -- Never hold a target over another real entity, and never preserve it
        -- when the player has moved away from the vehicle.
        if vehicleHalo and entityHit == 0 and lastEntity and lastEntity > 0
            and entityType == 2 and lastVehicleCoords
            and (GetGameTimer() - lastVehicleSeen) <= vehicleGraceMs
            and DoesEntityExist(lastEntity)
            and #(playerCoords - GetEntityCoords(lastEntity)) <= vehicleOverviewRange then
            entityHit, endCoords = lastEntity, lastVehicleCoords
            distance = #(playerCoords - endCoords)
        elseif entityHit > 0 then
            local valid, kind = pcall(GetEntityType, entityHit)
            if valid and kind == 2 then
                lastVehicleSeen, lastVehicleCoords = GetGameTimer(), endCoords
            end
        end

        nearbyZones, zonesChanged = utils.getNearbyZones(endCoords)

        local entityChanged = entityHit ~= lastEntity
        local newOptions = (zonesChanged or entityChanged or menuChanged) and true

        if entityHit > 0 and entityChanged then
            currentMenu = nil

            if flag ~= 511 then
                entityHit = HasEntityClearLosToEntity(entityHit, cache.ped, 7) and entityHit or 0
            end

            if lastEntity ~= entityHit and debug then
                if lastEntity then
                    SetEntityDrawOutline(lastEntity, false)
                end

                if entityType ~= 1 then
                    SetEntityDrawOutline(entityHit, true)
                end
            end

            if entityHit > 0 then
                local success, result = pcall(GetEntityModel, entityHit)
                entityModel = success and result
            end
        end

        if hasTarget and (zonesChanged or entityChanged and hasTarget > 1) then
            SendNuiMessage('{"event": "leftTarget"}')

            if entityChanged then options:wipe() end

            if debug and lastEntity > 0 then SetEntityDrawOutline(lastEntity, false) end

            hasTarget = false
            vehicleSpatialActive = false
        end

        if newOptions and entityModel and entityHit > 0 then
            options:set(entityHit, entityType, entityModel)
        end

        lastEntity = entityHit
        currentTarget.entity = entityHit
        currentTarget.coords = endCoords
        currentTarget.distance = distance
        local hidden = 0
        local totalOptions = 0
        local vehicleAnchors = {}

        -- Classify zone interactions before building vehicle previews. Zones
        -- keep the original grid, and are never placed on the vehicle.
        if zonesChanged then table.wipe(zones) end
        local zoneActions = false
        for i = 1, #nearbyZones do
            local zoneOptions = nearbyZones[i].options
            local optionCount = #zoneOptions
            totalOptions += optionCount
            zones[i] = zoneOptions
            for j = 1, optionCount do
                local option = zoneOptions[j]
                local hide = shouldHide(option, distance, endCoords, entityHit)
                if option.hide ~= hide then option.hide = hide; newOptions = true end
                if hide then hidden += 1 else zoneActions = true end
            end
        end

        local spatial = vehicleHalo and entityType == 2 and entityHit > 0 and not zoneActions
        for k, entries in pairs(options) do
            local optionCount = #entries
            local dist = k == '__global' and 0 or distance
            totalOptions += optionCount
            for i = 1, optionCount do
                local option = entries[i]
                local hide, anchor, preview = shouldHide(option, dist, endCoords,
                    entityHit, entityType, entityModel, playerCoords, spatial)
                if not hide and anchor then
                    vehicleAnchors[option] = getVehicleDisplayPoint(option, entityHit, entityModel)
                end
                if option.hide ~= hide or option.rsHaloOutOfRange ~= (preview or false) then
                    option.hide = hide
                    option.rsHaloOutOfRange = preview or false
                    newOptions = true
                end
                if hide then hidden += 1 end
            end
        end

        if newOptions then
            if hasTarget == 1 and (totalOptions - hidden) > 1 then
                hasTarget = true
            end

            if hasTarget and hidden == totalOptions then
                if hasTarget and hasTarget ~= 1 then
                    hasTarget = false
                    SendNuiMessage('{"event": "leftTarget"}')
                end
            elseif menuChanged or hasTarget ~= 1 and hidden ~= totalOptions then
                hasTarget = options.size

                if currentMenu and options.__global[1]?.name ~= 'builtin:goback' then
                    table.insert(options.__global, 1,
                        {
                            icon = 'fa-solid fa-circle-chevron-left',
                            label = locale('go_back'),
                            name = 'builtin:goback',
                            menuName = currentMenu,
                            openMenu = 'home'
                        })
                end

                vehicleSpatialActive = spatial
                SendNuiMessage(json.encode({
                    event = 'setTarget',
                    options = options,
                    zones = zones,
                    spatialVehicle = spatial or false,
                    pins = spatial and projectVehicleOptions(entityHit, entityModel, vehicleAnchors) or nil,
                    spatialEntity = spatial and entityHit or nil,
                }, { sort_keys = true }))
            end

            menuChanged = false
        end

        if vehicleSpatialActive and entityType == 2 and entityHit > 0 and hasTarget and not newOptions
            and not state.isNuiFocused() then
            SendNuiMessage(json.encode({
                event = 'vehiclePins',
                pins = projectVehicleOptions(entityHit, entityModel, vehicleAnchors),
            }, { sort_keys = true }))
        end

        if toggleHotkey and IsPauseMenuActive() then
            state.setActive(false)
        end

        if not hasTarget or hasTarget == 1 then
            flag = flag == 511 and 26 or 511
        end

        Wait(hit and 50 or 100)
    end

    if lastEntity and debug then
        SetEntityDrawOutline(lastEntity, false)
    end

    state.setNuiFocus(false)
    SendNuiMessage('{"event": "visible", "state": false}')
    table.wipe(currentTarget)
    options:wipe()

    if nearbyZones then table.wipe(nearbyZones) end
end

do
    ---@type KeybindProps
    local keybind = {
        name = 'ox_target',
        defaultKey = GetConvar('ox_target:defaultHotkey', 'LMENU'),
        defaultMapper = 'keyboard',
        description = locale('toggle_targeting'),
    }

    if toggleHotkey then
        function keybind:onPressed()
            if state.isActive() then
                return state.setActive(false)
            end

            return startTargeting()
        end
    else
        keybind.onPressed = startTargeting

        function keybind:onReleased()
            state.setActive(false)
        end
    end

    lib.addKeybind(keybind)
end

---@generic T
---@param option T
---@param server? boolean
---@return T
local function getResponse(option, server)
    local response = table.clone(option)
    response.entity = currentTarget.entity
    response.zone = currentTarget.zone
    response.coords = currentTarget.coords
    response.distance = currentTarget.distance

    if server then
        response.entity = response.entity ~= 0 and NetworkGetEntityIsNetworked(response.entity) and
            NetworkGetNetworkIdFromEntity(response.entity) or 0
    end

    response.icon = nil
    response.groups = nil
    response.items = nil
    response.canInteract = nil
    response.onSelect = nil
    response.export = nil
    response.event = nil
    response.serverEvent = nil
    response.command = nil

    return response
end

RegisterNUICallback('select', function(data, cb)
    cb(1)

    local zone = data[3] and nearbyZones[data[3]]

    ---@type OxTargetOption?
    local option = zone and zone.options[data[2]] or options[data[1]][data[2]]

    if option and not option.hide and not option.rsHaloOutOfRange then
        if option.openMenu then
            local menuDepth = #menuHistory

            if option.name == 'builtin:goback' then
                option.menuName = option.openMenu
                option.openMenu = menuHistory[menuDepth]

                if menuDepth > 0 then
                    menuHistory[menuDepth] = nil
                end
            else
                menuHistory[menuDepth + 1] = currentMenu
            end

            menuChanged = true
            currentMenu = option.openMenu ~= 'home' and option.openMenu or nil

            options:wipe()
        else
            state.setNuiFocus(false)
        end

        currentTarget.zone = zone?.id

        if option.onSelect then
            option.onSelect(option.qtarget and currentTarget.entity or getResponse(option))
        elseif option.export then
            exports[option.resource or zone.resource][option.export](nil, getResponse(option))
        elseif option.event then
            TriggerEvent(option.event, getResponse(option))
        elseif option.serverEvent then
            TriggerServerEvent(option.serverEvent, getResponse(option, true))
        elseif option.command then
            ExecuteCommand(option.command)
        end

        if option.menuName == 'home' then return end
    end

    if not option?.openMenu and IsNuiFocused() then
        state.setActive(false)
    end
end)
