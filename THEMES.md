# RS Orbital Target Interface — Themes

Version 1.21.0 uses circular orbital action nodes, context-aware multi-tone SVG icons, a centered reticle and local particle effects. The active styles are in `web/style.css`. The interface is defined in `web/index.html` and `web/js/main.js`.

## Context-aware icons

`web/js/themes.js` selects an action theme using its label, metadata, event name, bones and icon classes. Explicit `rsTheme` values take precedence when they match an existing theme key. `web/js/icons.js` contains the bundled SVG icon definitions. `rsDescription` can override the standard description and `iconColor` can override the visual accent.

Example:

```lua
exports.ox_target:addBoxZone({
    coords = vec3(0.0, 0.0, 72.0),
    size = vec3(1.0, 1.0, 1.0),
    options = {{
        name = 'my_secure_stash',
        label = 'Open personal locker',
        icon = 'fa-solid fa-box-archive',
        rsTheme = 'stash',
        rsDescription = 'Your personal storage',
        iconColor = '#42dfac',
        onSelect = function(data)
            -- Add your resource-specific interaction here.
        end,
    }},
})
```

To add a theme, define a local SVG entry in `web/js/icons.js` and add a matching key in `web/js/themes.js` with `color`, `svg` and an optional `match` regular expression. Preserve existing keys for integrations using explicit themes. The older bundled WebP artwork is retained for customization; active orbital nodes use SVG icons rather than the previous thumbnail list.

## Optional vehicle interaction settings

Set these server convars before starting ox_target:

```cfg
setr ox_target:rsVehicleHalo 1
setr ox_target:rsVehicleOverviewRange 8
setr ox_target:rsBuiltinVehicleReach 4
```

- `rsVehicleHalo`: set to 0 to disable the custom vehicle halo and restore single-ray vehicle-part targeting.
- `rsVehicleOverviewRange`: overview range in meters (minimum 3).
- `rsBuiltinVehicleReach`: reach for built-in vehicle door, hood and trunk actions (minimum 2). It does not replace third-party option distances.

Out-of-range preview actions are marked as unavailable. The standard ox_target selection payload remains `[type, one-based option ID, zone index]`. Integrating resources are responsible for server-side authorization of their own sensitive actions.

Restart ox_target during a maintenance window and retest integrations after changing themes or settings. Some resources may need to re-register their targets after restart.
