import { fetchNui } from "./fetchNui.js";
import { getPresentation } from "./themes.js";

const optionsWrapper = document.getElementById("options-wrapper");

async function onClick() {
  if (
    this.disabled ||
    this.dataset.pending === "true" ||
    document.body.classList.contains("target-lost") ||
    !document.body.classList.contains("targeting-active")
  ) return;

  window.dispatchEvent(new CustomEvent("ox-target:contact", { detail: { card: this, burst: true } }));
  this.dataset.pending = "true";
  this.setAttribute("aria-busy", "true");
  this.classList.add("option-pressed");
  this.disabled = true;

  // Preserve ox_target's exact NUI select contract: [type, 1-based option id, zone index]
  try {
    await fetchNui("select", [this.targetType, this.targetId, this.zoneId]);
  } catch (error) {
    console.error("[ox_target] Selection request failed", error);
  } finally {
    setTimeout(() => {
      this.disabled = this.dataset.preview === "true";
      delete this.dataset.pending;
      this.removeAttribute("aria-busy");
      this.classList.remove("option-pressed");
    }, 150);
  }
}

export function createOptions(type, data, id, zoneId, usedKeys = null) {
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
  const supplied = typeof data.icon === "string"
    ? data.icon.split(/\s+/).filter(v => /^(fa[srlbd]?|fa-[a-z0-9-]+)$/.test(v)).join(" ")
    : "";

  const presentation = getPresentation(label, supplied, data, type, usedKeys);
  option.dataset.theme = presentation.themeKey;
  option.dataset.targetType = String(type || "");

  const customColor = typeof data.iconColor === "string" && CSS.supports("color", data.iconColor);
  const color = customColor ? data.iconColor : presentation.color;
  option.style.setProperty("--option-accent", color);
  option.style.setProperty("--entry-delay", `${Math.min(sequence, 7) * 24}ms`);

  // Perfectly circular 1:1 3D icon pod (zero squished images)
  const pod = document.createElement("span");
  pod.className = "option-badge";
  pod.setAttribute("aria-hidden", "true");

  if (presentation.svg) {
    pod.innerHTML = presentation.svg;
  } else {
    const icon = document.createElement("i");
    const classes = presentation.icon || "fa-solid fa-bolt";
    const hasStyle = /(?:^|\s)(?:fa|fas|far|fal|fab|fad|fa-solid|fa-regular|fa-brands|fa-light|fa-duotone)(?:\s|$)/.test(classes);
    icon.className = `option-icon fa-fw ${hasStyle ? "" : "fa-solid "}${classes}`;
    pod.append(icon);
  }

  const copy = document.createElement("span");
  copy.className = "option-copy";
  const text = document.createElement("span");
  text.className = "option-label";
  text.textContent = label;
  copy.append(text);

  if (presentation.description) {
    const sub = document.createElement("span");
    sub.className = "option-description";
    sub.textContent = presentation.description;
    copy.append(sub);
  }

  const sheen = document.createElement("span");
  sheen.className = "option-sheen";
  sheen.setAttribute("aria-hidden", "true");

  option.append(pod, copy, sheen);
  option.addEventListener("click", onClick);
  optionsWrapper.appendChild(option);
}
