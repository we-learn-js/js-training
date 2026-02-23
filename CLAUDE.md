# JS Training — Claude Instructions

## Project Overview

A frontend course built with Gatsby and reveal.js, aimed at taking low-to-mid level engineers to expert level. Covers JavaScript fundamentals, programming paradigms, and key libraries/frameworks.

Content is written in Markdown under `src/md/`. Each file is a course chapter rendered as a reveal.js slideshow. The wiki (`src/md/`) is synced via git subtree to a separate GitHub wiki repo.

**Dev server:** `npm run dev` (Gatsby)
**Build:** `npm run build`

## Content Structure

Chapters live in `src/md/*.md`. Each chapter uses two HTML comment tags to divide content:

- `<!--section-->` — separates major sections within a chapter
- `<!--slide-->` — separates individual slides within a section

**Slides must be short.** Each slide should contain only one concept, example, or quote. If content feels long, split it into additional slides.

### Typical slide anatomy

```md
# Chapter Title

<!--section-->

## Section Title

<!--slide-->

### Slide Title (optional)

> A short quote or definition

<!--slide-->

### Slide with code

Brief explanation.

\`\`\`js
// concise example
\`\`\`

<!--slide-->
```

### Chapters (src/md/)

Grouped by topic in `Home.md`:
- **ECMAScript Syntax:** Operators, Objects, Strings, Classes, Symbols, Modules, IteratorsAndGenerators
- **Core Concepts:** ScopesAndClosures, Functions, AsyncProgramming
- **APIs & Libraries:** React, Testing, WebAnimationsAPI
- **Programming Paradigms:** FunctionalProgramming, ObjectOrientedProgramming, ObjectOrientedDesignPrinciples, DesignPatterns, DomainDrivenDesign

## Git

**Never commit without explicit user approval.** Always present what you plan to commit and ask before running any `git commit` command.

## Skills

### Content Review

When asked to review a chapter:

1. **Fix spelling and grammar directly** — make the edits in place without asking.
2. **Propose content modernisation** — identify outdated practices, deprecated APIs, or old library versions. Suggest updates aligned with current best practices. Present proposals clearly (don't apply automatically unless asked).

Use expertise as a programming expert to judge what's outdated. Examples: old callback patterns vs. async/await, class-based React vs. hooks, outdated testing libraries, etc.

### Content Creation

When asked to create a new chapter:

- Follow the exact same structure as existing chapters: `<!--section-->` and `<!--slide-->` dividers, heading hierarchy (`#` → `##` → `###`), blockquotes for definitions/key points, fenced code blocks with language tag.
- Keep every slide short — one idea per slide.
- Use the same tone: concise, example-driven, progressive difficulty.
- Consistency matters: match the style, vocabulary, and formatting of existing chapters.
- Content must always be dividable into slides — never write paragraphs that can't be split at a `<!--slide-->` boundary.
