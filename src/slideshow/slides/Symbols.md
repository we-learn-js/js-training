# Symbols

<!--section-->

> A symbol is a **unique and immutable** data type (added in ES6).

> The `Symbol` object is an implicit object wrapper for the symbol primitive data type.

```js
Symbol([description])
```

[MDN // Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

<!--slide-->

A symbol is not an object, but a primitive type.

```js
var sym1 = Symbol()
var sym2 = Symbol("foo")

console.log(sym1) // Symbol()
console.log(sym2) // Symbol(foo)
console.log(typeof sym1) // "symbol"
```


<!--slide-->

`Symbol("foo")` does not coerce the string "foo" into a symbol.

It creates a new symbol each time

Symbols are **always unique**.

```js
var sym1 = Symbol("foo")
var sym2 = Symbol("foo")
var obj = {[sym1]:1, [sym2]:2}

sym1 == sym2 // false
sym1 === sym2 // false
obj[sym1] // 1
obj[sym2] // 2
```

<!--slide-->

`Symbol` is a function.

```js
typeof Symbol // "function"
```

<!--slide-->

As a function, `Symbol` is an object with properties.

Many of them are simply global constants.

```js
Symbol = {
  /* ... */
  hasInstance: Symbol(Symbol.hasInstance)
  iterator: Symbol(Symbol.iterator)
  search: Symbol(Symbol.search)
  toPrimitive: Symbol(Symbol.toPrimitive)
  toStringTag: Symbol(Symbol.toStringTag)
}
```

...that we may talk about later on...

<!--slide-->

`Symbol` is not a constructor.

```js
new Symbol('foo')
// Uncaught TypeError: Symbol is not a constructor
```
