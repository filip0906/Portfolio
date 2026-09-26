# Filip Marić — portfolio

Osobna portfolio stranica na hrvatskom i engleskom. Personal portfolio site in Croatian and English.

Jedna statična datoteka (`index.html`), bez build koraka. A single static file with no build step.

## Uređivanje / Editing

Sav sadržaj je na vrhu skripte u `index.html`:

- `T` – svi tekstovi za HR i EN
- `PROJECTS` – projekti (`repo` = GitHub link, `live` = Vercel link; prazno = link se ne prikazuje)
- `EXPERIENCE` – iskustvo

## Deploy na Vercel

1. Na vercel.com: **Add New → Project** i odaberi ovaj repozitorij.
2. Framework Preset: **Other**. Build Command i Output Directory ostavi prazne.
3. **Deploy**. Svaki novi push na `main` automatski ponovno objavljuje stranicu.
