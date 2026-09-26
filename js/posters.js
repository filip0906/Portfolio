/*
 * posters.js — the abstract artwork shown for each project.
 *
 * Every poster is plain HTML styled by css/posters.css, so there are no image files to load.
 * To add a poster for a new project, add a function to POSTERS using the project's `id`
 * from js/content.js. Projects without a poster get the generic one.
 */

import { T } from './content.js';
import { escapeHTML } from './utils.js';

/** Repeat an HTML snippet `count` times; `make(i)` returns the snippet for index i. */
const repeat = (count, make) => Array.from({ length: count }, (_, i) => make(i)).join('');

const POSTERS = {
  /* Calculator: a display with a Croatian-formatted result and a keypad */
  kalkulator: () => {
    const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', ',', 'C', '='];
    return `
      <div class="poster p-calc" aria-hidden="true">
        <div class="disp">
          <span class="p-mono">481,8 × 2,5</span>
          <span class="res">1.204,5</span>
        </div>
        <div class="keys">
          ${keys.map((key) => `<span class="key${key === '=' ? ' eq' : ''}">${key}</span>`).join('')}
        </div>
      </div>`;
  },

  /* SmartQue: the ticket being served and the people waiting behind it */
  smartque: (t) => {
    const dots = repeat(12, (i) =>
      i === 0
        ? '<span class="dot now"></span>'
        : `<span class="dot" style="opacity:${(1 - i * 0.07).toFixed(2)}"></span>`
    );
    return `
      <div class="poster p-queue" aria-hidden="true">
        <span class="p-mono">${t['p.serving']}</span>
        <div class="num"><b>A</b>047</div>
        <div class="dots">${dots}</div>
        <span class="p-mono">${t['p.wait']}</span>
      </div>`;
  },

  /* MeetingApp: a week grid with one booked slot and the confirmed attendees */
  meeting: (t) => {
    const cells = repeat(30, (i) => `<span class="c${i === 11 || i === 16 ? ' on' : ''}"></span>`);
    return `
      <div class="poster p-meet" aria-hidden="true">
        <span class="p-mono">${t['p.when']}</span>
        <div class="when">14:00</div>
        <div class="cal">${cells}</div>
        <div class="who">
          <i class="y"></i><i class="y"></i><i class="y"></i><i></i><i></i>
          <span class="p-mono">${t['p.confirmed']}</span>
        </div>
      </div>`;
  },

  /* Backlog Ledger: a retro ledger of game deals with a discount stamp */
  backlog: (t) => {
    const rows = [
      // [id, rating bar %, old price, new price]
      ['#0412', 72, '19,99', '4,99'],
      ['#0977', 45, '29,99', '14,99'],
      ['#1203', 88, '39,99', '9,99'],
      ['#0088', 30, '9,99', '2,49'],
      ['#2211', 61, '24,99', '7,49'],
      ['#0536', 52, '14,99', '3,74'],
    ];
    const rowsHTML = rows
      .map(
        ([code, rating, oldPrice, newPrice]) => `
          <div class="r">
            <span>${code}</span>
            <div class="track"><div class="bar" style="width:${rating}%"></div></div>
            <span class="pr"><s>€${oldPrice}</s><b>€${newPrice}</b></span>
          </div>`
      )
      .join('');
    return `
      <div class="poster p-ledger" aria-hidden="true">
        <div class="hd">The Backlog<br>Ledger</div>
        <span class="p-mono">${t['p.deals']}</span>
        ${rowsHTML}
        <span class="stamp">−75%</span>
      </div>`;
  },

  /* Apartmani: a building by the sea with two lit windows */
  apartmani: (t) => {
    const windows = repeat(12, (i) => `<span class="win${i === 4 || i === 9 ? ' lit' : ''}"></span>`);
    return `
      <div class="poster p-apt" aria-hidden="true">
        <span class="sun"></span>
        <div class="bldg">${windows}</div>
        <span class="sea"></span>
        <span class="chip p-mono">${t['p.stay']}</span>
      </div>`;
  },

  /* Luna: the phases of the moon over an outlined wordmark */
  luna: () => {
    const shadows = ['10cqw', '5cqw', null, '-5cqw', '-10cqw']; // null = full moon
    const phases = shadows
      .map((offset) =>
        offset === null
          ? '<span class="m full"></span>'
          : `<span class="m" style="box-shadow: inset ${offset} 0 0 0 #0E0D0C"></span>`
      )
      .join('');
    return `
      <div class="poster p-luna" aria-hidden="true">
        <span class="p-mono">Luna</span>
        <div class="phases">${phases}</div>
        <div class="word">LUNA</div>
      </div>`;
  },
};

/** Generic poster for projects that don't have their own yet. */
const fallbackPoster = (name) => `
  <div class="poster p-generic" aria-hidden="true">
    <span class="word">${escapeHTML(name)}</span>
  </div>`;

/** HTML for a project's poster in the given language ('hr' or 'en'). */
export function poster(project, lang) {
  const make = POSTERS[project.id];
  return make ? make(T[lang]) : fallbackPoster(project.name);
}
