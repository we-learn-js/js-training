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
