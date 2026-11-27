// RS Orbital Target System v1.21.0 — Smart Context-Aware Icon & Theme Engine
// Matches exact vehicle parts (doors, hood, trunk, wheel), store-specific merchants
// (weapons, clothing, barber, tattoo, food, cafe/bar, pharmacy, hardware, grocery,
// dealership, jewelry, black market), and world objects with interactive multi-tone SVGs.

import { INTERACTIVE_ICONS } from "./icons.js";

export const targetThemes = {
  // ── 1. EXACT VEHICLE DOORS & PANELS (checked first) ───────────────────────
  door_fl: {
    color: '#c688ef', svg: 'door_fl',
    match: /(?:front\s+driver|driver\s+front|driver.?side\s+front|door_dside_f|driverF|toggle_front_driver)/i,
  },
  door_fr: {
    color: '#a98bff', svg: 'door_fr',
    match: /(?:front\s+passenger|passenger\s+front|passenger.?side\s+front|door_pside_f|passengerF|toggle_front_passenger)/i,
  },
  door_rl: {
    color: '#849dff', svg: 'door_rl',
    match: /(?:rear\s+driver|driver\s+rear|back\s+driver|door_dside_r|driverR|toggle_rear_driver)/i,
  },
  door_rr: {
    color: '#73b3ff', svg: 'door_rr',
    match: /(?:rear\s+passenger|passenger\s+rear|back\s+passenger|door_pside_r|passengerR|toggle_rear_passenger)/i,
  },
  hood: {
    color: '#4aefb7', svg: 'hood',
    match: /\bhood\b|\bbonnet\b|ox_target:bonnet|toggle_hood/i,
  },
  trunk: {
    color: '#ffc46d', svg: 'trunk',
    match: /\btrunk\b|\bboot\b|ox_target:trunk|toggle_trunk/i,
  },
  wheel: {
    color: '#7eaefe', svg: 'wheel',
    match: /tyre|tire|wheel|rim|fitment|camber|jack\s*up|stance/i,
  },

  // ── 2. VEHICLE SERVICES & GARAGE ACTIONS ──────────────────────────────────
  fuel: {
    color: '#ffb347', svg: 'fuel',
    match: /fuel|refuel|gas\s*pump|gas\s*station|petrol|diesel|jerrycan|\bpump\b|nozzle|charge\s*ev/i,
  },
  lock: {
    color: '#ff6f91', svg: 'lock',
    match: /\block\b|unlock|alarm|keyfob|hotwire|lockpick|break\s*in/i,
  },
  wash: {
    color: '#48e5ff', svg: 'wash',
    match: /wash|clean\s*(?:car|veh)|wax|detail/i,
  },
  engine: {
    color: '#4aefb7', svg: 'engine',
    match: /engine|repair|mechanic|radiator|turbo|tuning|customs|upgrade|\boil\b|\bnos\b|nitrous|tow\b|flatbed/i,
  },
  garage_in: {
    color: '#ff6685', svg: 'garage_in',
    match: /(?:store|park|return|put\s*away).*(?:vehicle|car|boat|heli|plane)|(?:vehicle|car).*(?:store|park)/i,
  },
  garage_out: {
    color: '#29e6ff', svg: 'garage_out',
    match: /retrieve|take\s*out|spawn.*(?:vehicle|car)|call.*(?:vehicle|car)|deliver.*(?:vehicle|car)|impound|valet|garage/i,
  },
  seat: {
    color: '#69a8ff', svg: 'seat',
    match: /put\s*in\s*veh|pull\s*out|seat|enter\s*veh|flip\s*veh|push\s*veh|escort\s*in/i,
  },

  // ── 3. STORE-SPECIFIC SALESPERSONS & MERCHANTS (checked before generic shop) ─
  shop_weapons: {
    color: '#ff6b6b', svg: 'shop_weapons',
    match: /weapon|gun\s*shop|gun\s*store|ammu|ammo|firearm|armory|armoury|tactical|rifle|pistol|gunsmith/i,
  },
  shop_clothing: {
    color: '#e28aff', svg: 'shop_clothing',
    match: /cloth|wardrobe|outfit|closet|apparel|binco|suburban|ponsonby|mask\s*shop|shoe|hat\s*shop|dress/i,
  },
  shop_barber: {
    color: '#ff8cc6', svg: 'shop_barber',
    match: /barber|haircut|hair\s*styl|salon|shave|groom/i,
  },
  shop_tattoo: {
    color: '#c084fc', svg: 'shop_tattoo',
    match: /tattoo|ink\s*shop|parlor|parlour/i,
  },
  shop_food: {
    color: '#ffae5c', svg: 'shop_food',
    match: /burger|pizza|taco|donut|bakery|diner|restaurant|food|meal|snack|eat\b|order\s*food|kitchen|hotdog/i,
  },
  shop_drink: {
    color: '#ffc66b', svg: 'shop_drink',
    match: /coffee|cafe|espresso|drink|liquor|bar\b|bartend|cocktail|beer|wine|vending|soda|water\s*cooler/i,
  },
  shop_pharmacy: {
    color: '#49edce', svg: 'shop_pharmacy',
    match: /pharmacy|chemist|pill|med\s*shop|prescription|clinic\s*shop|bandage\s*shop/i,
  },
  shop_hardware: {
    color: '#ffab4c', svg: 'shop_hardware',
    match: /hardware|tool\s*shop|megamall|you\s*tool|electronics|digital\s*den|phone\s*store|tech\s*shop/i,
  },
  shop_dealer: {
    color: '#5ef2a8', svg: 'shop_dealer',
    match: /dealership|car\s*dealer|auto\s*sales|pdm|showroom|vehicle\s*shop|buy\s*(?:car|vehicle)|test\s*drive|finance\s*car/i,
  },
  shop_jewelry: {
    color: '#80ecff', svg: 'shop_jewelry',
    match: /jewel|vangelico|diamond|watch\s*shop|luxury|gold\s*buyer|pawn/i,
  },
  shop_blackmarket: {
    color: '#ff5c77', svg: 'shop_blackmarket',
    match: /black\s*market|illegal|contraband|fence|shady|underground|drug\s*dealer|plug\b/i,
  },
  shop_grocery: {
    color: '#5de2ff', svg: 'shop_grocery',
    match: /24\/?7|supermarket|grocery|convenience|ltd\b|robs\s*liquor|mart\b|market\b|buy\s*items|browse\s*shop|open\s*shop|open\s*store/i,
  },
  salesperson: {
    color: '#5de2ff', svg: 'salesperson',
    match: /salesperson|cashier|clerk|vendor|merchant|shopkeeper|store\s*owner|sell\b|purchase|buy\b|\bshop\b|\bstore\b/i,
  },

  // ── 4. EMERGENCY, CRIME & ZOMBIE RP ───────────────────────────────────────
  zombie: {
    color: '#a6ff4d', svg: 'zombie',
    match: /zombie|quarantine|containment|biohazard|infected|cure|antidote|outbreak|dead\s*end|horde/i,
  },
  police: {
    color: '#5c9dff', svg: 'police',
    match: /police|cuff|uncuff|escort|frisk|pat\s*down|detain|jail|evidence|mdt|dispatch|duty|badge|fine|ticket|pd\b/i,
  },
  medical: {
    color: '#49edce', svg: 'medical',
    match: /medic|ems|heal|reviv|bandag|treat|first.?aid|ambulance|stretcher|hospital|\bcpr\b|defib|diagnos|check\s*pulse|check.?in/i,
  },
  robbery: {
    color: '#ff6363', svg: 'robbery',
    match: /\brob\b|robbery|hold.?up|heist|steal|burgl|\bmug\b|hack|drill|thermite|crack\s*safe|pickpocket|smash/i,
  },

  // ── 5. ECONOMY, STORAGE & CRAFTING ────────────────────────────────────────
  bank: {
    color: '#52e69a', svg: 'bank',
    match: /\bbank\b|\batm\b|withdraw|deposit|transfer|wallet|cash|money|\bpay\b|crypto|launder|fleeca|pacific/i,
  },
  receipts: {
    color: '#ffc25e', svg: 'receipts',
    match: /receipt|invoice|\bbill\b|ledger|register|checkout|billing/i,
  },
  stash: {
    color: '#42dfac', svg: 'stash',
    match: /stash|storage|locker|vault|\bsafe\b|glovebox|glove.?compartment|warehouse|cabinet|wardrobe\s*stash/i,
  },
  chest: {
    color: '#ffc163', svg: 'chest',
    match: /chest|treasure|crate|strongbox|loot|supply|airdrop|package|delivery|parcel|box\b/i,
  },
  craft: {
    color: '#ff9f5a', svg: 'craft',
    match: /craft|workbench|forge|cook|grill|brew|smelt|assemble|blueprint|fabricat/i,
  },

  // ── 6. WORLD OBJECTS, DOORS & INTERACTIONS ────────────────────────────────
  elevator: {
    color: '#37efb7', svg: 'elevator',
    match: /\blift\b|elevator|upstairs|downstairs|floor\s*\d|penthouse|rooftop/i,
  },
  visit: {
    color: '#de7aff', svg: 'visit',
    match: /(?:visit|enter|private).*(?:garage|house|apart|property|motel|room)|(?:house|apart|property).*(?:visit|enter)/i,
  },
  door_building: {
    color: '#b794ff', svg: 'door_building',
    match: /\bdoor\b|knock|ring\s*bell|\benter\b|\bexit\b|open\s*gate|close\s*gate|doorbell/i,
  },
  trash: {
    color: '#95b3c4', svg: 'trash',
    match: /trash|dumpster|\bbin\b|garbage|recycle|rummage|dispose|waste/i,
  },
  sit: {
    color: '#9ec5ff', svg: 'sit',
    match: /\bsit\b|chair|bench|stool|couch|sofa|lay\s*down|sleep|\brest\b|\bbed\b/i,
  },
  terminal: {
    color: '#40dcf3', svg: 'terminal',
    match: /computer|laptop|terminal|tablet|camera|cctv|radar|scanner|phone|payphone|radio|console|kiosk/i,
  },
  talk: {
    color: '#72e9f3', svg: 'talk',
    match: /talk|speak|chat|\bask\b|greet|quest|mission|\bjob\b|contract|hire|boss|manager|reception/i,
  },
  information: {
    color: '#69a8ff', svg: 'information',
    match: /info|detail|inspect|view|status|read\b|sign\b|board|guide|help|catalog|menu/i,
  },
  items: {
    color: '#70afff', svg: 'items',
    match: /item|inventory|pickup|pick\s*up|collect|\bgive\b|\btake\b|\buse\b|grab|open\b/i,
  },
  parts: {
    color: '#86aaff', svg: 'parts',
    match: /window|bumper|bodywork|suspension|transmission|brake|exhaust|car.part|vehicle.part|gear/i,
  },
  misc: {
    color: '#40dcf3', svg: 'misc',
  },
};

// Map common FontAwesome icon hints to our interactive SVG keys when the label alone is vague
const FA_HINT_MAP = {
  'fa-gun': 'shop_weapons',
  'fa-crosshairs': 'shop_weapons',
  'fa-shirt': 'shop_clothing',
  'fa-tshirt': 'shop_clothing',
  'fa-scissors': 'shop_barber',
  'fa-utensils': 'shop_food',
  'fa-burger': 'shop_food',
  'fa-pizza-slice': 'shop_food',
  'fa-mug-hot': 'shop_drink',
  'fa-coffee': 'shop_drink',
  'fa-martini-glass': 'shop_drink',
  'fa-pills': 'shop_pharmacy',
  'fa-capsules': 'shop_pharmacy',
  'fa-gem': 'shop_jewelry',
  'fa-cart-shopping': 'shop_grocery',
  'fa-shopping-cart': 'shop_grocery',
  'fa-shopping-basket': 'shop_grocery',
  'fa-store': 'salesperson',
  'fa-gas-pump': 'fuel',
  'fa-wrench': 'engine',
  'fa-screwdriver-wrench': 'engine',
  'fa-tools': 'shop_hardware',
  'fa-hammer': 'craft',
  'fa-lock': 'lock',
  'fa-unlock': 'lock',
  'fa-key': 'lock',
  'fa-door-open': 'door_building',
  'fa-door-closed': 'door_building',
  'fa-elevator': 'elevator',
  'fa-building-columns': 'bank',
  'fa-money-bill': 'bank',
  'fa-credit-card': 'bank',
  'fa-receipt': 'receipts',
  'fa-box': 'chest',
  'fa-box-open': 'chest',
  'fa-box-archive': 'stash',
  'fa-vault': 'stash',
  'fa-trash': 'trash',
  'fa-trash-can': 'trash',
  'fa-dumpster': 'trash',
  'fa-couch': 'sit',
  'fa-chair': 'sit',
  'fa-bed': 'sit',
  'fa-desktop': 'terminal',
  'fa-laptop': 'terminal',
  'fa-shield': 'police',
  'fa-shield-halved': 'police',
  'fa-handcuffs': 'police',
  'fa-kit-medical': 'medical',
  'fa-briefcase-medical': 'medical',
  'fa-heart-pulse': 'medical',
  'fa-mask': 'robbery',
  'fa-biohazard': 'zombie',
  'fa-skull': 'zombie',
  'fa-comments': 'talk',
  'fa-comment': 'talk',
  'fa-circle-info': 'information',
  'fa-warehouse': 'garage_in',
};

function buildHaystack(label, classes, data = {}, type = '') {
  const bones = Array.isArray(data.bones) ? data.bones.join(' ') : String(data.bones || '');
  return [
    label,
    data.rsDescription,
    data.description,
    data.name,
    data.event,
    data.serverEvent,
    data.export,
    data.menuName,
    data.shopType,
    data.category,
    bones,
  ]
    .filter(Boolean)
    .join(' ');
}

function matchFromFaClasses(classes) {
  if (!classes) return null;
  const tokens = classes.split(/\s+/);
  for (const t of tokens) {
    if (FA_HINT_MAP[t]) return FA_HINT_MAP[t];
  }
  return null;
}

function resolveTheme(label, classes, data = {}, type = '', usedKeys = null) {
  const explicit = typeof data.rsTheme === 'string' && Object.hasOwn(targetThemes, data.rsTheme)
    ? data.rsTheme
    : null;
  if (explicit) return explicit;

  const haystack = buildHaystack(label, classes, data, type);
  const matches = [];

  for (const [key, theme] of Object.entries(targetThemes)) {
    if (theme.match?.test(haystack)) matches.push(key);
  }

  // If multiple themes matched, pick the most specific one that hasn't already been used on this target
  if (matches.length > 0) {
    if (usedKeys) {
      const fresh = matches.find(k => !usedKeys.has(k));
      if (fresh) return fresh;
    }
    return matches[0];
  }

  // Fallback to FontAwesome semantic hint (maps FA class -> interactive SVG)
  const faMapped = matchFromFaClasses(classes);
  if (faMapped) return faMapped;

  // Entity-type contextual fallback
  if (type === 'vehicles') return 'parts';
  if (type === 'peds') return 'salesperson';
  if (type === 'players') return 'talk';
  return 'misc';
}

export function getPresentation(label, suppliedClasses, data = {}, type = '', usedKeys = null) {
  const key = resolveTheme(label, suppliedClasses, data, type, usedKeys);
  if (usedKeys) usedKeys.add(key);

  const theme = targetThemes[key] || targetThemes.misc;
  const svgMarkup = INTERACTIVE_ICONS[theme.svg] || INTERACTIVE_ICONS.misc;

  return {
    themeKey: key,
    color: theme.color || '#40dcf3',
    svg: svgMarkup,
    icon: suppliedClasses || 'fa-solid fa-bolt',
    description: typeof data.rsDescription === 'string'
      ? data.rsDescription
      : typeof data.description === 'string'
        ? data.description
        : '',
  };
}
