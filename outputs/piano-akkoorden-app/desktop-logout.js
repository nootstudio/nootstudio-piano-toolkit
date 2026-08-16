(function () {
  "use strict";

  const desktopQuery = window.matchMedia("(min-width: 901px)");
  let updateQueued = false;

  function hasExactText(element, text) {
    return element.textContent.replace(/\s+/g, " ").trim() === text;
  }

  function findControls(text) {
    return Array.from(document.querySelectorAll("button, a, [role='button']"))
      .filter((element) => hasExactText(element, text));
  }

  function findOriginalLogoutControls() {
    return findControls("Uitloggen")
      .filter((element) => !element.classList.contains("desktop-top-logout"));
  }

  function findMenuContainer() {
    const chordsTab = findControls("Akkoorden")[0];
    const composeTab = findControls("Zelf samenstellen")[0];

    if (!chordsTab || !composeTab) return null;

    let container = chordsTab;
    while (container && !container.contains(composeTab)) {
      container = container.parentElement;
    }

    return container && container !== document.body ? container : null;
  }

  function restoreOriginalControls() {
    findOriginalLogoutControls().forEach((control) => {
      if (Object.prototype.hasOwnProperty.call(control.dataset, "desktopLogoutDisplay")) {
        control.style.display = control.dataset.desktopLogoutDisplay;
        delete control.dataset.desktopLogoutDisplay;
      }
    });
  }

  function hideOriginalControls() {
    findOriginalLogoutControls().forEach((control) => {
      if (!Object.prototype.hasOwnProperty.call(control.dataset, "desktopLogoutDisplay")) {
        control.dataset.desktopLogoutDisplay = control.style.display || "";
      }
      control.style.display = "none";
    });
  }

  function createTopLogout(container) {
    let button = document.querySelector(".desktop-top-logout");
    if (button && button.parentElement !== container) button.remove();

    button = document.querySelector(".desktop-top-logout");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "desktop-top-logout";
      button.textContent = "Uitloggen";
      button.addEventListener("click", () => {
        const original = findOriginalLogoutControls()[0];
        if (original) original.click();
      });
      container.appendChild(button);
    }
  }

  function updateLogoutPosition() {
    updateQueued = false;

    if (!desktopQuery.matches) {
      document.querySelector(".desktop-top-logout")?.remove();
      restoreOriginalControls();
      return;
    }

    const container = findMenuContainer();
    const originals = findOriginalLogoutControls();
    if (!container || originals.length === 0) return;

    createTopLogout(container);
    hideOriginalControls();
  }

  function scheduleUpdate() {
    if (updateQueued) return;
    updateQueued = true;
    window.requestAnimationFrame(updateLogoutPosition);
  }

  document.addEventListener("DOMContentLoaded", scheduleUpdate);
  desktopQuery.addEventListener("change", scheduleUpdate);
  new MutationObserver(scheduleUpdate).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
