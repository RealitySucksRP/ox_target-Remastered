// RS Orbital Target System v1.21.0 — Interactive Multi-Tone Vector Icon Library
// 44 crisp, 0ms-load inline SVGs with hover-triggered micro-animations (doors swing,
// hoods/trunks lift, wheels spin, gears mesh, scissors snip, skull eyes flare, ECG beats).
// Zero external CDN lag; animations run ONLY on hover/focus/active (0% idle GPU).

export const INTERACTIVE_ICONS = {
  // ── VEHICLE PARTS (exact animated parts) ──────────────────────────────────
  door_fl: `<svg class="option-svg anim-door-l" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="8.5" y="3" width="8" height="18" rx="3" fill="rgba(148,185,212,.16)" stroke="#7fa7c4" stroke-width="1.5"/>
    <path d="M10 7.2h5M10 16.8h5" stroke="#7fa7c4" stroke-width="1.3" opacity=".65"/>
    <g class="part-swing">
      <path d="M8.5 8.2 3.2 10.6v3.5l5.3-1.6" fill="rgba(198,136,239,.28)" stroke="#d99bff" stroke-width="2"/>
      <circle cx="4.8" cy="12.2" r="1.1" fill="#ffffff"/>
    </g>
  </svg>`,

  door_fr: `<svg class="option-svg anim-door-r" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="7.5" y="3" width="8" height="18" rx="3" fill="rgba(148,185,212,.16)" stroke="#7fa7c4" stroke-width="1.5"/>
    <path d="M9 7.2h5M9 16.8h5" stroke="#7fa7c4" stroke-width="1.3" opacity=".65"/>
    <g class="part-swing">
      <path d="M15.5 8.2 20.8 10.6v3.5l-5.3-1.6" fill="rgba(169,139,255,.28)" stroke="#bda6ff" stroke-width="2"/>
      <circle cx="19.2" cy="12.2" r="1.1" fill="#ffffff"/>
    </g>
  </svg>`,

  door_rl: `<svg class="option-svg anim-door-l" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="8.5" y="3" width="8" height="18" rx="3" fill="rgba(148,185,212,.16)" stroke="#7fa7c4" stroke-width="1.5"/>
    <path d="M10 7.2h5M10 16.8h5" stroke="#7fa7c4" stroke-width="1.3" opacity=".65"/>
    <g class="part-swing">
      <path d="M8.5 13 3.2 15.4v3.3l5.3-1.5" fill="rgba(132,157,255,.28)" stroke="#9ab2ff" stroke-width="2"/>
      <circle cx="4.8" cy="16.8" r="1.1" fill="#ffffff"/>
    </g>
  </svg>`,

  door_rr: `<svg class="option-svg anim-door-r" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="7.5" y="3" width="8" height="18" rx="3" fill="rgba(148,185,212,.16)" stroke="#7fa7c4" stroke-width="1.5"/>
    <path d="M9 7.2h5M9 16.8h5" stroke="#7fa7c4" stroke-width="1.3" opacity=".65"/>
    <g class="part-swing">
      <path d="M15.5 13 20.8 15.4v3.3l-5.3-1.5" fill="rgba(115,179,255,.28)" stroke="#8ac5ff" stroke-width="2"/>
      <circle cx="19.2" cy="16.8" r="1.1" fill="#ffffff"/>
    </g>
  </svg>`,

  hood: `<svg class="option-svg anim-hood" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 16.8h16.5v-2.1c0-1-.7-1.8-1.7-2l-2.3-.5-2-2.9H10" fill="rgba(148,185,212,.14)" stroke="#8cb4cc" stroke-width="1.5"/>
    <g class="part-lid">
      <path d="M3.2 11.4 9.8 6.8l2 4.6" stroke="#4aefb7" stroke-width="2.1"/>
      <path d="M5.4 11.2v5.4" stroke="#4aefb7" stroke-width="1.4" stroke-dasharray="2 1.5"/>
    </g>
    <circle class="part-glow" cx="7" cy="13.8" r="1.4" fill="#ffe066"/>
    <circle cx="7.4" cy="17.5" r="2.1" fill="#0d1e2b" stroke="#9ec5dc" stroke-width="1.5"/>
    <circle cx="17.2" cy="17.5" r="2.1" fill="#0d1e2b" stroke="#9ec5dc" stroke-width="1.5"/>
  </svg>`,

  trunk: `<svg class="option-svg anim-trunk" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3.5 16.8H20v-2.1c0-1-.7-1.8-1.7-2l-2.3-.5-2-2.9H9.5l-2 2.9-2.5.5c-.9.2-1.5 1-1.5 2Z" fill="rgba(148,185,212,.14)" stroke="#8cb4cc" stroke-width="1.5"/>
    <g class="part-lid">
      <path d="M20.8 11.4 14.2 6.8l-2 4.6" stroke="#ffc46d" stroke-width="2.1"/>
      <path d="M18.6 11.2v5.4" stroke="#ffc46d" stroke-width="1.4" stroke-dasharray="2 1.5"/>
    </g>
    <rect class="part-glow" x="15.3" y="13.2" width="2.8" height="2.2" rx=".5" fill="#ffd97d"/>
    <circle cx="6.8" cy="17.5" r="2.1" fill="#0d1e2b" stroke="#9ec5dc" stroke-width="1.5"/>
    <circle cx="16.6" cy="17.5" r="2.1" fill="#0d1e2b" stroke="#9ec5dc" stroke-width="1.5"/>
  </svg>`,

  wheel: `<svg class="option-svg anim-spin" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.8" fill="rgba(126,174,254,.14)" stroke="#6c8aa3" stroke-width="2.2"/>
    <g class="part-spin">
      <circle cx="12" cy="12" r="6.2" stroke="#7eaefe" stroke-width="1.4"/>
      <path d="M12 5.8v12.4M6.6 8.9l10.8 6.2M17.4 8.9 6.6 15.1" stroke="#b9d4ff" stroke-width="1.4"/>
      <circle cx="12" cy="12" r="2.2" fill="#7eaefe"/>
    </g>
  </svg>`,

  engine: `<svg class="option-svg anim-wrench" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="16.5" cy="16.5" r="3.4" fill="rgba(74,239,183,.18)" stroke="#4aefb7" stroke-width="1.5"/>
    <circle cx="16.5" cy="16.5" r="1.2" fill="#ffffff"/>
    <g class="part-tilt">
      <path d="M14.2 5.2a4 4 0 0 0-5.1 5.1L4.6 14.8a1.7 1.7 0 0 0 2.4 2.4l4.5-4.5a4 4 0 0 0 5.1-5.1l-2.3 2.3-2.4-2.4 2.3-2.3Z" fill="rgba(105,220,255,.2)" stroke="#7ceeff" stroke-width="1.6"/>
    </g>
  </svg>`,

  fuel: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4.5" y="4" width="9.5" height="16" rx="1.8" fill="rgba(255,179,71,.18)" stroke="#ffb347" stroke-width="1.7"/>
    <rect x="6.8" y="6.6" width="5" height="4" rx=".8" fill="#ffe19c"/>
    <path d="M14 9h2.2a1.8 1.8 0 0 1 1.8 1.8v4.8a1.5 1.5 0 0 0 3 0v-5.8l-2.2-2.2" stroke="#ffd27d" stroke-width="1.7"/>
    <path class="part-glow" d="M9.3 13.3c1.1 1.4 1.6 2.1 1.6 2.8a1.6 1.6 0 1 1-3.2 0c0-.7.5-1.4 1.6-2.8Z" fill="#ff7b54"/>
  </svg>`,

  lock: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path class="part-lift" d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9" stroke="#ff9cb5" stroke-width="1.9"/>
    <rect x="5.5" y="10.5" width="13" height="9.5" rx="2.2" fill="rgba(255,111,145,.24)" stroke="#ff6f91" stroke-width="1.7"/>
    <circle cx="12" cy="14.6" r="1.4" fill="#ffffff"/>
    <path d="M12 16v1.8" stroke="#ffffff" stroke-width="1.6"/>
  </svg>`,

  wash: `<svg class="option-svg anim-float" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.5 16.5h15v-2.2c0-.9-.6-1.7-1.5-1.9l-1.5-.3-1.4-2.1H8.9l-1.4 2.1-1.5.3c-.9.2-1.5 1-1.5 1.9Z" fill="rgba(72,229,255,.18)" stroke="#48e5ff" stroke-width="1.6"/>
    <circle cx="7.8" cy="17.2" r="1.8" fill="#0d1e2b" stroke="#9befff" stroke-width="1.4"/>
    <circle cx="16.2" cy="17.2" r="1.8" fill="#0d1e2b" stroke="#9befff" stroke-width="1.4"/>
    <g class="part-rise">
      <circle cx="7.5" cy="6.2" r="1.5" fill="rgba(160,244,255,.45)" stroke="#a8f5ff" stroke-width="1.2"/>
      <circle cx="12.5" cy="4.8" r="2" fill="rgba(160,244,255,.45)" stroke="#ffffff" stroke-width="1.2"/>
      <circle cx="17.2" cy="6.8" r="1.3" fill="rgba(160,244,255,.45)" stroke="#a8f5ff" stroke-width="1.2"/>
    </g>
  </svg>`,

  garage_out: `<svg class="option-svg anim-slide-r" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3.5 9.5 12 4.2l8.5 5.3V19h-2.5v-7.5H6V19H3.5Z" fill="rgba(41,230,255,.14)" stroke="#62c9e8" stroke-width="1.5"/>
    <g class="part-slide">
      <path d="M8.5 16h7m0 0-2.4-2.4M15.5 16l-2.4 2.4" stroke="#29e6ff" stroke-width="2.1"/>
    </g>
  </svg>`,

  garage_in: `<svg class="option-svg anim-slide-d" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3.5 9.5 12 4.2l8.5 5.3V19h-2.5v-7.5H6V19H3.5Z" fill="rgba(255,102,133,.14)" stroke="#ff7c99" stroke-width="1.5"/>
    <g class="part-drop">
      <path d="M12 12.2v6.6m0 0-2.5-2.5M12 18.8l2.5-2.5" stroke="#ff6685" stroke-width="2.1"/>
    </g>
  </svg>`,

  seat: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7.5 5.2v7.6c0 1.4 1.1 2.4 2.5 2.4h6.2" stroke="#69a8ff" stroke-width="2.2"/>
    <path d="M7.5 18.8h9.5M10.5 15.2v3.6" stroke="#a8cbff" stroke-width="1.6"/>
    <path class="part-lift" d="M14.5 6.8h4.2m0 0-1.6-1.6m1.6 1.6-1.6 1.6" stroke="#5ff5d2" stroke-width="1.8"/>
  </svg>`,

  // ── STORE-SPECIFIC SALESPERSONS & MERCHANTS ───────────────────────────────
  shop_weapons: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle class="part-glow" cx="12" cy="12" r="7.5" stroke="#ff6b6b" stroke-width="1.5" stroke-dasharray="3 2"/>
    <path d="M12 3.2v3.2M12 17.6v3.2M3.2 12h3.2M17.6 12h3.2" stroke="#ff9e80" stroke-width="1.7"/>
    <path d="M7.5 12.4h7.8l1.6-1.4h-2.4l-.8-1.4H9.2l-1.7 2.8Zm3.2 0-.9 3.1" stroke="#ffffff" stroke-width="1.7"/>
  </svg>`,

  shop_clothing: `<svg class="option-svg anim-sway" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 4.5a1.5 1.5 0 1 1 1.4 2L12 7.5" stroke="#f0b6ff" stroke-width="1.5"/>
    <g class="part-sway">
      <path d="M8.5 7.6 4.5 10.4l2 2.4 1.8-1v7.7h7.4v-7.7l1.8 1 2-2.4-4-2.8a3.5 3.5 0 0 1-7 0Z" fill="rgba(226,138,255,.24)" stroke="#e28aff" stroke-width="1.6"/>
    </g>
  </svg>`,

  shop_barber: `<svg class="option-svg anim-snip" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="6.8" cy="7.2" r="2.4" fill="rgba(255,140,198,.24)" stroke="#ff8cc6" stroke-width="1.6"/>
    <circle cx="6.8" cy="16.8" r="2.4" fill="rgba(255,140,198,.24)" stroke="#ff8cc6" stroke-width="1.6"/>
    <path class="part-blade-a" d="M8.8 8.6 19.5 16.2" stroke="#ffffff" stroke-width="1.8"/>
    <path class="part-blade-b" d="M8.8 15.4 19.5 7.8" stroke="#c3e7ff" stroke-width="1.8"/>
    <circle cx="13.6" cy="12" r="1" fill="#ff8cc6"/>
  </svg>`,

  shop_tattoo: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M15.2 4.5 19.5 8.8l-7.2 7.2-4.3-4.3 7.2-7.2Z" fill="rgba(192,132,252,.25)" stroke="#c084fc" stroke-width="1.6"/>
    <path d="M8 11.7 5.2 18.8l7.1-2.8" stroke="#e9d5ff" stroke-width="1.6"/>
    <circle class="part-glow" cx="5" cy="19" r="1.4" fill="#ff5ea8"/>
  </svg>`,

  shop_food: `<svg class="option-svg anim-float" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.5 12.2c0-2.8 3.4-4.7 7.5-4.7s7.5 1.9 7.5 4.7H4.5Z" fill="rgba(255,174,92,.32)" stroke="#ffae5c" stroke-width="1.6"/>
    <path d="M4.5 15.2h15" stroke="#5be39b" stroke-width="2"/>
    <path d="M5.5 17.8h13a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5Z" fill="rgba(255,174,92,.22)" stroke="#ffae5c" stroke-width="1.6"/>
    <g class="part-rise">
      <path d="M9 5.2c0-.9.8-1.2.8-2M12.5 4.8c0-.9.8-1.2.8-2M15.8 5.4c0-.9.8-1.2.8-2" stroke="#ffe4a3" stroke-width="1.3"/>
    </g>
  </svg>`,

  shop_drink: `<svg class="option-svg anim-float" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5.5 9.2h10.2v5.4a4.4 4.4 0 0 1-4.4 4.4H9.9a4.4 4.4 0 0 1-4.4-4.4V9.2Z" fill="rgba(255,198,107,.24)" stroke="#ffc66b" stroke-width="1.6"/>
    <path d="M15.7 10.6h1.9a2.1 2.1 0 0 1 0 4.2h-1.9" stroke="#ffc66b" stroke-width="1.6"/>
    <g class="part-rise">
      <path d="M8.5 6.8c0-1 .9-1.3.9-2.2M12.2 6.8c0-1 .9-1.3.9-2.2" stroke="#8ff0ff" stroke-width="1.4"/>
    </g>
  </svg>`,

  shop_pharmacy: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4.5" y="7.5" width="15" height="9" rx="4.5" transform="rotate(-35 12 12)" fill="rgba(73,237,206,.22)" stroke="#49edce" stroke-width="1.6"/>
    <path d="M9.6 8.8 14.4 15.2" stroke="#ffffff" stroke-width="1.6"/>
    <path class="part-glow" d="M17.5 4.5v3M16 6h3" stroke="#ff7096" stroke-width="1.8"/>
  </svg>`,

  shop_hardware: `<svg class="option-svg anim-wrench" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4" y="9" width="16" height="10.5" rx="2" fill="rgba(255,171,76,.2)" stroke="#ffab4c" stroke-width="1.6"/>
    <path d="M9 9V6.8a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6.8V9M4 13.5h16" stroke="#ffd591" stroke-width="1.6"/>
    <rect class="part-tilt" x="10.6" y="12.2" width="2.8" height="2.8" rx=".6" fill="#ffffff"/>
  </svg>`,

  shop_grocery: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.2 10.2h15.6l-1.5 8.2a1.8 1.8 0 0 1-1.8 1.5H7.5a1.8 1.8 0 0 1-1.8-1.5l-1.5-8.2Z" fill="rgba(93,226,255,.22)" stroke="#5de2ff" stroke-width="1.6"/>
    <path d="M8.5 10.2 11 5.5M15.5 10.2 13 5.5" stroke="#a6f2ff" stroke-width="1.7"/>
    <g class="part-lift">
      <circle cx="9.6" cy="14.5" r="1.2" fill="#ffe066"/>
      <circle cx="14.4" cy="14.5" r="1.2" fill="#5ef2a8"/>
    </g>
  </svg>`,

  shop_dealer: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 15.8h16v-2.2c0-.9-.6-1.6-1.5-1.8l-1.6-.4-1.6-2.4H8.7l-1.6 2.4-1.6.4c-.9.2-1.5.9-1.5 1.8Z" fill="rgba(94,242,168,.2)" stroke="#5ef2a8" stroke-width="1.6"/>
    <circle cx="7.4" cy="16.4" r="1.8" fill="#0d1e2b" stroke="#b9ffd9" stroke-width="1.4"/>
    <circle cx="16.6" cy="16.4" r="1.8" fill="#0d1e2b" stroke="#b9ffd9" stroke-width="1.4"/>
    <path class="part-glow" d="M12 3.2v3.6M10.4 5h3.2" stroke="#ffe066" stroke-width="1.7"/>
  </svg>`,

  shop_blackmarket: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.5 18.8c.8-4.5 3.6-6.8 7.5-6.8s6.7 2.3 7.5 6.8" fill="rgba(255,92,119,.22)" stroke="#ff5c77" stroke-width="1.6"/>
    <path d="M7.2 10.6C7.2 6.8 9.2 4.5 12 4.5s4.8 2.3 4.8 6.1c0 1.4-.9 2.4-2.1 2.4H9.3c-1.2 0-2.1-1-2.1-2.4Z" fill="#1b0d14" stroke="#ff5c77" stroke-width="1.6"/>
    <circle class="part-glow" cx="10.2" cy="9.6" r="1" fill="#ff3b5c"/>
    <circle class="part-glow" cx="13.8" cy="9.6" r="1" fill="#ff3b5c"/>
  </svg>`,

  shop_jewelry: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6.5 6.2h11l3 4.4-8.5 8.8-8.5-8.8 3-4.4Z" fill="rgba(128,236,255,.24)" stroke="#80ecff" stroke-width="1.6"/>
    <path d="M3.5 10.6h17M8.8 6.2 7.5 10.6l4.5 8.8 4.5-8.8-1.3-4.4" stroke="#d8faff" stroke-width="1.2"/>
    <path class="part-glow" d="M18.8 4.2v2.4M17.6 5.4H20" stroke="#ffe680" stroke-width="1.5"/>
  </svg>`,

  salesperson: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="9.6" cy="8.2" r="3.1" fill="rgba(93,226,255,.24)" stroke="#5de2ff" stroke-width="1.6"/>
    <path d="M4.2 18.8c.7-3.3 2.8-5 5.4-5s4.7 1.7 5.4 5" fill="rgba(93,226,255,.16)" stroke="#5de2ff" stroke-width="1.6"/>
    <g class="part-lift">
      <circle cx="17.8" cy="9.2" r="3" fill="rgba(255,224,102,.24)" stroke="#ffe066" stroke-width="1.5"/>
      <path d="M17.8 7.8v2.8" stroke="#ffe066" stroke-width="1.5"/>
    </g>
  </svg>`,

  // ── WORLD OBJECTS, DOORS & ACTIONS ────────────────────────────────────────
  door_building: `<svg class="option-svg anim-door-b" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="6" y="3.5" width="12" height="17" rx="1.4" fill="rgba(183,148,255,.12)" stroke="#8b7ab8" stroke-width="1.4"/>
    <g class="part-swing">
      <path d="M6.5 4.2 15.8 6v12.8l-9.3 1.4V4.2Z" fill="rgba(183,148,255,.32)" stroke="#c9a8ff" stroke-width="1.6"/>
      <circle cx="13.5" cy="12.4" r="1.1" fill="#ffe066"/>
    </g>
  </svg>`,

  elevator: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4.5" y="4" width="15" height="16" rx="2" fill="rgba(55,239,183,.15)" stroke="#37efb7" stroke-width="1.6"/>
    <path d="M12 4.5v15" stroke="#37efb7" stroke-width="1.3" opacity=".7"/>
    <path class="part-lift" d="M8.2 10.6 9.8 8.6l1.6 2M12.8 13.4l1.6 2 1.6-2" stroke="#ffffff" stroke-width="1.6"/>
  </svg>`,

  bank: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3.8 9.2 12 4.2l8.2 5H3.8Z" fill="rgba(82,230,154,.24)" stroke="#52e69a" stroke-width="1.6"/>
    <path d="M6.4 10.2v6.6M10.1 10.2v6.6M13.9 10.2v6.6M17.6 10.2v6.6M4 19.2h16" stroke="#8ff5bf" stroke-width="1.6"/>
    <circle class="part-lift" cx="12" cy="7.2" r="1.1" fill="#ffe066"/>
  </svg>`,

  receipts: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path class="part-lift" d="M6.5 4h11v16l-2.2-1.4-1.8 1.4-1.5-1.4-1.5 1.4-1.8-1.4L6.5 20V4Z" fill="rgba(255,194,94,.2)" stroke="#ffc25e" stroke-width="1.6"/>
    <path d="M9.2 8.4h5.6M9.2 11.6h5.6M9.2 14.8h3.4" stroke="#fff0c2" stroke-width="1.5"/>
  </svg>`,

  stash: `<svg class="option-svg anim-spin" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4" y="4.5" width="16" height="15" rx="2.4" fill="rgba(66,223,172,.18)" stroke="#42dfac" stroke-width="1.6"/>
    <g class="part-spin">
      <circle cx="12" cy="12" r="4" stroke="#a6ffe2" stroke-width="1.5"/>
      <path d="M12 8v1.6M12 14.4V16M8 12h1.6M14.4 12H16" stroke="#ffffff" stroke-width="1.5"/>
    </g>
    <circle cx="12" cy="12" r="1.2" fill="#42dfac"/>
  </svg>`,

  chest: `<svg class="option-svg anim-hood" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4" y="11" width="16" height="8.5" rx="1.8" fill="rgba(255,193,99,.22)" stroke="#ffc163" stroke-width="1.6"/>
    <g class="part-lid">
      <path d="M4 11V8.6c0-1.4 1.1-2.6 2.6-2.6h10.8c1.5 0 2.6 1.2 2.6 2.6V11H4Z" fill="rgba(255,219,138,.28)" stroke="#ffd68a" stroke-width="1.6"/>
    </g>
    <rect class="part-glow" x="10.4" y="10.2" width="3.2" height="3.2" rx=".7" fill="#fff1a8"/>
  </svg>`,

  craft: `<svg class="option-svg anim-wrench" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.5 18.2h15" stroke="#99b3c6" stroke-width="1.8"/>
    <g class="part-tilt">
      <path d="m14.2 5.4 4.2 4.2-2.2 2.2-4.2-4.2 2.2-2.2ZM12.8 10.6l-6.6 6.6" stroke="#ff9f5a" stroke-width="2"/>
    </g>
    <circle class="part-glow" cx="17.8" cy="15.2" r="1.2" fill="#ffe066"/>
  </svg>`,

  trash: `<svg class="option-svg anim-hood" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6.2 8.8h11.6l-.9 10.4a1.6 1.6 0 0 1-1.6 1.4H8.7a1.6 1.6 0 0 1-1.6-1.4L6.2 8.8Z" fill="rgba(149,179,196,.2)" stroke="#95b3c4" stroke-width="1.6"/>
    <g class="part-lid">
      <path d="M4.8 7.2h14.4M9.4 7.2V5.4h5.2v1.8" stroke="#cde3f0" stroke-width="1.7"/>
    </g>
    <path d="M10 12v5M14 12v5" stroke="#95b3c4" stroke-width="1.4"/>
  </svg>`,

  sit: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 12.2V8.4A2.4 2.4 0 0 1 8.4 6h7.2A2.4 2.4 0 0 1 18 8.4v3.8" fill="rgba(158,197,255,.22)" stroke="#9ec5ff" stroke-width="1.6"/>
    <path class="part-lift" d="M4.5 12.2h15v4.2a1.4 1.4 0 0 1-1.4 1.4H5.9a1.4 1.4 0 0 1-1.4-1.4v-4.2ZM7 17.8v2M17 17.8v2" stroke="#c8e0ff" stroke-width="1.6"/>
  </svg>`,

  terminal: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3.8" y="4.8" width="16.4" height="11.6" rx="2" fill="rgba(64,220,243,.18)" stroke="#40dcf3" stroke-width="1.6"/>
    <path d="M9.5 19.6h5M12 16.4v3.2" stroke="#8feaff" stroke-width="1.6"/>
    <path d="m7.8 9.2 2.2 1.8-2.2 1.8" stroke="#ffffff" stroke-width="1.6"/>
    <path class="part-glow" d="M11.8 12.8h4.2" stroke="#5ef2a8" stroke-width="1.8"/>
  </svg>`,

  police: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3.8 19 6.6v5.2c0 4.4-3 7.5-7 8.8-4-1.3-7-4.4-7-8.8V6.6L12 3.8Z" fill="rgba(92,157,255,.24)" stroke="#5c9dff" stroke-width="1.7"/>
    <path class="part-glow" d="m12 8.2 1 2.2 2.4.3-1.8 1.6.5 2.4-2.1-1.2-2.1 1.2.5-2.4-1.8-1.6 2.4-.3 1-2.2Z" fill="#ffd966"/>
  </svg>`,

  medical: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4" y="6.2" width="16" height="13" rx="2.4" fill="rgba(73,237,206,.2)" stroke="#49edce" stroke-width="1.6"/>
    <path d="M9.2 6.2V4.8A1.2 1.2 0 0 1 10.4 3.6h3.2a1.2 1.2 0 0 1 1.2 1.2v1.4" stroke="#9dfff0" stroke-width="1.5"/>
    <path class="part-glow" d="M7.2 12.8h2.6l1.3-2.6 1.8 5.2 1.3-2.6h2.6" stroke="#ff5e7e" stroke-width="1.8"/>
  </svg>`,

  robbery: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5.5 12c0-4.2 2.7-7.2 6.5-7.2s6.5 3 6.5 7.2c0 3.4-1.4 6.8-6.5 7.6-5.1-.8-6.5-4.2-6.5-7.6Z" fill="rgba(255,99,99,.24)" stroke="#ff6363" stroke-width="1.6"/>
    <rect class="part-glow" x="7.8" y="9.8" width="8.4" height="3.2" rx="1.6" fill="#180b0e" stroke="#ff9c9c" stroke-width="1.2"/>
    <circle cx="10.2" cy="11.4" r=".9" fill="#ffffff"/>
    <circle cx="13.8" cy="11.4" r=".9" fill="#ffffff"/>
  </svg>`,

  // Interactive RS Zombie Skull (mini version of rs-zombielscustoms hologram!)
  zombie: `<svg class="option-svg anim-skull" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5.5 11.2a6.5 6.5 0 1 1 13 0c0 2.4-1.1 4.1-2.5 5v2.3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.3c-1.4-.9-2.5-2.6-2.5-5Z" fill="rgba(166,255,77,.22)" stroke="#a6ff4d" stroke-width="1.6"/>
    <circle class="skull-eye" cx="9.6" cy="11.2" r="1.5" fill="#d9ff66"/>
    <circle class="skull-eye" cx="14.4" cy="11.2" r="1.5" fill="#d9ff66"/>
    <path d="M12 13.8v1.4M10 19.5v-1.8M12 19.5v-1.8M14 19.5v-1.8" stroke="#a6ff4d" stroke-width="1.3"/>
  </svg>`,

  talk: `<svg class="option-svg anim-float" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.8 6.4A2.2 2.2 0 0 1 7 4.2h10a2.2 2.2 0 0 1 2.2 2.2v7.4A2.2 2.2 0 0 1 17 16h-5.6L7.2 19.4V16H7a2.2 2.2 0 0 1-2.2-2.2V6.4Z" fill="rgba(114,233,243,.2)" stroke="#72e9f3" stroke-width="1.6"/>
    <g class="part-rise">
      <circle cx="9.2" cy="10.1" r="1.1" fill="#ffffff"/>
      <circle cx="12" cy="10.1" r="1.1" fill="#72e9f3"/>
      <circle cx="14.8" cy="10.1" r="1.1" fill="#ffffff"/>
    </g>
  </svg>`,

  information: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.2" fill="rgba(105,168,255,.2)" stroke="#69a8ff" stroke-width="1.6"/>
    <circle class="part-glow" cx="12" cy="8.2" r="1.1" fill="#ffffff"/>
    <path d="M12 11.4v4.8" stroke="#ffffff" stroke-width="2"/>
  </svg>`,

  items: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g class="part-lift">
      <path d="M12 4.2 18 7.5v6.4L12 17.2 6 13.9V7.5L12 4.2Z" fill="rgba(112,175,255,.24)" stroke="#70afff" stroke-width="1.6"/>
      <path d="M6 7.5 12 10.8l6-3.3M12 10.8v6.4" stroke="#cce2ff" stroke-width="1.3"/>
    </g>
  </svg>`,

  visit: `<svg class="option-svg anim-pop" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.2 11 12 4.6 19.8 11v8.2a1.2 1.2 0 0 1-1.2 1.2H5.4a1.2 1.2 0 0 1-1.2-1.2V11Z" fill="rgba(222,122,255,.2)" stroke="#de7aff" stroke-width="1.6"/>
    <rect class="part-lift" x="9.6" y="13.2" width="4.8" height="7.2" rx=".8" fill="rgba(255,224,102,.32)" stroke="#ffe066" stroke-width="1.4"/>
  </svg>`,

  parts: `<svg class="option-svg anim-spin" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g class="part-spin">
      <circle cx="12" cy="12" r="4.2" fill="rgba(134,170,255,.22)" stroke="#86aaff" stroke-width="1.7"/>
      <path d="M12 4.2v2.4M12 17.4v2.4M4.2 12h2.4M17.4 12h2.4M6.5 6.5l1.7 1.7M15.8 15.8l1.7 1.7M17.5 6.5l-1.7 1.7M8.2 15.8l-1.7 1.7" stroke="#c3d8ff" stroke-width="1.7"/>
    </g>
  </svg>`,

  misc: `<svg class="option-svg anim-pulse" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="7.5" stroke="#40dcf3" stroke-width="1.4" stroke-dasharray="4 3"/>
    <path class="part-glow" d="M13 4.8 7.6 13h4.2l-.8 6.2 5.4-8.2h-4.2l.8-6.2Z" fill="rgba(64,220,243,.32)" stroke="#aef6ff" stroke-width="1.5"/>
  </svg>`,
};
