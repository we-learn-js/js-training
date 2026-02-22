# React Memoization — Chapter Design

**Date:** 2026-02-22
**File:** `src/md/ReactMemoization.md`
**Audience:** Engineers who already know React hooks basics (useState, useEffect)
**Approach:** Concept-first (bottom-up: JS foundations → general memoization → React hooks)

---

## Structure

### Section 1 — Functions are objects

Brief recap (Functions.md and Objects.md already cover foundations deeply):

- Functions are objects; each declaration creates a **new instance**
- `===` compares references, not content — two identical arrow functions are not equal
- Contrast with primitives: `'hello' === 'hello'` → `true`, but `(() => {}) === (() => {})` → `false`
- One concise code slide demonstrating this

### Section 2 — Memoization

- Definition: caching the output of a call to avoid recomputing
- Manual example: a `Map`-based cache wrapping a pure function
- The same idea applied to function instances: caching a reference so it stays stable

### Section 3 — React rendering and referential equality

- Default: every parent re-render re-renders children
- `React.memo` skips a re-render when props are shallowly equal
- The trap: an inline callback is a new object on every render → `React.memo` is bypassed
- Small before/after code showing the problem

### Section 4 — `useCallback` and `useMemo`

- `useCallback(fn, deps)` — stable function reference across renders
- `useMemo(() => value, deps)` — stable computed value
- The relationship: `useCallback(fn, deps)` is literally `useMemo(() => fn, deps)`
- When to use one `useMemo` instead of several `useCallback`s: memoize an object of handlers (e.g., a context value) as one unit

### Section 5 — When to use / when not to

- **Use:** callbacks passed to `React.memo` children; expensive computations with `useMemo`
- **Don't use:** when the child re-renders anyway; when the computation is trivial; without measuring first
- Hidden cost: allocation + dependency comparison on every render — memoization that doesn't prevent a re-render is pure overhead
- Rule: measure first, memoize second

---

## Style Constraints

- Follow `<!--section-->` / `<!--slide-->` structure
- Heading hierarchy: `#` → `##` → `###` → `####`
- Blockquotes (`>`) for definitions and key takeaways
- Fenced code blocks with `js` language tag
- One idea per slide — split aggressively
- Modern React: hooks only, no class components
- Reference existing chapters (Functions.md, Objects.md) rather than re-explaining their content
