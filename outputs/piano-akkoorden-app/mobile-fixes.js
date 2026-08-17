(function initNootstudioMobileFixes() {
  const mobileMedia = window.matchMedia("(max-width: 900px), (pointer: coarse)");
  const strictMobileMedia = window.matchMedia("(max-width: 900px)");
  const hideTimers = new WeakMap();

  const playerSelector = [
    ".scale-video-player",
    ".scale-video",
    ".scale-video-shell",
    ".scale-video-wrap",
    ".scale-video-frame",
    ".scale-video-card",
    ".nootstudio-video-player",
    ".nootstudio-video",
    ".ns-video-player",
    ".video-player",
    ".video-shell",
    ".video-card"
  ].join(",");

  function asElement(target) {
    return target instanceof Element ? target : null;
  }

  function isMobileEvent(event) {
    return mobileMedia.matches || event?.pointerType === "touch" || event?.type === "touchend";
  }

  function videoPlayerFor(video) {
    return video.closest(playerSelector) || video.parentElement;
  }

  function clearTimer(player) {
    const timer = hideTimers.get(player);
    if (timer) window.clearTimeout(timer);
  }

  function showControls(player) {
    if (!player) return;
    player.classList.remove("ns-video-clean-playing");
    player.classList.add("ns-video-controls-visible");
  }

  function hideControls(player) {
    if (!player) return;
    player.classList.remove("controls-visible", "ns-video-controls-visible", "ns-mobile-video-controls-visible");
    player.classList.add("ns-video-clean-playing");
  }

  function scheduleHide(player, delay = 1300) {
    if (!player) return;
    clearTimer(player);
    hideTimers.set(player, window.setTimeout(() => hideControls(player), delay));
  }

  async function playFromTap(video) {
    const player = videoPlayerFor(video);
    player?.classList.add("ns-touch-video-player", "ns-video-has-started");

    try {
      await video.play();
      clearTimer(player);
      hideControls(player);
    } catch (error) {
      console.warn("Nootstudio video kon niet direct starten", error);
      showControls(player);
    }
  }

  function bindVideo(video) {
    if (video.dataset.nsOneTapVideoBound === "true") return;

    const player = videoPlayerFor(video);
    if (!player) return;

    video.dataset.nsOneTapVideoBound = "true";
    player.classList.add("ns-touch-video-player");

    const handleTap = (event) => {
      if (!isMobileEvent(event)) return;

      const target = asElement(event.target);
      if (target?.closest(".scale-video-big-play")) {
        event.preventDefault();
        event.stopPropagation();
        if (video.paused || video.ended) {
          playFromTap(video);
        } else {
          clearTimer(player);
          hideControls(player);
        }
        return;
      }
      const control = target?.closest(
        "a,input,select,textarea,button,.scale-video-controls,.nootstudio-video-controls,.ns-video-controls,.video-controls,[data-video-controls],[data-video-control]"
      );
      if (control && player.contains(control)) {
        clearTimer(player);
        showControls(player);
        return;
      }

      if (video.paused) {
        event.preventDefault();
        event.stopPropagation();
        playFromTap(video);
        return;
      }

      showControls(player);
      clearTimer(player);
    };

    player.addEventListener("pointerup", handleTap, { capture: true });
    player.addEventListener("click", handleTap, { capture: true });
    player.addEventListener("touchend", handleTap, { capture: true, passive: false });

    video.addEventListener("play", () => {
      player.classList.add("ns-video-has-started");
      clearTimer(player);
      hideControls(player);
      window.requestAnimationFrame(() => hideControls(player));
      window.setTimeout(() => hideControls(player), 0);
    });

    video.addEventListener("pause", () => {
      clearTimer(player);
      showControls(player);
    });

    video.addEventListener("ended", () => {
      clearTimer(player);
      showControls(player);
    });

    player.addEventListener("pointermove", () => {
      if (strictMobileMedia.matches) return;
      if (video.paused) return;
      showControls(player);
      scheduleHide(player, 1100);
    });

    player.addEventListener("pointerleave", () => {
      if (video.paused) return;
      clearTimer(player);
      hideControls(player);
    });
  }

  function bindVideos() {
    document.querySelectorAll("video").forEach(bindVideo);
  }

  function normalizedText(element) {
    return (element.textContent || "").replace(/\s+/g, " ").trim();
  }

  function controlsByText(label) {
    return Array.from(document.querySelectorAll("button,a,[role='button']"))
      .filter((element) => normalizedText(element) === label);
  }

  function lastControl(label) {
    return controlsByText(label).at(-1);
  }

  function commonAncestor(nodes) {
    if (!nodes.length) return null;

    let current = nodes[0].parentElement;
    while (current) {
      if (nodes.every((node) => current.contains(node))) return current;
      current = current.parentElement;
    }

    return null;
  }

  function closeMobileMenu(menu) {
    if (!strictMobileMedia.matches) return;

    const panel = menu || document.querySelector("#mobilePageMenu");
    const toggle = document.querySelector("#mobilePageMenuButton");
    if (panel) panel.hidden = true;
    toggle?.setAttribute("aria-expanded", "false");

    ["menu-open", "mobile-menu-open", "nav-open", "is-menu-open", "ns-menu-open"].forEach((className) => {
      document.body.classList.remove(className);
      document.documentElement.classList.remove(className);
      panel?.classList.remove(className);
    });

    panel?.classList.remove("open", "is-open", "show", "visible", "expanded");
  }

  function normalizeMobileMenu() {
    if (!strictMobileMedia.matches) return;

    const menu = document.querySelector("#mobilePageMenu");
    if (!menu) return;

    const items = Array.from(menu.querySelectorAll("button"))
      .filter((item) => normalizedText(item) !== "Uitloggen");
    const logout = menu.querySelector("#mobileAuthLogout");

    menu.classList.add("ns-mobile-menu-normalized");

    items.forEach((item, index) => {
      item.classList.add("ns-mobile-menu-item");
      item.style.order = String(index + 1);
    });

    let divider = menu.querySelector(".ns-mobile-menu-divider");
    if (!divider) {
      divider = document.createElement("div");
      divider.className = "ns-mobile-menu-divider";
      divider.setAttribute("aria-hidden", "true");
      menu.appendChild(divider);
    }
    divider.style.order = String(items.length + 1);

    if (logout) {
      logout.classList.add("ns-mobile-menu-item", "ns-mobile-menu-logout");
      logout.style.order = String(items.length + 2);
    }

    [...items, logout].filter(Boolean).forEach((item) => {
      if (item.dataset.nsCloseMobileMenuBound === "true") return;
      item.dataset.nsCloseMobileMenuBound = "true";
      item.addEventListener("click", () => window.setTimeout(() => closeMobileMenu(menu), 0));
    });
  }

  function boot() {
    bindVideos();
    normalizeMobileMenu();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  new MutationObserver(boot).observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener("click", (event) => {
    if (!strictMobileMedia.matches) return;

    const target = asElement(event.target);
    const menu = document.querySelector("#mobilePageMenu");
    if (!target || !menu) return;

    const toggle = target.closest(".hamburger,.menu-toggle,.mobile-menu-toggle,[aria-label*='menu' i]");
    if (!menu.contains(target) && !toggle) closeMobileMenu(menu);
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu(document.querySelector("#mobilePageMenu"));
  });
})();
