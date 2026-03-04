# React Memoization

<!--section-->

## Equality in JavaScript

<!--slide-->

### Primitives

```ts
typeof 'hello'  // "string"
typeof 42       // "number"
typeof true     // "boolean"
```

> They are compared by **value**.

```ts
'hello' === 'hello' // true
42 === 42           // true
```

<!--slide-->

### Objects are compared by reference

```ts
const a = {}
const b = {}

a === b // false
```

`a` and `b` are different objects in memory, even though their content is identical.

> `===` on objects compares **memory references**, not content.

<!--slide-->

## Functions are objects

> In JavaScript, almost everything is an object.

```ts
typeof []        // "object"
typeof {}        // "object"
typeof function() {} // "function" — but still an object
```

Functions inherit from `Object` — they have properties, can be stored, passed, and returned.

[MDN // Function object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

<!--slide-->

### Function properties and methods

```js
Function.prototype = {
  length: Number, // Specifies the number of arguments expected.
  name: String, // The name of the function.
  /* ... */
  apply: Function, // Calls a function and sets its this to the provided value
  call: Function, // Calls (executes) a function and sets its this to the provided value
  bind: Function, // Creates a new function which, when called, has its this set to the provided value.
  /* ... */
  __proto__: Object.prototype,
};
```

<!--slide-->

> Any function is an **instance of** the `Function` constructor

```ts
console.log((function() {}).length); // 0
console.log((function(a) {}).length); // 1
console.log((function(a, b) {}).length); // 2
console.log((function(a, b = 1) {}).length); // 1
console.log((function(...args) {}).length); // 0

console.log((function() {}).name); // ""
console.log((function doSomething() {}.name); // "doSomething"
```

<!--slide-->

### As objects, functions are compared by reference

```ts
const greet  = () => 'Hello'
const greet2 = () => 'Hello'

greet === greet2 // false
```

Each declaration allocates a **new function object** in memory.


<!--section-->

## React rendering and referential equality

> By default, every time a parent component re-renders, all its children re-render too —
> even if their props have not changed.

<!--slide-->

### Functions are still objects

A component function re-executes on every render.

```tsx
function MyComponent() {
  const handleClick = () => console.log('clicked')
  //                  ↑ a brand new object on every render

  return <button onClick={handleClick}>Click</button>
}
```

> Every render produces a new `handleClick` instance,
> even though nothing about it has changed.

<!--slide-->

### memo

> `memo` is a higher-order component that **skips re-rendering**
> when props are shallowly equal to the previous render.

```tsx
import { memo } from 'react'

const Button = memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  console.log('Button rendered')
  return <button onClick={onClick}>{label}</button>
})
```

`Button` will only re-render if `onClick` or `label` actually change.

<!--slide-->

### How memo works

```tsx
// Simplified
function memo<P extends Record<string, unknown>>(Component: (props: P) => JSX.Element) {
  let prevProps: P | null = null
  let prevResult: JSX.Element | null = null
  return function Memoized(props: P) {
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

```tsx
function Parent() {
  const handleClick = () => console.log('clicked')
  //                  ↑ new object on every render of Parent

  return <Button onClick={handleClick} label="Click me" />
}
```

`memo` compares `onClick` using `===`.

`handleClick` is a new object every time → comparison is always `false`.

> **`Button` re-renders on every parent render, regardless of `memo`.**

<!--slide-->

### The root cause

```tsx
const prev = () => console.log('clicked')
const next = () => console.log('clicked')

prev === next // false — different objects, same body
```

`memo`'s shallow comparison cannot tell that two functions
with identical bodies are "the same".

> We need to **preserve the reference** across renders.

<!--section-->

## useCallback and useMemo

<!--slide-->

### useCallback

> `useCallback` returns a **memoized function reference**.
> It only creates a new function when one of its dependencies changes.

```tsx
const handleClick = useCallback(() => {
  console.log('clicked')
}, []) // empty array: stable reference for the component's lifetime
```

[React docs // useCallback](https://react.dev/reference/react/useCallback)

<!--slide-->

### How useCallback works

```ts
// Simplified
let cached: { fn: T; deps: unknown[] } | null = null

function useCallback<T extends Function>(fn: T, deps: unknown[]): T {
  if (cached === null || !depsEqual(cached.deps, deps)) {
    cached = { fn, deps }
  }
  return cached.fn
}
```

On each render, it compares `deps` against the previous call.
If they are equal, it returns the **same function reference** as before.

> React stores `cached` on the component's fiber node internally.

<!--slide-->

### Fixing the referential equality trap

```tsx
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return <Button onClick={handleClick} label="Click me" />
}
```

`handleClick` is now the **same reference** across renders.

`memo` sees `onClick` as unchanged → `Button` skips re-rendering.

<!--slide-->

### useMemo

> `useMemo` returns a **memoized value**.
> It only recomputes when one of its dependencies changes.

```tsx
interface Item { name: string }

const sortedList = useMemo(
  () => [...items].sort((a: Item, b: Item) => a.name.localeCompare(b.name)),
  [items]
)
```

Use this for expensive computations whose result depends on specific values.

[React docs // useMemo](https://react.dev/reference/react/useMemo)

<!--slide-->

### How useMemo works

```ts
// Simplified
let cached: { value: T; deps: unknown[] } | null = null

function useMemo<T>(factory: () => T, deps: unknown[]): T {
  if (cached === null || !depsEqual(cached.deps, deps)) {
    cached = { value: factory(), deps }
  }
  return cached.value
}
```

Same mechanism as `useCallback` — stores the last result and deps,
recomputes only when deps change.

> Same caveat: `cached` lives on the fiber node internally.

<!--slide-->

### useCallback is useMemo

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

```tsx
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

```tsx
// Instead of this:
const onCreate = useCallback(() => { /* ... */ }, [dep1])
const onUpdate = useCallback(() => { /* ... */ }, [dep1, dep2])
const onDelete = useCallback(() => { /* ... */ }, [dep1])

// Prefer this:
const handlers = useMemo(() => ({
  onCreate: () => { /* ... */ },
  onUpdate: () => { /* ... */ },
  onDelete: () => { /* ... */ },
}), [dep1, dep2])
```

One allocation. One dependency check. One stable reference.

<!--section-->

## When to use / when not to

> Memoization has a cost. Always measure before optimising.

<!--slide-->

### Stable callback for a memo-wrapped child

```tsx
const MemoChild = memo(({ onClick }: { onClick: () => void }) => {
  console.log('MemoChild rendered')
  return <button onClick={onClick}>Click</button>
})

function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return <MemoChild onClick={handleClick} />
}
```

Without `useCallback`, `MemoChild` re-renders every time `Parent` does — defeating `memo`.

<!--slide-->

### Callback as a useEffect dependency

```tsx
function SearchResults({ query }: { query: string }) {
  const fetchResults = useCallback(async () => {
    const res = await fetch(`/api/search?q=${query}`)
    return res.json()
  }, [query])

  useEffect(() => {
    fetchResults().then(setResults)
  }, [fetchResults]) // ← stable ref prevents infinite loops
}
```

If `fetchResults` were recreated on every render, `useEffect` would fire endlessly.

<!--slide-->

### Expensive computation with useMemo

```tsx
interface Row { category: string; amount: number }

function Report({ rows }: { rows: Row[] }) {
  const summary = useMemo(() => {
    // Imagine thousands of rows — genuinely expensive
    return rows.reduce((acc, row) => {
      acc[row.category] = (acc[row.category] ?? 0) + row.amount
      return acc
    }, {} as Record<string, number>)
  }, [rows])

  return <SummaryTable data={summary} />
}
```

`rows` changes rarely (e.g. on fetch), so the reduction is cached across most renders.

<!--slide-->

### When not to: child is not memo-wrapped

```tsx
function Child({ onClick }: { onClick: () => void }) {
  console.log('Child rendered')       // ← logs on every Parent render
  return <button onClick={onClick}>Click</button>
}

function Parent() {
  const handleClick = useCallback(() => console.log('clicked'), [])
  return <Child onClick={handleClick} />
}
```

`Child` is **not** wrapped in `memo`, so it re-renders regardless. The `useCallback` is pure overhead.

<!--slide-->

### When not to: trivial computation

```tsx
// ❌ useMemo overhead exceeds the savings
const count = useMemo(() => items.length, [items])
const label = useMemo(() => `${count} items`, [count])

// ✅ Just compute it
const count = items.length
const label = `${count} items`
```

Property access and string interpolation are essentially free — memoizing them costs more than recomputing.

<!--slide-->

### When not to: no measured problem

```tsx
// ❌ Memoizing everything "just in case"
function Dashboard({ user }: { user: User }) {
  const greeting = useMemo(() => `Hello, ${user.name}`, [user.name])
  const initials = useMemo(() => user.name.slice(0, 2).toUpperCase(), [user.name])
  const handleLogout = useCallback(() => logout(user.id), [user.id])

  return <Header greeting={greeting} initials={initials} onLogout={handleLogout} />
}
```

Three hooks, three dependency comparisons, three cached values — all for operations that take microseconds. Profile first with the React DevTools Profiler.

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

### useCallback without memo

```tsx
function Parent() {
  const handleClick = useCallback(() => console.log('clicked'), [])
  //                  ↑ overhead on every render of Parent

  return <Child onClick={handleClick} />  // ← Child is not memoized
}
```

`Child` re-renders on every `Parent` render regardless.

> `useCallback` only helps when the receiving component is wrapped in `memo`.

<!--slide-->

### Dependencies that always change

```tsx
function Component({ items }: { items: Item[] }) {
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

```tsx
const count = useMemo(() => items.length, [items])
```

The comparison of `items` between renders costs more than computing `.length` directly.

> `useMemo` pays off only when the computation is significantly more expensive than a dependency comparison.

<!--slide-->

### Cascading memoization

```tsx
// ❌ Three layers of memoization for a single pipeline
const a = useMemo(() => compute(x), [x])
const b = useMemo(() => transform(a), [a])
const c = useMemo(() => format(b), [b])
```

Every layer adds allocation and comparison overhead. If `x` changes frequently, all three recompute anyway.

```tsx
// ✅ One memoization for the whole pipeline
const c = useMemo(() => format(transform(compute(x))), [x])
```

> Measure with the React DevTools Profiler before adding layers of memoization.

<!--section-->

## Functions outside components

> Every function defined inside a component is recreated on every render.
>
> Functions defined **outside** the component are created once — at module load time.

<!--slide-->

### A component with a big function inside

```tsx
interface Product {
  name: string
  price: number
  discount?: number
  stock: number
}

function ProductCard({ product }: { product: Product }) {
  const getDisplayInfo = (product: Product) => {
    const name = product.name.trim().toUpperCase()
    const price = product.discount
      ? product.price * (1 - product.discount / 100)
      : product.price
    const formattedPrice = `$${price.toFixed(2)}`
    const badge = product.stock === 0
      ? 'Out of stock'
      : product.stock < 5 ? 'Low stock' : null
    return { name, formattedPrice, badge }
  }

  const { name, formattedPrice, badge } = getDisplayInfo(product)
  return (
    <div>
      <h2>{name}</h2>
      <span>{formattedPrice}</span>
      {badge && <span className="badge">{badge}</span>}
    </div>
  )
}
```

<!--slide-->

### The impact at scale

`getDisplayInfo` is defined inside `ProductCard`.

Every render of every `ProductCard` allocates a new function object,
parses its body, and creates a new closure.

```txt
1 ProductCard  →   1 new getDisplayInfo per render
100 ProductCards →  100 new getDisplayInfo per render cycle
```

> The bigger the function body, the more work the JS engine does per render — multiplied by every instance on the page.

<!--slide-->

### Split into small, focused functions

`getDisplayInfo` does four things. Give each its own function:

```ts
const formatName = (name: string): string =>
  name.trim().toUpperCase()

const applyDiscount = (price: number, discount?: number): number =>
  discount ? price * (1 - discount / 100) : price

const formatPrice = (price: number): string =>
  `$${price.toFixed(2)}`

const getStockBadge = (stock: number): string | null =>
  stock === 0 ? 'Out of stock' : stock < 5 ? 'Low stock' : null
```

Each function does one thing. Each is independently testable.

<!--slide-->

### Hoist them out of the component

```tsx
const formatName    = (name: string) => name.trim().toUpperCase()
const applyDiscount = (price: number, discount?: number) => discount ? price * (1 - discount / 100) : price
const formatPrice   = (price: number) => `$${price.toFixed(2)}`
const getStockBadge = (stock: number) => stock === 0 ? 'Out of stock' : stock < 5 ? 'Low stock' : null

function ProductCard({ product }: { product: Product }) {
  const name  = formatName(product.name)
  const price = formatPrice(applyDiscount(product.price, product.discount))
  const badge = getStockBadge(product.stock)
  return (
    <div>
      <h2>{name}</h2>
      <span>{price}</span>
      {badge && <span className="badge">{badge}</span>}
    </div>
  )
}
```

These 4 functions are created **once**, no matter how many `ProductCard`s render.

> If a function doesn't use `props`, `state`, or hooks — it doesn't belong inside the component.

<!--slide-->

### The rule

> If it's pure, hoist it.
> If it needs component data, pass that data as a parameter.
> Reach for `useCallback` only when you've exhausted these options.

Hoisting is free — no hooks overhead, no dependency arrays, no re-creation.

<!--section-->

## THANK YOU
