# Functions in Javascript

---


> A function is a JavaScript encloses a set of statements that performs a task or calculates a value.
>
> To use a function, you must define it somewhere in the scope from which you wish to call it.

[MDN - Functions ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)


----

## Function Objects

> Functions in JavaScript are objects.
>
> Function objects are linked to `Function.prototype`
(which is itself linked to `Object.prototype`)
>
> The thing that is special about functions is that they can be invoked.

[MDN - Function.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)


----

### Function.prototype

```js
Function.prototype = {
  length: Number, // Specifies the number of arguments expected.
  name: String, // The name of the function.
  /* ... */
  apply: Function, // alls a function and sets its this to the provided value
  call: Function, // Calls (executes) a function and sets its this to the provided value
  bind: Function, // Creates a new function which, when called, has its this set to the provided value.
  /* ... */
}
```

----

> Any function is an instance of `Function` constructor

```js
console.log((function () {}).length) // 0
console.log((function (a) {}).length) // 1
console.log((function (a, b) {}).length) // 2
console.log((function (a, b=1) {}).length) // 1
console.log((function (...args) {}).length) // 0

console.log((function() {}).name) // ""
console.log((function doSomething() {}).name) // "doSomething"
```

----

## Defining functions

* Function declarations
* Function expressions

----

### Function declarations

```js
function square (number) {
  return number * number
}
```

* The `function` keyword **declares** the function
* `square` is the **name** of the function
* The parenthesis `(number)` encloses a list of **arguments**
* `{}` encloses **body** of the function, compound by statements
* `return` statement specifies the value returned by the function.

----

### Function expressions

> Such a function can be anonymous it does not have to have a name.
>
> Function expressions are convenient when passing a function as an argument to another function, when assigning to a varaible of an object's property.


```js
var square = function (number) {
  return number * number
}
```

```js
window.addEventListener("load", function (event) {
  console.log('Page loaded')
})
```

----

> A name can be provided with a function expression and can be used inside the function to refer to itself, or in a debugger to identify the function in stack traces


```js
window.addEventListener("load", function (event) {
  throw new Error('Anonymous Error')
})
// Error: Anonymous Error at vufamu.js:4:9
```

```js
window.addEventListener("load", function onLoad (event) {
  throw new Error('Error with name')
})
// Error: Error with name at onLoad (vufamu.js:8:9)
```

https://jsbin.com/vufamu/edit?js,console,output

----

### Hoisting

> Function names are hoisted.

```js
console.log(square(2)) // 4

function square (number) {
  return number * number
}
```

```js
console.log(square(2)) // TypeError: square is not a function

var square = function (number) {
  return number * number
}
```

----

> Function hoisting only works with function declaration and not with function expression.

```js
console.log(square(2)) // ReferenceError: square is not defined

var squareFunc = function square (number) {
  return number * number
}
```

Note: Does not work because it is not a statement, but an expression that is evaluated.

----

### arguments

> The `arguments` object is available in every function execution.
>
> Arguments of a function are maintained in an **array-like** object (which is **not array**).
>
> Using the `arguments` object, you can call a function with more arguments than it is formally declared to accept.

----

```js
function concat(separator) {
   var result = "" // initialize list
   var i
   // iterate through arguments
   for (i = 1 i < arguments.length i++) {
      result += arguments[i] + separator
   }
   return result
}
// returns "red, orange, blue, "
concat(", ", "red", "orange", "blue")
// returns "elephant giraffe lion cheetah "
concat(" ", "elephant", "giraffe", "lion", "cheetah")
```

----

#### rest parameter for arguments

> `arguments` is not in instance of `Array`. Rest parameter builds an array of arguments.
>
> The rest parameter is more flexible, as they can encloses only part of the arguments.

```js
function concat(separator, ...args) {
   return args.join(separator)
}
```

----

### Default parameters

> In JavaScript, parameters of functions default to `undefined`.
>
> With ES6, you can use `=` to defined default values.



```js
function multiply(a, b = 1) {
  return a*b
}
multiply(5) // 5
```

----

```js
function multiply(a, b = 1) {
  return a*b
}
multiply(5) // 5
```

is the same as:
```js
function multiply(a, b) {
  b = typeof b !== 'undefined' ?  b : 1
  return a*b
}
multiply(5) // 5
```

----

### this

> The `this` keyword is available in every function execution.
>
> Inside a function, the value of `this` depends on **how a function is called**.
>
> `this` always refers to the "owner" of the function we're executing.

[MDN - this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

----

#### Default value of this

> In the global scope, this refers to the global object.

In a browser:
```js
this === window // true
```
In node:
```js
this === global // true
```

----

#### The Function Invocation Pattern

> When a function is executed as a function, `this` is bound to the global object.

```js
function getThis(){
  return this
}
console.log(getThis() === window) // true
```

----

#### The Method Invocation Pattern

> When a function is executed as an object's method, `this` is bound to the object itself.

```js
function getThis(){ return this }

var obj = { getThis: getThis }

console.log(getThis() === window) // true
console.log(obj.getThis() === obj) // true

```

----

#### The Constructor Invocation Pattern

> When a function is executed with the `new` keyword, `this` is bound to the new instance that is being constructed.

```js
function User (name) {
  this.name = name
}

var user = new User( "Evan")

console.log(user.name) // "Evan"
```

----

#### The Apply/Call Invocation Pattern

> The value of `this` value can be bound to a particular object in the call using the `call` or `apply` methods as all functions inherit from Function.prototype.


----

##### Function.prototype.call()

> The `call()` method calls a function with a given this value and arguments provided **individually**.
>
> func.call(thisArg[, arg1[, arg2[, ...]]])


```js
function sum(args) {
  return Array.prototype.reduce.call(arguments, function(x, y) {
    return x + y
  })
}
sum(1)  // 1
sum(1, 2, 3, 4)  // 10
```

Note: The `arguments` object is not an `Array`. It is similar to an `Array`, but does not have any Array properties except length.

[MDN - call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

----

##### Function.prototype.apply()

> The `apply()` method calls a function with a given this value and arguments provided **as an array**.
>
> func.apply(thisArg, [argsArray])

```js
var arr = [1,2,100,-1,-42]
var max = Math.max.apply(null, [1,2,100,-1,-42])
```

Which is the same as
```js
var arr = [1,2,100,-1,-42]
var max = Math.max.call(null, ...arr)
```

[MDN - apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

----

#### Practice

Make it work:

```js
function flatten (arr) {

}
var arr = [[1], [2, 3], [4], [5, 6, 7]]
console.log(flatten(arr)); // [1, 2, 3, 4, 5, 6, 7]
```

https://jsbin.com/tigotu/edit?js,console,output

----

```js
function flatten (arr) {
  return [].concat.apply([], arr)
}
```

----

### Function.prototype.bind()

> The `bind()` method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
>
> `bind()` presets the way a function has to be called
>
> func.bind(thisArg[, arg1[, arg2[, ...]]])

[MDN - bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

----

```js
var object = {
  toggle: function(enabled) {
    this.enabled = enabled
  }
}

object.enable = object.toggle.bind(object, true)
object.disable = object.toggle.bind(object, false)

object.enable()
```

----

```js

function times (count, func) {
  for (var index = 0 index < count ++index) {
    func()
  }
}
var threeTimes = times.bind(null, 3)
threeTimes(function(){ console.log('hello') }) // "hello" "hello" "hello"
threeTimes(console.log.bind(null,'world')) // "world" "world" "world"
```

----

#### Practice

Reduce this code, using bind.

```js
function countdown (num) {
    for (var i = 0; i <= num; i += 1) {
        (function(i) {
            setTimeout(function () {
                console.log(num - i);
            }, i * 1000);
        })(i);
    }
}
countdown(5);
```

https://jsbin.com/mocijar/edit?js,console

----

Solution:
```js
function countdown (num) {
  for (var i = 0; i <= num; i += 1) {
     setTimeout(console.log.bind(null,num - i), i * 1000);
  }
}
countdown(5);
```

----

#### Practice

Make instances of `Button` execute `Button.prototype.click` when user clicks on them

```js
var Button = function(content) {
  this.content = content;
  this.element = document.createElement('BUTTON')
  this.element.innerHTML = content

  document.body.appendChild(this.element)
};

Button.prototype.click = function() {
  console.log(this.content + ' clicked');
}

var button1 = new Button('Button 1')
var button2 = new Button('Button 2')
```

https://jsbin.com/fasizo/edit?js,console,output

----

```js
var Button = function(content) {
  this.content = content;
  this.element = document.createElement('BUTTON')
  this.element.innerHTML = content

  this.element.addEventListener("click", this.click.bind(this))
  document.body.appendChild(this.element)
};

```

---

### Arrow functions

----

#### Arrow function expression

> An arrow function expression has a shorter syntax compared to function expressions

> Arrow functions are always anonymous

> Arrow functions binds the this value depending on creation context, not execution context.

[MDN - Arrow functions](http://www-db.deis.unibo.it/courses/TW/DOCS/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions.html)

----

Consider:

```js
function Person() {
  this.age = 0 // `this` is bound to the newly created instance, itself.

  setInterval(function growUp() {
    // this is bound to the global object
    this.age++
  }, 1000)
}
var p = new Person()
```

----

What we would do without arrow functions:

```js
function Person() {
  var self = this // self is a reference to this, which will be included to closure

  self.age = 0

  setInterval(function growUp() {
    self.age++
  }, 1000)
}
var p = new Person()
```

----

What we would taking advantage of `bind()`:

```js
function Person() {
  this.age = 0

  setInterval((function growUp() {
    this.age++
  }).bind(this), 1000)
}
var p = new Person()
```

----

What we can do with arrow functions:

```js
function Person(){
  this.age = 0

  setInterval(() => {
    this.age++ // `this` properly refers to the person object
  }, 1000)
}
var p = new Person()
```

----

##### Shorter functions

> A shorter syntax of arrow functions can be applied.
>
> The return value of the function is implicit
>
> Shorter syntax can be used only with single statements

```js

var a = [ "Hydrogen", "Helium", "Lithium", "Beryl­lium" ]
var a2 = a.map(function(s){ return s.length }) // Exactly the same as:
var a3 = a.map( s => s.length )

```

----

```js
var arr = [5, 6, 13, 0, 1, 18, 23]
var sum = arr.reduce((a, b) => a + b)  // 66
var even = arr.filter(v => v % 2 == 0) // [6, 0, 18]
var double = arr.map(v => v * 2)       // [10, 12, 26, 0, 2, 36, 46]
```

----

Different ways to do the same thing:

```js
var arr = [5, 6, 13, 0, 1, 18, 23]
var even = arr.filter( v => v % 2 == 0 ) // [6, 0, 18]
var even = arr.filter( (v) => { return v % 2 == 0 } ) // [6, 0, 18]
var even = arr.filter( function (v) { return v % 2 == 0 }) // [6, 0, 18]
```

---

## IIFE (Immediately Invoked Function expression)

> Function expressions can be immediately invoked in javascript
>
> It is usefull to obtain data privacy (avoiding polluting global object)
> ```js
> (function () { … })()
> (function () { … }())
> ```

[Wikipedia - IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)

Note: Parenthesis are necessary to enforce parsing as an `expression`, instead of a `statement`

----

> Parenthesis are to enforce the parser to expect an expression, instead of a statement.
>
> There are other ways to enforce function expressions
>
> But they won't work if you expect a return.

```js
!function () { … }()
~function () { … }()
-function () { … }()
+function () { … }()
```



----

> IIFE can receive arguments

```js
+function ($) {
  function addButtons (num) {
    for (var i = 0; i < num; i++) {

      var $button = $('<button>Button ' + i + '</button>')
      $button.click((function (i) {
        return function () {
          console.log('This is button ' + i)
        }
      }(i)))

      $(document.body).append($button)
    }
  }
  addButtons(10)
}(jQuery)
```
