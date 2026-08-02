// Keep the ambient circle animation on one shared timeline across page changes.
// sessionStorage survives navigation within the same browser tab, so each page
// resumes the orbs at the same animation phase and direction.
(function syncAmbientMotionTimeline() {
  const storageKey = 'aydelore-ambient-motion-start';
  let startTime = Number(sessionStorage.getItem(storageKey));

  if (!Number.isFinite(startTime) || startTime <= 0) {
    startTime = Date.now();
    sessionStorage.setItem(storageKey, String(startTime));
  }

  const elapsedSeconds = (Date.now() - startTime) / 1000;
  document.documentElement.style.setProperty('--motion-offset', `-${elapsedSeconds}s`);
})();

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const roleTabs = [...document.querySelectorAll('.role-tab')];
const rolePanels = [...document.querySelectorAll('.role-panel')];
const workTabs = [...document.querySelectorAll('.work-tab')];
const workPanels = [...document.querySelectorAll('.work-panel')];
const lightbox = document.querySelector('#lightbox');
const videoModal = document.querySelector('#video-modal');
const videoPlayer = document.querySelector('#portfolio-video-player');
const videoStatus = document.querySelector('#video-status');
const videoFilePath = document.querySelector('#video-file-path');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  });
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function activateRole(tab) {
  const roleName = tab.dataset.role;

  roleTabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-selected', String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  rolePanels.forEach((panel) => {
    const isActive = panel.id === `panel-${roleName}`;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
}

roleTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateRole(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) nextIndex = (index + 1) % roleTabs.length;
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) nextIndex = (index - 1 + roleTabs.length) % roleTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = roleTabs.length - 1;

    activateRole(roleTabs[nextIndex]);
    roleTabs[nextIndex].focus();
  });
});

workTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.work;
    workTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    workPanels.forEach((panel) => {
      const isActive = panel.dataset.workPanel === category;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
      if (isActive) revealVisibleItems(panel);
    });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function revealVisibleItems(scope = document) {
  scope.querySelectorAll('.reveal:not(.is-visible)').forEach((item) => revealObserver.observe(item));
}
revealVisibleItems();

if (lightbox) {
  document.querySelectorAll('.design-card').forEach((card) => {
    card.addEventListener('click', () => {
      const image = lightbox.querySelector('img');
      const caption = lightbox.querySelector('p');
      if (image) image.src = card.dataset.lightbox || '';
      if (caption) caption.textContent = card.dataset.caption || '';
      lightbox.showModal();
      document.body.classList.add('dialog-open');
    });
  });
}

function closeDialog(dialog) {
  if (dialog?.open) dialog.close();
  document.body.classList.remove('dialog-open');
}

document.querySelectorAll('.lightbox-close').forEach((button) => {
  button.addEventListener('click', () => closeDialog(button.closest('dialog')));
});

[lightbox, videoModal].filter(Boolean).forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
});

function resetVideoModal() {
  if (!videoPlayer) return;
  videoPlayer.pause();
  videoPlayer.removeAttribute('src');
  videoPlayer.load();
  videoPlayer.hidden = true;
  if (videoStatus) videoStatus.hidden = false;
}

function openPortfolioVideo(videoPath) {
  if (!videoModal || !videoPlayer) return;
  resetVideoModal();
  if (videoFilePath) videoFilePath.textContent = videoPath || 'assets/videos/your-video.mp4';

  if (videoPath) {
    videoPlayer.src = videoPath;
    videoPlayer.hidden = false;
    if (videoStatus) videoStatus.hidden = true;
    videoPlayer.load();
  }

  videoModal.showModal();
  document.body.classList.add('dialog-open');
}

if (videoPlayer) {
  videoPlayer.addEventListener('error', () => {
    videoPlayer.hidden = true;
    if (videoStatus) videoStatus.hidden = false;
  });
}

document.querySelectorAll('.video-demo-button').forEach((button) => {
  button.addEventListener('click', () => {
    const videoContainer = button.closest('[data-video]');
    openPortfolioVideo(videoContainer?.dataset.video || '');
  });
});

if (videoModal) videoModal.addEventListener('close', resetVideoModal);

document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.getAttribute('href') === '#') {
      event.preventDefault();
      window.alert('Replace this placeholder link with your published project URL.');
    }
  });
});

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();

/* ==================================================
   SABER EDGE TRACER
   Creates an SVG path that follows each card's edges
   ================================================== */

(() => {
const saberSelector = [
  /* Home: Portfolio box and portrait box */
  ".page-home .hero-copy",
  ".page-home .hero-card",

  /* About: upper introduction box only */
  ".page-about .page-intro",

  /* Experience: keep the current active role panel effect */
  ".page-experience .role-panel",

  /* Work: Designs, systems, and digital experiments box only */
  ".page-work .page-intro",

  /* Skills: A practical toolkit built... box only */
  ".page-skills .page-intro",

  /* Contact: upper introduction box only */
  ".page-contact .page-intro"
].join(",");

  const targets = [...document.querySelectorAll(saberSelector)];

  if (targets.length === 0) {
    return;
  }

  const svgNamespace = "http://www.w3.org/2000/svg";
  const animationDuration = 14;

  /*
   * Save one animation starting time for the browser tab.
   * This keeps the tracer moving in the same direction and phase
   * when moving between Home, Work, Skills, and other pages.
   */
  const startStorageKey = "portfolio-saber-animation-start";

  let animationStartedAt = Number(
    sessionStorage.getItem(startStorageKey)
  );

  if (
    !Number.isFinite(animationStartedAt) ||
    animationStartedAt <= 0
  ) {
    animationStartedAt = Date.now();

    sessionStorage.setItem(
      startStorageKey,
      String(animationStartedAt)
    );
  }

  const elapsedSeconds =
    (Date.now() - animationStartedAt) / 1000;

  function createSvgElement(tagName, attributes = {}) {
    const element = document.createElementNS(
      svgNamespace,
      tagName
    );

    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, String(value));
    });

    return element;
  }

  function createStop(offset, color, opacity = 1) {
    return createSvgElement("stop", {
      offset,
      "stop-color": color,
      "stop-opacity": opacity
    });
  }

  function addSaberTracer(target, index) {
    /*
     * Prevent duplicate tracers if this script is accidentally
     * loaded more than once.
     */
    if (target.querySelector(":scope > .saber-trace")) {
      return;
    }

    target.classList.add("saber-frame");

    const uniqueId = `saber-gradient-${index}-${Date.now()}`;

    const svg = createSvgElement("svg", {
      class: "saber-trace",
      "aria-hidden": "true",
      preserveAspectRatio: "none"
    });

    const definitions = createSvgElement("defs");

    const gradient = createSvgElement("linearGradient", {
      id: uniqueId,
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%"
    });

    gradient.append(
      createStop("0%", "#ff83d5"),
      createStop("42%", "#ffb8ea"),
      createStop("65%", "#ffffff"),
      createStop("82%", "#c4a6ff"),
      createStop("100%", "#9276ff")
    );

    definitions.appendChild(gradient);
    svg.appendChild(definitions);

    const track = createSvgElement("rect", {
      class: "saber-track",
      pathLength: "1000"
    });

    const glow = createSvgElement("rect", {
      class: "saber-beam-glow",
      pathLength: "1000",
      stroke: `url(#${uniqueId})`
    });

    const core = createSvgElement("rect", {
      class: "saber-beam-core",
      pathLength: "1000"
    });

    const tip = createSvgElement("rect", {
      class: "saber-beam-tip",
      pathLength: "1000"
    });

    svg.append(track, glow, core, tip);
    target.appendChild(svg);

    const rectangles = [track, glow, core, tip];

    function updateTracerSize() {
      const width = target.clientWidth;
      const height = target.clientHeight;

      /*
       * Hidden tab panels temporarily have zero dimensions.
       * ResizeObserver will call this again when they become visible.
       */
      if (width <= 0 || height <= 0) {
        return;
      }

      const computedStyles = window.getComputedStyle(target);

      const borderRadius =
        Number.parseFloat(computedStyles.borderRadius) || 20;

      const inset = 4;

      const maximumRadius =
        Math.max(0, Math.min(width, height) / 2 - inset);

      const radius = Math.min(borderRadius, maximumRadius);

      svg.setAttribute(
        "viewBox",
        `0 0 ${width} ${height}`
      );

      rectangles.forEach((rectangle) => {
        rectangle.setAttribute("x", String(inset));
        rectangle.setAttribute("y", String(inset));

        rectangle.setAttribute(
          "width",
          String(Math.max(0, width - inset * 2))
        );

        rectangle.setAttribute(
          "height",
          String(Math.max(0, height - inset * 2))
        );

        rectangle.setAttribute("rx", String(radius));
        rectangle.setAttribute("ry", String(radius));
      });
    }

    /*
     * Stagger each frame slightly so every card does not have
     * its tracer at exactly the same position.
     */
    const staggerSeconds = index * 0.8;

    const currentPhase =
      (elapsedSeconds + staggerSeconds) %
      animationDuration;

    target.style.setProperty(
      "--saber-duration",
      `${animationDuration}s`
    );

    target.style.setProperty(
      "--saber-delay",
      `${-currentPhase}s`
    );

    updateTracerSize();

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(() => {
        updateTracerSize();
      });

      resizeObserver.observe(target);
    } else {
      window.addEventListener(
        "resize",
        updateTracerSize
      );
    }
  }

  targets.forEach(addSaberTracer);
})();
