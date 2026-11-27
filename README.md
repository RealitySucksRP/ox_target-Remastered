# RS Orbital Target — ox_target Remastered

<a href="https://reality-sucks-rp-webstore.tebex.io/package/7837366"><img src="https://dunb17ur4ymx4.cloudfront.net/packages/images/54926996f73a7a0ee0ff3216dd5636283214cfba.png" width="100%" alt="RS Orbital Target — 3D interactive targeting"></a>

**Free | Full source | No escrow | Version 1.21.0 | FiveM Legacy and Enhanced | MIT licensed**

RealitySucksRP's reworked third-eye targeting interface brings animated targeting feedback, color-coded interactions and custom artwork to the original Overextended ox_target foundation. Keep the familiar targeting API while giving your server a distinct visual identity.

[Free on Tebex](https://reality-sucks-rp-webstore.tebex.io/package/7837366) | [Download ZIP](https://github.com/RealitySucksRP/ox_target-Remastered/releases/latest/download/ox_target.zip) | [GitHub releases](https://github.com/RealitySucksRP/ox_target-Remastered/releases) | [Website](https://realitysucksrp.github.io/) | [Discord](https://discord.gg/e9V3rPHySx) | [YouTube](https://www.youtube.com/@RealitySucksRP) | [All free scripts](https://reality-sucks-rp-webstore.tebex.io/category/free-scripts)

[Watch gameplay preview](https://youtu.be/fIXhZ4y3IGM)

## Screenshots

<img src="https://dunb17ur4ymx4.cloudfront.net/packages/images/a2929468b651e9d1074a1050ce666dfca70102c8.png" width="100%" alt="RS Orbital Target — Tebex gallery image 2">

<img src="https://dunb17ur4ymx4.cloudfront.net/packages/images/2a50179c9b1e5fe847b26992d960418eb7c2c581.png" width="100%" alt="RS Orbital Target — Tebex gallery image 3">

<img src="https://dunb17ur4ymx4.cloudfront.net/packages/images/14e68b6295f07011ac8aee42b024d32ab0348d96.png" width="100%" alt="RS Orbital Target — Tebex gallery image 4">

<img src="https://dunb17ur4ymx4.cloudfront.net/packages/images/c225163a6c9152b7ab717c97fbda805b4e05d91e.png" width="100%" alt="RS Orbital Target — Tebex gallery image 5">

## Included interaction artwork

These are actual theme assets included in the GitHub resource, rather than in-game screenshots.

<table>
<tr><td><img src="web/assets/engine.webp" width="280" alt="Vehicle engine artwork"><br>Vehicle interactions</td><td><img src="web/assets/medical.webp" width="280" alt="Medical artwork"><br>Medical interactions</td><td><img src="web/assets/stash.webp" width="280" alt="Storage artwork"><br>Storage interactions</td></tr>
<tr><td><img src="web/assets/store.webp" width="280" alt="Store artwork"><br>Shops</td><td><img src="web/assets/parts.webp" width="280" alt="Vehicle parts artwork"><br>Vehicle parts</td><td><img src="web/assets/elevator.webp" width="280" alt="Elevator artwork"><br>World interactions</td></tr>
</table>

## Features

- Animated central eye and readable, context-sensitive action options.
- Color-coded interactions for vehicles, garages, medical services, storage, shops and other actions.
- Bundled theme artwork and configurable per-option styling.
- Stable action refreshes and preserved hover state.
- Existing targeting support for models, entities, bones, zones, players and vehicles.
- Original ox_target exports, localization and supported framework integrations.
- Partial qtarget compatibility.

### Latest Orbital Target edition

The latest supplied Tebex package (1.21.0) introduces a transparent orbital interface, animated SVG icons, contextual themes, particles and vehicle interaction previews. The GitHub source is synchronized with the supplied 1.21.0 package.

## Requirements

| Requirement | Details |
| --- | --- |
| FiveM | Test on your Legacy or Enhanced server |
| ox_lib | 3.30.0 or newer, including its required dependencies |
| Framework | Optional; group and item checks depend on installed integrations |
| Resource name | `ox_target` |

## Installation

1. Back up your existing ox_target resource.
2. Install a compatible ox_lib version.
3. Replace the old resource with the new `ox_target` folder. Do not run two copies.
4. Start ox_lib before ox_target.

```cfg
ensure ox_lib
ensure ox_target
```

Start resources that register target options afterward. Reconnect and test interactions, distances, input and permission checks.

## Customization

See [THEMES.md](THEMES.md) for styling options and [package documentation](PACKAGE-README.md) for configuration and compatibility details for the current GitHub version.

## Credits and license

Original ox_target by [Overextended](https://github.com/overextended/ox_target), distributed under the [MIT license](LICENSE). Visual customization by RealitySucksRP. This is a modified distribution, not an official Overextended release. Bundled icon assets retain their respective licenses.
