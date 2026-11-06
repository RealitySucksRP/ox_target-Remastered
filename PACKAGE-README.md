**ox_target Remastered — Free FiveM Eye Targeting Interface**

Version: 1.18.10 (RealitySucksRP package). Original ox_target base: Overextended; local RS interface customizations were developed from an upstream 1.18.1 base. This package is a derivative, not an official Overextended release.

**Free and full source**

The entire resource is provided without escrow, activation, or subscription. The original ox_target source is MIT-licensed. Its original copyright notice and license are retained in `LICENSE`. The bundled Font Awesome Free assets have their own bundled license in `web/vendor/fontawesome/LICENSE.txt`. Review those licenses before redistribution or modifications.

**What's included**

- Animated central eye/reticle and compact, readable interaction actions beside it.
- Color-coded options for vehicle parts, garage actions, medical, storage, robbery, and other interactions.
- Local theme artwork and optional per-option `rsTheme`, `rsDescription`, and `iconColor` settings.
- Stable action buttons during refresh; matching options keep their identity, hover state, and scroll position.
- Brief (120 ms) visual bridge across a momentary missed raycast, with interaction disabled immediately during that loss.
- Range and permission restrictions enforced by ox_target as usual; out-of-range previews do not allow selection.
- Model, entity, bone, zone, player and vehicle targeting through ox_target's existing APIs.
- Existing localization files, supported framework adapters, and partial qtarget compatibility from the base resource.

This build intentionally shows a compact action list around the eye (including vehicle options). It is not a guarantee that every interaction is shown as a full circular menu around a vehicle or that every GTA prop supports every interaction.

**Requirements**

- FiveM server with GTA V (test on your own Legacy/Enhanced build).
- `ox_lib` version 3.30.0 or newer, started before this resource (the version is checked by client and server source).
- Framework optional. Specific inventory, player group and job integrations depend on installed compatible providers.

**Installation**

1. Back up any existing `ox_target`, especially if it was customized.
2. Install the compatible `ox_lib` dependency. Keep the resource folder named exactly `ox_target` so existing exports and dependent resources continue to work.
3. Replace the old `ox_target` folder only during a maintenance window; do not run two copies.
4. Ensure `ox_lib` before `ox_target` in `server.cfg`:

```cfg
ensure ox_lib
ensure ox_target
```

5. Restart/reconnect at your chosen maintenance window and verify target zones, entities, vehicle doors, inventory and job-restricted interactions.

**Optional settings**

These are ordinary ox_target convars; add or change them in `server.cfg` before startup:

```cfg
setr ox_target:toggleHotkey 0
setr ox_target:defaultHotkey LMENU
setr ox_target:drawSprite 1
setr ox_target:defaults 1
setr ox_target:leftClick 1
setr ox_target:debug 0
```

`LMENU` is Left Alt. Hold by default (`toggleHotkey 0`). Player keybind changes may override the default.

**Theme customization**

Read `THEMES.md` for per-option color and artwork examples. `web/js/themes.js` contains the customization library. `web/assets/` contains the included local artwork. None of these changes require edits to the consuming resource's target callbacks.

**Compatibility and limitations**

This package preserves the core `ox_target` resource name, client APIs and partial `qtarget` shim. It does not install or replace `ox_lib`, a framework, `ox_inventory`, or other resources. Existing scripts must register their own target options as before. Fine-grained behavior depends on the consuming resource's own target offsets, bones, distances, and permission checks.

The package has been statically checked. A full live two-client acceptance test on FiveM Legacy and Enhanced was not performed as part of this repackaging.

**Credits and licensing**

Original project: Overextended — https://github.com/overextended/ox_target

Original documentation: https://overextended.dev/docs/ox_target

Custom eye interface and visual presentation: RealitySucksRP — https://github.com/RealitySucksRP

License: MIT for the `ox_target` codebase. See `LICENSE` (required attribution); bundled third-party icon assets retain their respective licenses. This free release does not add restrictions on MIT rights.
