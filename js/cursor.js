/*
 * cursor.js — desktop-only pointer effects:
 *   - the custom cursor (a dot plus a ring that grows over links and shows labels)
 *   - "magnetic" buttons that lean towards the mouse
 *   - the floating project preview that follows the mouse over the project list
 *
 * On touch devices none of this runs and the normal cursor stays.
 */

import { $, $$, lerp, clamp, hasFinePointer } from './utils.js';

const PREVIEW = { width: 280, height: 350, offset: 40, edge: 16 };
const MAGNET = { reach: 40, pullX: 0.28, pullY: 0.38 };

/** Returned on touch devices, so callers don't need to check. */
const inactive = {
  showPreview() {},
  hidePreview() {},
  setPreviewContent() {},
  get previewVisible() {
    return false;
  },
};

export function initCursor({ reduced }) {
  if (!hasFinePointer) return inactive;

  document.documentElement.classList.add('has-cursor');
  const dot = $('#dot');
  const ring = $('#ring');
  const preview = $('#preview');

  /* ---- Mouse position ---- */
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (reduced) placeWithoutEasing();
    },
    { passive: true }
  );

  /* ---- Ring state: bigger over links and buttons, filled with a label where set ---- */
  document.addEventListener('pointerover', (e) => {
    const labelled = e.target.closest('[data-cursor-label]');
    const interactive = e.target.closest('a, button');
    ring.classList.toggle('label', Boolean(labelled));
    ring.classList.toggle('hot', !labelled && Boolean(interactive));
    ring.textContent = labelled ? labelled.dataset.cursorLabel : '';
  });
  document.addEventListener('pointerleave', () => ring.classList.remove('label', 'hot'));

  /* ---- Magnetic buttons (read all positions first, then write, so layout runs once) ---- */
  if (!reduced) {
    document.addEventListener(
      'pointermove',
      (e) => {
        const elements = $$('[data-magnetic]');
        const moves = elements.map((el) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const near =
            Math.abs(dx) < r.width / 2 + MAGNET.reach && Math.abs(dy) < r.height / 2 + MAGNET.reach;
          return near ? `translate(${dx * MAGNET.pullX}px, ${dy * MAGNET.pullY}px)` : '';
        });
        elements.forEach((el, i) => {
          if (el.style.transform !== moves[i]) el.style.transform = moves[i];
        });
      },
      { passive: true }
    );
  }

  /* ---- Floating preview ---- */
  let previewVisible = false;
  const card = { x: 0, y: 0, rotate: 0, scale: 0.86 };

  /** Where the preview should sit: right of the mouse, or left of it near the screen edge. */
  function previewTarget() {
    let x = mouse.x + PREVIEW.offset;
    if (x + PREVIEW.width > innerWidth - PREVIEW.edge) x = mouse.x - PREVIEW.offset - PREVIEW.width;
    const y = clamp(
      mouse.y - PREVIEW.height / 2,
      PREVIEW.edge,
      innerHeight - PREVIEW.height - PREVIEW.edge
    );
    return { x, y };
  }

  /* ---- Animation ---- */
  const ringPos = { ...mouse };

  function placeWithoutEasing() {
    const move = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    dot.style.transform = move;
    ring.style.transform = move;
    const { x, y } = previewTarget();
    preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function frame() {
    dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;

    ringPos.x = lerp(ringPos.x, mouse.x, 0.2);
    ringPos.y = lerp(ringPos.y, mouse.y, 0.2);
    ring.style.transform = `translate3d(${ringPos.x.toFixed(1)}px, ${ringPos.y.toFixed(1)}px, 0)`;

    const target = previewTarget();
    const speedX = target.x - card.x;
    card.x = lerp(card.x, target.x, 0.14);
    card.y = lerp(card.y, target.y, 0.14);
    card.rotate = lerp(card.rotate, clamp(speedX * 0.05, -7, 7), 0.12); // tilts in the direction of travel
    card.scale = lerp(card.scale, previewVisible ? 1 : 0.86, 0.12);
    preview.style.transform =
      `translate3d(${card.x.toFixed(1)}px, ${card.y.toFixed(1)}px, 0) ` +
      `rotate(${card.rotate.toFixed(2)}deg) scale(${card.scale.toFixed(3)})`;

    requestAnimationFrame(frame);
  }

  if (!reduced) requestAnimationFrame(frame);

  return {
    /** Show the preview; pass HTML to change what it shows. */
    showPreview(html) {
      if (html) preview.innerHTML = html;
      previewVisible = true;
      preview.classList.add('show');
    },
    hidePreview() {
      previewVisible = false;
      preview.classList.remove('show');
    },
    /** Swap the content without showing it (used after a language change). */
    setPreviewContent(html) {
      preview.innerHTML = html;
    },
    get previewVisible() {
      return previewVisible;
    },
  };
}
