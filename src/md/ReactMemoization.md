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
