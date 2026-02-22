# Contributing to js-training

## Requirements

- Node 20 LTS — run `nvm use` at the project root (`.nvmrc` is set to `20`)
- npm 8+ (comes with Node 20)

## Local Development

```bash
npm install --legacy-peer-deps
npm run develop   # starts dev server at http://localhost:8000
```

The `--legacy-peer-deps` flag is required because `@atlaskit/navigation-next` declares a peer dep on React 16 and was abandoned before React 18 was released.

```bash
npm run build     # production build → /public
npm run serve     # serve /public locally
```

## Project Structure

```
/
├── gatsby-config.js        # Gatsby plugins (Sass, image, manifest, gtag)
├── gatsby-node.ts          # Page generation + webpack config
├── gatsby-browser.js       # Client-side providers (NavigationProvider, etc.)
├── gatsby-ssr.js           # SSR wrappers (minimal, Atlaskit is client-only)
├── src/
│   ├── md/                 # Markdown content (git subtree from wiki)
│   ├── components/         # React components
│   │   ├── layout/         # AppLayout, GlobalNav
│   │   ├── navigation/     # Navigation views, hooks, link items
│   │   ├── page-containers/ # MarkdownDocument, MarkdownSlideshow (Gatsby page templates)
│   │   ├── markdown/       # MarkdownDoc (react-markdown renderer)
│   │   ├── revealjs/       # RevealSlideshow + RevealMarkownSlides
│   │   ├── elements/       # Reusable buttons, cards
│   │   ├── hoc/            # Higher-order components (Priority, Auth, Domain)
│   │   └── root/           # RootWrapper, PageWrapper
│   ├── lib/
│   │   ├── config/         # firebase.js, reveal.js config, chapters.js
│   │   ├── mappers/        # MarkdownParser (slide splitting), markdown.ts (DTO → Chapter)
│   │   ├── user/Services/  # Auth services (Google, GitHub, SignOut)
│   │   ├── lectures/       # Chapter/slide services and repositories
│   │   ├── graphql-fragments/ # Shared GraphQL fragments
│   │   ├── index.js        # Service factory (lazy Firebase loading)
│   │   └── pages.ts        # Page generation logic called from gatsby-node.ts
│   ├── pages/
│   │   ├── index.tsx       # Home page
│   │   └── 404.tsx         # 404 page
│   ├── mocks/
│   │   └── atlaskit-navigation-next.js  # SSR-safe mock (aliased by webpack during build-html)
│   ├── constants.ts        # URL prefixes, chapter sections list
│   └── types.ts            # TypeScript type definitions
└── static/                 # Static assets (images, logo)
```

## How Pages Are Generated

Each `.md` file in `src/md/` produces **two pages**:

| URL pattern            | Template                                               |
| ---------------------- | ------------------------------------------------------ |
| `/docs/<kebab-name>`   | `src/components/page-containers/MarkdownDocument.tsx`  |
| `/slides/<kebab-name>` | `src/components/page-containers/MarkdownSlideshow.tsx` |

**Flow:**

1. `gatsby-source-filesystem` picks up files from `src/md/`
2. `gatsby-transformer-remark` parses them into `MarkdownRemark` GraphQL nodes
3. `gatsby-node.ts → onCreateNode` adds `fields.path` (doc/slideshow URLs) and `fields.fileBasename`
4. `gatsby-node.ts → createPages` calls `src/lib/pages.ts → getPages()`, which queries GraphQL for all chapters and calls `createPage()` for each doc/slideshow pair

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

### Images

Place images in `static/images/` and reference them as `/images/my-image.png`.

### Registering a new chapter

New chapters are picked up automatically by Gatsby — just add the `.md` file. To add it to the **navigation sidebar**, register it in `src/constants.ts` under the appropriate section:

```typescript
// src/constants.ts
export const SECTIONS = [
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
npm run wiki:pull   # merge latest changes from the wiki into src/md/
npm run wiki:push   # push changes in src/md/ back to the wiki
```

You can also edit markdown directly in `src/md/` and commit normally — the subtree just keeps the wiki in sync.

## Navigation Structure

The sidebar uses Atlaskit `navigation-next` with a three-view hierarchy:

```
Main view  →  Documents view  →  individual chapter
           →  Slideshows view →  individual chapter
```

Views are defined in:

- `src/components/navigation/views/mainNavigation.tsx` — top-level menu
- `src/components/providers/useChaptersNavigationView.tsx` — generates doc/slideshow views from the chapter list in `constants.ts`

The active view switches automatically based on the current URL path (handled in `src/components/layout/AppLayout.tsx`).

## SSR / Build Quirks

**`@atlaskit/navigation-next`** calls `localStorage` at module initialisation time, which breaks Gatsby's server-side rendering. During the `build-html` and `develop-html` webpack stages it is replaced with a no-op mock via a webpack alias configured in `gatsby-node.ts`. The full Atlaskit shell only runs in the browser (hydrated via `gatsby-browser.js`).

**Sass deprecations** — Reveal.js v3 ships legacy SCSS that triggers dart-sass warnings. These are suppressed via `silenceDeprecations` in `gatsby-config.js`. Do not remove that config unless Reveal.js is upgraded.

## Architecture Notes

- **Service factory** — `src/lib/index.js` exports a `JsTraining` class that lazy-loads Firebase and dynamically imports services on first use. This keeps Firebase out of the initial bundle.
- **Event bus** — `src/lib/bus.js` is a tiny `nanobus` instance used for auth state events between services and UI.
- **`MarkdownParser`** — `src/lib/mappers/MarkdownParser.ts` splits raw markdown into a 2D array of slides using the `<!--section-->` / `<!--slide-->` separators before passing them to Reveal.js.
