(function () {
  "use strict";

  const desktop = window.matchMedia("(min-width: 901px)");
  let scheduled = false;

  function exactText(element, text) {
    return element.textContent.replace(/\s+/g, " ").trim() === text;
  }

  function controls(text) {
    return Array.from(document.querySelectorAll("button, a, [role='button']"))
      .filter((element) => exactText(element, text));
  }

  function originalLogoutButtons() {
    return controls("Uitloggen")
      .filter((element) => !element.classList.contains("desktop-nav-logout-v2"));
  }

  function navigationContainer() {
    const chords = controls("Akkoorden")[0];
    const compose = controls("Zelf samenstellen")[0];
    if (!chords || !compose) return null;

    let container = chords.parentElement;
    while (container && !container.contains(compose)) {
      container = container.parentElement;
    }
    return container && container !== document.body ? container : null;
  }

  function restoreOriginals() {
    originalLogoutButtons().forEach((button) => {
      if (button.dataset.desktopLogoutHidden === "true") {
        button.style.display = button.dataset.desktopLogoutDisplay || "";
        delete button.dataset.desktopLogoutHidden;
        delete button.dataset.desktopLogoutDisplay;
      }
    });
  }

  function update() {
    scheduled = false;
    const existing = document.querySelector(".desktop-nav-logout-v2");

    if (!desktop.matches) {
      existing?.remove();
      restoreOriginals();
      return;
    }

    const navigation = navigationContainer();
    const originals = originalLogoutButtons();
    if (!navigation || originals.length === 0) return;

    let topButton = existing;
    if (!topButton || topButton.parentElement !== navigation) {
      topButton?.remove();
      topButton = document.createElement("button");
      topButton.type = "button";
      topButton.className = "desktop-nav-logout-v2";
      topButton.textContent = "Uitloggen";
      topButton.addEventListener("click", () => originalLogoutButtons()[0]?.click());
      navigation.appendChild(topButton);
    }

    originals.forEach((button) => {
      if (button.dataset.desktopLogoutHidden !== "true") {
        button.dataset.desktopLogoutDisplay = button.style.display || "";
        button.dataset.desktopLogoutHidden = "true";
      }
      button.style.display = "none";
    });
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  }

  document.addEventListener("DOMContentLoaded", schedule);
  desktop.addEventListener("change", schedule);
  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
