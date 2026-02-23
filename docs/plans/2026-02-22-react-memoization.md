# React Memoization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create `src/md/ReactMemoization.md`, a standalone chapter teaching React memoization to engineers who already know hooks basics.

**Architecture:** Concept-first — JS function identity → general memoization concept → React rendering model → useCallback/useMemo hooks → when to use / when not to. Each section is short and example-driven. One idea per slide.

**Tech Stack:** Markdown, reveal.js slide conventions (`<!--section-->` / `<!--slide-->`), modern React hooks (no class components).

---

## Style Reference

Before writing, note these conventions from the existing chapters:

- `<!--section-->` separates major sections; `<!--slide-->` separates individual slides within a section
- Heading hierarchy: `#` chapter title → `##` section → `###` subsection → `####` sub-subsection
- Blockquotes (`>`) for definitions and key takeaways — use them liberally
- Fenced code blocks always tagged with `js` or `jsx`
- Slides are short — one concept, one example, done. Split aggressively.
- Links to MDN inline: `[MDN // Topic](url)`

---

## Task 1: Create the file skeleton

**Files:**
- Create: `src/md/ReactMemoization.md`

**Step 1: Create the file with just the title and a placeholder first section**

```markdown
# React Memoization

<!--section-->

## Functions are objects
```

**Step 2: Verify the file exists**

Run: `ls src/md/ReactMemoization.md`
Expected: file listed

**Step 3: Commit**

```bash
git add src/md/ReactMemoization.md
git commit -m "feat: scaffold ReactMemoization chapter"
```

---

## Task 2: Write Section 1 — Functions are objects

**Files:**
- Modify: `src/md/ReactMemoization.md`

**Step 1: Replace the placeholder section with the full Section 1 content**

The section should contain these slides, in order:

```markdown
<!--section-->

## Functions are objects

> Functions in JavaScript are objects.
>
> Every function declaration creates a **new instance** — a new object in memory.

[MDN // Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

<!--slide-->

### Each declaration is a new instance

```js
const greet = () => 'Hello'
const greet2 = () => 'Hello'

greet === greet2 // false
```

Two functions with identical bodies are **different objects**.

<!--slide-->

### Unlike primitives

Primitive values with the same content are equal:

```js
'hello' === 'hello' // true
42 === 42           // true
```

Functions are not — `===` compares **references**, not content:

```js
(() => {}) === (() => {}) // false
```

<!--slide-->

### In React, this matters

A component function re-executes on every render.

```jsx
function MyComponent() {
  const handleClick = () => console.log('clicked')
  //                  ↑ a brand new object on every render

  return <button onClick={handleClick}>Click</button>
}
```

> Every render produces a new `handleClick` instance,
> even though nothing about it has changed.
```

**Step 2: Read back the file to verify formatting looks correct**

Check: section separator present, heading hierarchy correct, code blocks tagged `js`/`jsx`, no slide longer than ~10 lines.

**Step 3: Commit**

```bash
git add src/md/ReactMemoization.md
git commit -m "feat: add Section 1 - Functions are objects"
```

---

## Task 3: Write Section 2 — Memoization

**Files:**
- Modify: `src/md/ReactMemoization.md`

**Step 1: Append Section 2 after Section 1**

```markdown
<!--section-->

## Memoization

> Memoization is an optimization technique that **caches the result** of a function call
> and returns the cached result when the same inputs occur again.

<!--slide-->

### Caching computed values

```js
const cache = new Map()

function expensiveCalc(n) {
  if (cache.has(n)) return cache.get(n)

  const result = /* ... heavy computation ... */
  cache.set(n, result)
  return result
}
```

The function runs the computation once per unique input, then returns the cached result.

<!--slide-->

### Caching function instances

The same idea applies to **function references**.

Instead of creating a new function object on every call,
return the **same reference** as long as the inputs haven't changed.

> This is exactly what React's memoization hooks do.
```

**Step 2: Read back the file, verify Section 2 follows Section 1 cleanly**

**Step 3: Commit**

```bash
git add src/md/ReactMemoization.md
git commit -m "feat: add Section 2 - Memoization"
```

---

## Task 4: Write Section 3 — React rendering and referential equality

**Files:**
- Modify: `src/md/ReactMemoization.md`

**Step 1: Append Section 3**

```markdown
<!--section-->

## React rendering and referential equality

> By default, every time a parent component re-renders, all its children re-render too —
> even if their props have not changed.

<!--slide-->

### React.memo

> `React.memo` is a higher-order component that **skips re-rendering**
> when props are shallowly equal to the previous render.

```jsx
const Button = React.memo(({ onClick, label }) => {
  console.log('Button rendered')
  return <button onClick={onClick}>{label}</button>
})
```

`Button` will only re-render if `onClick` or `label` actually change.

<!--slide-->

### The referential equality trap

```jsx
function Parent() {
  const handleClick = () => console.log('clicked')
  //                  ↑ new object on every render of Parent

  return <Button onClick={handleClick} label="Click me" />
}
```

`React.memo` compares `onClick` using `===`.

`handleClick` is a new object every time → comparison is always `false`.

> **`Button` re-renders on every parent render, regardless of `React.memo`.**

<!--slide-->

### The root cause

```jsx
const prev = () => console.log('clicked')
const next = () => console.log('clicked')

prev === next // false — different objects, same body
```

`React.memo`'s shallow comparison cannot tell that two functions
with identical bodies are "the same".

> We need to **preserve the reference** across renders.
```

**Step 2: Read back and verify structure**

**Step 3: Commit**

```bash
git add src/md/ReactMemoization.md
git commit -m "feat: add Section 3 - React rendering and referential equality"
```

---

## Task 5: Write Section 4 — useCallback and useMemo

**Files:**
- Modify: `src/md/ReactMemoization.md`

**Step 1: Append Section 4**

```markdown
<!--section-->

## useCallback and useMemo

<!--slide-->

### useCallback

> `useCallback` returns a **memoized function reference**.
> It only creates a new function when one of its dependencies changes.

```jsx
const handleClick = useCallback(() => {
  console.log('clicked')
}, []) // empty array: stable reference for the component's lifetime
```

[MDN // useCallback](https://react.dev/reference/react/useCallback)

<!--slide-->

### Fixing the referential equality trap

```jsx
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return <Button onClick={handleClick} label="Click me" />
}
```

`handleClick` is now the **same reference** across renders.

`React.memo` sees `onClick` as unchanged → `Button` skips re-rendering.

<!--slide-->

### useMemo

> `useMemo` returns a **memoized value**.
> It only recomputes when one of its dependencies changes.

```jsx
const sortedList = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name))
}, [items])
```

Use this for expensive computations whose result depends on specific values.

[MDN // useMemo](https://react.dev/reference/react/useMemo)

<!--slide-->

### useCallback is useMemo

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

```jsx
const handleClick = useCallback(() => doSomething(), [])

// is the same as:
const handleClick = useMemo(() => () => doSomething(), [])
```

> React implements `useCallback` as a specialised `useMemo` internally.
>
> They are the same mechanism — one for functions, one for values.

<!--slide-->

### One useMemo over several useCallbacks

When grouping related handlers (e.g., a context value), memoize the whole object once:

```jsx
// Instead of this:
const onCreate = useCallback(() => { /* ... */ }, [])
const onUpdate = useCallback(() => { /* ... */ }, [])
const onDelete = useCallback(() => { /* ... */ }, [])

// Prefer this:
const handlers = useMemo(() => ({
  onCreate: () => { /* ... */ },
  onUpdate: () => { /* ... */ },
  onDelete: () => { /* ... */ },
}), [])
```

One allocation. One dependency check. One stable reference.
```

**Step 2: Read back and verify all 5 slides in this section are present and well-formed**

**Step 3: Commit**

```bash
git add src/md/ReactMemoization.md
git commit -m "feat: add Section 4 - useCallback and useMemo"
```

---

## Task 6: Write Section 5 — When to use / when not to

**Files:**
- Modify: `src/md/ReactMemoization.md`

**Step 1: Append Section 5**

```markdown
<!--section-->

## When to use / when not to

> Memoization has a cost. Always measure before optimising.

<!--slide-->

### When to use

- **`useCallback`** — when passing a callback to a `React.memo`-wrapped child component
- **`useMemo`** — when a computation is genuinely expensive and its inputs change rarely

```jsx
const filtered = useMemo(
  () => largeList.filter(item => item.active),
  [largeList]
)
```

<!--slide-->

### When not to use

- The child is **not wrapped** in `React.memo` — the re-render happens anyway
- The computation is **trivial** — memoization overhead exceeds the savings
- You haven't **measured** a real performance problem

> Premature memoization is premature optimisation.

<!--slide-->

### The hidden cost

Every `useCallback` and `useMemo` call, on **every render**:

- **Allocates memory** to store the cached value and its dependencies array
- **Runs a comparison** of all dependency values

Memoization that doesn't prevent a re-render is **pure overhead**.

<!--slide-->

### Rule of thumb

> Measure first, memoize second.

Use the React DevTools Profiler to identify actual bottlenecks
before reaching for `useCallback` or `useMemo`.
```

**Step 2: Read back the full file from top to bottom, checking:**
- All 5 sections are present with correct `<!--section-->` separators
- All slides are separated with `<!--slide-->`
- Code blocks all have a language tag (`js` or `jsx`)
- No slide is excessively long

**Step 3: Commit**

```bash
git add src/md/ReactMemoization.md
git commit -m "feat: add Section 5 - When to use / when not to"
```

---

## Task 7: Register the chapter in Home.md

**Files:**
- Modify: `src/md/Home.md`

**Step 1: Add the chapter link under APIs & Libraries**

In `src/md/Home.md`, find:

```markdown
## APIs & Libraries

- [React](./React)
- [Testing](./Testing)
- [Web Animations API](./WebAnimationsAPI)
```

Add the new chapter after React:

```markdown
## APIs & Libraries

- [React](./React)
- [React Memoization](./ReactMemoization)
- [Testing](./Testing)
- [Web Animations API](./WebAnimationsAPI)
```

**Step 2: Read back Home.md to verify the line was added correctly**

**Step 3: Commit**

```bash
git add src/md/Home.md
git commit -m "feat: register ReactMemoization chapter in Home"
```
