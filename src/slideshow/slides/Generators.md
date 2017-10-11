# Iterators And Generators

---

## Iterators

> An object is an iterator when it knows how to access items from a collection one at a time.

> In JavaScript an iterator is an object that provides a `next()` method which returns the next item in the sequence.

> This method returns an object with two properties: `done` and `value`.

----

```js
var array = ['yo', 'ya']
var it = makeIterator(array);
console.log(it.next().value); // "yo"
console.log(it.next().value); // "ya"
console.log(it.next().done);  // true
```

```js
var obj = { a: 'yo', b: 'ya' }
var it = makeIterator(obj);
while(value = it.next().value) {
  console.log(value)
}
// "yo" "ya"
```


----

```js
function makeIterator(obj) {
  var nextIndex = 0;
  var keys = Object.keys(obj)
  return {
    next: function(){
      return nextIndex < keys.length
      ? {value: obj[keys[nextIndex++]], done: false}
      : {done: true};
    }
  }
}
```

----

## Iterables

> An object is **iterable** if it defines its iteration behavior, such as what values are looped over in a **for..of** construct.

> In order to be **iterable**, an object must implement the `@@iterator` method, meaning that the object (or one of the objects up its prototype chain) must have a property with a `Symbol.iterator` key.

> Some built-in types, such as `Array` or `Map` or `String`, have a default iteration behavior, while other types (such as `Object`) do not.

----

```js
var obj = { a: 'yo', b: 'ya' }
for(let value of obj) {
  console.log(value);
}
// TypeError: obj[Symbol.iterator] is not a function
```

```js
var obj = { a: 'yo', b: 'ya' }
obj[Symbol.iterator] = makeIterator.bind(null, obj)
for(let value of obj) {
  console.log(value);
}
// "yo" "ya"

[...obj] // ["yo", "ya"]
```

Note: An iterable may or may not implement the `length` property.

----

### To sum up

> An **Iterator** provides a `next()` method.

> `next()` returns an **IteratorResult**, which is an object with `value` and `done` properties.

> An **Iterable** provides a `[Symbol.iterator]()` that returns an **Iterator**.

----

```js
interface Iterable {
  [Symbol.iterator]() : Iterator;
}
interface Iterator {
  next() : IteratorResult;
  return?(value? : any) : IteratorResult;
}
interface IteratorResult {
  value : any;
  done : boolean;
}
```

----

### Practice

> Make `Textlines` iterable

```js
class TextLines {
  // YOUR CODE GOES HERE
}


var lines = new TextLines(getText())

for( var line of lines ) {
  console.log(line.length)
}

// OUTPUT
// 148
// 121
```
https://jsbin.com/regira/edit?js,console,output

----

#### Possible solution

```js
class TextLines {
  constructor (text) {
    this._lines = text.split('\n');
  }
  [Symbol.iterator]() {
    var nextIndex = 0;
    return {
      next: () => {
        return nextIndex < this._lines.length
        ? {value: this._lines[nextIndex++], done: false}
        : {done: true};
      }
    }
  }
}
```

https://jsbin.com/kuneliv/edit?js,console,output

---

## Generators

> **Generators** provide a powerful alternative to custom iterators: they allow you to define an iterative algorithm by writing a single function which can maintain its own state.

> A generator is a special type of function that works as a **factory for iterators**.

> It returns an object that provides `next()` method and a `done` property.

> A function becomes a generator if it uses the **function*** syntax and it contains one or more **yield** expressions.

----

```js
function* gen() {
  yield 1;
}
```

----

### yield

> The `yield` keyword is used to pause and resume a generator function.

> It can be thought of as a generator-based version of the `return` keyword.

> Once paused on a `yield` expression, the generator's code execution remains paused until the generator's next() method is called.

> When the end of the generator function is reached, an **IteratorResult** is returned to the caller in which the **value** is `undefined` and **done** is `true`.

----

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen(); // "{ next(), done }"
console.log(g.next().value) // 1
console.log(g.next().value) // 2
console.log(g.next().value) // 3
console.log(g.next().value) // undefined
```

----

```js
function* foo(){
  var index = 0;
  while (index <= 2)
    yield index++;
}
```

```js
var iterator = foo();
console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

----

From `makeIterator` function to generator function:

```js
function makeIterator(obj) {
  var nextIndex = 0;
  var keys = Object.keys(obj)
  return {
    next: function(){
      return nextIndex < keys.length
      ? {value: obj[keys[nextIndex++]], done: false}
      : {done: true};
    }
  }
}
```

----

```js
function* makeIterator(obj) {
  var nextIndex = 0;
  var keys = Object.keys(obj)
  while(nextIndex<keys.length)
    yield obj[keys[nextIndex++]]
}

var obj = { a: 'yo', b: 'ya' }
var it = makeIterator(obj);
console.log(it.next().value); // "yo"
console.log(it.next().value); // "ya"
console.log(it.next().done);  // true

```

----

Another way:

From:
```js
function* makeIterator(obj) {
  var nextIndex = 0;
  var keys = Object.keys(obj)
  while(nextIndex<keys.length)
    yield obj[keys[nextIndex++]]
}
```

To:
```js
function* makeIterator(obj) {
  for (let prop of Object.keys(obj)) {
    yield obj[prop]
  }
}
```

----

### return

> As in any function, `return` is used to stop the function execution with a definitive value.

> Then, when `return` is used, an **IteratorResult** is returned to the caller in which the **value** is the returned value and **done** is `true`.


----

```js
function* g() {
    yield 1;
    return 2;
    yield 3;
}

var it = g();
console.log( it.next() ); // { value:1, done:false }
console.log( it.next() ); // { value:2, done:true }
console.log( it.next() ); // { value:undefined, done:true }
```

----

#### !Caution

> In loops, the value with `done:true` is NOT taken into account.

```js
function *g() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for (var v of g()) {
    console.log( v );
}
// 1 2 3 4 5

console.log( v ); // still `5`, not `6` :(
```

----

### yield*

> The `yield*` keyword is used to delegate to another **generator** or **iterable** object.

> ```js
>  yield* [[expression]];
> ```

> The `yield*` expression iterates over the operand and yields each value returned by it.


----

```js
function* g1() {
  yield 2;
  yield 3;
}
function* g2() {
  yield 1;
  yield* g1();
  yield 4;
}

var iterator = g2();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

----

Any iterable can be used:

```js
function* g3() {
  yield* [1, 2];
  yield* "34";
}

var iterator = g3();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: "3", done: false }
console.log(iterator.next()); // { value: "4", done: false }
console.log(iterator.next()); // { value: undefined, done: true }

```

----

```js
function* g3() {
  yield* [1, 2];
  yield* "34";
}

var iterable = {};
iterable[Symbol.iterator] = g3

console.log([...iterable]) // [1, 2, "3", "4"]
```

----

### Infinite Generators

```js
function* idMaker(){
  var index = 0;
  while(true)
    yield index++;
}

var gen = idMaker();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

----

### Practice

> Convert `TextLines[Symbol.iterator]` to a generator

```js
[Symbol.iterator]() {
  var nextIndex = 0;
  return {
    next: () => {
      return nextIndex < this._lines.length
      ? {value: this._lines[nextIndex++], done: false}
      : {done: true};
    }
  }
}
```

https://jsbin.com/kuneliv/edit?js,console,output


----

#### Possible Solution

```js
class TextLines {

  constructor (text) {
    this._lines = text.split('\n');
  }

  * [Symbol.iterator]() {
    for (let line of this._lines) {
      yield line
    }
  }
}
```

https://jsbin.com/xutadu/edit?js,console,output


----

### Practice

> Make `TextLines[Symbol.iterator]` lazy.

> Lines have to be retrieved "on demand". The text should not be splitted in lines.

> It should yield the lines one by one. Helping performance.

```js
class TextLines {

  constructor (text) {
    this._text = text;
  }

  * [Symbol.iterator]() {
    // YOUR CODE GOES HERE
  }
}
```

https://jsbin.com/fafowi/edit?js,output

----

#### Possible solution

```js
class TextLines {

  constructor (text) {
    this._text = text;
  }

  * [Symbol.iterator]() {
    var offset = 0
    while (offset<this._text.length) {
      let nextOffset = this._text.indexOf('\n', offset)
      yield this._text.slice(offset,nextOffset)
      offset = nextOffset + 1
    }
  }
}
```

https://jsbin.com/totayeq/edit?js,output

---

## async functions (ES7)

> The **async function** declaration defines a async function.

> When async function is called, it returns a promise.  

> When the async function returns a value, the promise will be resolved with the returned value.

[MDN - async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

----

Simple value promise:

```js
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('resolved: ' + x)
      resolve(x);
    }, 2000);
  });
}
```

----

```js
async function add1(x) {
  var a = await resolveAfter2Seconds(20);
  var b = await resolveAfter2Seconds(30);
  return x + a + b;
}

add1(10).then(v => {
  console.log(v);  // prints 60 after 4 seconds.
});

// "resolved: 20"
// "resolved: 30"
// 60
```

https://jsbin.com/wizojay/edit?js,console

----

### Caution!

> `await` stops the execution, so watch out when you execute your promises

```js
async function add2(x) {
  var a = resolveAfter2Seconds(20);
  var b = resolveAfter2Seconds(30);
  return x + await a + await b;
}

add2(10).then(v => {
  console.log(v);  // prints 60 after 2 seconds.
});

```

https://jsbin.com/coyovas/edit?js,console


----

### Rejected promises

> If an **awaited promise** is rejected, the reason value is thrown.

```js
async function f3() {
  try {
    var z = await Promise.reject(30);
  } catch (e) {
    console.log(e); // 30
  }
}
f3();
```

----

### Using async functions instead of promise chains

```js
function getProcessedData(url) {
  return downloadData(url) // returns a promise
    .catch(e => {
      return downloadFallbackData(url) // returns a promise
    })
    .then(v => {
      return processDataInWorker(v); // returns a promise
    });
}
```

```js
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
```

----

### To sum up

> As generators are a way to make synchronous code asynchronous, async functions help to write promise-based code as synchronous.

> It's just **syntactic sugar**

---

# Must Read

[jsrocks.org - Iterators](http://jsrocks.org/2015/09/javascript-iterables-and-iterators/)

[2ality.com - ES6 generators in depth](http://www.2ality.com/2015/03/es6-generators.html)

[ Gorgi Kosev - ES7 async functions - a step in the wrong direction](https://spion.github.io/posts/es7-async-await-step-in-the-wrong-direction.html)
