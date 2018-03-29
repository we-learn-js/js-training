# Functions in Javascript

<!--section-->


> A function encloses a set of statements that performs a task or calculates a value.
>
> To use a function, you must **declare** it somewhere in the scope from which you wish to call it.

[MDN // Functions ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)


<!--slide-->

## Function Objects

> Functions in JS are objects (instances of `Object`).
>
> Function objects are linked to `Function.prototype`
(which is itself linked to `Object.prototype`)
>
> Main difference: functions can be **invoked**.

[MDN // Function.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)


<!--slide-->

### Function.prototype

```js
Function.prototype = {
  length: Number, // Specifies the number of arguments expected.
  name: String, // The name of the function.
  /* ... */
  apply: Function, // Calls a function and sets its this to the provided value
  call: Function, // Calls (executes) a function and sets its this to the provided value
  bind: Function, // Creates a new function which, when called, has its this set to the provided value.
  /* ... */
  __proto__: Object.prototype
}
```

<!--slide-->

> Any function is an instance of `Function` constructor

```js
console.log((function () {}).length)          // 0
console.log((function (a) {}).length)         // 1
console.log((function (a, b) {}).length)      // 2
console.log((function (a, b=1) {}).length)    // 1
console.log((function (...args) {}).length)   // 0

console.log((function() {}).name) // ""
console.log((function doSomething() {}).name) // "doSomething"
```

<!--slide-->

## Creating functions

> Functions can be created with **function declarations** or **function expressions**

<!--slide-->

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

<!--slide-->

### Function expressions

> Such a function can be anonymous.
>
> Function expressions are convenient when passing a function as an argument to another function, or assigning them as value.


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

<!--slide-->

> A name can be provided with a function expression and can be used inside the function to refer to itself, or on debugging to identify the function in stack traces.


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

https://jsbin.com/vufamu/edit?js,console

<!--slide-->

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

<!--slide-->

> Function hoisting only works with function declaration and not with function expression.

```js
console.log(square(2)) // ReferenceError: square is not defined

var squareFunc = function square (number) {
  return number * number
}
```

Note: Does not work because it is not a statement, but an expression that is evaluated.

<!--slide-->

### `arguments`

> The `arguments` object is available in every function execution.
>
> Arguments of a function are maintained in an **array-like** object (which is **not array**).
>
> Using the `arguments` object, you can call a function with more arguments than it is formally declared to accept.

<!--slide-->

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


<!--slide-->

#### rest parameter for arguments

> `arguments` is not in instance of `Array`. Rest parameter builds an array of arguments.
>
> The rest parameter is more flexible, as they can encloses only part of the arguments.

```js
function concat(separator, ...args) {
   return args.join(separator)
}
```

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

### Caution !

> `arguments` has been removed from the Web standards.

> Avoid using it and update existing code if possible

> Use the **rest parameter**


<!--slide-->

### Default parameters

> In JS, parameters of functions default to `undefined`.
>
> With ES6, you can use `=` to defined default values.



```js
function multiply(a, b = 1) {
  return a*b
}
multiply(5) // 5
```

<!--slide-->

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

<!--slide-->

### `this`

> The `this` keyword is available in every function execution.
>
> The value of `this` depends on **how a function is called**.
>
> `this` always **refers to the "owner"** of the function.

[MDN // this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

<!--slide-->

#### Default value of this

> In the **global scope**, this refers to the global object.

In a browser:
```js
this === window // true
```
In node:
```js
this === global // true
```

<!--slide-->

#### The Function Invocation Pattern

> When a function is executed as is, `this` is bound to the global object.

```js
function getThis(){
  return this
}
console.log(getThis() === window) // true
```

<!--slide-->

#### The Method Invocation Pattern

> When a function is executed as an object's method, `this` is bound to the object itself.

```js
function getThis () {
  return this
}

var obj = { getThis: getThis }

getThis() === window      // true
obj.getThis() === window  // false
obj.getThis() === obj     // true

```

<!--slide-->

#### The Constructor Invocation Pattern

> When a function is executed with the `new` keyword, `this` is bound to the new instance that is being constructed.

```js
function User (name) {
  this.name = name
}

var user = new User( "Evan")

console.log(user.name) // "Evan"
```

<!--slide-->

#### The Apply/Call Invocation Pattern

> The value of `this` value can be bound to a particular object in the call using the `call` or `apply` methods as all functions inherit from `Function.prototype`.


<!--slide-->

##### Function.prototype.call()

> The `call()` method calls a function with a given this value and arguments provided **individually**.

```js
func.call(thisArg[, arg1[, arg2[, ...]]])
```

```js
function sum() {
  return Array.prototype.reduce.call(arguments, function(x, y) {
    return x + y
  })
}
sum(1)  // 1
sum(1, 2, 3, 4)  // 10
```

[MDN // Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

Note: The `arguments` object is not an `Array`. It is similar to an `Array`, but does not have any Array properties except length.



<!--slide-->

##### Function.prototype.apply()

> The `apply()` method calls a function with a given this value and arguments provided **as an array**.

func.apply(thisArg, [argsArray])

```js
var arr = [1,2,100,-1,-42]
Math.max.apply(null, arr) // 100
```

Which is the same as
```js
var arr = [1,2,100,-1,-42]
Math.max.call(null, ...arr)  // 100
```

[MDN // Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### Practice

Make it work:

```js
function flatten (arr) {

}
var arr = [[1], ["2", 3], [4], [5, "6", "7"]]
console.log(flatten(arr)) // [1, "2", 3, 4, 5, "6", "7"]
```

https://jsbin.com/tigotu/edit?js,console

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

```js
function flatten (arr) {
  return [].concat.apply([], arr)
}
```

<!--slide-->

### Function.prototype.bind()

> The `bind()` method creates a **new function** that, when called, has its `this` bound to provided value.
>
> `bind()` presets the way a function has to be called.
>
> A sequence of preset arguments can also be provided.

func.bind(thisArg[, arg1[, arg2[, ...]]])

[MDN // bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

<!--slide-->

Binding `this`

```js
var object = {
  toggle: function(enabled) {
    this.enabled = enabled
  }
}
var toggleObject = object.toggle.bind(object)

toggleObject(true)  // object.toggle(true)
toggleObject(false) // object.toggle(false)
```

<!--slide-->

Binding arguments:

```js
var object = {
  toggle: function(enabled) {
    this.enabled = enabled
  }
}

object.enable = object.toggle.bind(object, true)
object.disable = object.toggle.bind(object, false)

object.enable()   // object.toggle(true)
object.disable()  // object.toggle(false)
```

<!--slide-->

How it works:
```js
// Function.prototype.bind
function bind (bindThis, ...bindArgs) {
  var func = this
  return function(...args) {
    func.call(bindThis, ...bindArgs, ...args )
  }
}
```

<!--slide-->

Binding part the arguments:

```js
function times (count, func) {
  for (var index = 0; index < count; ++index) {
    func()
  }
}

var threeTimes = times.bind(null, 3)

threeTimes(function(){ console.log('hello') }) // "hello" "hello" "hello"
threeTimes(console.log.bind(null,'world')) // "world" "world" "world"
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### Practice

Reduce this code, using `bind()`.

```js
function countdown (num) {
  for (var i = 0; i <= num; i += 1) {
    (function(i) {
      setTimeout(function () {
        console.log(num - i)
      }, i * 1000)
    })(i)
  }
}
countdown(5)
```

https://jsbin.com/mocijar/edit?js,console

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

Solution:
```js
function countdown (num) {
  for (var i = 0; i <= num; i += 1) {
     setTimeout(
       console.log.bind(null,num - i),
       i * 1000
     )
  }
}
countdown(5)
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### Practice

Make instances of `Button` execute `Button.prototype.click` when user clicks on them

```js
var Button = function(content) {
  this.content = content;
  this.element = document.createElement('BUTTON')
  this.element.innerHTML = content

  this.element.addEventListener('click', this.click)
  document.body.appendChild(this.element)
};

Button.prototype.click = function() {
  console.log(this.content + ' clicked');
}

var button1 = new Button('Button 1')
var button2 = new Button('Button 2')
```

https://jsbin.com/fasizo/edit?js,console,output

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

```js
var Button = function(content) {
  this.content = content;
  this.element = document.createElement('BUTTON')
  this.element.innerHTML = content

  this.element.addEventListener("click", this.click.bind(this))
  document.body.appendChild(this.element)
};

```

<!--section-->

### Arrow functions

<!--slide-->

#### Arrow function expression

> An arrow function expression has a **shorter syntax** compared to function expressions.

> Arrow functions are **always anonymous**.

> Arrow functions bind the `this` value **depending on creation context**, not execution context.

[MDN // Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

<!--slide-->

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

<!--slide-->

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

<!--slide-->

What we would do using `bind()`:

```js
function Person() {
  this.age = 0

  setInterval((function growUp() {
    this.age++
  }).bind(this), 1000)
}
var p = new Person()
```

<!--slide-->

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

<!--slide-->

##### Shorter functions

> A shorter syntax of arrow functions can be applied.
>
> The **return value** of the function is **implicit**.
>
> Shorter syntax can be used **only with single statements**.

```js
var a = [ "Hydrogen", "Helium", "Lithium", "Beryl­lium" ]
var a2 = a.map(function(s){ return s.length })

// Exactly the same as:
var a3 = a.map( s => s.length )
```

<!--slide-->

Usefull with functional methods:

```js
var arr = [5, 6, 13, 0, 1, 18, 23]

var sum = arr.reduce( (a, b) => a + b )  // 66
var even = arr.filter( v => v % 2 == 0 ) // [6, 0, 18]
var double = arr.map( v => v * 2 )       // [10, 12, 26, 0, 2, 36, 46]
```

<!--slide-->

Different ways to do the same thing:

```js
var arr = [5, 6, 13, 0, 1, 18, 23]

var even = arr.filter( function (v) { return v % 2 == 0 }) // [6, 0, 18]
var even = arr.filter( (v) => { return v % 2 == 0 } ) // [6, 0, 18]
var even = arr.filter( v => v % 2 == 0 ) // [6, 0, 18]
```

<!--section-->

## IIFE

> Acronym of Immediately Invoked Function expression
>
> Function expressions can be immediately invoked in javascript
>
> It is usefull to obtain data privacy (avoiding polluting global object)

```js
( function (n) { return n*2 } )( 6 )  // 12
( function (n) { return n*2 }( 6 ) )  // 12
( (n) => { return n*2 } )( 6 )        // 12
( n => { return n*2 } )( 6 )          // 12
( n => n*2 )( 6 )                     // 12
```

[Wikipedia - IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)

Note: Parenthesis are necessary to enforce parsing as an `expression`, instead of a `statement`

<!--slide-->

> **Parenthesis are to enforce the parser to expect an expression, instead of a statement.**
>
> There are other "fancy" ways to enforce function expressions
>
> But they won't work if you expect a return.

```js
!function () { … }()
~function () { … }()
-function () { … }()
+function () { … }()
```



<!--slide-->

> IIFE can receive arguments

It's the most common way to create closures to encapsulate a module.

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
