# Contributing to js-training

## Requirements

- [Bun](https://bun.sh) 1.x — runtime and package manager
- Node 20+ (used by the Astro CLI and Playwright; `.nvmrc` is set to `20`)

## Local Development

```bash
bun install
bun run dev       # starts dev server at http://localhost:4321/js-training
```

```bash
bun run build     # production build → /dist
bun run serve     # serve /dist locally
bun run lint      # Biome lint + format check
bun run format    # apply Biome fixes
bun run test      # Playwright e2e tests
```

## Project Structure

```
/
├── astro.config.mjs        # Astro config (base path, React, markdown pipeline)
├── biome.json              # Biome lint + format config
├── playwright.config.ts    # E2E test config
├── public/                 # Static assets (images, favicon, manifest)
├── src/
│   ├── md/                 # Markdown content (git subtree from wiki)
│   ├── content.config.ts   # Astro content collection over src/md
│   ├── pages/
│   │   ├── index.astro     # Home page
│   │   ├── docs/[slug].astro    # Document pages
│   │   ├── slides/[slug].astro  # Slideshow pages
│   │   └── 404.astro       # 404 page
│   ├── layouts/
│   │   └── Base.astro      # HTML shell (head, favicon, manifest)
│   ├── components/
│   │   ├── Sidebar.astro          # Chapter navigation sidebar
│   │   ├── HomeCard.astro         # Home page cards
│   │   ├── ScreenCornerLink.astro # Doc ⇄ slideshow corner toggle
│   │   ├── RevealDeck.tsx         # Reveal.js 5 island (client only)
│   │   └── ThreeBackground.tsx    # three.js homepage hero island
│   ├── lib/
│   │   ├── chapters.ts     # Content collection → Chapter mapping
│   │   ├── slides.ts       # Build-time slide markdown → HTML (unified + Shiki)
│   │   ├── paths.ts        # withBase() helper for the /js-training base path
│   │   ├── remark-base-images.mjs  # Prefixes /images/... with the base path
│   │   ├── config/         # reveal.ts config, chapters.js constants
│   │   └── mappers/        # MarkdownParser (slide splitting)
│   ├── packages/three-background/  # Legacy three.js scene (homepage hero)
│   ├── styles/
│   │   ├── global.scss     # Base page styles
│   │   └── reveal/         # Custom Reveal.js theme (template + overrides)
│   ├── constants.ts        # URL prefixes, chapter sections list
│   └── types.ts            # TypeScript type definitions
└── e2e/                    # Playwright tests + page objects
```

## How Pages Are Generated

Each `.md` file in `src/md/` produces **two pages**:

| URL pattern            | Template                      |
| ---------------------- | ----------------------------- |
| `/docs/<kebab-name>`   | `src/pages/docs/[slug].astro` |
| `/slides/<kebab-name>` | `src/pages/slides/[slug].astro` |

**Flow:**

1. The `chapters` content collection (`src/content.config.ts`) globs `src/md/*.md`, keeping the raw file basename as the entry id
2. `src/lib/chapters.ts → getChapters()` maps entries to chapters (title from the first `# h1`; files without one, like `_Footer.md`, are skipped)
3. Both page templates call `getChapters()` in `getStaticPaths()` — the camelCase filename becomes the kebab-case slug
4. Documents render with Astro's built-in markdown pipeline; slides are split by `src/lib/mappers/MarkdownParser.ts` and rendered to HTML at build time by `src/lib/slides.ts`, then booted client side by the `RevealDeck` island

## Adding or Editing Content

### Markdown file format

Each file in `src/md/` maps to one chapter. The filename (camelCase) becomes the URL slug (kebab-case): `AsyncProgramming.md` → `/docs/async-programming`.

Slides are separated by HTML comments:

```markdown
# Chapter Title

<!--section-->

## Section Title

<!--slide-->

### Slide Title

Content here — supports full markdown, code blocks, images, HTML.

<!--slide-->

Another slide in the same section.

<!--section-->

## Next Section
```

- `<!--section-->` — new horizontal section (left/right navigation in Reveal.js)
- `<!--slide-->` — new vertical slide within the current section

### Slide types

Slides can be tagged with a class comment for special styling:

```markdown
<!--slide-->
<!-- .slide: class='questionSlide' -->

## Exercise

What does this code output?
```

| Class           | Purpose                     |
| --------------- | --------------------------- |
| `questionSlide` | Exercise / question slide   |
| `responseSlide` | Solution / answer slide     |
| `alertSlide`    | Important / highlight slide |

### Speaker notes

```markdown
<!--slide-->

## My Slide

Visible content.

Note: This text only appears in speaker view, not projected.
```

Open the speaker view with `S` while in a slideshow.

### Images

Place images in `public/images/` and reference them as `/images/my-image.png`. The base path (`/js-training`) is prefixed automatically at build time.

### Registering a new chapter

New chapters are picked up automatically — just add the `.md` file. To add it to the **navigation sidebar**, register it in `src/constants.ts` under the appropriate section:

```typescript
// src/constants.ts
export const sections = [
  {
    title: 'JavaScript Syntax',
    chapters: [
      'Operators',
      'Objects',
      'MyNewChapter',   // ← add here, matches filename without .md
    ]
  },
  ...
]
```

## Content via Git Subtree (wiki)

`src/md/` is managed as a git subtree pointing to the `js-training.wiki` GitHub repository:

```bash
bun run wiki:pull   # merge latest changes from the wiki into src/md/
bun run wiki:push   # push changes in src/md/ back to the wiki
```

You can also edit markdown directly in `src/md/` and commit normally — the subtree just keeps the wiki in sync.

## Base Path

The site deploys to GitHub Pages under `/js-training` (`base` in `astro.config.mjs`). Astro does **not** prefix internal links automatically — always wrap internal hrefs with `withBase()` from `src/lib/paths.ts`. The dev and preview servers also serve under `/js-training`, so a missing prefix fails locally and in e2e, not just in production.

## Architecture Notes

- **`MarkdownParser`** — `src/lib/mappers/MarkdownParser.ts` splits raw markdown into a 2D array of slides using the `<!--section-->` / `<!--slide-->` separators. E2E slide ids (`data-slide-id`) come from it — change with care.
- **Build-time slide rendering** — `src/lib/slides.ts` converts each slide's markdown to HTML during the build (unified: remark-gfm + rehype-raw + Shiki). The browser only receives static markup; the `RevealDeck` island just initialises Reveal.js 5.
- **Reveal theme** — `src/styles/reveal/` compiles the reveal.js theme template with custom variables plus local overrides. Sass `@import` deprecation warnings from the template are silenced in `astro.config.mjs`.
- **three.js hero** — `src/packages/three-background/` is legacy code pinned to three 0.70, loaded lazily as a `client:idle` island (`ThreeBackground.tsx`). Candidate for a future port to current three.js.
