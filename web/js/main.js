import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eye = document.getElementById("eye");
const count = document.getElementById("option-count");
const link = document.getElementById("target-link");
const linkGlow = document.getElementById("link-glow");
const linkLine = document.getElementById("link-line");
const vehicleLinkLayer = document.getElementById("vehicle-pin-lines");
const branchLayer = document.getElementById("target-branches");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let hovered = null;
let frame = 0;
let point = null;
let spatialPins = null;
let spatialEnabled = false;
let spatialEntity = null;
let optionSignature = "";
let vehicleSlots = new Map();
let smoothPins = new Map();
let contactTimer = 0;
let targetLossTimer = 0;

function cancelTargetLoss() {
  clearTimeout(targetLossTimer);
  targetLossTimer = 0;
  body.classList.remove('target-lost');
  optionsWrapper.inert = false;
}

function queueTargetLoss() {
  // Stop interaction immediately, but bridge a single missed ray/update without
  // tearing down the visible list. Releasing the target hotkey still clears now.
  body.classList.add('target-lost');
  optionsWrapper.inert = true;
  if (!targetLossTimer) targetLossTimer = setTimeout(clear, 120);
}

function triggerEyeContact(card) {
  if (!card || card.disabled || reducedMotion.matches) return;
  const bounds = card.getBoundingClientRect();
  eye.dataset.contactSide = bounds.left + bounds.width / 2 < innerWidth / 2 ? 'left' : 'right';
  clearTimeout(contactTimer);
  body.classList.remove('eye-contact');
  // Restart this short response only on a new contact or click, never per frame.
  void eye.offsetWidth;
  body.classList.add('eye-contact');
  contactTimer = setTimeout(() => body.classList.remove('eye-contact'), 900);
}

window.addEventListener('ox-target:contact', ({ detail }) => triggerEyeContact(detail));

function drawBranches() {
  branchLayer.replaceChildren();
  if (spatialEnabled || !optionsWrapper.childElementCount) return;
  const center = eye.getBoundingClientRect();
  const clip = optionsWrapper.getBoundingClientRect();
  const cy = center.top + center.height / 2;
  branchLayer.setAttribute("viewBox", `0 0 ${innerWidth} ${innerHeight}`);
  for (const card of optionsWrapper.children) {
    const bounds = card.getBoundingClientRect();
    const sy = bounds.top + bounds.height / 2;
    if (sy < clip.top || sy > clip.bottom) continue;
    const left = bounds.left + bounds.width / 2 < innerWidth / 2;
    const sx = left ? bounds.right : bounds.left;
    const ex = left ? center.left + 3 : center.right - 3;
    const bend = sx + (ex - sx) * .48;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${sx} ${sy} L ${sx + (left ? 9 : -9)} ${sy} Q ${bend} ${sy} ${bend} ${(sy + cy) / 2} T ${ex} ${cy}`);
    branchLayer.append(path);
  }
}

function drawLink() {
  if (!hovered || !hovered.isConnected) return;
  const card = hovered.getBoundingClientRect();
  const center = eye.getBoundingClientRect();
  const left = card.left + card.width / 2 < center.left + center.width / 2;
  const sx = left ? card.right + 4 : card.left - 4;
  const sy = card.top + card.height / 2;
  const ex = left ? center.left + 10 : center.right - 10;
  const ey = center.top + center.height / 2;
  const dx = ex - sx;
  const path = `M ${sx.toFixed(1)} ${sy.toFixed(1)} C ${(sx + dx * 0.58).toFixed(1)} ${sy.toFixed(1)}, ${(sx + dx * 0.43).toFixed(1)} ${ey.toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  linkGlow.setAttribute("d", path);
  linkLine.setAttribute("d", path);
  link.setAttribute("viewBox", `0 0 ${innerWidth} ${innerHeight}`);
}

// Fixed-screen halo slots keep controls stable while the camera/vehicle moves.
// Only the thin leader lines follow actual car-part world projections.
// This prevents the old per-tick collision solver from swapping action cards.
const cardKey = card => `${card.targetType}/${card.targetId}/${card.zoneId ?? ''}`;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function drawVehicleLines() {
  if (!spatialEnabled) return;
  const center = { x: innerWidth * .5, y: innerHeight * .5 };
  const paths = [];
  for (const card of optionsWrapper.querySelectorAll('.option-container')) {
    const key = cardKey(card);
    const slot = vehicleSlots.get(key);
    if (!slot) continue;
    const target = spatialPins?.[card.targetType]?.[String(card.targetId)];
    const prev = smoothPins.get(key);
    let pin;
    if (target && Number.isFinite(+target.x) && Number.isFinite(+target.y)) {
      const desired = { x: clamp(+target.x, 0, 1) * innerWidth,
                        y: clamp(+target.y, 0, 1) * innerHeight };
      if (prev) {
        const dx = desired.x - prev.x, dy = desired.y - prev.y;
        // Tiny projection changes are ignored; larger movements are filtered.
        const alpha = Math.hypot(dx, dy) < 4 ? 0 : .29;
        pin = { x: prev.x + dx * alpha, y: prev.y + dy * alpha };
      } else pin = desired;
      smoothPins.set(key, pin);
    } else pin = prev || center;
    const bounds = card.getBoundingClientRect();
    const x = clamp(pin.x, bounds.left, bounds.right);
    const y = clamp(pin.y, bounds.top, bounds.bottom);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x.toFixed(1)} ${y.toFixed(1)} L ${pin.x.toFixed(1)} ${pin.y.toFixed(1)}`);
    path.setAttribute('stroke', card.style.getPropertyValue('--option-accent') || '#40dcf3');
    paths.push(path);
  }
  vehicleLinkLayer.replaceChildren(...paths);
  vehicleLinkLayer.setAttribute('viewBox', `0 0 ${innerWidth} ${innerHeight}`);
  drawLink();
}

function layoutVehicleCards() {
  if (!spatialEnabled) return;
  const cards = [...optionsWrapper.querySelectorAll('.option-container')];
  if (!cards.length || cards.length > 16) { disableSpatial(); return; }
  body.classList.add('vehicle-spatial');
  // Calculate positions only when action identities or viewport size change.
  // Existing sides persist when an action briefly becomes out of range.
  const sides = [[], []];
  const carCenter = spatialPins?.__center?.x ?? .5;
  cards.forEach((card, idx) => {
    const key = cardKey(card);
    const old = vehicleSlots.get(key);
    const pin = spatialPins?.[card.targetType]?.[String(card.targetId)];
    const side = old?.side ?? (
      pin && Math.abs(+pin.x - carCenter) > .035
        ? (+pin.x < carCenter ? 0 : 1)
        : (sides[0].length <= sides[1].length ? 0 : 1));
    sides[side].push({ card, key, side, idx });
  });
  // Balance heavily one-sided views without changing card identity order.
  while (Math.abs(sides[0].length - sides[1].length) > 1) {
    const heavy = sides[0].length > sides[1].length ? 0 : 1;
    const move = sides[heavy].pop(); move.side = 1 - heavy;
    sides[1-heavy].push(move);
  }
  const nextSlots = new Map();
  // Read the actual responsive card dimensions so larger labels never overlap.
  const w = cards[0].getBoundingClientRect().width;
  const h = Math.ceil(Math.max(...cards.map(card => card.getBoundingClientRect().height)));
  const gapY = innerHeight < 650 ? 8 : 10;
  if (sides.some(side => side.length * h + Math.max(0, side.length - 1) * gapY > innerHeight - 90)) {
    disableSpatial();
    return;
  }
  const gapX = clamp(innerWidth * .095, 93, 147);
  for (const side of [0, 1]) {
    const arr = sides[side];
    const extent = arr.length * h + Math.max(0, arr.length - 1) * gapY;
    const top = clamp(innerHeight / 2 - extent / 2, 45, Math.max(45, innerHeight - extent - 14));
    const x = side === 0 ? clamp(innerWidth / 2 - gapX - w, 8, innerWidth-w-8)
                         : clamp(innerWidth / 2 + gapX, 8, innerWidth-w-8);
    arr.forEach(({card,key}, n) => {
      const y = top + n * (h + gapY);
      nextSlots.set(key, { x, y, side });
      card.style.left = `${Math.round(x)}px`;
      card.style.top = `${Math.round(y)}px`;
      card.classList.toggle('spatial-left', side === 0);
      card.classList.toggle('spatial-right', side === 1);
    });
  }
  vehicleSlots = nextSlots;
  drawVehicleLines();
}

function disableSpatial() {
  spatialEnabled = false;
  spatialPins = null;
  spatialEntity = null;
  vehicleSlots.clear();
  smoothPins.clear();
  body.classList.remove('vehicle-spatial');
  vehicleLinkLayer.replaceChildren();
  for (const card of optionsWrapper.children) {
    card.style.removeProperty('left'); card.style.removeProperty('top');
    card.classList.remove('spatial-left', 'spatial-right');
  }
}

function setSpatial(pins, enabled, entity, relayout = false) {
  const next = !!(enabled && pins && typeof pins === 'object');
  if (!next) { disableSpatial(); return; }
  const entityChanged = spatialEntity !== entity;
  spatialEntity = entity;
  spatialEnabled = true;
  spatialPins = pins;
  if (entityChanged) { vehicleSlots.clear(); smoothPins.clear(); }
  if (entityChanged || relayout || vehicleSlots.size !== optionsWrapper.childElementCount) layoutVehicleCards();
  else drawVehicleLines();
}

function markActive(card) {
  if (card?.disabled) card = null;
  if (hovered === card) return;
  if (hovered) {
    hovered.classList.remove("option-linked");
    for (const key of ["--tilt-x", "--tilt-y", "--light-x", "--light-y"]) hovered.style.removeProperty(key);
  }
  hovered = card;
  point = null;
  body.classList.toggle("has-selection", !!card);
  if (card) {
    card.classList.add("option-linked");
    body.style.setProperty("--active-accent", card.style.getPropertyValue("--option-accent"));
    drawLink();
    triggerEyeContact(card);
  } else {
    clearTimeout(contactTimer);
    body.classList.remove('eye-contact');
    linkGlow.removeAttribute("d");
    linkLine.removeAttribute("d");
  }
}

function resetHover() {
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  markActive(null);
}

function clear() {
  cancelTargetLoss();
  resetHover();
  disableSpatial();
  if (optionsWrapper.contains(document.activeElement)) document.activeElement.blur();
  optionsWrapper.replaceChildren();
  optionsWrapper.scrollTop = 0;
  body.classList.remove("target-acquired", "has-overflow", "has-more-below", "single-target");
  count.textContent = "00";
  branchLayer.replaceChildren();
  optionSignature = "";
}

function overflow() {
  const canScroll = optionsWrapper.scrollHeight > optionsWrapper.clientHeight + 2;
  body.classList.toggle("has-overflow", canScroll);
  body.classList.toggle("has-more-below", canScroll && optionsWrapper.scrollTop + optionsWrapper.clientHeight < optionsWrapper.scrollHeight - 4);
}

window.addEventListener("message", ({ data }) => {
  if (!data || typeof data !== "object") return;
  switch (data.event) {
    case "visible":
      if (!data.state || !body.classList.contains('targeting-active')) clear();
      body.classList.toggle("targeting-active", !!data.state);
      body.style.visibility = data.state ? "visible" : "hidden";
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
          if (Array.isArray(group)) group.forEach((option, id) => {
            if (!option?.hide) descriptors.push({ type, option, id: id+1 });
          });
        }
      }
      if (Array.isArray(data.zones)) data.zones.forEach((zone, index) => {
        if (Array.isArray(zone)) zone.forEach((option, id) => {
          if (!option?.hide) descriptors.push({ type: 'zones', option, id:id+1, zoneId:index+1 });
        });
      });
      const signature = descriptors.map(d =>
        JSON.stringify([d.type, d.id, d.zoneId, d.option.label, d.option.icon, d.option.iconColor,
          d.option.rsTheme, d.option.rsDescription, d.option.description])).join('|');
      // The compact renderer disables spatial mode, so it cannot be the reuse
      // gate. Matching descriptors retain their exact callback indices and DOM.
      const reuse = optionSignature === signature &&
        optionsWrapper.childElementCount === descriptors.length;
      if (!reuse) {
        clear();
        for (const d of descriptors) createOptions(d.type, d.option, d.id, d.zoneId);
      }
      optionSignature = signature;
      // Only reapply availability flags; do not tear down cards on range changes.
      [...optionsWrapper.children].forEach((card, i) => {
        const preview = !!descriptors[i]?.option?.rsHaloOutOfRange;
        card.dataset.preview = String(preview);
        card.disabled = preview || card.dataset.pending === 'true';
        card.classList.toggle('option-preview', preview);
        card.title = preview ? 'Move closer to interact' : '';
        card.setAttribute('aria-label', preview
          ? `${descriptors[i].option.label} — move closer` : descriptors[i].option.label);
      });
      count.textContent = String(descriptors.length).padStart(2, '0');
      body.classList.toggle('target-acquired', descriptors.length > 0);
      // Normal target layout: all available actions stay in one compact list.
      disableSpatial();
      body.classList.toggle('single-target', descriptors.length === 1 && !spatialEnabled);
      requestAnimationFrame(() => { overflow(); drawBranches(); });
      // Entry transitions finish after layout; refresh decorative leaders once.
      setTimeout(drawBranches, 320);
      break;
    }
    case "vehiclePins":
      if (spatialEnabled) {
        if (data.pins) { spatialPins = data.pins; drawVehicleLines(); }
      }
      break;
  }
});

// A single scheduled animation frame handles pointer movement; no idle JS render loop.
optionsWrapper.addEventListener("pointermove", (event) => {
  const card = event.target.closest(".option-container");
  if (!card) { resetHover(); return; }
  if (hovered !== card) markActive(card);
  if (reducedMotion.matches) return;
  point = { x: event.clientX, y: event.clientY };
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    if (!hovered || !point) return;
    const rect = hovered.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (point.x - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (point.y - rect.top) / rect.height));
    hovered.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
    hovered.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
    hovered.style.setProperty("--light-x", `${x * 100}%`);
    hovered.style.setProperty("--light-y", `${y * 100}%`);
  });
});
optionsWrapper.addEventListener("pointerleave", resetHover);
optionsWrapper.addEventListener("scroll", () => { resetHover(); overflow(); drawBranches(); }, { passive: true });
window.addEventListener("blur", resetHover);
window.addEventListener("resize", () => { overflow(); if (spatialEnabled) layoutVehicleCards(); drawLink(); drawBranches(); });
new ResizeObserver(() => { overflow(); drawBranches(); }).observe(optionsWrapper);
optionsWrapper.addEventListener("focusin", (event) => {
  if (event.target.classList?.contains("option-container")) markActive(event.target);
});
optionsWrapper.addEventListener("focusout", (event) => {
  if (!optionsWrapper.contains(event.relatedTarget)) resetHover();
});

// Keyboard navigation applies only when CEF has focus; Lua keeps the original hotkeys.
optionsWrapper.addEventListener("keydown", (event) => {
  const offset = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -2, ArrowDown: 2 }[event.key];
  if (!offset) return;
  const cards = [...optionsWrapper.children];
  const index = cards.indexOf(document.activeElement);
  if (index < 0) return;
  event.preventDefault();
  cards[(index + offset + cards.length) % cards.length]?.focus();
});
