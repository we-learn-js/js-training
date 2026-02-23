# React Memoization

<!--section-->

## Functions are objects

> In JavaScript, almost everything is an object.

```js
typeof []        // "object"
typeof {}        // "object"
typeof function() {} // "function" — but still an object
```

Functions inherit from `Object` — they have properties, can be stored, passed, and returned.

[MDN // Function object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

<!--slide-->

### Primitives are the exception

```js
typeof 'hello'  // "string"
typeof 42       // "number"
typeof true     // "boolean"
```

> Primitives are not objects.
> They are compared by **value**.

```js
'hello' === 'hello' // true
42 === 42           // true
```

<!--slide-->

### Objects are compared by reference

```js
const a = {}
const b = {}

a === b // false
```

`a` and `b` are different objects in memory, even though their content is identical.

> `===` on objects compares **memory references**, not content.

<!--slide-->

### Functions follow the same rule

```js
const greet  = () => 'Hello'
const greet2 = () => 'Hello'

greet === greet2 // false
```

Each declaration allocates a **new function object** in memory.

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

### How React.memo works

```jsx
// Simplified
function memo(Component) {
  let prevProps = null
  let prevResult = null
  return function Memoized(props) {
    if (prevProps !== null && shallowEqual(props, prevProps)) {
      return prevResult           // ← skip re-render
    }
    prevProps = props
    prevResult = <Component {...props} />
    return prevResult
  }
}
```

It stores the previous props and result, and returns the cached result when props haven't changed.

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

[React docs // useCallback](https://react.dev/reference/react/useCallback)

<!--slide-->

### How useCallback works

```jsx
// Simplified
function useCallback(fn, deps) {
  const ref = useRef(null)
  if (ref.current === null || !depsEqual(ref.current.deps, deps)) {
    ref.current = { fn, deps }
  }
  return ref.current.fn
}
```

On each render, it compares `deps` against the previous call.
If they are equal, it returns the **same function reference** as before.

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

[React docs // useMemo](https://react.dev/reference/react/useMemo)

<!--slide-->

### How useMemo works

```jsx
// Simplified
function useMemo(factory, deps) {
  const ref = useRef(null)
  if (ref.current === null || !depsEqual(ref.current.deps, deps)) {
    ref.current = { value: factory(), deps }
  }
  return ref.current.value
}
```

Same mechanism as `useCallback` — stores the last result and deps,
recomputes only when deps change.

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

<!--section-->

## When to use / when not to

> Memoization has a cost. Always measure before optimising.

<!--slide-->

### When to use

- **`useCallback`** — when passing a callback to a `React.memo`-wrapped child, or when a function is a dependency in a `useEffect`
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

<!--section-->

## Common pitfalls

> Memoization done wrong adds overhead without eliminating re-renders.

<!--slide-->

### useCallback without React.memo

```jsx
function Parent() {
  const handleClick = useCallback(() => console.log('clicked'), [])
  //                  ↑ overhead on every render of Parent

  return <Child onClick={handleClick} />  // ← Child is not memoized
}
```

`Child` re-renders on every `Parent` render regardless.

> `useCallback` only helps when the receiving component is wrapped in `React.memo`.

<!--slide-->

### Dependencies that always change

```jsx
function Component({ items }) {
  const filtered = useMemo(
    () => items.filter(item => item.active),
    [{ items }]  // ← new object on every render
  )
}
```

The dependency array is compared with `===`. An inline object is always a new reference — deps are always "changed", the memo never hits.

**Fix:** pass `items` directly, not wrapped in an object.

<!--slide-->

### Trivial computations

```jsx
const count = useMemo(() => items.length, [items])
```

The comparison of `items` between renders costs more than computing `.length` directly.

> `useMemo` pays off only when the computation is significantly more expensive than a dependency comparison.

<!--slide-->

### Cascading memoization

```jsx
const a = useMemo(() => compute(x), [x])
const b = useMemo(() => transform(a), [a])
const c = useMemo(() => format(b), [b])
```

Every layer adds allocation and comparison overhead. If `x` changes frequently, all three recompute anyway — and you've paid the overhead on every render.

> Measure with the React DevTools Profiler before adding layers of memoization.
