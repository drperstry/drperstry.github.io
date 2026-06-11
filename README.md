# Abdulrahman Alhuwais — Portfolio

Personal portfolio website: [drperstry.github.io](https://drperstry.github.io/)

Built with [Angular](https://angular.dev/) (standalone components), NgRx, and
[ngx-translate](https://github.com/ngx-translate/core) with full English/Arabic
(LTR/RTL) support and dark/light themes.

## Development

```bash
npm install
npm start          # dev server at http://localhost:4200
```

## Build & Deploy

```bash
npm run build      # outputs to docs/
```

The site is served by GitHub Pages from the `docs/` folder, so commit the build
output along with source changes.

## Structure

- `src/app/Component/` — navbar, home, products, contact, footer components
- `src/app/store/` — NgRx store for language/theme (persisted to localStorage)
- `src/assets/i18n/` — `en.json` / `ar.json` translation files
  (note: ngx-translate only round-trips **string** leaf values — keep numbers as strings)
