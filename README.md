# js-training

> Interactive JavaScript training website — slideshows and documents generated from Markdown files.

![Logo](./static/images/logo.png)

Built with Gatsby v5, React 18, and Reveal.js. Each Markdown file in `src/md/` becomes both a slideshow (`/slides/<name>`) and a readable document (`/docs/<name>`).

## Quick Start

**Requirements:** Node 20 LTS (`nvm use`)

```bash
npm install --legacy-peer-deps
npm run develop      # http://localhost:8000
npm run build        # production build → /public
npm run serve        # serve production build locally
```

> The `--legacy-peer-deps` flag is required because `@atlaskit/navigation-next` declares a peer dep on React 16.

## Content

Markdown content lives in `src/md/` and is managed as a **git subtree** from the [js-training wiki](https://github.com/we-learn-js/js-training.wiki.git):

```bash
npm run wiki:pull   # pull latest content from wiki
npm run wiki:push   # push content changes back to wiki
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add or edit content.

## Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Framework  | Gatsby 5                           |
| UI         | React 18                           |
| Slideshows | Reveal.js 3                        |
| Styling    | Sass + Emotion + styled-components |
| Navigation | Atlaskit navigation-next           |
| Auth       | Firebase 8                         |
| Markdown   | react-markdown 9 + rehype-raw      |
| Language   | TypeScript + JavaScript            |

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
