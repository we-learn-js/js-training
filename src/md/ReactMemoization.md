# React Memoization

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
