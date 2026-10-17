// Fotografias originais: o link continua funcional se dialog/JavaScript falhar.
(() => {
  'use strict';
  window.AlfaGallery?.dispose();
  let cleanup = null;

  function init() {
    cleanup?.();
    const dialog = document.querySelector('#photo-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const abort = new AbortController();
    const links = [...document.querySelectorAll('a[data-photo]')];
    const image = dialog.querySelector('#photo-dialog-image');
    const caption = dialog.querySelector('#photo-dialog-caption');
    const counter = dialog.querySelector('#photo-dialog-counter');
    let index = 0;
    let opener = null;

    function render(next) {
      index = (next + links.length) % links.length;
      const link = links[index];
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      caption.textContent = link.dataset.caption;
      counter.textContent = `Foto ${index + 1} de ${links.length}`;
    }

    links.forEach((link, position) => {
      link.addEventListener('click', (event) => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = link;
        render(position);
        dialog.showModal();
        document.body.classList.add('photo-viewer-open');
      }, { signal: abort.signal });
    });
    const listen = (target, event, handler) => target.addEventListener(event, handler, { signal: abort.signal });
    listen(dialog.querySelector('.photo-dialog-close'), 'click', () => dialog.close());
    listen(dialog.querySelector('[data-photo-previous]'), 'click', () => render(index - 1));
    listen(dialog.querySelector('[data-photo-next]'), 'click', () => render(index + 1));
    listen(dialog, 'keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        render(index + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    listen(dialog, 'click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    listen(dialog, 'close', () => {
      document.body.classList.remove('photo-viewer-open');
      opener?.focus({ preventScroll: true });
    });

    cleanup = () => {
      abort.abort();
      if (dialog.open) dialog.close();
      document.body.classList.remove('photo-viewer-open');
      cleanup = null;
    };
  }

  const hide = () => cleanup?.();
  const show = (event) => { if (event.persisted) init(); };
  window.addEventListener('pagehide', hide);
  window.addEventListener('pageshow', show);
  window.AlfaGallery = {
    dispose() {
      cleanup?.();
      window.removeEventListener('pagehide', hide);
      window.removeEventListener('pageshow', show);
    }
  };
  init();
})();
