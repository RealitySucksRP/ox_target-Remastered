# ox_target — RS Orbital Target Interface

Version 1.21.0 | Based on Overextended ox_target 1.18.1

A customized interface for the standalone FiveM third-eye targeting resource. Retains the ox_target resource name and targeting API, with a transparent orbital interface, animated SVG icons, context-aware action themes, particle effects and vehicle interaction previews.

## Requirements and installation

- FiveM with a current CfxLua runtime.
- ox_lib 3.30.0 or later, including any dependencies required by your installed ox_lib version.
- A supported framework is optional; framework-specific group and item checks depend on the configured integration.

1. Back up your existing ox_target resource.
2. Replace its folder with the included `ox_target` folder (do not run two copies).
3. Ensure ox_lib starts before ox_target. Start resources that register target options afterward.
4. Restart your server or reconnect and verify registered interactions, distance checks and input focus.

```cfg
ensure ox_lib
ensure ox_target
```

Upstream documentation: https://overextended.dev/ox_target

Upstream project: https://github.com/overextended/ox_target

## Configuration

See `THEMES.md` for context-aware icon customization and optional vehicle interaction settings. Existing ox_target exports and convars remain available. The interface uses bundled assets; no external image or font service is required by the active UI. The original upstream server version check remains present.

## License and attribution

Core ox_target is licensed under the MIT license by Overextended. The original copyright notice and license are included in `LICENSE`. Font Awesome license terms are included in `web/vendor/fontawesome/LICENSE.txt`. This is a modified distribution, not an official Overextended release.

### Visual references and credit

The effects are an original HTML/CSS adaptation inspired by these projects.
No upstream implementation, images or binaries were copied into this resource;
their Android, iOS, macOS and desktop components are not FiveM/CEF dependencies.

- [Loop – Kai Azim](https://github.com/mrkai77/Loop): radial targeting feedback and subtle motion; GPL-3.0 project, **design reference only**.
- [Orbit Menu – David Vaz Teixeira](https://github.com/davidvazteixeira/orbit-menu): radial interaction patterns; MIT project, design reference only.
- [Orbit Menu – Oussama Meglali](https://github.com/Meglali20/orbit-menu): layered orbit depth; Apache-2.0 project, design reference only.
- [Orbit Menu for SeelenUI – @ickyaidy](https://seelen.io/resources/nH1xf8YxQQ2RKNl_5Ci3ww/orbit-menu): compact action presentation and movement; visual reference only.
- [CircularProgressIndicator – Anton Kozyriatskyi](https://github.com/antonKozyriatskyi/CircularProgressIndicator): ring indicators; Apache-2.0 project, design reference only.
- [Android RoundProgressBar – QusionDev](https://github.com/Qusion/android-roundprogressbar): theme-colored arc motion; MIT project, design reference only.
- [React Native Loader Kit – Duc Trung Mai](https://github.com/maitrungduc1410/react-native-loader-kit): in-flight action feedback; MIT project, design reference only.
- [Arched Image ProgressBar – smrtyvz](https://github.com/smrtyvz/archedimageProgressbar): arched image highlight concept; visual reference only, code not imported.

Core ox_target continues to be licensed under its included MIT `LICENSE` by
Overextended. Existing bundled Font Awesome license remains in `web/vendor`.
