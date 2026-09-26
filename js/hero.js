/*
 * hero.js — the animated name at the top of the page.
 *
 * Each letter of "FILIP MARIĆ" is a variable-font letter (Archivo has a weight and a width axis).
 * Letters near the mouse get heavier and wider, like a lens. When the mouse is elsewhere
 * (or on a phone), a slow wave runs through the letters instead.
 * A soft light follows the same movement behind the name.
 */

import { $, $$, lerp, mobileQuery } from './utils.js';

/* Axis ranges: [at rest, fully under the lens] */
const AXES = {
  desktop: { weight: [250, 860], width: [100, 125] },
  mobile: { weight: [280, 820], width: [70, 98] },
};

const EASE_LETTERS = 0.1; // how quickly letters follow their target (0–1 per frame)
const EASE_LIGHT = 0.06; // how quickly the light follows
const LENS_RADIUS = 0.95; // lens size, as a fraction of the font size

export function initHero({ reduced }) {
  const hero = $('#top');
  const nameEl = $('#name');
  const light = $('#spot');
  const letters = $$('.ch', nameEl);

  const axes = () => (mobileQuery.matches ? AXES.mobile : AXES.desktop);
  const setLetter = (el, weight, width) => {
    el.style.fontVariationSettings = `"wght" ${weight.toFixed(0)}, "wdth" ${width.toFixed(1)}`;
  };

  /* Reduced motion: show the name at rest and stop here. */
  if (reduced) {
    const { weight, width } = axes();
    letters.forEach((el) => setLetter(el, weight[0], width[0]));
    return;
  }

  /* ---- Layout, measured outside the animation loop (in page coordinates) ---- */
  let fontSize = 100;
  let centers = [];
  let box = { left: 0, top: 0, width: 0, height: 0 };
  let lightSize = 0;

  function measure() {
    const sx = window.scrollX;
    const sy = window.scrollY;
    fontSize = parseFloat(getComputedStyle(nameEl).fontSize);
    centers = letters.map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 + sx, y: r.top + r.height / 2 + sy };
    });
    const r = hero.getBoundingClientRect();
    box = { left: r.left + sx, top: r.top + sy, width: r.width, height: r.height };
    lightSize = light.offsetWidth;
  }

  measure();
  document.fonts?.ready.then(measure);
  window.addEventListener('load', measure);
  window.addEventListener('resize', measure);

  /* ---- Pointer ---- */
  const mouse = { x: 0, y: 0 };
  let pointerInside = false;

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true }
  );
  hero.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    pointerInside = true;
    measure();
  });
  hero.addEventListener('pointerleave', () => {
    pointerInside = false;
  });

  /* Only animate while the hero is on screen. */
  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }).observe(hero);

  /* ---- Animation state: letters start narrow and thin, then settle (the intro) ---- */
  const current = letters.map(() => ({ weight: 100, width: 62 }));
  const lightPos = { x: 0, y: 0 };

  /** How strongly letter i is affected right now, from 0 to 1. */
  function influence(i, time, px, py) {
    if (pointerInside && centers[i]) {
      const dx = px - centers[i].x;
      const dy = py - centers[i].y;
      const radius = fontSize * LENS_RADIUS;
      return Math.exp(-(dx * dx + dy * dy) / (radius * radius));
    }
    const wave = 0.5 + 0.5 * Math.sin(time / 1100 - i * 0.62);
    return wave ** 3 * 0.75;
  }

  function frame(time) {
    if (visible) {
      const { weight, width } = axes();
      const px = mouse.x + window.scrollX;
      const py = mouse.y + window.scrollY;

      letters.forEach((el, i) => {
        const amount = influence(i, time, px, py);
        const state = current[i];
        state.weight = lerp(state.weight, lerp(weight[0], weight[1], amount), EASE_LETTERS);
        state.width = lerp(state.width, lerp(width[0], width[1], amount), EASE_LETTERS);
        setLetter(el, state.weight, state.width);
      });

      const target = pointerInside
        ? { x: px - box.left, y: py - box.top }
        : {
            x: box.width * (0.5 + 0.32 * Math.sin(time / 4200)),
            y: box.height * (0.45 + 0.2 * Math.cos(time / 5300)),
          };
      lightPos.x = lerp(lightPos.x, target.x - lightSize / 2, EASE_LIGHT);
      lightPos.y = lerp(lightPos.y, target.y - lightSize / 2, EASE_LIGHT);
      light.style.transform = `translate3d(${lightPos.x.toFixed(1)}px, ${lightPos.y.toFixed(1)}px, 0)`;
    }
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
