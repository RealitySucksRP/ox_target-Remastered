# RS target themes

Version 1.18.10 uses a normal compact list beside the eye for every target,
including vehicles. Theme colors and icons remain active. Artwork and subtitle
metadata stay in the library for customization; the compact renderer hides them.

Matching target updates retain their buttons, hover state, and scroll position.
A lost target blocks input immediately and clears its list after 120 ms, allowing
a single missed ray to recover without flashing the list. Releasing the target
hotkey hides it immediately. Pending selections and out-of-range previews remain
disabled during updates.

The theme library is `web/js/themes.js`. It includes the six garage cards plus
robbery, medical, stash, chest, items, misc, engine, and parts. Labels and icon names choose a
matching theme automatically; unmatched actions use misc. Action order,
permissions, distances, callbacks and one-based option IDs remain owned by ox_target.

To choose a theme on an individual target option:

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
        -- iconColor = '#42dfac', -- optional: overrides the theme accent
        onSelect = function(data)
            -- Your existing interaction goes here.
        end,
    }},
})
```

To add a theme:

1. Put its artwork in `web/assets/`, for example `fishing.webp`.
2. Add an entry inside `targetThemes` in `web/js/themes.js`:

```js
fishing: {
  color: '#69cfff',
  art: 'fishing', // filename without .webp; letters, numbers, _ and - only
  icon: 'fa-solid fa-fish', // optional fallback when an option supplies no icon
  description: 'Prepare your fishing equipment', // optional
  match: /fishing|fishing rod|bait/i, // optional automatic label/icon match
},
```

3. Use `rsTheme = 'fishing'`, or let the match rule pick it. Put specific automatic
   rules before broader ones. Restart ox_target during your maintenance window
   and retest target registration in your framework. A reconnect may be needed
   if another resource registers its targets only once on startup.

The manifest already includes `web/**`, so extra local artwork needs no manifest
edits. Explicit theme selection also works with custom or translated labels.
`rsDescription` takes priority over `description` in the theme metadata. The
compact list keeps original action ordering, callbacks, and range restrictions.

All artwork is bundled locally. The page makes no external image/font requests.
