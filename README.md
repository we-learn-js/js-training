# js-training

> Interactive JavaScript training website — slideshows and documents generated from Markdown files.

![Logo](./public/images/logo.png)

Built with Astro (Vite), React 19 islands, and Reveal.js 5. Each Markdown file in `src/md/` becomes both a slideshow (`/slides/<name>`) and a readable document (`/docs/<name>`).

## Quick Start

**Requirements:** [Bun](https://bun.sh) 1.x

```bash
bun install
bun run dev          # http://localhost:4321/js-training
bun run build        # production build → /dist
bun run serve        # serve production build locally
```

## Content

Markdown content lives in `src/md/` and is managed as a **git subtree** from the [js-training wiki](https://github.com/we-learn-js/js-training.wiki.git):

```bash
bun run wiki:pull   # pull latest content from wiki
bun run wiki:push   # push content changes back to wiki
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add or edit content.

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | Astro 5 (Vite)                      |
| UI islands  | React 19                            |
| Slideshows  | Reveal.js 5                         |
| Styling     | Sass + Astro scoped styles          |
| Highlighting| Shiki (build time)                  |
| Lint/format | Biome                               |
| Runtime     | Bun                                 |
| Testing     | Playwright (e2e)                    |
| Language    | TypeScript                          |

## Resources

### Further Reading

- [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)

### Books (some of the sources)

- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS), by Kyle Simpson
- [Eloquent Javascript](http://eloquentjavascript.net/1st_edition/), by Marijn Haverbeke

### CheatSheets

- [ES6](https://devhints.io/es6)
- [JS Array](https://devhints.io/js-array)
- [JS Promises](https://devhints.io/promise)
- [React](https://devhints.io/react)
- [Bash](https://devhints.io/bash)

### Quizzes

- [ES6 Quiz](http://perfectionkills.com/javascript-quiz-es6/)
- [Code Quizzes](http://www.codequizzes.com/javascript)
- [Questions every JS developer should know](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95)

### Further Practice

- [ES6 katas](https://github.com/nothnk/es6katas)
- [JS katas](https://github.com/pedrovgs/JavaScriptKatas)

## Content Proposals

- Async Programming > [Async Iterators](http://2ality.com/2016/10/asynchronous-iteration.html#for-await-of)
- DOM API (as introduction to React/JSX)
- Functional Programming [Trampolines](https://blog.logrocket.com/using-trampolines-to-manage-large-recursive-loops-in-javascript-d8c9db095ae3)
- Objects > [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy): Handlers, Reflect, ...
- Errors handling: Catch errors, throw custom errors
- Last Session: Group review of current legacy code
- [Mastering the console](https://medium.com/@mattburgess/beyond-console-log-2400fdf4a9d8)
