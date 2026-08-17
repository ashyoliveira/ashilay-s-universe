function initUniverseApp() {

  const html = document.documentElement;
  html.classList.add("js-enabled");


    // ========================================
// JOURNEY / TIMELINE
// ========================================

const journeySection =
  document.querySelector(".journey");

const journeyTimeline =
  document.querySelector(".journey-timeline");

const journeyProgress =
  document.querySelector(".journey-line-progress");

const journeyItems =
  document.querySelectorAll(".journey-item");


if (
  journeySection &&
  journeyTimeline &&
  journeyProgress
) {

  function updateJourneyLine() {

    const rect =
      journeyTimeline.getBoundingClientRect();

    const windowHeight =
      window.innerHeight;


    const start =
      windowHeight * 0.75;

    const distance =
      start - rect.top;

    const total =
      rect.height;


    let progress =
      (distance / total) * 100;


    progress =
      Math.max(
        0,
        Math.min(100, progress)
      );


    journeyProgress.style.height =
      `${progress}%`;

  }


  updateJourneyLine();


  window.addEventListener(
    "scroll",
    updateJourneyLine,
    { passive: true }
  );

}


/* reveal dos capítulos */

if (journeyItems.length > 0) {

  const journeyObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (entry.isIntersecting) {

              entry.target
                .classList
                .add("visible");

            }

          }
        );

      },
      {
        threshold: 0.18
      }
    );


  journeyItems.forEach(
    (item) => {

      journeyObserver.observe(item);

    }
  );

}

  // ========================================
  // THEME
  // ========================================

  const themeToggle =
    document.querySelector(".theme-toggle");


  const savedTheme =
    localStorage.getItem("ashilay-theme");


  const prefersLight =
    window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;


  let currentTheme =
    savedTheme ||
    (prefersLight ? "light" : "dark");


  function applyTheme(theme) {

    html.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "ashilay-theme",
      theme
    );

  }


  applyTheme(currentTheme);


  themeToggle?.addEventListener(
    "click",
    () => {

      currentTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";

      applyTheme(currentTheme);

    }
  );


  // ========================================
  // LANGUAGE
  // ========================================

  const languageToggle =
    document.querySelector(".language-toggle");

  const languageMenu =
    document.querySelector(".language-menu");


  languageToggle?.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      languageMenu.hidden =
        !languageMenu.hidden;


      languageToggle.setAttribute(
        "aria-expanded",
        String(!languageMenu.hidden)
      );

    }
  );


  document.addEventListener(
    "click",
    (event) => {

      if (
        languageMenu &&
        !languageMenu.contains(event.target) &&
        !languageToggle?.contains(event.target)
      ) {

        languageMenu.hidden = true;

        languageToggle?.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  // ========================================
  // ACCESSIBILITY
  // ========================================

  const accessibilityToggle =
    document.querySelector(
      ".accessibility-toggle"
    );

  const accessibilityPanel =
    document.querySelector(
      ".accessibility-panel"
    );

  const accessibilityClose =
    document.querySelector(
      ".accessibility-close"
    );


  function openAccessibility() {

    accessibilityPanel
      ?.classList
      .add("active");

    accessibilityPanel
      ?.setAttribute(
        "aria-hidden",
        "false"
      );

    accessibilityToggle
      ?.setAttribute(
        "aria-expanded",
        "true"
      );

  }


  function closeAccessibility() {

    accessibilityPanel
      ?.classList
      .remove("active");

    accessibilityPanel
      ?.setAttribute(
        "aria-hidden",
        "true"
      );

    accessibilityToggle
      ?.setAttribute(
        "aria-expanded",
        "false"
      );

  }


  accessibilityToggle
    ?.addEventListener(
      "click",
      openAccessibility
    );


  accessibilityClose
    ?.addEventListener(
      "click",
      closeAccessibility
    );



  // ========================================
  // FONT SIZE
  // ========================================

  const fontButtons =
    document.querySelectorAll(
      "[data-font-size]"
    );


  const savedFont =
    localStorage.getItem(
      "ashilay-font-size"
    ) || "normal";


  function applyFontSize(size) {

    if (size === "normal") {

      html.removeAttribute(
        "data-font-size"
      );

    } else {

      html.setAttribute(
        "data-font-size",
        size
      );

    }

    fontButtons.forEach((btn) => {
      if (btn.dataset.fontSize === size) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    localStorage.setItem(
      "ashilay-font-size",
      size
    );

  }


  applyFontSize(savedFont);


  fontButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          applyFontSize(
            button.dataset.fontSize
          );

        }
      );

    }
  );


  // ========================================
  // HIGH CONTRAST
  // ========================================

  const contrastButton =
    document.querySelector(
      '[data-accessibility="contrast"]'
    );


  const savedContrast =
    localStorage.getItem(
      "ashilay-high-contrast"
    ) === "true";


  function applyContrast(enabled) {

    html.classList.toggle(
      "high-contrast",
      enabled
    );

    contrastButton
      ?.classList
      .toggle(
        "active",
        enabled
      );

    localStorage.setItem(
      "ashilay-high-contrast",
      enabled
    );

  }


  applyContrast(savedContrast);


  contrastButton
    ?.addEventListener(
      "click",
      () => {

        applyContrast(
          !html.classList.contains(
            "high-contrast"
          )
        );

      }
    );


  // ========================================
  // REDUCED MOTION
  // ========================================

  const motionButton =
    document.querySelector(
      '[data-accessibility="motion"]'
    );


  const savedMotion =
    localStorage.getItem(
      "ashilay-reduce-motion"
    );


  const systemReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const initialMotion =
    savedMotion === null
      ? systemReducedMotion
      : savedMotion === "true";


  function applyMotion(enabled) {

    html.classList.toggle(
      "reduce-motion",
      enabled
    );

    motionButton
      ?.classList
      .toggle(
        "active",
        enabled
      );

    localStorage.setItem(
      "ashilay-reduce-motion",
      enabled
    );

  }


  applyMotion(initialMotion);


  motionButton
    ?.addEventListener(
      "click",
      () => {

        applyMotion(
          !html.classList.contains(
            "reduce-motion"
          )
        );

      }
    );

  // ========================================
  // LIBRAS / VLIBRAS
  // ========================================

  const librasToggle =
    document.querySelector(
      ".libras-toggle"
    );

  librasToggle
    ?.addEventListener(
      "click",
      () => {

        let vlibrasButton =
          document.querySelector(
            "[vw-access-button]"
          );

        if (!vlibrasButton && window.VLibras) {
          try {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
            vlibrasButton = document.querySelector("[vw-access-button]");
          } catch (err) {}
        }

        if (vlibrasButton) {
          vlibrasButton.click();
          closeAccessibility();
        } else {
          setTimeout(() => {
            const retryBtn = document.querySelector("[vw-access-button]");
            if (retryBtn) {
              retryBtn.click();
            }
            closeAccessibility();
          }, 400);
        }

      }
    );


  // ========================================
  // FULLSCREEN MENU
  // ========================================

  const menuButton =
    document.querySelector(".menu-button");

  const menuOverlay =
    document.querySelector(".menu-overlay");

  const menuClose =
    document.querySelector(".menu-close");

  const menuLinks =
    document.querySelectorAll(".menu-link, .menu-world");

  const menuRealityValue =
    document.querySelector(".menu-reality-value");


  function openMenu() {

    menuOverlay
      ?.classList
      .add("active");

    menuOverlay
      ?.setAttribute(
        "aria-hidden",
        "false"
      );

    menuButton
      ?.setAttribute(
        "aria-expanded",
        "true"
      );

    document.body.style.overflow =
      "hidden";

    updateMenuReality();

  }


  function closeMenu() {

    menuOverlay
      ?.classList
      .remove("active");

    menuOverlay
      ?.setAttribute(
        "aria-hidden",
        "true"
      );

    menuButton
      ?.setAttribute(
        "aria-expanded",
        "false"
      );

    document.body.style.overflow = "";

  }


  function updateMenuReality() {

    if (!menuRealityValue) return;

    const isDark =
      currentTheme === "dark";

    menuRealityValue.textContent =
      isDark
        ? menuRealityValue.dataset.midnight
        : menuRealityValue.dataset.daydream;

  }


  menuButton
    ?.addEventListener(
      "click",
      openMenu
    );

  menuClose
    ?.addEventListener(
      "click",
      closeMenu
    );


  menuLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          closeMenu();

        }
      );

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeCaseStudyDrawer();
        closeMenu();
        closeAccessibility();

      }

    }
  );



  // ========================================
  // CUSTOM CURSOR
  // ========================================

  const cursor =
    document.querySelector(".custom-cursor");

  const cursorDot =
    document.querySelector(".cursor-dot");

  const cursorRing =
    document.querySelector(".cursor-ring");

  const cursorLabel =
    document.querySelector(".cursor-label");

  const isTouch =
    window.matchMedia("(pointer: coarse)").matches;


  if (cursor && cursorDot && cursorRing && !isTouch) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isMoving = false;

    window.addEventListener("mousemove", (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      if (!cursor.classList.contains("active")) {
        cursor.classList.add("active");
      }

      if (!isMoving) {
        isMoving = true;
        renderCursor();
      }

    }, { passive: true });

    document.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });

    document.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    function renderCursor() {

      const ease = 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      cursorRing.style.transform =
        `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
        requestAnimationFrame(renderCursor);
      } else {
        isMoving = false;
      }

    }

    // Contextual Hover Handlers
    function setCursorMode(modeClass, text = "", colorClass = "") {
      cursor.className = "custom-cursor active " + modeClass + " " + colorClass;
      if (cursorLabel) {
        cursorLabel.textContent = text;
      }
    }

    function resetCursor() {
      cursor.className = "custom-cursor active";
      if (cursorLabel) {
        cursorLabel.textContent = "";
      }
    }

    // Portal ENTER Button
    const enterBtn = document.querySelector(".enter-button");
    enterBtn?.addEventListener("mouseenter", () => {
      setCursorMode("cursor-enter", "ENTER");
    });
    enterBtn?.addEventListener("mouseleave", resetCursor);

    // World Cards
    const worldCards = document.querySelectorAll(".world-card");
    worldCards.forEach((card) => {
      const isTech = card.classList.contains("world-tech");
      const isCreative = card.classList.contains("world-creative");
      const isStrategy = card.classList.contains("world-strategy");
      const colorCls = isTech ? "cursor-tech" : (isCreative ? "cursor-creative" : (isStrategy ? "cursor-strategy" : ""));

      card.addEventListener("mouseenter", () => {
        setCursorMode("cursor-explore", "EXPLORE", colorCls);
      });
      card.addEventListener("mouseleave", resetCursor);
    });

    // Selected Work
    const projects = document.querySelectorAll(".project, .project-link");
    projects.forEach((proj) => {
      proj.addEventListener("mouseenter", () => {
        setCursorMode("cursor-view", "VIEW");
      });
      proj.addEventListener("mouseleave", resetCursor);
    });

    // Contact Links
    const contactLinks = document.querySelectorAll(".contact-link");
    contactLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setCursorMode("cursor-connect", "CONNECT");
      });
      link.addEventListener("mouseleave", resetCursor);
    });

    // General interactive elements
    const generalLinks = document.querySelectorAll("a:not(.enter-button):not(.project-link):not(.contact-link), button:not(.enter-button)");
    generalLinks.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (!cursor.classList.contains("cursor-enter") && !cursor.classList.contains("cursor-explore") && !cursor.classList.contains("cursor-view") && !cursor.classList.contains("cursor-connect")) {
          setCursorMode("cursor-hover");
        }
      });
      el.addEventListener("mouseleave", resetCursor);
    });

  }


  // ========================================
  // WORLD EXPLORATION PROGRESS
  // ========================================

  const hudElement =
    document.querySelector(".worlds-hud");

  const hudCount =
    document.getElementById("worlds-hud-count");

  const hudPips =
    document.querySelectorAll(".hud-pip");

  let exploredWorlds = [];

  try {
    const saved = localStorage.getItem("ashilay-worlds-explored");
    if (saved) {
      exploredWorlds = JSON.parse(saved);
    }
  } catch (e) {
    exploredWorlds = [];
  }

  function updateExplorationHUD() {

    if (!Array.isArray(exploredWorlds)) {
      exploredWorlds = [];
    }

    hudPips.forEach((pip) => {
      const worldType = pip.dataset.worldPip;
      if (exploredWorlds.includes(worldType)) {
        pip.classList.add("explored");
      } else {
        pip.classList.remove("explored");
      }
    });

    if (hudCount) {
      hudCount.textContent = `${exploredWorlds.length} / 3`;
    }

  }

  function markWorldExplored(worldType) {

    if (!worldType) return;

    if (!exploredWorlds.includes(worldType)) {
      exploredWorlds.push(worldType);
      try {
        localStorage.setItem("ashilay-worlds-explored", JSON.stringify(exploredWorlds));
      } catch (e) {}
      updateExplorationHUD();
    }

  }

  function resetExplorationHUD() {
    exploredWorlds = [];
    try {
      localStorage.removeItem("ashilay-worlds-explored");
    } catch (e) {}
    updateExplorationHUD();
  }

  updateExplorationHUD();

  // Allow clicking on HUD to reset exploration progress
  if (hudElement) {
    hudElement.style.cursor = "pointer";
    hudElement.setAttribute("title", "Clique para reiniciar a exploração de mundos");
    hudElement.addEventListener("click", () => {
      resetExplorationHUD();
    });
  }

  // Only explore on click of the card or explore button (removed auto-explore on mouseenter)
  document.querySelectorAll(".world-card").forEach((card) => {

    const worldType = card.classList.contains("world-tech") ? "tech" : (card.classList.contains("world-creative") ? "creative" : (card.classList.contains("world-strategy") ? "strategy" : null));

    card.addEventListener("click", (e) => {
      // Don't trigger reset if HUD was clicked
      if (e.target.closest(".worlds-hud")) return;
      if (worldType) markWorldExplored(worldType);
    });

  });


  // ========================================
  // EASTER EGGS / COSMIC TOAST
  // ========================================

  const toast =
    document.getElementById("cosmic-toast");

  const universeMain =
    document.querySelector(".universe");

  let toastTimer = null;

  function showCosmicToast(message) {

    if (!toast || !message) return;

    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);

  }

  document.querySelectorAll(".easter-egg-trigger").forEach((trigger) => {

    trigger.addEventListener("click", (e) => {

      e.preventDefault();
      const secretId = trigger.dataset.secret;
      let msg = "";

      if (secretId === "1") {
        msg = universeMain?.dataset.secret1 || "✦ Secret 01/03: The core of the universe awakened.";
        trigger.style.transform = "rotate(360deg) scale(1.4)";
        setTimeout(() => { trigger.style.transform = ""; }, 600);
      } else if (secretId === "2") {
        msg = universeMain?.dataset.secret2 || "☾ Secret 02/03: Stargazer tuned in.";
        trigger.style.transform = "scale(1.3) rotate(-20deg)";
        setTimeout(() => { trigger.style.transform = ""; }, 600);
      } else if (secretId === "3") {
        msg = universeMain?.dataset.secret3 || "✦ Secret 03/03: Edge of the universe reached.";
        trigger.style.transform = "scale(1.5) rotate(180deg)";
        setTimeout(() => { trigger.style.transform = ""; }, 600);
      }

      showCosmicToast(msg);

    });

  });


  // ========================================
  // GLOBAL SCROLL REVEALS
  // ========================================

  const revealElements =
    document.querySelectorAll(
      ".about-heading, .about-content, .about-details, .worlds-heading, .world-card, .work-heading, .project, .capabilities-heading, .capability-card, .capabilities-mindset, .beyond-heading, .beyond-card, .contact-heading, .contact-links, .contact-information"
    );

  if (revealElements.length > 0) {

    revealElements.forEach((el) => {
      el.classList.add("reveal-init");
    });

    const revealObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-active");
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

  }


  // ========================================
  // PORTAL COSMIC TRANSITION
  // ========================================

  const enterPortalBtn =
    document.querySelector(".enter-button");

  const portalAtmosphere =
    document.querySelector(".portal-atmosphere");

  enterPortalBtn?.addEventListener("click", (e) => {

    if (portalAtmosphere) {
      portalAtmosphere.classList.remove("portal-cosmic-burst");
      void portalAtmosphere.offsetWidth; // Trigger reflow
      portalAtmosphere.classList.add("portal-cosmic-burst");
    }

  });


  // ========================================
  // CASE STUDY DRAWER
  // ========================================

  const caseDrawer =
    document.getElementById("case-study-drawer");

  const caseBackdrop =
    document.getElementById("case-study-backdrop");

  const caseCloseBtn =
    document.getElementById("case-drawer-close");

  const caseBadgeText =
    document.getElementById("case-badge-text");

  const caseBadgeSymbol =
    document.querySelector(".case-badge-symbol");

  const casePanels =
    document.querySelectorAll("[data-case-panel]");

  const caseTriggers =
    document.querySelectorAll("[data-open-case-study]");


  function openCaseStudyDrawer(caseKey) {

    if (!caseDrawer) return;

    // Reset drawer theme classes
    caseDrawer.classList.remove("drawer-theme-tech", "drawer-theme-creative", "drawer-theme-strategy");

    // Badge styling and text
    if (caseKey === "reelist") {
      caseDrawer.classList.add("drawer-theme-tech");
      if (caseBadgeText && caseBadgeSymbol) {
        caseBadgeText.textContent = "THE LAB / TECHNOLOGY";
        caseBadgeSymbol.textContent = "◉";
      }
    } else if (caseKey === "creative") {
      caseDrawer.classList.add("drawer-theme-creative");
      if (caseBadgeText && caseBadgeSymbol) {
        caseBadgeText.textContent = "THE STUDIO / CREATIVE";
        caseBadgeSymbol.textContent = "◇";
      }
    } else if (caseKey === "strategy") {
      caseDrawer.classList.add("drawer-theme-strategy");
      if (caseBadgeText && caseBadgeSymbol) {
        caseBadgeText.textContent = "THE FORGE / STRATEGY";
        caseBadgeSymbol.textContent = "✦";
      }
    }

    // Toggle panels
    casePanels.forEach((panel) => {
      if (panel.dataset.casePanel === caseKey) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "true");
      }
    });

    caseDrawer.classList.add("active");
    caseDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

  }



  function closeCaseStudyDrawer() {

    if (!caseDrawer) return;

    caseDrawer.classList.remove("active");
    caseDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

  }


  caseTriggers.forEach((trigger) => {

    trigger.addEventListener("click", () => {
      const caseKey = trigger.dataset.openCaseStudy;
      if (caseKey) {
        openCaseStudyDrawer(caseKey);
      }
    });

  });


  caseCloseBtn?.addEventListener("click", closeCaseStudyDrawer);
  caseBackdrop?.addEventListener("click", closeCaseStudyDrawer);

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initUniverseApp);
} else {
  initUniverseApp();
}
document.addEventListener("turbo:load", initUniverseApp);