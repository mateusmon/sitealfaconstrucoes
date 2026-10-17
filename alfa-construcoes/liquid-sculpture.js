// Connects the liquid particle engine to the ALFA hero without React.
(() => {
  const root = document.querySelector(".hero");
  const image = root?.querySelector(".hero-sculpture img");
  if (!root || !image) return;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let engine = null;
  let canvas = null;
  let resizeObserver = null;
  let intersectionObserver = null;
  let disposed = false;
  let pendingImageLoad = null;
  let onPageShow = null;

  const fail = () => {
    root.dataset.gl = "off";
    removeListeners();
    engine?.destroy();
    engine = null;
    canvas?.remove();
    canvas = null;
  };

  const measure = () => {
    if (!engine || !canvas) return;
    const rootBounds = root.getBoundingClientRect();
    const imageBounds = image.getBoundingClientRect();
    if (!rootBounds.width || !rootBounds.height || !imageBounds.width || !imageBounds.height) return;
    engine.resize(root.clientWidth, root.clientHeight, {
      x: imageBounds.left - rootBounds.left,
      y: imageBounds.top - rootBounds.top,
      w: imageBounds.width,
      h: imageBounds.height,
    });
  };

  const removeListeners = () => {
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    resizeObserver = null;
    intersectionObserver = null;
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (pendingImageLoad) image.removeEventListener("load", pendingImageLoad);
    pendingImageLoad = null;
    window.removeEventListener("resize", measure);
    root.removeEventListener("pointermove", onPointerMove);
    root.removeEventListener("pointerdown", onPointerDown);
    root.removeEventListener("pointerup", onPointerUp);
    root.removeEventListener("pointercancel", onPointerUp);
    root.removeEventListener("pointerleave", onPointerLeave);
  };

  const onVisibilityChange = () => engine?.setVisible(!document.hidden);
  const pointerPosition = (event) => {
    const bounds = root.getBoundingClientRect();
    return [event.clientX - bounds.left, event.clientY - bounds.top];
  };
  const onPointerMove = (event) => {
    if (event.pointerType === "touch" && event.buttons === 0 && event.pressure === 0) return;
    const [x, y] = pointerPosition(event);
    engine?.pointer("move", x, y, event.pointerType === "touch");
  };
  const onPointerDown = (event) => {
    const [x, y] = pointerPosition(event);
    engine?.pointer("down", x, y, event.pointerType === "touch");
  };
  const onPointerUp = (event) => {
    const [x, y] = pointerPosition(event);
    engine?.pointer("up", x, y, event.pointerType === "touch");
  };
  const onPointerLeave = (event) => {
    const [x, y] = pointerPosition(event);
    engine?.pointer("leave", x, y, event.pointerType === "touch");
  };

  const stop = () => {
    disposed = true;
    removeListeners();
    engine?.destroy();
    engine = null;
    canvas?.remove();
    canvas = null;
    delete root.dataset.gl;
  };

  const start = () => {
    if (disposed || motionPreference.matches || engine) return;
    canvas = document.createElement("canvas");
    canvas.className = "hero-liquid-canvas";
    canvas.setAttribute("aria-hidden", "true");
    root.insertBefore(canvas, root.querySelector(".hero-orbit"));

    const options = {
      interactive: true,
      strength: 1,
      radius: 220,
      density: 0.8,
      dotSize: 1,
      spread: 0.9,
      turbulence: 0.9,
      liquid: 1,
      returnSpeed: 1,
      streaks: true,
      restStyle: "image",
      ambient: false,
      ambientIntensity: 0.5,
      speed: 1,
      intro: true,
      reducedMotion: false,
      // Match the hero graphite so the canvas blends with the section background.
      bg: hexToRgb("#191919", [0.098, 0.098, 0.098]),
      imgBg: null,
    };

    try {
      engine = new LiquidEngine(canvas, options, fail);
    } catch {
      fail();
      return;
    }

    resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);
    resizeObserver.observe(image);
    intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) engine?.setVisible(entry.isIntersecting && !document.hidden);
    });
    intersectionObserver.observe(root);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", measure, { passive: true });
    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerdown", onPointerDown, { passive: true });
    root.addEventListener("pointerup", onPointerUp, { passive: true });
    root.addEventListener("pointercancel", onPointerUp, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const renderImage = () => {
      pendingImageLoad = null;
      if (!engine || !image.naturalWidth) return;
      measure();
      try {
        engine.onFirstFrame = () => {
          if (!disposed && engine) root.dataset.gl = "on";
        };
        engine.setImage(image);
        measure();
      } catch {
        fail();
      }
    };

    if (image.complete && image.naturalWidth) renderImage();
    else {
      pendingImageLoad = renderImage;
      image.addEventListener("load", pendingImageLoad, { once: true });
    }
  };

  const onMotionPreferenceChange = () => {
    if (motionPreference.matches) stop();
    else {
      disposed = false;
      start();
    }
  };

  motionPreference.addEventListener("change", onMotionPreferenceChange);
  window.addEventListener("pagehide", stop);
  onPageShow = () => {
    disposed = false;
    start();
  };
  window.addEventListener("pageshow", onPageShow);
  start();
})();
