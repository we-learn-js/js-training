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
// ❌ Three layers of memoization for a single pipeline
const a = useMemo(() => compute(x), [x])
const b = useMemo(() => transform(a), [a])
const c = useMemo(() => format(b), [b])
```

Every layer adds allocation and comparison overhead. If `x` changes frequently, all three recompute anyway.

```jsx
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

```jsx
function ProductCard({ product }) {
  const getDisplayInfo = (product) => {
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

```js
const formatName = (name) =>
  name.trim().toUpperCase()

const applyDiscount = (price, discount) =>
  discount ? price * (1 - discount / 100) : price

const formatPrice = (price) =>
  `$${price.toFixed(2)}`

const getStockBadge = (stock) =>
  stock === 0 ? 'Out of stock' : stock < 5 ? 'Low stock' : null
```

Each function does one thing. Each is independently testable.

<!--slide-->

### Hoist them out of the component

```jsx
const formatName    = (name) => name.trim().toUpperCase()
const applyDiscount = (price, discount) => discount ? price * (1 - discount / 100) : price
const formatPrice   = (price) => `$${price.toFixed(2)}`
const getStockBadge = (stock) => stock === 0 ? 'Out of stock' : stock < 5 ? 'Low stock' : null

function ProductCard({ product }) {
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

### Currying for event handlers

Form field handlers close over `profile` and `onChange` — they can't simply be hoisted:

```jsx
// ❌ One function body per field, all recreated on every render
function ProfileForm({ profile, onChange }) {
  const handleName  = (e) => onChange({ ...profile, name:  e.target.value })
  const handleEmail = (e) => onChange({ ...profile, email: e.target.value })
  const handlePhone = (e) => onChange({ ...profile, phone: e.target.value })

  return (
    <form>
      <input onChange={handleName}  value={profile.name} />
      <input onChange={handleEmail} value={profile.email} />
      <input onChange={handlePhone} value={profile.phone} />
    </form>
  )
}
```

Three function bodies. Add a field → add another.

<!--slide-->

### Currying for event handlers — solution

```jsx
// ✅ Curried: onChange → profile → field → event
const makeFieldHandler = (onChange) => (profile) => (field) => (e) =>
  onChange({ ...profile, [field]: e.target.value })

function ProfileForm({ profile, onChange }) {
  const handleField = makeFieldHandler(onChange)(profile)
  //                  one partial application — no body

  return (
    <form>
      <input onChange={handleField('name')}  value={profile.name} />
      <input onChange={handleField('email')} value={profile.email} />
      <input onChange={handleField('phone')} value={profile.phone} />
    </form>
  )
}
```

`makeFieldHandler` is defined once. The component contains **no function bodies**.
Add a field → add one line in JSX, nothing else.

<!--slide-->

### The rule

> If it's pure, hoist it.
> If it needs component data, pass that data as a parameter.
> Reach for `useCallback` only when you've exhausted these options.

Hoisting is free — no hooks overhead, no dependency arrays, no re-creation.
