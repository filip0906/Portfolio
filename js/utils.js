/*
 * utils.js — small helpers shared by the other modules.
 */

/** First element matching a CSS selector. */
export const $ = (selector, root = document) => root.querySelector(selector);

/** All elements matching a CSS selector, as a real array. */
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/** Escape text before it goes into an HTML string. */
export function escapeHTML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Move `from` a fraction of the way towards `to` (used for smooth easing each frame). */
export const lerp = (from, to, amount) => from + (to - from) * amount;

/** Keep a number between a minimum and a maximum. */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** The visitor asked their system for less motion. */
export const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A real mouse (not a touch screen), so the custom cursor and hover effects make sense. */
export const hasFinePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Same breakpoint as the mobile layout in css/style.css. */
export const mobileQuery = matchMedia('(max-width: 760px)');

/** Read from localStorage without crashing in private mode. */
export function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Write to localStorage without crashing in private mode. */
export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the choice just isn't remembered */
  }
}
