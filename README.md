# Filip Marić — portfolio

Osobna portfolio stranica na hrvatskom i engleskom. Personal portfolio site in Croatian and English.

Čisti HTML, CSS i JavaScript, bez frameworka i bez build koraka. Vercel objavljuje datoteke onakve kakve jesu.

## Struktura

```
index.html          struktura stranice (sekcije, navigacija, kontakt)
favicon.svg         ikona u tabu preglednika (ljubičasto Ć)
css/
  style.css         izgled cijele stranice: boje, fontovi, raspored, mobilni prikaz
  posters.css       izgled apstraktnih postera za projekte
js/
  content.js        SVI TEKSTOVI, projekti i iskustvo (HR + EN)  ← ovo najčešće mijenjaš
  main.js           pokreće stranicu: jezik, izbornik, sat, popis projekata, kopiranje e-maila
  render.js         pretvara sadržaj iz content.js u HTML
  posters.js        crta poster za svaki projekt
  hero.js           animacija imena i svjetlo iza njega
  cursor.js         vlastiti kursor, "magnetski" gumbi, plutajući pregled projekta
  utils.js          male pomoćne funkcije
```

## Najčešće izmjene

**Promijeniti tekst** – u `js/content.js`, objekt `T`. Svaki tekst postoji dvaput: pod `hr` i pod `en`.
Ključevi (npr. `'hero.statement'`) odgovaraju atributima `data-i18n` u `index.html`.

**Dodati projekt** – u `js/content.js`, u listu `PROJECTS` dodaj novi objekt:

```js
{
  id: 'novi-projekt',
  name: 'Novi projekt',
  repo: 'https://github.com/filip0906/novi-projekt', // '' = bez gumba "Kod"
  live: 'https://novi-projekt.vercel.app',           // '' = bez gumba "Uživo"
  cat: { hr: 'Web aplikacija', en: 'Web app' },
  desc: { hr: 'Opis na hrvatskom.', en: 'Description in English.' },
},
```

Projekt bez vlastitog postera dobiva općeniti poster sa svojim imenom. Vlastiti poster dodaješ u `js/posters.js` pod istim `id`-jem.

**Dodati iskustvo** – u `js/content.js`, lista `EXPERIENCE`. `now: true` prikazuje oznaku „Sada”.

**Boje i fontovi** – na vrhu `css/style.css`, u bloku `:root`.

## Lokalno pokretanje

JavaScript koristi ES module, pa stranicu treba otvoriti preko lokalnog servera, a ne dvoklikom na datoteku:

```bash
npx serve .
# ili
python3 -m http.server 8000
```

## Deploy

Repozitorij je povezan s Vercelom: svaki push na `main` automatski objavljuje novu verziju.
