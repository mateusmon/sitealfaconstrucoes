/* ALFA motion — integração estática, sem transformar o contêiner da página.
   Alvos e parâmetros ajustáveis ficam concentrados em CONFIG. */
(() => {
  'use strict';
  window.AlfaMotion?.dispose();

  const CONFIG = Object.freeze({
    scrollLerp: 0.1,
    wheelMultiplier: 1,
    pathDuration: 1200,
    pathEasing: 'cubic-bezier(.45,0,.2,1)',
    hero: '#inicio',
    pathContainer: '.hero-orbit',
    pathObject: '.hero-orbit-dot',
    story: '.services-story',
    steps: '.service-card',
    stageMedia: '(min-width: 1000px) and (min-height: 700px)'
  });

  let cleanup = null;
  let activeLenis = null;
  let replay = () => {};

  function init() {
    cleanup?.();
    const abort = new AbortController();
    const listen = (target, event, callback, options = {}) =>
      target.addEventListener(event, callback, { ...options, signal: abort.signal });
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = matchMedia('(hover: hover) and (pointer: fine)');
    const wide = matchMedia(CONFIG.stageMedia);
    let ownLenis = false;
    let pausedForModal = false;
    let syncFrame = 0;
    let layoutFrame = 0;
    let pathAnimation = null;
    let stepObserver = null;
    const temporaryFocusTargets = new Set();

    const hero = document.querySelector(CONFIG.hero);
    const orbit = document.querySelector(CONFIG.pathContainer);
    const dot = document.querySelector(CONFIG.pathObject);
    const track = orbit.querySelector('path');
    const story = document.querySelector(CONFIG.story);
    const grid = story.querySelector('.services-grid');
    let steps = [...grid.querySelectorAll(CONFIG.steps)];

    function resetInertia() {
      if (activeLenis && !activeLenis.isStopped) {
        activeLenis.scrollTo(window.scrollY, { immediate: true });
      }
    }

    function checkModal() {
      if (!activeLenis) return;
      const modal = [...document.querySelectorAll('dialog[open], [aria-modal="true"]')]
        .some((element) => !element.hidden && element.getClientRects().length > 0);
      const bodyLocked = ['hidden', 'clip'].includes(getComputedStyle(document.body).overflowY);
      const locked = modal || bodyLocked;
      if (locked === pausedForModal) return;
      pausedForModal = locked;
      if (locked) activeLenis.stop();
      else activeLenis.start();
    }

    function setupScroll() {
      if (ownLenis) {
        activeLenis?.destroy();
        delete window.alfaLenis;
      }
      ownLenis = false;
      activeLenis = null;
      pausedForModal = false;
      if (reduced.matches || !mouse.matches || typeof window.Lenis !== 'function') return;

      // Reutiliza uma instância compartilhada real; window.lenis também pode ser
      // apenas o objeto de metadados criado pela biblioteca, por isso a checagem.
      const shared = [window.alfaLenis, window.lenis]
        .find((value) => value && typeof value.scrollTo === 'function');
      activeLenis = shared || new window.Lenis({
        wrapper: window,
        content: document.documentElement,
        lerp: CONFIG.scrollLerp,
        wheelMultiplier: CONFIG.wheelMultiplier,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: true,
        autoResize: true,
        autoToggle: true,
        respectReducedMotion: true,
        allowNestedScroll: true,
        anchors: false, // Histórico e foco tratados abaixo, com destino real.
        stopInertiaOnNavigate: true,
        prevent: (node) => node instanceof Element &&
          node.matches('textarea, select, dialog, [role="dialog"], [data-native-scroll]')
      });
      ownLenis = !shared;
      if (ownLenis) window.alfaLenis = activeLenis;
      checkModal();
    }

    // Não altera wheel/teclas. Interrompe somente a inércia antes da ação nativa.
    listen(document, 'keydown', (event) => {
      if (['Tab', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) resetInertia();
    }, { capture: true });
    listen(document, 'focusin', resetInertia);
    listen(window, 'scroll', () => {
      // Um scrollTo/scrollIntoView nativo deve vencer uma animação em andamento.
      if (activeLenis?.isScrolling === 'smooth' &&
          Math.abs(window.scrollY - activeLenis.animatedScroll) > 4) resetInertia();
    }, { capture: true, passive: true });
    const syncHistory = () => {
      cancelAnimationFrame(syncFrame);
      syncFrame = requestAnimationFrame(resetInertia);
    };
    listen(window, 'popstate', syncHistory);
    listen(window, 'hashchange', syncHistory);

    listen(document, 'click', (event) => {
      const link = event.target.closest?.('a[href]');
      if (!activeLenis || event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
          !link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname ||
          url.search !== location.search || !url.hash) return;
      let target;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); }
      catch { return; }
      if (!target) return;
      if (link.classList.contains('skip-link')) { resetInertia(); return; }
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(history.state, '', url.hash);
      activeLenis.scrollTo(target, {
        // Lenis 1.3.27 lê scroll-padding e scroll-margin do CSS, como o nativo.
        onComplete: () => {
          // Mesmo destino de foco de um link de âncora, sem um segundo salto.
          if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
            temporaryFocusTargets.add(target);
            listen(target, 'blur', () => {
              target.removeAttribute('tabindex');
              temporaryFocusTargets.delete(target);
            }, { once: true });
          }
          target.focus({ preventScroll: true });
        }
      });
    });

    const modalObserver = new MutationObserver(checkModal);
    modalObserver.observe(document.documentElement, {
      subtree: true, childList: true, attributes: true,
      attributeFilter: ['open', 'hidden', 'aria-modal', 'style', 'class']
    });

    // Bézier proporcional ao espaço decorativo; o objeto permanece no fim.
    let points = [];
    let pathWidth = -1;
    let pathHeight = -1;
    const pointAt = (t) => {
      const s = 1 - t;
      return {
        x: s ** 3 * points[0].x + 3 * s ** 2 * t * points[1].x + 3 * s * t ** 2 * points[2].x + t ** 3 * points[3].x,
        y: s ** 3 * points[0].y + 3 * s ** 2 * t * points[1].y + 3 * s * t ** 2 * points[2].y + t ** 3 * points[3].y
      };
    };
    const supportsPath = CSS.supports('offset-path', 'path("M 0 0 C 1 1 2 2 3 3")');
    function layoutPath() {
      const { width, height } = orbit.getBoundingClientRect();
      if (width === pathWidth && height === pathHeight) return;
      pathWidth = width;
      pathHeight = height;
      pathAnimation?.cancel();
      points = [
        { x: width * .12, y: height * .74 },
        { x: width * .84, y: height * .98 },
        { x: width * .08, y: height * .08 },
        { x: width * .83, y: height * .29 }
      ];
      const [a, b, c, d] = points;
      const path = `M ${a.x} ${a.y} C ${b.x} ${b.y} ${c.x} ${c.y} ${d.x} ${d.y}`;
      track.setAttribute('d', path);
      orbit.classList.add('path-ready');
      if (supportsPath) {
        dot.style.offsetPath = `path("${path}")`;
        dot.style.offsetDistance = '100%';
      } else dot.style.transform = `translate(${d.x}px, ${d.y}px)`;
    }
    function replayPath() {
      pathAnimation?.cancel();
      if (reduced.matches || typeof dot.animate !== 'function') return;
      const keyframes = supportsPath
        ? [{ offsetDistance: '0%' }, { offsetDistance: '100%' }]
        : Array.from({ length: 41 }, (_, index) => {
          const position = pointAt(index / 40);
          return { transform: `translate(${position.x}px, ${position.y}px)`, opacity: .55 + .45 * index / 40 };
        });
      pathAnimation = dot.animate(keyframes, {
        duration: CONFIG.pathDuration, easing: CONFIG.pathEasing, fill: 'none'
      });
    }
    replay = replayPath;
    let heroVisible = false;
    const heroObserver = new IntersectionObserver((entries) => {
      const visible = entries[0].isIntersecting;
      if (visible && !heroVisible) replayPath();
      heroVisible = visible;
    }, { threshold: .25 });
    heroObserver.observe(hero);
    listen(hero, 'alfa:replay-path', replayPath);

    function activateStep(index) {
      steps.forEach((step, item) => step.classList.toggle('is-active', item === index));
    }
    function chooseStep() {
      const center = innerHeight * .54;
      let closest = 0;
      let distance = Infinity;
      steps.forEach((step, index) => {
        const bounds = step.getBoundingClientRect();
        const nextDistance = Math.abs(bounds.top + bounds.height / 2 - center);
        if (nextDistance < distance) { distance = nextDistance; closest = index; }
      });
      activateStep(closest);
    }
    function configureStages() {
      stepObserver?.disconnect();
      steps = [...grid.querySelectorAll(CONFIG.steps)];
      if (!steps.length) { story.classList.remove('has-scroll-stages'); return; }
      steps.forEach((step, index) => {
        const label = step.querySelector('.service-top span');
        const value = `${String(index + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
        if (label.textContent !== value) label.textContent = value;
      });
      const naturalHeight = steps.reduce((sum, step) =>
        sum + step.querySelector('div:last-child').scrollHeight + 100, 0);
      const enabled = !reduced.matches && wide.matches && steps.length >= 3 && naturalHeight > innerHeight * .75;
      story.classList.toggle('has-scroll-stages', enabled);
      if (!enabled) { activateStep(0); return; }
      const header = document.querySelector('.site-header').getBoundingClientRect().height;
      stepObserver = new IntersectionObserver(chooseStep, {
        rootMargin: `-${header + 24}px 0px -35% 0px`, threshold: [0, .2, .4, .6, .8, 1]
      });
      steps.forEach((step) => stepObserver.observe(step));
      chooseStep();
    }
    function scheduleLayout() {
      cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => {
        layoutPath();
        configureStages();
      });
    }
    const resizeObserver = new ResizeObserver(scheduleLayout);
    resizeObserver.observe(orbit);
    resizeObserver.observe(grid);
    resizeObserver.observe(document.querySelector('.site-header'));
    const contentObserver = new MutationObserver(scheduleLayout);
    contentObserver.observe(grid, { subtree: true, childList: true, characterData: true });
    listen(window, 'resize', scheduleLayout, { passive: true });
    listen(wide, 'change', scheduleLayout);
    listen(mouse, 'change', setupScroll);
    listen(reduced, 'change', () => { pathAnimation?.cancel(); setupScroll(); layoutPath(); configureStages(); });
    layoutPath();
    configureStages();
    setupScroll();

    cleanup = () => {
      abort.abort();
      modalObserver.disconnect();
      heroObserver.disconnect();
      stepObserver?.disconnect();
      resizeObserver.disconnect();
      contentObserver.disconnect();
      cancelAnimationFrame(syncFrame);
      cancelAnimationFrame(layoutFrame);
      pathAnimation?.cancel();
      temporaryFocusTargets.forEach((target) => target.removeAttribute('tabindex'));
      if (ownLenis) { activeLenis?.destroy(); delete window.alfaLenis; }
      activeLenis = null;
      story.classList.remove('has-scroll-stages');
      steps.forEach((step) => step.classList.remove('is-active'));
      replay = () => {};
      cleanup = null;
    };
  }

  const onPageHide = () => cleanup?.();
  const onPageShow = (event) => { if (event.persisted) init(); };
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', onPageShow);
  window.AlfaMotion = {
    config: CONFIG,
    init,
    replayPath: () => replay(),
    get lenis() { return activeLenis; },
    destroy: () => cleanup?.(),
    dispose() {
      cleanup?.();
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
    }
  };
  init();
})();
