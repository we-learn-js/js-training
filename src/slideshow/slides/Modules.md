# Modules in Javascript

----

## What is a module?

> A module encapsulates related code into a single unit of code.
>
> Usually it is imported only once, and exposes an interface to be used.

<!--slide-->

## Module Pattern with IIFEs

> A module is a function or object that presents an interface but that hides its state and implementation.
>
> IIFEs takes advantage of function scope and closure to create relationships that are binding and private.

<!--slide-->

### Anonymous Closures

> Namespacing: all declared functions and variables are enclosed in the closure.
>
> Caution: implicit variable declaration will bind to global scope


```js
(function () {
  a = 1
  var b = 2
  function logB () { console.log(b) }
  logB() // 2
}())

console.log(a) // 1
console.log(b) // ReferenceError: b is not defined
logB() // ReferenceError: logB is not defined
```

<!--slide-->

### Importing global variables to closure

> Even if any closure as access to global scope, it's good practice to import dependencies of global scope:
> * Isolates even more the modules (easier to maintain and test)
> * Provides an easy way to rename global variables


```js
+function (win, doc) {
  const ELEMENT_ID = 'my-element'
  win.addEventListener('load', function(){
    doc.body.appendChild(doc.createElement('DIV'))
  })
}(window, document)
```

<!--slide-->

### Exporting an interface

> You can expose the interface for the module to be use.
>
> Expose only what it used, keep the rest private.

```js
var weekDay = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"]
  function getName (number) { return names[number] }
  function getNumber (name) { return names.indexOf(name) }
  return {
    name: getName,
    number: getNumber
  }
}()

console.log(weekDay.name(0)) // "Sunday"
console.log(weekDay.number('Monday')) // 1
```


<!--slide-->

### Maintaining private state of a module

> A module is a small app on its own.
>
> It can manage its state in privacy, not polluting the global scope.

```js
var counterModule = (function () {
  var counter = 0
  return {
    incrementCounter: function () { return counter++ },
    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter )
      counter = 0
    }
  }
})()

counterModule.incrementCounter()
counterModule.incrementCounter()
counterModule.resetCounter() // "counter value prior to reset: 2"
```


----

## CommonJs Modules

> `CommonJs` is the module loading system of `Node.js`.
>
> Each module is declared in a separated file and exports its interface
>
> Any other module can "require" modules it depends on.

<!--slide-->

### Importing dependencies

> All modules are obtained by its **path**, thanks to the `require` function that is always available in Node.js environments


```js
var counterModule = require('./modules/counter')
counterModule.incrementCounter()
counterModule.incrementCounter()
counterModule.resetCounter() // "counter value prior to reset: 2"
```

<!--slide-->

> Npm packages installed in the project can be required by package name

```
npm install angular --save
```
```js
// Import angular to create a module
var angular = require('angular')
var ngModule = angular.module('my-module', [])
```

<!--slide-->

```
npm install react --save
```
```js
// Import React to create a component
var React = require('react')
class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

<!--slide-->

### Exporting a module

> `require` loads js files and executes doing the following:
> * It injects the empty object `exports` ready to be augmented with new properties and methods.
> * It injects a `module` object with the `exports` object as its property, so the full module can be replaced instead of augmenting the original

A simplified implementation of `require`:

```js
function require(name) {
  var code = new Function("exports", "module", readFile(name))
  var exports = {}, module = {exports: exports}
  code(exports, module)
  return module.exports
}
```

[MDN - Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

<!--slide-->

Consider:
```js
var counterModule = (function () {
  var counter = 0
  return {
    incrementCounter: function () { return counter++ },
    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter )
      counter = 0
    }
  }
})()
```

<!--slide-->

In CommonJs:

```js
// modules/counter.js
var counter = 0
module.exports = {
  incrementCounter: function () { return counter++ },
  resetCounter: function () {
    console.log( "counter value prior to reset: " + counter )
    counter = 0
  }
}
```

```js
// modules/counter.js
var counter = 0
exports.incrementCounter = function () { return counter++ }
exports.resetCounter = function () {
  console.log( "counter value prior to reset: " + counter )
  counter = 0
}
```

<!--slide-->

### Modules as unique instances

> Node.js caches every loaded instance.
>
> The second time a module is required, the instance obtain at first call is returned.


```js
function require(name) {
  if (name in require.cache)
    return require.cache[name]

  var code = new Function("exports, module", readFile(name))
  var exports = {}, module = {exports: exports}
  code(exports, module)

  require.cache[name] = module.exports
  return module.exports
}
require.cache = Object.create(null)
```

<!--slide-->

```js
var counterModule = require('./modules/counter')
counterModule.incrementCounter()
counterModule.incrementCounter()
counterModule.resetCounter() // "counter value prior to reset: 2"
```

```js
var counterModule = require('./modules/counter')
counterModule.incrementCounter()
counterModule.resetCounter() // "counter value prior to reset: 3"
```

<!--slide-->

### Practice

> Write a simple module similar to the weekDay module that can convert month numbers (zero-based, as in the Date type) to names and can convert names back to numbers.

```js
var month = require(function(module, exports){
  // YOUR CODE GOES HERE
})

console.log(month.name(2)) // March
console.log(month.number("November")) // 10
```

https://jsbin.com/zapuqus/edit?js,console,output

<!--slide-->

#### Solution

```js
var month = require(function(module, exports){
  const NAMES = ["January", "February", "March", "April",
               "May", "June", "July", "August", "September",
               "October", "November", "December"]
  function getName (number) { return NAMES[number] }
  function getNumber (name) { return NAMES.indexOf(name) }
  module.exports = {
    name: getName,
    number: getNumber
  }
})
```

----

## ES6 modules

<!--slide-->

### Exporting modules

> The `export` statement is used to export functions, objects or primitives from a given file (or module).

[MDN - export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

<!--slide-->

#### Exporting declared variables

> Local variables can be exported and renamed.
> ```js
> export { name1, name2, …, nameN };
> export { variable1 as name1, variable2 as name2, …, nameN };
> ```

```js
const NAMES = ["January", "February", "March", "April",
             "May", "June", "July", "August", "September",
             "October", "November", "December"]
function getName (number) { return NAMES[number] }
function getNumber (name) { return NAMES.indexOf(name) }

export {NAMES, getName as name, getNumber as number}
```

<!--slide-->

#### Exporting statements and expressions

> Variables and functions can be export on declaration.

> ```js
> export let name1, name2, …, nameN; // also var
> export let name1 = …, name2 = …, …, nameN; // also var, const
> export function name1(…) { … } // also class, function*
> ```

```js
export const NAMES = ["January", "February", "March", "April",
             "May", "June", "July", "August", "September",
             "October", "November", "December"]

export function name (number) { return NAMES[number] }
export function number (name) { return NAMES.indexOf(name) }
```

<!--slide-->

#### Default export

> As `module.exports` in CommonJs, the full module can me exported as default.
>
> But unlike CommonJs, the default export doesn't overwrite other exports.
> ```js
> export default expression;
> export default function (…) { … } // also class, function*
> export default function name1(…) { … } // also class, function*
> export { name1 as default, … };
> ```

<!--slide-->

```js
function getName (number) { return NAMES[number] }
function getNumber (name) { return NAMES.indexOf(name) }
export const NAMES = ["January", "February", "March", "April",
             "May", "June", "July", "August", "September",
             "October", "November", "December"]
export default {
  name: getName,
  number: getNumber
}
```

<!--slide-->

### Importing modules

> The `import` statement is used to import functions, objects or primitives that have been exported from an external module, another script, etc.

[MDN - import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

<!--slide-->

#### Importing members of a module

> Any member exported can be imported as is or renamed.
> ```js
import { member } from "module-name";
import { member as alias } from "module-name";
import * as name from "module-name";
```

<!--slide-->

Consider:
```js
// modules/months.js
export const NAMES = ["January", "February", "March", "April",
             "May", "June", "July", "August", "September",
             "October", "November", "December"]

export function name (number) { return NAMES[number] }
export function number (name) { return NAMES.indexOf(name) }
```

<!--slide-->

Importing members separately
```js
// main.js
import { NAMES, name as getMonthName, number} from './modules/months'
console.log(getMonthName(2)) // March
```

Importing all members
```js
// main.js
import * as month from './modules/months'
console.log(month.name(2)) // March
```

<!--slide-->

#### Default import

> Default member can be imported
> ```js
import defaultMember from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as name from "module-name";
```

<!--slide-->

Consider:

```js
function getName (number) { return NAMES[number] }
function getNumber (name) { return NAMES.indexOf(name) }
export const NAMES = ["January", "February", "March", "April",
             "May", "June", "July", "August", "September",
             "October", "November", "December"]
export default {
  name: getName,
  number: getNumber
}
```

<!--slide-->

Importing default:

```js
import month from './modules/months'
console.log(month.name(2)) // March
```

Importing default and members

```js
import month, {NAMES as monthNames} from './modules/months'
console.log(month.name(2)) // March
console.log(monthNames) // ["January", "February", "March", "April", ...
```

<!--slide-->

### Import/export

> member can be exported from other modules
> ```js
export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```


<!--slide-->

```js
// modules/months.js
export const NAMES = ["January", "February", "March", "April",
             "May", "June", "July", "August", "September",
             "October", "November", "December"]

export function name (number) { return NAMES[number] }
export function number (name) { return NAMES.indexOf(name) }
```

```js
export * from './modules/months'
```

```js
export {name as getMonthName} from './modules/months'
```

<!--slide-->

### Practice

<!--slide-->

```js
// 'math.js'
var {PI, round} = Math
var square = function (x) { return x * x; }
var getNumber = function (x) { return Number(x) }
export square as getSquare
export function getCube(x) { return x * x * x; }
export default getNumber
export {round as getRound, PI}
```

Translate each sentence to an import statement

| Sentence |
| <!--slide--><!--slide--><!--slide-->---- |
| Import all methods as **math** |
| Import square function as **square** |
| Import number function as **number** |
| Import all methods as **math** and getNumber as **number** |


<!--slide-->

### Solution


Import all methods as **math**
```js
import * as math from 'math'
```

<!--slide-->

Import squareFunc as **square**
```js
import {getSquare as square} from 'math'
```

<!--slide-->

Import getNumber as **number**
```js
import number from 'math'
```

<!--slide-->

Import all methods as **math** and getNumber as **number**
```js
import * as math, default as number from 'math'
```

----

## Must Read

[ES6 modules: the final syntax](http://www.2ality.com/2014/09/es6-modules-final.html)
