# Jeevan Adithya - Profile Website

A single-page personal profile built with **HTML5, CSS3 and vanilla JavaScript only**
(no frameworks, no libraries, no npm packages), deployed to GitHub Pages by GitHub Actions.

Live site: https://jeevanadithya624.github.io/Portfolio/

## Sections
Hero, About, Professional Journey (timeline with show-more), Skills, Projects,
Personal Interests (music, cinema, food, books, travel), Family (flip cards,
warm sub-palette), Hobbies (masonry gallery + modal) and Footer.

## Project structure
```
index.html            single page, all sections
css/theme.css         ALL colours, fonts, spacing, radii (CSS variables only)
css/style.css         layout and components, uses var() only (no raw colours)
js/main.js            nav, scroll effects, timeline toggles, flip cards, lightbox
images/               hero, journey, interests, family, hobbies
.github/workflows/    validate, deploy, pr-checks, lighthouse, notify
.htmlhintrc           HTML lint rules
.stylelintrc.json     CSS lint rules (also blocks raw colours in style.css)
```

## Theming - change one file
Every visual token lives in `css/theme.css`. Three themes ship: `dark` (default),
`light` and `emerald`. The nav button cycles them and remembers the choice.
To create a new theme, add a `[data-theme="name"]` block in `theme.css` only.

```bash
git checkout develop
git checkout -b theme/warm-tones
# edit ONLY css/theme.css
git add css/theme.css
git commit -m "Add warm-tones theme"
git push -u origin theme/warm-tones   # open a PR into develop
```

## CI/CD workflows
| File | Trigger | Purpose |
|---|---|---|
| `validate.yml` | push, PR | HTMLHint + Stylelint |
| `pr-checks.yml` | PR | title tag, image alt, no `console.log`, no inline styles; final `all-checks-passed` job |
| `deploy.yml` | push to `main` | build `_site/` and deploy to GitHub Pages |
| `lighthouse.yml` | after deploy, Mondays 09:00 UTC | performance audit, report artifact |
| `notify.yml` | after deploy | success/failure message, optional Slack |

### One-time GitHub settings
1. **Settings > Pages > Source:** GitHub Actions.
2. **Settings > Branches > Add rule** for `main` (and `develop`): require a pull
   request and require the status checks `validate` and `all-checks-passed`.
3. **Settings > Secrets and variables > Actions:** add `SLACK_WEBHOOK_URL` (optional).

## Branching model
`main` (production) <- `develop` (integration) <- `feature/*`, `theme/*`, `ci/*`.
No direct commits to `main`; every change goes through a pull request with a description.

## Adding your own photos
Drop images into the matching `images/` sub-folder and update the `src` and `alt`
in `index.html` (hero: `images/hero/`, family: `images/family/`, hobbies: `images/hobbies/`).
