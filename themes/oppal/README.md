# oppal — Hugo theme for the Mullins Family Reunion

`oppal` is a self-contained Bootstrap 5 theme. **Everything reusable lives in
`themes/oppal/`** so the theme is portable; the site at the project root only
holds content, config, and any narrow site-specific overrides.

Built against **Hugo Extended v0.163.3**. The extended build is required (SCSS +
image processing).

## How the stack fits together

- **Bootstrap 5 via npm + SCSS, not CDN.** Bootstrap installs through `npm`
  (`bootstrap` dependency in the project `package.json`) and is exposed to Hugo's
  asset pipeline through **module mounts** in the project `hugo.toml`:
  - `node_modules/bootstrap/scss` → `assets/scss/bootstrap`
  - `node_modules/bootstrap/dist/js/bootstrap.bundle.min.js` → `assets/js/…`
- **One CSS file, one JS file, both fingerprinted.**
  - `assets/scss/main.scss` imports tokens → Bootstrap → components, compiled by
    Hugo Pipes with **libsass** (bundled in Hugo Extended — no external Sass
    dependency). Bootstrap 5.3 uses `@import` only (no Sass modules), so libsass
    handles it cleanly. See `partials/head.html`.
  - Bootstrap's JS bundle (includes Popper) + `assets/js/main.js` are concatenated,
    minified, fingerprinted, and loaded `defer`. See `partials/footer.html`.
  - Fingerprinting + compression run in **production only** (`hugo.IsProduction`);
    dev builds stay fast with source maps and expanded CSS.

## Brand tokens

Brand colours and fonts live in `assets/scss/_tokens.scss` and **override
Bootstrap's Sass variables** (imported before Bootstrap). Nothing else in the
theme hardcodes a colour or font.

> The current palette is a **placeholder** (neutral evergreen) until the Mullins
> brand is locked (oppal-plan §7.1). Swapping the values in `_tokens.scss` is the
> only change needed to rebrand.

Service IDs (`analyticsId`, `commentsId`, `emailFormId` — currently GA4, Cusdis,
MailerLite) are **not** in the theme — they live in the project `hugo.toml`
`[params]`, empty until provided. Params and partials are named by **function,
not vendor**, so swapping a service never renames the code.

## What's built (skeleton) vs. what grows

This is the **skeleton** from oppal-plan §5: a clean, building, Bootstrap-styled
shell to grow from.

**Built now**

| Area | Files |
|---|---|
| Layouts | `_default/{baseof,single,list,taxonomy}.html`, `index.html`, `404.html` |
| Partials | `partials/{head,header,nav,footer}.html` |
| Styles | `assets/scss/{main,_tokens,_components}.scss` |
| Script | `assets/js/main.js` (empty entry point) |
| Archetype | `archetypes/default.md` |
| Static | `static/favicon.svg` |

**Grows by phase** (see `site-dev/oppal-theme-build-plan.md` §4–5 and the runbook):
reunion `single`/`list`, `featured-reunion` selection + dynamic nav label, hero,
quick-facts, reunion subnav, history/news templates, and the `cta`, `countdown`,
`gallery`, `album`, `timeline` shortcodes, plus the comments / email-signup /
Netlify-form / analytics / schema partials.

## Local development

```bash
npm install          # installs Bootstrap into node_modules/
hugo server -D       # dev server with drafts; CSS is unfingerprinted + sourcemapped
hugo --gc --minify   # production build (matches Netlify): fingerprinted assets
```

## Editor notes (what's safe to touch)

- **Content** lives in the project `content/`, never in the theme.
- **Brand**: edit `_tokens.scss` only — do not hardcode colours in components.
- **Navigation**: edit `[menus.main]` in the project `hugo.toml`. The dynamic
  "[year] Reunion" item is generated in Phase 1, not added by hand.
- **Third-party embeds**: never paste raw `<script>` into content — every embed
  becomes a partial or shortcode (added in later phases).
- **Overrides**: Hugo's lookup order means a file placed back at the project root
  (e.g. `layouts/partials/footer.html`) overrides the theme — use that escape
  hatch only for genuine one-off, site-specific tweaks.

## Follow-ups

- Add an `.ico` / PNG favicon set alongside `favicon.svg` (currently SVG only).
- Lock the brand palette + fonts in `_tokens.scss`.
- Cherry-pick Bootstrap components in `main.scss` if CSS weight climbs past the
  performance budget (oppal-plan §6).
