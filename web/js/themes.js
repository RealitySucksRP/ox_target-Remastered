// SERVER OWNER THEME LIBRARY
// Add an entry here and place its .webp artwork in web/assets/.
// Use rsTheme = 'yourTheme' on a target option to choose it explicitly.
// Optional rsDescription overrides the subtitle. iconColor still wins over color.
// Automatic matches run in this file's order; misc is the fallback.
export const targetThemes = {
  retrieve: {
    color: '#29e6ff', art: 'retrieve', icon: 'fa-solid fa-car', description: 'Get your stored vehicle',
    match: /retrieve|take out|call.*(?:vehicle|car)|deliver.*(?:vehicle|car)/i,
  },
  visit: {
    color: '#de7aff', art: 'visit', icon: 'fa-solid fa-users-rectangle', description: 'Enter your private garage',
    match: /(?:visit|enter|private).*garage|garage.*(?:visit|enter)/i,
  },
  elevator: {
    color: '#37efb7', art: 'elevator', icon: 'fa-solid fa-arrow-up', description: 'Bring the lift to this floor',
    match: /lift|elevator|upstairs/i,
  },
  receipts: {
    color: '#ffc25e', art: 'receipts', icon: 'fa-solid fa-receipt', description: 'View recent transactions',
    match: /receipt|invoice|bill\b/i,
  },
  information: {
    color: '#69a8ff', art: 'information', icon: 'fa-solid fa-circle-info', description: 'Details and available slots',
    match: /(?:garage|parking).*(?:info|detail)|(?:info|detail).*(?:garage|parking)/i,
  },
  store: {
    color: '#ff6685', art: 'store', icon: 'fa-solid fa-warehouse', description: 'Park your current vehicle',
    match: /(?:store|park).*(?:vehicle|car)|(?:vehicle|car).*(?:store|park)/i,
  },
  robbery: {
    color: '#ff765d', art: 'robbery', icon: 'fa-solid fa-mask',
    match: /\brob\b|robbery|hold.?up|heist|steal|burgl|\bmug\b|fa-mask|fa-sack-dollar/i,
  },
  medical: {
    color: '#49edce', art: 'medical', icon: 'fa-solid fa-kit-medical',
    match: /medic|heal|reviv|bandag|treat|first.?aid|ambulance|stretcher|hospital|\bcpr\b|defib|diagnos|fa-heart-pulse|fa-kit-medical|fa-briefcase-medical/i,
  },
  engine: {
    color: '#4aefb7', art: 'engine', icon: 'fa-solid fa-screwdriver-wrench',
    match: /engine|hood|bonnet|repair|mechanic|radiator|turbo|tuning|\boil\b|fa-oil-can|fa-screwdriver-wrench/i,
  },
  parts: {
    color: '#86aaff', art: 'parts', icon: 'fa-solid fa-gears',
    match: /tyre|tire|wheel|door|seat|passenger|driver|window|bumper|bodywork|suspension|transmission|brake|exhaust|car.part|vehicle.part/i,
  },
  stash: {
    color: '#42dfac', art: 'stash', icon: 'fa-solid fa-box-archive', description: 'Access your stored items',
    match: /stash|storage|locker|trunk|\bboot\b|luggage|glovebox|glove.?compartment|fa-box-archive/i,
  },
  chest: {
    color: '#ffc163', art: 'chest', icon: 'fa-solid fa-box-open',
    match: /chest|treasure|crate|strongbox|fa-box-open/i,
  },
  items: {
    color: '#70afff', art: 'items', icon: 'fa-solid fa-box',
    match: /item|inventory|pickup|pick up|collect|\bgive\b|\btake\b|\buse\b|craft|shop|purchase|\bbuy\b|\bsell\b|fa-box|fa-bag-shopping/i,
  },
  misc: { color: '#c894ff', art: 'misc' },
};

export function getPresentation(label, classes, data) {
  const explicit = typeof data.rsTheme === 'string' && Object.hasOwn(targetThemes, data.rsTheme)
    ? targetThemes[data.rsTheme] : null;
  const theme = explicit || Object.values(targetThemes).find(theme => theme.match?.test(`${label} ${classes}`))
    || targetThemes.misc;
  return {
    ...theme,
    description: typeof data.rsDescription === 'string' ? data.rsDescription
      : typeof data.description === 'string' ? data.description
      : theme === targetThemes.retrieve && /call|deliver/i.test(label)
        ? 'Have your vehicle brought to you' : theme.description,
  };
}
