/*
 * content.js — everything the site says. Edit this file to change text, projects or experience.
 *
 *   T           texts in Croatian (hr) and English (en), grouped by page section.
 *               Keys match the data-i18n attributes in index.html.
 *   PROJECTS    the "Selected work" list, in the order shown.
 *   EXPERIENCE  the "Experience" list, in the order shown.
 */

/* ============ TEXTS ============ */

export const T = {
  hr: {
    // Navigation
    'nav.about': 'O meni',
    'nav.work': 'Radovi',
    'nav.exp': 'Iskustvo',
    'nav.contact': 'Kontakt',
    'nav.menu': 'Izbornik',
    'nav.close': 'Zatvori',

    // Hero
    'hero.place': 'Hrvatska',
    'hero.role': 'Developer i profesor informatike',
    'hero.statement': 'Gradim digitalne stvari koje ljudi stvarno koriste, a po mogućnosti i zapamte.',
    'hero.hint': 'Pomakni kursor preko imena',

    // About
    'about.label': 'O meni',
    'about.title': 'Gradim stvari kojima se ljudi vraćaju.',
    'about.lead1':
      'Ja sam Filip, profesor informatike i developer iz Hrvatske. Radim u školi i paralelno završavam diplomski studij informatike na Sveučilištu Jurja Dobrile u Puli.',
    'about.lead2':
      'Prije toga radio sam na softveru za banku i s bazama podataka. Učionica me naučila nešto što sam kod ne može: ljude zanima radi li nešto za njih, a ne koliko je pametno napravljeno. Volim male alate koji jednu stvar rade dobro, jasna sučelja i projekte koji izađu s laptopa i dođu do stvarnih ljudi.',
    'off.label': 'Izvan ekrana',
    'off.text':
      'Godinama sam igrao rukomet. Ostala mi je navika da treniram svaki dan, samo što sada treniram pisanje koda.',
    'off.more': 'Ostatak vremena odlazi na knjige i sport mladih.',

    // Work
    'work.label': 'Radovi',
    'work.title': 'Odabrani radovi',
    'work.hint': 'Prijeđi mišem za pregled, klikni za detalje',
    'work.swipe': 'Povuci za sljedeći',
    'work.view': 'Otvori',
    'work.type': 'Vrsta',
    'work.role': 'Uloga',
    'work.roleVal': 'Dizajn i razvoj',
    'work.code': 'Kod',
    'work.live': 'Uživo',
    'work.all': 'Svi projekti na GitHubu',

    // Experience
    'exp.label': 'Iskustvo',
    'exp.title': 'Gdje sam do sada bio',
    'exp.now': 'Sada',

    // Contact + footer
    'contact.label': 'Kontakt',
    c1: 'Napravimo',
    c2: 'nešto vrijedno',
    c3: 'pogleda.',
    'contact.sub': 'Posao, suradnja ili ideja koja ti ne da mira. Piši mi.',
    'contact.copy': 'Kopiraj',
    'contact.copied': 'Kopirano',
    'foot.made': 'Dizajnirano i izrađeno u Hrvatskoj',
    'foot.top': 'Natrag na vrh ↑',

    // Small labels inside the project posters (js/posters.js)
    'p.serving': 'Na redu',
    'p.wait': 'Procjena čekanja ~4 min',
    'p.when': 'Utorak',
    'p.confirmed': '3 od 5 potvrdilo',
    'p.deals': 'Ponude danas',
    'p.stay': '3 noćenja · 2 osobe',
  },

  en: {
    // Navigation
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.exp': 'Experience',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',

    // Hero
    'hero.place': 'Croatia',
    'hero.role': 'Developer & informatics teacher',
    'hero.statement': 'I build digital things people actually use, and ideally remember.',
    'hero.hint': 'Move your cursor across the name',

    // About
    'about.label': 'About',
    'about.title': 'I build things people come back to.',
    'about.lead1':
      "I'm Filip, an informatics teacher and developer from Croatia. I teach at a school and I'm finishing a master's in informatics at Juraj Dobrila University of Pula.",
    'about.lead2':
      "Before that I worked on software for a bank and with databases. The classroom taught me something code alone can't: people care whether a thing works for them, not how clever it is. I like small tools that do one job well, clear interfaces, and projects that leave the laptop and reach real people.",
    'off.label': 'Off-screen',
    'off.text':
      'I played handball for years. The habit of training every day stayed with me; these days I just train on code.',
    'off.more': 'The rest of my time goes to books and youth sport.',

    // Work
    'work.label': 'Work',
    'work.title': 'Selected work',
    'work.hint': 'Hover to preview, click for details',
    'work.swipe': 'Swipe for more',
    'work.view': 'Open',
    'work.type': 'Type',
    'work.role': 'Role',
    'work.roleVal': 'Design & build',
    'work.code': 'Code',
    'work.live': 'Live',
    'work.all': 'All projects on GitHub',

    // Experience
    'exp.label': 'Experience',
    'exp.title': "Where I've been so far",
    'exp.now': 'Now',

    // Contact + footer
    'contact.label': 'Contact',
    c1: "Let's make",
    c2: 'something',
    c3: 'worth seeing.',
    'contact.sub': "A job, a collaboration, or an idea that won't leave you alone. Write to me.",
    'contact.copy': 'Copy',
    'contact.copied': 'Copied',
    'foot.made': 'Designed and built in Croatia',
    'foot.top': 'Back to top ↑',

    // Small labels inside the project posters (js/posters.js)
    'p.serving': 'Now serving',
    'p.wait': 'Estimated wait ~4 min',
    'p.when': 'Tuesday',
    'p.confirmed': '3 of 5 confirmed',
    'p.deals': "Today's deals",
    'p.stay': '3 nights · 2 guests',
  },
};

/* ============ PROJECTS ============
 *
 *   id    short name; also picks the poster in js/posters.js
 *   repo  GitHub link   ('' hides the "Code" button)
 *   live  Vercel link   ('' hides the "Live" button)
 */

export const PROJECTS = [
  {
    id: 'smartque',
    name: 'SmartQue',
    repo: '',
    live: '',
    cat: { hr: 'Redovi čekanja', en: 'Queue management' },
    desc: {
      hr: 'Digitalni red čekanja za mjesta gdje ljudi čekaju: uzmeš broj na mobitelu, vidiš koliko je ljudi ispred tebe i dođeš kad si na redu.',
      en: "Digital queueing for places where people wait: take a number on your phone, see how many people are ahead of you, and show up when it's your turn.",
    },
  },
  {
    id: 'meeting',
    name: 'MeetingApp',
    repo: 'https://github.com/filip0906/MeetingApp',
    live: '',
    cat: { hr: 'Sastanci', en: 'Scheduling' },
    desc: {
      hr: 'Aplikacija za organizaciju sastanaka: kreiraš sastanak, pozoveš sudionike i pratiš tko je potvrdio dolazak. Blazor sučelje s vlastitim API-jem.',
      en: 'An app for organising meetings: create a meeting, invite people and track who has confirmed. A Blazor front end on its own API.',
    },
  },
  {
    id: 'backlog',
    name: 'Backlog Ledger',
    repo: '',
    live: '',
    cat: { hr: 'Otkrivanje igara', en: 'Game discovery' },
    desc: {
      hr: 'Aplikacija u retro stilu za pronalazak sljedeće igre. Filtriraš po platformi i žanru, vidiš ocjene i trenutne cijene povučene s ponuda trgovina.',
      en: 'A retro-styled app for finding your next game. Filter by platform and genre, check ratings, and see current prices pulled from store deals.',
    },
  },
  {
    id: 'apartmani',
    name: 'Apartmani',
    repo: '',
    live: '',
    cat: { hr: 'Turizam', en: 'Hospitality' },
    desc: {
      hr: 'Web stranica za apartmane za odmor: smještaj, cijene po sezoni i jasan put od „lijepo izgleda” do upita za rezervaciju.',
      en: 'A website for holiday apartments: the rooms, prices by season, and a clear path from "looks nice" to a booking request.',
    },
  },
  {
    id: 'luna',
    name: 'Luna',
    repo: '',
    live: '',
    cat: { hr: 'Web aplikacija', en: 'Web app' },
    desc: {
      hr: 'Web aplikacija mirnog, noćnog sučelja. Od prve skice do objavljene verzije.',
      en: 'A web app with a quiet, night-time interface. Taken from the first sketch to the live version.',
    },
  },
  {
    id: 'kalkulator',
    name: 'Kalkulator',
    repo: 'https://github.com/filip0906/kalkulator-app',
    live: '',
    cat: { hr: 'Alat', en: 'Tool' },
    desc: {
      hr: 'Kalkulator izrađen kao cijela web aplikacija, sa zasebnim backendom i frontendom. Mali projekt na kojem sam prošao cijeli put od servera do sučelja.',
      en: 'A calculator built as a complete web app, with a separate back end and front end. A small project that took me the whole way from server to interface.',
    },
  },
];

/* ============ EXPERIENCE ============
 *
 *   now     true shows the "Sada / Now" tag
 *   domain  the large word on the left
 */

export const EXPERIENCE = [
  {
    now: true,
    domain: { hr: 'Razred', en: 'Classroom' },
    role: { hr: 'Profesor informatike', en: 'Informatics teacher' },
    desc: {
      hr: 'Predajem informatiku u školi, a prije sam vodio i STEM radionice. Ako nešto možeš objasniti učeniku, stvarno to razumiješ.',
      en: 'I teach informatics at a school, and before that I ran STEM workshops. If you can explain something to a student, you really understand it.',
    },
  },
  {
    now: true,
    domain: { hr: 'Studij', en: 'Study' },
    role: {
      hr: 'Diplomski studij informatike, Sveučilište Jurja Dobrile u Puli',
      en: "Master's in Informatics, Juraj Dobrila University of Pula",
    },
    desc: {
      hr: 'Najviše vremena trenutno odlazi na analizu podataka i duboko učenje.',
      en: 'Most of my study time currently goes to data analysis and deep learning.',
    },
  },
  {
    domain: { hr: 'Banka', en: 'Banking' },
    role: { hr: 'Razvoj softvera', en: 'Software developer' },
    desc: {
      hr: 'Razvijao sam softver u bankarskoj instituciji, gdje svaka greška dotiče nečiji novac. Tamo sam naučio pisati kod koji se lako čita i teško ruši.',
      en: "Built software at a banking institution, where every error touches someone's money. It taught me to write code that is easy to read and hard to break.",
    },
  },
  {
    domain: { hr: 'Podaci', en: 'Data' },
    role: { hr: 'Praksa, baze podataka', en: 'Database internship' },
    desc: {
      hr: 'Sheme, upiti i sve ono nevidljivo ispod aplikacije. Otad prvo skiciram podatke, a tek onda ekrane.',
      en: 'Schemas, queries and everything invisible underneath an app. Since then I sketch the data before I sketch the screens.',
    },
  },
];
