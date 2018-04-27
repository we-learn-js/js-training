# Iterators And Generators

<!--section-->

## Iterators

> An object is an iterator when it knows how to access items from a collection one at a time.

In JavaScript an iterator is an object that provides a `next()` method which returns the next item in the sequence.

This method returns an object with two properties: `done` and `value`.

<!--slide-->

Iterator on array

```js
var array = ['yo', 'ya']
var it = generateIterator(array)
console.log(it.next()) // { value: "yo", done: false }
console.log(it.next()) // { value: "ya", done: false }
console.log(it.next()) // { value: undefined, done: true }
```

Iterator on object

```js
var obj = { a: 'yo', b: 'ya' }
var iterator = generateIterator(obj)
var iteratorResult = iterator.next()
while (!iteratorResult.done) {
  console.log(iteratorResult.value)
  iteratorResult = iterator.next()
}
// "yo" "ya"
```

<!--slide-->

```java
interface Iterator {
  next(): IteratorResult
}

interface IteratorResult {
  value: any
  done: boolean
}
```

<!--slide-->

```js
function generateIterator(obj) {
  var nextIndex = 0
  var keys = Object.keys(obj)
  return {
    next: function() {
      return nextIndex < keys.length
        ? { value: obj[keys[nextIndex++]], done: false }
        : { done: true }
    }
  }
}
```

<!--slide-->

## Iterables

> An object is **iterable** if it defines its **iteration behavior**, such as what values are looped over in a **for..of** construct.

> In order to be **iterable**, an object must implement the `@@iterator` method.

> It means that the object (or one of the objects up its prototype chain) must have a property with a `Symbol.iterator` key.

<!--slide-->

```java
interface Iterator {
  next(): IteratorResult
}

interface IteratorResult {
  value: any
  done: boolean
}

interface Iterable {
  [Symbol.iterator](): Iterator
}
```

[JS Training // Symbols](./Symbols.md)

<!--slide-->

```js
var obj = { a: 'yo', b: 'ya' }
for (let value of obj) {
  console.log(value)
}
// TypeError: obj[Symbol.iterator] is not a function
```

```js
var obj = { a: 'yo', b: 'ya' }
obj[Symbol.iterator] = generateIterator.bind(null, obj)
for (let value of obj) {
  console.log(value)
}
// "yo" "ya"

;[...obj] // ["yo", "ya"]
```

** An iterable may or may not implement the `length` property **

<!--slide-->

> Some built-in types, such as `Array` or `Map` or `String`, have a default iteration behavior, while other types (such as `Object`) do not.

```js
Array.prototype = {
  prototype: {
    ['length']: Number,
    ['push']: Function,
    /* [...] */
    [Symbol(Symbol.iterator)]: Function
  }
}
```

```js
Array.prototype[Symbol.iterator].toString()
// "function values() { [native code] }"
```

<!--slide-->

### To sum up

1.  An **Iterator** provides a `next()` method.
2.  `next()` returns an **IteratorResult**
3.  An **IteratorResult** is an object with `value` and `done` properties.
4.  An **Iterable** provides a `[Symbol.iterator]()` method
5.  The `[Symbol.iterator]()` method returns an **Iterator**.

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice

> Make `Textlines` iterable

```js
class TextLines {
  // YOUR CODE GOES HERE
}

var lines = new TextLines(getText())

for (var line of lines) {
  console.log(line)
}

// OUTPUT
// "LE LIÈVRE ET LA TORTUE"
// "Rien ne sert de courir  il faut partir à point."
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/IteratorsAndGenerators/regira?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible solution

```js
class TextLines {
  constructor(text) {
    this._lines = text.split('\n')
  }
  [Symbol.iterator]() {
    var nextIndex = 0
    return {
      next: () => {
        return nextIndex < this._lines.length
          ? { value: this._lines[nextIndex++], done: false }
          : { done: true }
      }
    }
  }
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/IteratorsAndGenerators/kuneliv?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible solution

```js
class TextLines {
  constructor(text) {
    this._lines = text.split('\n')
  }
  [Symbol.iterator]() {
    return this.lines[Symbol.iterator]()
  }
}
```

<!--section-->

## Generators

> **Generators** provide a powerful alternative to custom iterators: they allow you to define an **iterative algorithm** by writing a single function which can **maintain its own state**.

<!--slide-->

> A generator is a special type of function that works as a **factory for iterators**.

> It returns an object that provides `next()` method and a `done` property.

> A function becomes a generator if it uses the `function*` syntax and it contains one or more `yield` expressions.

<!--slide-->

```js
function* gen() {
  yield 1
}

var iterator = gen()
iterator // {next: Function , constructor: GeneratorFunction}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: undefined, done: true}
```

<!--slide-->

### `yield`

> The `yield` keyword is used to pause and resume a generator function.

<!--slide-->

> It can be thought of as a generator-based version of the `return` keyword.

> Once paused on a `yield` expression, the generator's code execution remains paused until the generator's next() method is called.

> When the end of the generator function is reached, an **IteratorResult** is returned to the caller in which the **value** is `undefined` and **done** is `true`.

<!--slide-->

```js
function* gen() {
  yield 1
  yield 2
  yield 3
}

var iterator = gen() // {next: Function , constructor: GeneratorFunction}
var iterator2 = gen()
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator2.next() // {value: 1, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: undefined, done: true}
```

<!--slide-->

```js
function* foo() {
  var index = 0
  while (index <= 2) yield index++
}

var iterator = foo()
iterator.next() // { value: 0, done: false }
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: undefined, done: true }
```

<!--slide-->

From `generateIterator` function to generator function:

```js
function generateIterator(obj) {
  var nextIndex = 0
  var keys = Object.keys(obj)
  return {
    next: function() {
      return nextIndex < keys.length
        ? { value: obj[keys[nextIndex++]], done: false }
        : { done: true }
    }
  }
}
```

<!--slide-->

```js
function* generateIterator(obj) {
  var nextIndex = 0
  var keys = Object.keys(obj)
  while (nextIndex < keys.length) yield obj[keys[nextIndex++]]
}

var obj = { a: 'yo', b: 'ya' }
var it = generateIterator(obj)
it.next().value // { value: "yo", done: false }
it.next().value // { value: "ya", done: false }
it.next().done // { value: undefined, done: true }
```

<!--slide-->

Another way:

From:

```js
function* generateIterator(obj) {
  var nextIndex = 0
  var keys = Object.keys(obj)
  while (nextIndex < keys.length) yield obj[keys[nextIndex++]]
}
```

To:

```js
function* generateIterator(obj) {
  for (let prop of Object.keys(obj)) {
    yield obj[prop]
  }
}
```

<!--slide-->

### return

> As in any function, `return` is used to stop the function execution with a definitive value.

> Then, when `return` is used, an **IteratorResult** is returned to the caller in which the **value** is the returned value and **done** is `true`.

<!--slide-->

```js
function* gen() {
  yield 1
  return 999999
  yield 2
}

var iterator = gen()
iterator.next() // { value:1, done:false }
iterator.next() // { value:999999, done:true }
iterator.next() // { value:undefined, done:true }
```

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

#### !Caution

> In loops, the value with `done:true` is NOT taken into account.

```js
function* g() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
  return 6
}

for (var v of g()) {
  console.log(v)
}
// 1 2 3 4 5

console.log(v) // still `5`, not `6` :(
```

<!--slide-->

### yield\*

> The `yield*` keyword is used to delegate to another **generator** or **iterable** object.

```js
yield * [[expression]]
```

The `yield*` expression iterates over the operand and yields each value returned by it.

<!--slide-->

```js
function* gen1() {
  yield 2
  yield 3
}
function* gen2() {
  yield 1
  yield* gen1()
  yield 4
}

var iterator = gen2()
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: undefined, done: true }
```

<!--slide-->

Any iterable can be used as well:

```js
function* gen() {
  yield* [1, 2]
  yield* '34'
}

var iterator = gen()

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: "3", done: false }
iterator.next() // { value: "4", done: false }
iterator.next() // { value: undefined, done: true }
```

<!--slide-->

### Remember iterators?

1.  An **Iterator** provides a `next()` method.
2.  `next()` returns an **IteratorResult**
3.  An **IteratorResult** is an object with `value` and `done` properties.
4.  An **Iterable** provides a `[Symbol.iterator]()` method
5.  The `[Symbol.iterator]()` method returns an **Iterator**

<!--slide-->

If the `[Symbol.iterator]()` method returns an **Iterator**.

Then it's a **generator**.

```js
function* gen() {
  yield* [1, 2]
  yield* '34'
}

var iterable = {}
iterable[Symbol.iterator] = gen

console.log([...iterable]) // [1, 2, "3", "4"]
```

<!--slide-->

### Infinite Generators

```js
function* idMaker() {
  var index = 0
  while (true) yield index++
}

var gen = idMaker()
console.log(gen.next().value) // 0
console.log(gen.next().value) // 1
console.log(gen.next().value) // 2
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice

> Convert `TextLines[Symbol.iterator]` to a generator

```js
[Symbol.iterator]() {
  var nextIndex = 0
  return {
    next: () => {
      return nextIndex < this._lines.length
      ? {value: this._lines[nextIndex++], done: false}
      : {done: true}
    }
  }
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/IteratorsAndGenerators/kuneliv?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible Solution

```js
class TextLines {
  constructor(text) {
    this._lines = text.split('\n')
  }

  *[Symbol.iterator]() {
    for (let line of this._lines) {
      yield line
    }
  }
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/IteratorsAndGenerators/xutadu?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible Solution

```js
class TextLines {
  constructor(text) {
    this._lines = text.split('\n')
  }

  *[Symbol.iterator]() {
    yield* this._lines
  }
}
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice

> Make `TextLines[Symbol.iterator]` lazy.

> It should yield the lines one by one. Helping performance.

```js
class TextLines {
  constructor(text) {
    this._text = text
  }

  *[Symbol.iterator]() {
    // YOUR CODE GOES HERE
  }
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/IteratorsAndGenerators/fafowi?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible solution

```js
class TextLines {
  constructor(text) {
    this._text = text
  }

  *[Symbol.iterator]() {
    const length = this._text.length
    let offset = 0

    while (offset < length) {
      let nextOffset = this._text.indexOf('\n', offset)
      nextOffset = nextOffset !== -1 ? nextOffset : length
      yield this._text.slice(offset, nextOffset)
      offset = nextOffset + 1
    }
  }
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/IteratorsAndGenerators/totayeq-4?embed

<!--section-->

# Must Read

[jsrocks.org // Iterators](http://jsrocks.org/2015/09/javascript-iterables-and-iterators/)

[2ality.com // ES6 generators in depth](http://www.2ality.com/2015/03/es6-generators.html)
