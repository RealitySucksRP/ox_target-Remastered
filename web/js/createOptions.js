import { fetchNui } from "./fetchNui.js";
import { getPresentation } from "./themes.js";

const optionsWrapper = document.getElementById("options-wrapper");
const themes = ["#40dcf3", "#c688ef", "#51e0b2", "#ffc46d", "#ff6f91", "#7eaefe"];

// Differentiates vehicle-part actions without requiring any resource to change
// its registered options. Explicit iconColor still has highest precedence.
function actionColor(label, classes, sequence) {
  const value = `${label} ${classes}`.toLowerCase();
  if (/trunk|boot|stash|storage|inventory|luggage|box|ramp/.test(value)) return "#ffc46d";
  if (/lock|alarm|security/.test(value)) return "#ff6f91";
  if (/hood|bonnet|engine|repair|mechanic/.test(value)) return "#51e0b2";
  if (/door|seat|passenger|driver/.test(value)) return "#c688ef";
  if (/vehicle|car|garage|park|retrieve/.test(value)) return "#40dcf3";
  if (/info|inspect|view|status/.test(value)) return "#7eaefe";
  return themes[sequence % themes.length];
}

function fallbackIcon(label) {
  if (/lift|elevator|upstairs/i.test(label)) return "fa-solid fa-arrow-up";
  if (/receipt|invoice|bill/i.test(label)) return "fa-solid fa-receipt";
  if (/store|park|garage/i.test(label)) return "fa-solid fa-warehouse";
  if (/car|vehicle|drive/i.test(label)) return "fa-solid fa-car";
  if (/door|enter|exit|unlock|lock/i.test(label)) return "fa-solid fa-door-open";
  if (/bank|money|pay|cash/i.test(label)) return "fa-solid fa-wallet";
  if (/heal|medic|health|treat/i.test(label)) return "fa-solid fa-kit-medical";
  if (/search|inspect|view/i.test(label)) return "fa-solid fa-magnifying-glass";
  if (/back|return/i.test(label)) return "fa-solid fa-arrow-left";
  return "fa-solid fa-hand-pointer";
}

async function onClick() {
  if (this.disabled || this.dataset.pending === "true"
      || document.body.classList.contains('target-lost')
      || !document.body.classList.contains('targeting-active')) return;
  window.dispatchEvent(new CustomEvent("ox-target:contact", { detail: this }));
  this.dataset.pending = "true";
  this.classList.add("option-pressed");
  this.disabled = true;
  // Preserve ox_target's exact NUI select contract: type, one-based option index, zone index.
  try {
    await fetchNui("select", [this.targetType, this.targetId, this.zoneId]);
  } catch (error) {
    console.error("[ox_target] Selection request failed", error);
  } finally {
    // A menu update can replace this button before its callback resolves.
    setTimeout(() => {
      this.disabled = this.dataset.preview === 'true';
      delete this.dataset.pending;
      this.classList.remove("option-pressed");
    }, 140);
  }
}

export function createOptions(type, data, id, zoneId) {
  if (!data || data.hide) return;

  const sequence = optionsWrapper.childElementCount;
  const option = document.createElement("button");
  option.type = "button";
  option.className = "option-container";
  option.dataset.index = String(sequence + 1).padStart(2, "0");
  option.targetType = type;
  option.targetId = id;
  option.zoneId = zoneId;

  const label = String(data.label ?? "Interact");
  const icon = document.createElement("i");
  // The source can specify Font Awesome classes, not arbitrary HTML/CSS injection.
  const supplied = typeof data.icon === "string"
    ? data.icon.split(/\s+/).filter(value => /^(fa[srlbd]?|fa-[a-z0-9-]+)$/.test(value)).join(" ")
    : "";
  const presentation = getPresentation(label, supplied, data);
  const classes = supplied || presentation.icon || fallbackIcon(label);
  // Theme artwork stays inside this resource, even for owner-added entries.
  if (typeof presentation.art === "string" && /^[a-z0-9_-]+$/i.test(presentation.art)) {
    option.dataset.art = presentation.art;
    option.style.setProperty("--option-art", `url("assets/${presentation.art}.webp")`);
  }
  const hasStyle = /(?:^|\s)(?:fa|fas|far|fal|fab|fad|fa-solid|fa-regular|fa-brands|fa-light|fa-duotone)(?:\s|$)/.test(classes);
  icon.className = `option-icon fa-fw ${hasStyle ? "" : "fa-solid "}${classes}`;
  icon.setAttribute("aria-hidden", "true");

  const customColor = typeof data.iconColor === "string" && CSS.supports("color", data.iconColor);
  const color = customColor ? data.iconColor : presentation.color || actionColor(label, classes, sequence);
  option.style.setProperty("--option-accent", color);
  option.style.setProperty("--entry-delay", `${Math.min(sequence, 9) * 26}ms`);

  const copy = document.createElement("span"); copy.className = "option-copy";
  const text = document.createElement("span"); text.className = "option-label"; text.textContent = label;
  const number = document.createElement("span"); number.className = "option-number"; number.textContent = option.dataset.index;
  copy.append(number, text);
  const description = presentation.description;
  if (description) {
    const subtitle = document.createElement("span");
    subtitle.className = "option-description";
    subtitle.textContent = description;
    copy.append(subtitle);
  }

  const art = document.createElement("span"); art.className = "option-art"; art.setAttribute("aria-hidden", "true");
  const badge = document.createElement("span"); badge.className = "option-badge"; badge.append(icon);
  const edge = document.createElement("span"); edge.className = "option-edge"; edge.setAttribute("aria-hidden", "true");
  const connector = document.createElement("span"); connector.className = "option-connector"; connector.setAttribute("aria-hidden", "true");
  const pip = document.createElement("span"); pip.className = "option-pip"; connector.append(pip);
  const arrow = document.createElement("span"); arrow.className = "option-arrow"; arrow.setAttribute("aria-hidden", "true");
  option.append(art, copy, badge, edge, connector, arrow);
  option.addEventListener("click", onClick);
  optionsWrapper.appendChild(option);
}
