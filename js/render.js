/*
 * render.js — builds the HTML for the parts of the page that come from js/content.js:
 * the about headline, the project list (desktop), the project cards (mobile)
 * and the experience list. Each function returns a string; main.js puts it on the page.
 */

import { poster } from './posters.js';
import { escapeHTML as esc } from './utils.js';

/** The about headline, one <span> per word so each word can light up while scrolling. */
export function aboutTitleHTML(text) {
  return text
    .split(' ')
    .map((word) => `<span class="lit">${esc(word)}</span>`)
    .join(' ');
}

/** "Live ↗" and "Code ↗" links for a project; empty when it has neither. */
function projectLinksHTML(project, t) {
  const links = [];
  if (project.live) {
    links.push(
      `<a class="plink mono" href="${esc(project.live)}" target="_blank" rel="noopener"
          aria-label="${esc(project.name)}: ${t['work.live']}">${t['work.live']} ↗</a>`
    );
  }
  if (project.repo) {
    links.push(
      `<a class="plink mono" href="${esc(project.repo)}" target="_blank" rel="noopener"
          aria-label="${esc(project.name)}: ${t['work.code']} (GitHub)">${t['work.code']} ↗</a>`
    );
  }
  return links.length ? `<div class="plinks">${links.join('')}</div>` : '';
}

/** Desktop project list: big names that expand into a description panel. */
export function workListHTML(projects, lang, t, openIds = []) {
  return projects
    .map((project) => {
      const isOpen = openIds.includes(project.id);
      const category = esc(project.cat[lang]);
      return `
        <li class="row${isOpen ? ' open' : ''}" data-id="${project.id}">
          <button type="button" class="row-btn" id="w-${project.id}"
                  aria-expanded="${isOpen}" aria-controls="panel-${project.id}"
                  data-cursor-label="${esc(t['work.view'])}">
            <span class="w-name">${esc(project.name)}</span>
            <span class="w-cat mono">${category}</span>
            <span class="w-plus" aria-hidden="true"></span>
          </button>
          <div class="row-panel" id="panel-${project.id}" role="region" aria-labelledby="w-${project.id}">
            <div class="row-inner">
              <div class="panel-grid">
                <div>
                  <p>${esc(project.desc[lang])}</p>
                  <div class="meta">
                    <div><span class="mono">${t['work.type']}</span><b>${category}</b></div>
                    <div><span class="mono">${t['work.role']}</span><b>${t['work.roleVal']}</b></div>
                  </div>
                  ${projectLinksHTML(project, t)}
                </div>
                ${poster(project, lang)}
              </div>
            </div>
          </div>
        </li>`;
    })
    .join('');
}

/** Mobile project cards for the horizontal swipe rail. */
export function workRailHTML(projects, lang, t) {
  return projects
    .map(
      (project) => `
        <article class="card">
          ${poster(project, lang)}
          <h3>${esc(project.name)}</h3>
          <span class="mono">${esc(project.cat[lang])}</span>
          <p>${esc(project.desc[lang])}</p>
          ${projectLinksHTML(project, t)}
        </article>`
    )
    .join('');
}

/** Experience rows: a large metallic word, the role and a short description. */
export function experienceHTML(items, lang, t) {
  return items
    .map(
      (item) => `
        <li class="exp-row reveal">
          <span class="exp-domain" aria-hidden="true">${esc(item.domain[lang])}</span>
          <div>
            <h3 class="exp-role">${esc(item.role[lang])}</h3>
            <p class="exp-desc">${esc(item.desc[lang])}</p>
          </div>
          ${item.now ? `<span class="exp-tag mono">${t['exp.now']}</span>` : '<span></span>'}
        </li>`
    )
    .join('');
}
