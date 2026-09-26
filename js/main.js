/*
 * main.js — starts the page and handles everything that isn't the hero or the cursor:
 *   language switch (HR / EN), navigation and mobile menu, the local clock,
 *   the project list and mobile cards, and the "copy email" button.
 *
 * Module overview:
 *   content.js  all texts, projects and experience  ← edit this one to change content
 *   render.js   turns that content into HTML
 *   posters.js  the project artwork
 *   hero.js     the animated name
 *   cursor.js   custom cursor, magnetic buttons, floating preview
 *   utils.js    small shared helpers
 */

import { T, PROJECTS, EXPERIENCE } from './content.js';
import { poster } from './posters.js';
import { aboutTitleHTML, workListHTML, workRailHTML, experienceHTML } from './render.js';
import { initHero } from './hero.js';
import { initCursor } from './cursor.js';
import { $, $$, prefersReducedMotion, readStorage, writeStorage } from './utils.js';

const LANG_KEY = 'fm-lang';
const LANGUAGES = ['hr', 'en'];
const RAIL_GAP = 14; // must match the gap of .work-rail in css/style.css

/* ============ ELEMENTS ============ */

const el = {
  main: $('#main'),
  nav: $('#nav'),
  menu: $('#menu'),
  menuBtn: $('#menuBtn'),
  clock: $('#clock'),
  aboutTitle: $('#aboutTitle'),
  workCount: $('#workCount'),
  workList: $('#workList'),
  workRail: $('#workRail'),
  railCount: $('#railCount'),
  expList: $('#expList'),
  email: $('#email'),
  copyBtn: $('#copyBtn'),
};

const cursor = initCursor({ reduced: prefersReducedMotion });
initHero({ reduced: prefersReducedMotion });

/* ============ LANGUAGE ============ */

/** Language from the link (#hr / #en), then the last choice, then the browser's language. */
function initialLanguage() {
  const fromHash = location.hash.slice(1);
  if (LANGUAGES.includes(fromHash)) return fromHash;
  const saved = readStorage(LANG_KEY);
  if (LANGUAGES.includes(saved)) return saved;
  return navigator.language?.toLowerCase().startsWith('hr') ? 'hr' : 'en';
}

let lang = initialLanguage();
let previewId = null; // project currently shown in the floating preview

/** Put every text on the page into the current language. */
function applyLanguage() {
  const t = T[lang];
  document.documentElement.lang = lang;

  $$('[data-i18n]').forEach((node) => {
    const text = t[node.dataset.i18n];
    if (text != null) node.textContent = text;
  });
  $$('[data-lang]').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));
  el.menuBtn.textContent = t[isMenuOpen() ? 'nav.close' : 'nav.menu'];

  renderContent();

  const previewProject = PROJECTS.find((p) => p.id === previewId);
  if (previewProject) cursor.setPreviewContent(poster(previewProject, lang));
}

/** Switch language with a short fade (skipped for reduced motion). */
function setLanguage(next) {
  if (next === lang) return;
  lang = next;
  writeStorage(LANG_KEY, next);

  if (prefersReducedMotion) {
    applyLanguage();
    return;
  }
  el.main.classList.add('swapping');
  setTimeout(() => {
    applyLanguage();
    el.main.classList.remove('swapping');
  }, 220);
}

$$('[data-lang]').forEach((btn) => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));

/* ============ CONTENT ============ */

function renderContent() {
  const t = T[lang];
  const openIds = $$('.row.open', el.workList).map((row) => row.dataset.id);

  el.aboutTitle.innerHTML = aboutTitleHTML(t['about.title']);
  el.workCount.textContent = `(${PROJECTS.length})`;
  el.workList.innerHTML = workListHTML(PROJECTS, lang, t, openIds);
  el.workRail.innerHTML = workRailHTML(PROJECTS, lang, t);
  el.expList.innerHTML = experienceHTML(EXPERIENCE, lang, t);
  updateRailCount();
}

/* ============ NAVIGATION ============ */

const isMenuOpen = () => el.menu.classList.contains('open');

function toggleMenu(open = !isMenuOpen()) {
  el.menu.classList.toggle('open', open);
  el.menu.setAttribute('aria-hidden', String(!open));
  el.menu.toggleAttribute('inert', !open);
  el.menuBtn.setAttribute('aria-expanded', String(open));
  el.menuBtn.textContent = T[lang][open ? 'nav.close' : 'nav.menu'];
}

el.menuBtn.addEventListener('click', () => toggleMenu());
$$('a', el.menu).forEach((link) => link.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMenuOpen()) toggleMenu(false);
});

/* The bar gets a background and a condensed name once the page is scrolled. */
const updateNav = () => el.nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ============ CLOCK (local time in Croatia) ============ */

const timeFormat = new Intl.DateTimeFormat('hr-HR', {
  timeZone: 'Europe/Zagreb',
  hour: '2-digit',
  minute: '2-digit',
});
const updateClock = () => (el.clock.textContent = timeFormat.format(new Date()));
updateClock();
setInterval(updateClock, 20_000);

/* ============ PROJECT LIST (desktop) ============ */

/* Click a project name to open or close its details. */
el.workList.addEventListener('click', (e) => {
  const button = e.target.closest('.row-btn');
  if (!button) return;
  const row = button.closest('.row');
  const open = !row.classList.contains('open');
  row.classList.toggle('open', open);
  button.setAttribute('aria-expanded', String(open));
  if (open) cursor.hidePreview();
  else cursor.showPreview();
});

/* Hovering a closed project shows its poster next to the mouse. */
el.workList.addEventListener('pointerover', (e) => {
  const row = e.target.closest('.row');
  if (!row) return;
  if (!e.target.closest('.row-btn') || row.classList.contains('open')) {
    cursor.hidePreview();
    return;
  }
  let html = null;
  if (previewId !== row.dataset.id) {
    previewId = row.dataset.id;
    html = poster(PROJECTS.find((p) => p.id === previewId), lang);
  }
  cursor.showPreview(html);
});
el.workList.addEventListener('pointerleave', () => cursor.hidePreview());

/* ============ PROJECT CARDS (mobile) ============ */

/** Shows "2 / 6" under the swipeable cards. */
function updateRailCount() {
  const card = $('.card', el.workRail);
  if (!card) return;
  const step = card.getBoundingClientRect().width + RAIL_GAP;
  const index = Math.min(PROJECTS.length, Math.round(el.workRail.scrollLeft / step) + 1);
  el.railCount.textContent = `${index} / ${PROJECTS.length}`;
}
el.workRail.addEventListener('scroll', updateRailCount, { passive: true });
window.addEventListener('resize', updateRailCount);

/* ============ COPY EMAIL ============ */

el.copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(el.email.textContent.trim());
    el.copyBtn.textContent = T[lang]['contact.copied'];
    setTimeout(() => (el.copyBtn.textContent = T[lang]['contact.copy']), 1800);
  } catch {
    /* Clipboard blocked: select the address so it can be copied by hand. */
    const range = document.createRange();
    range.selectNodeContents(el.email);
    getSelection().removeAllRanges();
    getSelection().addRange(range);
  }
});

/* ============ START ============ */

applyLanguage();
