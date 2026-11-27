import { createOptions } from "./createOptions.js";

const body = document.body;
const eye = document.getElementById("eye");
const optionsWrapper = document.getElementById("options-wrapper");
const countEl = document.getElementById("option-count");
const pageEl = document.getElementById("orbital-page");
const linkSvg = document.getElementById("target-link");
const linkGlow = document.getElementById("link-glow");
const linkLine = document.getElementById("link-line");
const branchSvg = document.getElementById("target-branches");
const canvas = document.getElementById("rs-particles-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const PAGE_SIZE = 8;
let hovered = null;
let pointerFrame = 0;
let pointerPos = null;
let optionSignature = "";
let contactTimer = 0;
let targetLossTimer = 0;
let currentPage = 0;
let totalPages = 1;

/* ============================================================================
   1. LIGHTWEIGHT 3D ORBITAL PARTICLE SYSTEM (ACTIVE ONLY WHILE TARGETING)
   ============================================================================ */
let particleRaf = 0;
let particleLast = 0;
let activeRgb = [64, 220, 243];
const ORBIT_COUNT = 22;
const orbiters = Array.from({ length: ORBIT_COUNT }, (_, i) => ({
  angle: (i / ORBIT_COUNT) * Math.PI * 2 + Math.random() * 0.4,
  speed: (0.45 + Math.random() * 0.65) * (i % 2 ? 1 : -1),
  radius: 36 + Math.random() * 96,
  tilt: (Math.random() - 0.5) * 0.72,
  yOff: (Math.random() - 0.5) * 32,
  size: 1.15 + Math.random() * 1.45,
  phase: Math.random() * Math.PI * 2,
}));
const sparks = [];

function parseHexToRgb(cssColor) {
  const s = String(cssColor || "").trim();
  const m3 = s.match(/^#([0-9a-f]{3})$/i);
  if (m3) {
    return [
      parseInt(m3[1][0] + m3[1][0], 16),
      parseInt(m3[1][1] + m3[1][1], 16),
      parseInt(m3[1][2] + m3[1][2], 16),
    ];
  }
  const m6 = s.match(/^#([0-9a-f]{6})$/i);
  if (m6) {
    return [
      parseInt(m6[1].slice(0, 2), 16),
      parseInt(m6[1].slice(2, 4), 16),
      parseInt(m6[1].slice(4, 6), 16),
    ];
  }
  const mRgb = s.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (mRgb) return [+mRgb[1], +mRgb[2], +mRgb[3]];
  return [64, 220, 243];
}

function spawnSparks(angleRad, count = 8) {
  if (reducedMotion.matches || !ctx) return;
  for (let i = 0; i < count; i++) {
    if (sparks.length > 28) sparks.shift();
    const spread = angleRad + (Math.random() - 0.5) * 0.85;
    const speed = 55 + Math.random() * 95;
    sparks.push({
      x: Math.cos(spread) * 20,
      y: Math.sin(spread) * 20,
      vx: Math.cos(spread) * speed,
      vy: Math.sin(spread) * speed,
      life: 1,
      decay: 1.8 + Math.random() * 1.2,
      size: 1.4 + Math.random() * 1.6,
    });
  }
}

function tickParticles(now) {
  particleRaf = 0;
  if (
    !ctx ||
    reducedMotion.matches ||
    !body.classList.contains("targeting-active") ||
    !body.classList.contains("target-acquired")
  ) {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks.length = 0;
    return;
  }

  const dt = Math.min(0.05, particleLast ? (now - particleLast) / 1000 : 0.016);
  particleLast = now;

  const w = canvas.width;
  const h = canvas.height;
  const cx = w * 0.5;
  const cy = h * 0.5;
  ctx.clearRect(0, 0, w, h);

  const [r, g, b] = activeRgb;

  // 3D orbiting micro-particles around the target core
  for (let i = 0; i < orbiters.length; i++) {
    const p = orbiters[i];
    p.angle += p.speed * dt;
    const x3 = Math.cos(p.angle) * p.radius;
    const z3 = Math.sin(p.angle) * p.radius;
    const y3 = Math.sin(p.angle * 1.5 + p.phase) * 26 + p.yOff + z3 * p.tilt * 0.45;
    const depth = 240 / (240 + z3);
    const sx = cx + x3 * depth;
    const sy = cy + y3 * depth;
    const rad = Math.max(0.7, p.size * depth);
    const alpha = Math.max(0.12, Math.min(0.82, (0.28 + depth * 0.42) * (0.7 + 0.3 * Math.sin(now * 0.004 + p.phase))));

    ctx.beginPath();
    ctx.arc(sx, sy, rad * 2.1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${(alpha * 0.22).toFixed(3)})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sx, sy, rad, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${Math.min(255, r + 60)},${Math.min(255, g + 60)},${Math.min(255, b + 60)},${alpha.toFixed(3)})`;
    ctx.fill();
  }

  // Interactive hover/click energy sparks
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.vx *= 0.94;
    s.vy *= 0.94;
    s.life -= s.decay * dt;
    if (s.life <= 0) {
      sparks.splice(i, 1);
      continue;
    }
    ctx.beginPath();
    ctx.arc(cx + s.x, cy + s.y, s.size * s.life, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${Math.min(255, r + 80)},${Math.min(255, g + 80)},${Math.min(255, b + 80)},${(s.life * 0.9).toFixed(3)})`;
    ctx.fill();
  }

  particleRaf = requestAnimationFrame(tickParticles);
}

function startParticles() {
  if (!ctx || reducedMotion.matches) return;
  if (!particleRaf) {
    particleLast = 0;
    particleRaf = requestAnimationFrame(tickParticles);
  }
}

function stopParticles() {
  if (particleRaf) {
    cancelAnimationFrame(particleRaf);
    particleRaf = 0;
  }
  sparks.length = 0;
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* ============================================================================
   2. COMPACT ROUND 3D ORBITAL LAYOUT (NO OVERLAP, NO SCROLLBARS)
   ============================================================================ */
function getVisibleCards() {
  return [...optionsWrapper.children].filter(el => !el.hidden);
}

function layoutOrbital() {
  const allCards = [...optionsWrapper.children];
  const total = allCards.length;
  if (!total) {
    branchSvg.replaceChildren();
    pageEl.textContent = "";
    pageEl.classList.remove("visible");
    return;
  }

  totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (currentPage >= totalPages) currentPage = 0;
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  allCards.forEach((card, idx) => {
    const visible = idx >= start && idx < end;
    card.hidden = !visible;
    if (!visible) {
      card.classList.remove("orbital-left", "orbital-right", "option-linked");
    }
  });

  if (totalPages > 1) {
    pageEl.textContent = `${currentPage + 1}/${totalPages}`;
    pageEl.classList.add("visible");
  } else {
    pageEl.textContent = "";
    pageEl.classList.remove("visible");
  }

  const cards = getVisibleCards();
  const n = cards.length;
  const cx = innerWidth * 0.5;
  const cy = innerHeight * 0.5;

  // Compact responsive orbital geometry: small like a normal target system
  const scale = Math.max(0.84, Math.min(1.08, innerHeight / 1080));
  const innerClear = Math.round(44 * scale);  // distance from screen center to pill inner edge
  const arcBulge = Math.round(24 * scale);    // circular curve outward at the equator
  const rowStep = Math.round(44 * scale);     // guaranteed vertical clearance (> 36px pill height)

  const rightCards = [];
  const leftCards = [];
  if (n === 1) {
    rightCards.push(cards[0]);
  } else {
    const rightCount = Math.ceil(n / 2);
    cards.forEach((card, i) => {
      if (i < rightCount) rightCards.push(card);
      else leftCards.push(card);
    });
  }

  const placeArc = (list, side) => {
    const count = list.length;
    if (!count) return;
    const maxSpan = (count - 1) * rowStep;
    const yStart = -maxSpan / 2;

    list.forEach((card, i) => {
      const yOff = count === 1 ? 0 : yStart + i * rowStep;
      // Normalized vertical position [-1, 1] -> circular horizontal curve cos(theta)
      const norm = count === 1 ? 0 : (i / (count - 1)) * 2 - 1;
      const curve = Math.sqrt(Math.max(0, 1 - norm * norm * 0.72));
      const xEdge = innerClear + arcBulge * curve;

      card.classList.toggle("orbital-right", side === "right");
      card.classList.toggle("orbital-left", side === "left");

      // Anchor pill from its inner edge (closest to the center eye) so varying widths stay perfectly symmetric
      const yPx = Math.round(cy + yOff);
      if (side === "right") {
        card.style.left = `${Math.round(cx + xEdge)}px`;
        card.style.right = "auto";
      } else {
        card.style.right = `${Math.round(innerWidth - (cx - xEdge))}px`;
        card.style.left = "auto";
      }
      card.style.top = `${yPx}px`;
      card.dataset.orbitSide = side;
      card.dataset.orbitAngle = String(Math.atan2(yOff, side === "right" ? xEdge : -xEdge));
    });
  };

  placeArc(rightCards, "right");
  placeArc(leftCards, "left");

  requestAnimationFrame(drawBranches);
}

function drawBranches() {
  branchSvg.replaceChildren();
  const cards = getVisibleCards();
  if (!cards.length || !body.classList.contains("target-acquired")) return;

  const eyeRect = eye.getBoundingClientRect();
  const cx = eyeRect.left + eyeRect.width / 2;
  const cy = eyeRect.top + eyeRect.height / 2;
  const rEye = eyeRect.width * 0.52;

  branchSvg.setAttribute("viewBox", `0 0 ${innerWidth} ${innerHeight}`);
  const frag = document.createDocumentFragment();

  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const isLeft = card.dataset.orbitSide === "left";
    const px = isLeft ? rect.right - 2 : rect.left + 2;
    const py = rect.top + rect.height / 2;
    const angle = Math.atan2(py - cy, px - cx);
    const ex = cx + Math.cos(angle) * rEye;
    const ey = cy + Math.sin(angle) * rEye;
    const mx = (ex + px) * 0.5;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${ex.toFixed(1)} ${ey.toFixed(1)} Q ${mx.toFixed(1)} ${ey.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)}`);
    path.setAttribute("stroke", card.style.getPropertyValue("--option-accent") || "#40dcf3");
    frag.appendChild(path);
  }
  branchSvg.appendChild(frag);
}

function drawLink() {
  if (!hovered || !hovered.isConnected || hovered.hidden) {
    linkGlow.removeAttribute("d");
    linkLine.removeAttribute("d");
    return;
  }
  const rect = hovered.getBoundingClientRect();
  const eyeRect = eye.getBoundingClientRect();
  const cx = eyeRect.left + eyeRect.width / 2;
  const cy = eyeRect.top + eyeRect.height / 2;
  const isLeft = hovered.dataset.orbitSide === "left";
  const px = isLeft ? rect.right - 2 : rect.left + 2;
  const py = rect.top + rect.height / 2;
  const angle = Math.atan2(py - cy, px - cx);
  const ex = cx + Math.cos(angle) * (eyeRect.width * 0.5);
  const ey = cy + Math.sin(angle) * (eyeRect.height * 0.5);
  const mx = (ex + px) * 0.5;
  const d = `M ${ex.toFixed(1)} ${ey.toFixed(1)} Q ${mx.toFixed(1)} ${ey.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)}`;

  linkGlow.setAttribute("d", d);
  linkLine.setAttribute("d", d);
  linkSvg.setAttribute("viewBox", `0 0 ${innerWidth} ${innerHeight}`);
}

/* ============================================================================
   3. INTERACTIVE 3D TILT, EYE TRACKING & TARGET LIFECYCLE
   ============================================================================ */
function cancelTargetLoss() {
  clearTimeout(targetLossTimer);
  targetLossTimer = 0;
  body.classList.remove("target-lost");
  optionsWrapper.inert = false;
}

function queueTargetLoss() {
  body.classList.add("target-lost");
  optionsWrapper.inert = true;
  if (!targetLossTimer) targetLossTimer = setTimeout(clear, 110);
}

function triggerEyeContact(card, burst = false) {
  if (!card || card.disabled || reducedMotion.matches) return;
  const angle = Number(card.dataset.orbitAngle) || 0;
  spawnSparks(angle, burst ? 12 : 5);
  clearTimeout(contactTimer);
  body.classList.remove("eye-contact");
  void eye.offsetWidth;
  body.classList.add("eye-contact");
  contactTimer = setTimeout(() => body.classList.remove("eye-contact"), 650);
}

window.addEventListener("ox-target:contact", ({ detail }) => {
  if (detail?.card) triggerEyeContact(detail.card, !!detail.burst);
});

function markActive(card) {
  if (card?.disabled || card?.hidden) card = null;
  if (hovered === card) return;

  if (hovered) {
    hovered.classList.remove("option-linked");
    for (const k of ["--tilt-x", "--tilt-y", "--light-x", "--light-y"]) {
      hovered.style.removeProperty(k);
    }
  }

  hovered = card;
  pointerPos = null;
  body.classList.toggle("has-selection", !!card);

  if (card) {
    card.classList.add("option-linked");
    const accent = card.style.getPropertyValue("--option-accent") || "#40dcf3";
    body.style.setProperty("--active-accent", accent);
    activeRgb = parseHexToRgb(accent);

    // Subtle 3D gimbal tilt of the center eye toward the hovered orbital pill
    const angle = Number(card.dataset.orbitAngle) || 0;
    eye.style.setProperty("--eye-tilt-x", `${(-Math.sin(angle) * 10).toFixed(1)}deg`);
    eye.style.setProperty("--eye-tilt-y", `${(Math.cos(angle) * 12).toFixed(1)}deg`);

    drawLink();
    triggerEyeContact(card, false);
  } else {
    clearTimeout(contactTimer);
    body.classList.remove("eye-contact");
    body.style.setProperty("--active-accent", "#40dcf3");
    activeRgb = [64, 220, 243];
    eye.style.removeProperty("--eye-tilt-x");
    eye.style.removeProperty("--eye-tilt-y");
    linkGlow.removeAttribute("d");
    linkLine.removeAttribute("d");
  }
}

function resetHover() {
  if (pointerFrame) cancelAnimationFrame(pointerFrame);
  pointerFrame = 0;
  markActive(null);
}

function clear() {
  cancelTargetLoss();
  resetHover();
  stopParticles();
  if (optionsWrapper.contains(document.activeElement)) document.activeElement.blur();
  optionsWrapper.replaceChildren();
  body.classList.remove("target-acquired", "single-target");
  countEl.textContent = "00";
  pageEl.textContent = "";
  pageEl.classList.remove("visible");
  branchSvg.replaceChildren();
  optionSignature = "";
  currentPage = 0;
  totalPages = 1;
}

/* ============================================================================
   4. NUI MESSAGE HANDLER (PRESERVES FULL OX_TARGET CONTRACT)
   ============================================================================ */
window.addEventListener("message", ({ data }) => {
  if (!data || typeof data !== "object") return;

  switch (data.event) {
    case "visible":
      if (!data.state || !body.classList.contains("targeting-active")) clear();
      body.classList.toggle("targeting-active", !!data.state);
      body.style.visibility = data.state ? "visible" : "hidden";
      if (!data.state) stopParticles();
      break;

    case "leftTarget":
      queueTargetLoss();
      break;

    case "setTarget": {
      cancelTargetLoss();
      const descriptors = [];
      if (data.options) {
        for (const type of Object.keys(data.options)) {
          const group = data.options[type];
          if (Array.isArray(group)) {
            group.forEach((option, id) => {
              if (!option?.hide) descriptors.push({ type, option, id: id + 1 });
            });
          }
        }
      }
      if (Array.isArray(data.zones)) {
        data.zones.forEach((zone, index) => {
          if (Array.isArray(zone)) {
            zone.forEach((option, id) => {
              if (!option?.hide) descriptors.push({ type: "zones", option, id: id + 1, zoneId: index + 1 });
            });
          }
        });
      }

      const signature = descriptors
        .map(d => JSON.stringify([
          d.type, d.id, d.zoneId, d.option.label, d.option.icon,
          d.option.iconColor, d.option.rsTheme, d.option.rsDescription, d.option.description,
        ]))
        .join("|");

      const reuse = optionSignature === signature && optionsWrapper.childElementCount === descriptors.length;
      if (!reuse) {
        clear();
        const usedKeys = new Set();
        for (const d of descriptors) createOptions(d.type, d.option, d.id, d.zoneId, usedKeys);
      }
      optionSignature = signature;

      [...optionsWrapper.children].forEach((card, i) => {
        const preview = !!descriptors[i]?.option?.rsHaloOutOfRange;
        card.dataset.preview = String(preview);
        card.disabled = preview || card.dataset.pending === "true";
        card.classList.toggle("option-preview", preview);
        card.title = preview ? "Move closer to interact" : "";
        card.setAttribute(
          "aria-label",
          preview ? `${descriptors[i].option.label} — move closer` : descriptors[i].option.label
        );
      });

      countEl.textContent = String(descriptors.length).padStart(2, "0");
      const acquired = descriptors.length > 0;
      body.classList.toggle("target-acquired", acquired);
      body.classList.toggle("single-target", descriptors.length === 1);

      if (acquired) {
        layoutOrbital();
        startParticles();
      } else {
        stopParticles();
      }
      break;
    }

    case "vehiclePins":
      // Orbital layout stays rock-steady around the center reticle so cards never jump or stretch.
      break;
  }
});

/* ============================================================================
   5. POINTER, MOUSE-WHEEL PAGING & KEYBOARD EVENTS
   ============================================================================ */
optionsWrapper.addEventListener("pointermove", (event) => {
  const card = event.target.closest(".option-container");
  if (!card || card.hidden) { resetHover(); return; }
  if (hovered !== card) markActive(card);
  if (reducedMotion.matches) return;

  pointerPos = { x: event.clientX, y: event.clientY };
  if (pointerFrame) return;
  pointerFrame = requestAnimationFrame(() => {
    pointerFrame = 0;
    if (!hovered || !pointerPos) return;
    const rect = hovered.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (pointerPos.x - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (pointerPos.y - rect.top) / rect.height));
    hovered.style.setProperty("--tilt-x", `${((0.5 - y) * 9).toFixed(2)}deg`);
    hovered.style.setProperty("--tilt-y", `${((x - 0.5) * 11).toFixed(2)}deg`);
    hovered.style.setProperty("--light-x", `${(x * 100).toFixed(1)}%`);
    hovered.style.setProperty("--light-y", `${(y * 100).toFixed(1)}%`);
  });
});

optionsWrapper.addEventListener("pointerleave", resetHover);

// Mouse-wheel cycles orbital pages cleanly when >8 actions exist (zero scrollbars)
window.addEventListener("wheel", (event) => {
  if (totalPages <= 1 || !body.classList.contains("target-acquired")) return;
  if (Math.abs(event.deltaY) < 4) return;
  resetHover();
  currentPage = (currentPage + (event.deltaY > 0 ? 1 : -1) + totalPages) % totalPages;
  layoutOrbital();
}, { passive: true });

window.addEventListener("blur", resetHover);
window.addEventListener("resize", () => {
  if (body.classList.contains("target-acquired")) {
    layoutOrbital();
    drawLink();
  }
});

optionsWrapper.addEventListener("focusin", (event) => {
  if (event.target.classList?.contains("option-container")) markActive(event.target);
});
optionsWrapper.addEventListener("focusout", (event) => {
  if (!optionsWrapper.contains(event.relatedTarget)) resetHover();
});

optionsWrapper.addEventListener("keydown", (event) => {
  const offset = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -1, ArrowDown: 1 }[event.key];
  if (!offset) return;
  const cards = getVisibleCards();
  const index = cards.indexOf(document.activeElement);
  if (index < 0 || !cards.length) return;
  event.preventDefault();
  cards[(index + offset + cards.length) % cards.length]?.focus();
});
