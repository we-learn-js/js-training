# Objects in Javascript

---


## What is an object?

> An object is a container of properties, where a property has a name and a value.

```js
var user = {
  name: 'Evan',
  lastName: 'Graham',
  country: 'USA'
}
```

----

### Properties

> A property has a name and a value.
>
> A property name can be any string, including the empty string.
>
> A property value can be any JavaScript value except for undefined.

```js
var obj = {}
obj[''] = 1,
obj[2] = 2,
obj[null] = 3,
obj.property4 = 4,
obj['property: 5'] = 5,
obj[true] = 6
```

----


### Methods

> When a property has a function as a value, it's called a method.
>
> **Properties** are like nouns. They have a value or state.
>
> **Methods** are like verbs. They perform actions.

```js
var door = {
  state: 'open', // property named state
  width: 123, // property named width
  height: 213, // property named height
  openDoor: => this.state = 'open' // method named openDoor
  closeDoor: => this.state = 'closed' // method named closeDoor
}
```

[Stackoverflow](http://stackoverflow.com/questions/14953047/example-of-properties-vs-methods-in-js)


---

## Manipulating objects

----

### Updating objects

----

#### Change a value

> Value in an object can be updated by assignment. If the property name already exists in the object, the property value is **replaced**.

```js
var user = { name: 'Evan', lastName: 'Graham' }
console.log(user.name) // "Evan"
user.name = 'Joseph'
console.log(user.name) // "Joseph"
```

----

#### Add a value

> If the object does not already have that property name, the object is **augmented**.

```js
var user = { name: 'Evan', lastName: 'Graham' }
console.log(user) // { name: 'Evan', lastName: 'Graham' }
user.country = 'USA'
console.log(user) // { name: 'Evan', lastName: 'Graham', country: 'USA' }
```

----

### Assigning objects to variables

> Objects are passed around **by reference**. They are **never copied**.


```js
var user = { name: 'Evan', lastName: 'Graham' }
var user2 = user
user2.country = 'USA'

console.log(user) // { name: 'Evan', lastName: 'Graham', country: 'USA' }
console.log(user2) // { name: 'Evan', lastName: 'Graham', country: 'USA' }
```

Note: `user` and `user2` are both references to object { name: 'Evan', lastName: 'Graham' }, which is stored in memory (heap).

----

> Objects are always passed around **by reference**, even when they are assign to an object´s property.

```js
var measures = { weight: 90, height: 1.75 }
var user = { name: 'Evan', lastName: 'Graham', measures: measures }
measures.weight = 95

console.log(user.measures.weight) // 95
```

----

### Creating objects

> There are two ways to create an object.
> * Using literals
> * Using `Object` constructor function

----

#### Objects literals

> Object literals provide a very convenient notation for creating new object values.

```js
var emptyObj = {}
var user = {
  name: 'Rachel',
  'lastName': 'Green'
}
```

Note: quotes around a property’s name in an object literal are optional


----

#### `Object` constructor

> `Object` is a `function` , which is an `object`.
>
> If a function is invoked with the `new` prefix, then a new object will be created. It's called the **constructor invocation pattern**.
>
> `new` Object()


```js
var emptyObj = new Object()
var user = new Object()
user.name = 'Rachel'
user.lastName = 'Green'
```

----

this code...
```js
var emptyObj = {}
var user = {
  name: 'Rachel',
  'lastName': 'Green'
}
```

is the same as...
```js
var emptyObj = new Object()
var user = new Object()
user.name = 'Rachel'
user.lastName = 'Green'
```

----

### Creating objects constructors

> `Function` is an object.
>
> When invoked with `new` keyword, the function creates a new object.
>
> It's called the **constructor invocation pattern**.
>
> Invoked with `new` keywords, any function can be a **constructor**.

----

```js
function Animal () {}

var cat = new Animal() // New object is constructed
var mouse = new Animal() // New object is constructed

cat.firstName = "Tom"
mouse.firstName = "Jerry"

console.log(cat.firstName) // "Tom"
console.log(mouse.firstName) // "Jerry"
```


----

Same code without the **constructor invocation pattern**:

```js
function Animal () {}

var cat = Animal
var mouse = Animal

cat.firstName = "Tom"
mouse.firstName = "Jerry"

console.log(cat.firstName) // "Jerry"
console.log(mouse.firstName) // "Jerry"
```

Note: "new" is not used, so no new instance of `animal` is created, the function `animal` (which is also an object) is just assigned by reference.

----

### Test objects prototypes with `instanceof` operator

> The `instanceof` operator tests whether an object has in its prototype chain the prototype property of a constructor.

```js
function Animal () {}

var cat = new Animal(); // New object is constructed

console.log(cat instanceof Animal) // true
console.log(cat instanceof Object) // true
console.log(cat instanceof Array) // false
console.log(Animal instanceof Object) // true

```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)

----

### Inheritance of objects

> JavaScript is a **prototypal inheritance** language.
>
> Every object is linked to a **prototype** object from which it can *"inherit"* properties.
>
> All objects created from object literals (or constructor) are linked to `Object.prototype`, an object that comes standard with JavaScript.

----

#### Object.prototype

```js
Object.prototype = {
  hasOwnProperty: function(){...}, // If an object contains property
  isPrototypeOf: function(){...}, // If object is in the prototype
  toString: function(){...}, // Get string representation of the object.
  valueOf: function(){...}, //  Get primitive value of the specified object.
  /* ... */
}
```

[Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

Note: this is a simplified representation of `Object` and its prototype object.

----

> All objects created are linked to its constructor prototype, `Object.prototype`, so any properties or methods of `Object.prototype` are available in any object.
>
> As objects are created with the `Object` constructor function , they are called **instances** of `Object`.

```js
var emptyObj = new Object()
var obj = {
  name: 'Rachel',
  lastName: 'Green'
}
obj.hasOwnProperty('name') // true
obj.hasOwnProperty('surname') // false
emptyObj.hasOwnProperty('name') // false
```

Note: Both `obj` and `emptyObj` are instances of `Object`



---


## `Object`

> `Object` is a function.
>
> As a function, `Object` is an object, which can contain properties and methods.
>
> As a function, `Object` is a **constructor** and can be invoked with **new** keyword to create new instances.
>
> As a constructor, `Object` contains a prototype object that will be linked to any instances of `Object`.

----

### Structure of `Object`

```js
var Object = {
  assign: function(){ ... }, // Creates a new object by copying the values
  create: function(){ ... }, // Creates a new object with the specified prototype object and properties.
  defineProperty: function(){ ... }, // Adds the named property described by a given descriptor to an object.
  keys: function(){ ... }, // Returns an array containing the names of all of the given object's own enumerable properties.
  /* [...] */
  prototype: {
    hasOwnProperty: function(){...}, // Returns a boolean indicating whether an object contains the specified property
    isPrototypeOf: function(){...}, // Returns a boolean indication whether the specified object is in the prototype
    toString: function(){...}, // Returns a string representation of the object.
    valueOf: function(){...}, // Returns the primitive value of the specified object.
    prototype: null
  }
}
```

[MDN - Object.prototype](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/prototype)

Note: this is a simplified representation.

----

### `Object` as an object

> `Object` is an object, then it properties and methods.

```js
var user = { name: 'Evan', lastName: 'Graham' }
Object.keys(user)  // ["name", "lastName"]
```

----

### `Object` as a constructor

> As a function, `Object` is a **constructor** and can be invoked with **new** keyword to create  instances.

```js
var user1 = new Object()
var user2 = new Object()

user1.name = "Evan"
user2.name = "Rachel"

console.log(user1.name) // "Evan"
console.log(user2.name) // "Rachel"
```

----

### `Object`'s instances

> As a constructor, `Object` contains a prototype object that will be linked to any instances of `Object`.

```js
var user1 = new Object()
var user2 = new Object()

user1.name = "Evan"
user2.name = "Rachel"

console.log(user1.hasOwnProperty("name")) // true
console.log(user1.hasOwnProperty("lastName")) // false
```

Note: `hasOwnProperty` is a method of `Object.prototype`, available in any instance of `Object`.


----


## `Array`

> `Array` is a function.
>
> As a function, `Array` is an object, which can contain properties and methods.
>
> As a function, `Array` is a **constructor** and can be invoked with **new** to create new instances.
>
> As a constructor, `Array` contains a prototype object that will be linked to any instances of `Array`.

----

### Structure of `Array`

```js
var Array = {
  isArray: function(){ ... }, // Returns true if a variable is an array, if not false.
  from: function(){ ... }, // Creates a new Array instance from an array-like or iterable object.
  of: function(){ ... }, // Creates a new Array instance with a variable number of arguments
  prototype: {
    length: Number, // Reflects the number of elements in an array.
    push: function(){...}, // Adds one or more elements to the end of an array.
    forEach: function(){...}, // Calls a function for each element in the array.
    toString: function(){...} // Returns a string representing the array and its elements.
    /* [...] */
  }
}
```

[MDN - Array.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)


----

### `Array` as an object

> `Array` is an object, which can contain properties and methods.

```js
var numbers = Array.of(0,1,2,3,4);
console.log(numbers)  // [0, 1, 2, 3, 4]
```

----

### `Array` as a constructor

> As a function, `Array` is a **constructor** and can be invoked with **new** to create  instances.

```js
var odd = new Array(1, 3, 5);
var even = new Array(2, 4, 6);
odd[0] = 2
even[0] = 1

console.log(odd) // [2, 3, 5]
console.log(even) // [1, 4, 6]
```

----

### `Array`'s instances

> As a constructor, `Array` contains a prototype object that will be linked to any instances of `Array`.

```js
var odd = new Array(1, 3, 5);
var even = new Array(2, 4, 6);

odd.push(7)
even.push(8)

console.log(odd) // [1, 3, 5, 7]
console.log(even) // [2, 4, 6, 8]
```

Note: `push` is a method of `Array.prototype`, available in any instance of `Array`.

----

## `Array` inherits from `Object`

> `Array` is an extension of `Object`
>
> It means that `Array.prototype` has a prototype that points to `Object.prototype`

----

### Structure of `Array`, extended

`Array` inherits from `Object`

```js

Object.prototype = { // Prototype of `Object`
  hasOwnProperty: function(){...}, // Returns a boolean indicating whether an object contains the specified property
  toString: function(){...}, // Returns a string representation of the object.
  /* [...] */
  prototype: null
}

var Array = {
  isArray: function(){ ... }, // Returns true if a variable is an array, if not false.
  from: function(){ ... }, // Creates a new Array instance from an array-like or iterable object.
  of: function(){ ... }, // Creates a new Array instance with a variable number of arguments
  prototype: {
    length: Number, // Reflects the number of elements in an array.
    push: function(){...}, // Adds one or more elements to the end of an array.
    toString: function(){...} // Returns a string representing the array and its elements.
    /* [...] */
    prototype: Object.prototype
  }
}
```

[MDN - Array.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

Note: As `Array` inherits from `Object`, it only has access to `Object`'s prototype, not `Object`'s properties and methods.

----

### Instances of `Array` are linked to `Object.prototype` also

> `Array` has a prototype object, `Array.prototype`
>
> `Array.prototype` has a prototype, `Object.prototype`
>
> Instances of `Array` as linked to `Array.prototype`, which is linked to `Object.prototype`.

```js
var odd = new Array(1, 3, 5);

console.log(odd.hasOwnProperty(0)) // true
console.log(odd.hasOwnProperty(7)) // false
```

----

### Caution!

`Array` does not implement `Object` methods

```js
var odd = new Array(1, 3, 5);
var even = new Array(2, 4, 6);

Array.keys(odd) // TypeError: Array.keys is not a function
```

----

### Methods of `Array.prototype` override `Object.prototype`'s

> `Array.prototype` has a method `toString()`
>
> `Object.prototype` has a method `toString()`
>
> `Array.prototype.toString()` overrides `Object.prototype.toString()`

```js
var odd = new Array(1, 3, 5);
odd.push(7)

console.log(odd.toString()) // "1,3,5,7"
```

---

## The Prototype Chain

> Inheritance is possible thanks to the prototype chain
>
> When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype, and so on until either a property with a matching name is found or the end of the prototype chain is reached.


----

### The `__proto__` property

> Any instance of `Object` has a property named `__proto__`.
>
> The `__proto__` property of an object is an accessor property that exposes the internal prototype (either an object or null) of the object through which it is accessed.
>
> As prototypes are objects, they are assigned by reference.
>
> `__proto__` is a reference to the constructor's prototype

----

```js
var user = { name: "Evan", lastName: "Graham" }
console.log(user.__proto__ === Object.prototype) // true
```
Note: `user.__proto__` and `Object.prototype` 2 references to the same object.

[__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

----

### The logic

> When trying to access a property of an object:
> * if the object (instance of `Object`) has the property, it's returned
> * else if the prototype has the property, it's returned
> * else if the prototype has a prototype which has the property, it's returned
> and so on, accessing prototypes of prototypes

----

Let's see it in action:

```js
function getObjectProperty(obj, propName) {
  if (obj.hasOwnProperty(propName)) {
    return obj[propName]
  } else {
    let prototype = obj.__proto__

    while(prototype){
      if (prototype.hasOwnProperty(propName)) {
        return prototype[propName]
      } else {
        prototype = prototype.__proto__
      }
    }
    return undefined
  }
}

https://jsbin.com/nazefo/edit?js,console,output

```

Note: This is a programatic representation of the prototype chain

----

```js
var arr = [0,1,2,3,5]

Object.prototype.myVar = 1
getObjectProperty(arr, 'myVar') // 1
// Chain: arr.__proto__.__proto__.myVar

Array.prototype.myVar = 2
getObjectProperty(arr, 'myVar') // 2
// Chain: arr.__proto__.myVar

arr.myVar = 3
getObjectProperty(arr, 'myVar') // 3
// Chain: arr.myVar

```

----

```js

console.log(getObjectProperty([], 'toString'))
// Chain: [].__proto__.toString

console.log(getObjectProperty([], 'hasOwnProperty'))
// Chain: [].__proto__.__proto__.hasOwnProperty

console.log(getObjectProperty('', 'hasOwnProperty'))
// Chain: "".__proto__.__proto__.hasOwnProperty

```

----

### Extending prototype on runtime

> Prototype is an object
>
> As an object, it's assign by reference
>
> If prototype is modified, all reference to it will access its modifications

----

```js
var user = { name: "Evan", lastName: "Graham"  }
user.printType()

// TypeError: user.printType is not a function
```

```js
var user = { name: "Evan", lastName: "Graham"  }
Object.prototype.printType = function() {
  console.log("It's an object!")
}

user.printType()
// "It's an object!"
```

Note: `printType` is accessible on `user` even if the function was added to prototype **after** `user` was created.

---

## this

> `this` keyword is accessible in functions executions
>
> The value of `this` is determined by how a function is called.
>
> When a function is called as a method of an object, its `this` is set to the object the method is called on.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

----

### Using `this` in prototype methods

```js
var user = { name: "Evan", lastName: "Graham"  }

Object.prototype.forEach = function(func){
  Object.keys(this).forEach( key => func(this[key], key))
}

user.forEach(function(value, key){
  console.log(key + '=' + value)
})
// "name=Evan"
// "lastName=Graham"
({ hello: 'world' }).forEach(function(value, key){
  console.log(key + '=' + value)
});
// "hello=world"


```

Note: `forEach` is accessible on `user` even if the function was added to prototype **after** user was created

----

### Using `this` in constructors

```js
function User (name, lastName) {
  this.name = name
  this.lastName = lastName
}

var user1 = new User( "Evan", "Graham")
var user2 = new User( "Rachel", "Green")

console.log(user1.name) // "Evan"
console.log(user2.name) // "Rachel"

```

Note: as `this` refers to the instance being created, we are defining properties of the instance.


---

## Creating new constructors

> A constructor is a function
>
> If the constructor is called with **new**, an instance of the constructor is created.
>
> A constructor has a prototype with defines accessible methods and properties for its instances.

----

Consider:

```js
var User = function(name) {
  this.name = name
}
User.prototype.sayName = function(item) {
  console.log('My name is ' + this.name )
}
User.prototype.orderItem = function(item) {
  console.log(item + ' purchased: delivery in 3 days' )
}

var user1 = new User('Evan')
user1.sayName() // "My name is Evan"
user1.orderItem('TV') // "TV purchased: delivery in 3 days"

```

----

We need a premium user object. It behaves same as user, but has a shorter delivery delay.

We can **extend** `User` constructor to create a `PremiumUser` constructor.

----

> Instance of `User` is assign to `PremiumUser.prototype`, so any instance of `PremiumUser` will be linked to `User.prototype` as part of its prototype chain
>
> `orderItem()` is assigned to `PremiumUser.prototype`, so it will override `User.prototype.orderItem` in the chain.

```js
var PremiumUser = function(name) {
  this.name = name
}
PremiumUser.prototype = new User()
PremiumUser.prototype.orderItem = function(item) {
  console.log(item + ' purchased: delivery in 1 day' )
}
```


----

Structure of `PremiumUser`

```js
var PremiumUser = {
  prototype: {
    orderItem: function(item) {
      console.log(item + ' purchased: delivery in 1 day' )
    },
    __proto__: User.prototype
  }
}
```

----

> `user1` is an instance of `User`
>
> `user2` is an instance of `PremiumUser`, which inherits from `User`, like `Array` inherits from `Object`


```js
var user1 = new User('Evan')
user1.sayName() // "My name is Evan"
user1.orderItem('TV') // "TV purchased: delivery in 3 days"
var user2 = new PremiumUser('Evan')
user2.sayName() // "My name is Evan"
user2.orderItem('TV') // "TV purchased: delivery in 1 day"
```

https://jsbin.com/bajura/edit?js,console,output

---

## Objects or not, that's the question

----

### What is an object?

> Objects are key to understanding object-oriented technology
> &nbsp;
> Real-world objects share two characteristics: They all have state and behavior. Dogs have state (name, color, hungry) and behavior (barking, fetching, wagging tail).

[Java Docs](https://docs.oracle.com/javase/tutorial/java/concepts/object.html)

----

> "In javascript", everything is an object

```js
log(typeof []) // "object"
log(typeof {}) // "object"
log(typeof document.createElement('DIV') ) // "object"
log(typeof new String('5') ) // "object"
log(typeof new Number(5) ) // "object"
```

It's "almost" true

----

### Primitives

> The simple types of JavaScript are `numbers`, `strings`, `booleans` (true and false), null, and undefined. All other values are objects.

----

Let's check:

```js
log( typeof '5' ) // "string"
log( typeof 5 ) // "number"
log( typeof false ) // "boolean"
log( typeof true ) // "boolean"
log( typeof null ) // "object"
log( typeof undefined ) // "undefined"
```

----

How weird is that?
```js
log( typeof null ) // "object"
```

----

#### typeof null === "object"

> `null` is often used to signify an empty reference to an object.
> &nbsp;
> In fact, the ECMAScript specification defines null as the primitive value that represents the intentional absence of any object value.
> &nbsp;
> However, it's still widely considered as an "official mistake" of the language.

[Spec](http://www.ecma-international.org/ecma-262/5.1/#sec-11.4.3)


Note: as in javascript everything is an object assigned by reference , a defined but "empty" value is considered as a reference to an object. In case of `null`, it's an empty reference.


----

So let's check everything else

```js
log(typeof []) // "object"
log(typeof {}) // "object"
log(typeof document.createElement('DIV') ) // "object"
log(typeof /javascript/i) // "object"
log(typeof new RegExp("javascript", "i")) // "object"
log(typeof function (x) { return x*x } ) // "function"
log(typeof new Function("x", "return x*x") ) // "function"
```

https://jsbin.com/zojele/edit?js,console,output

----

Again weird...

```js
log(typeof function (x) { return x*x } ) // "function"
log(typeof new Function("x", "return x*x") ) // "function"
```

----

### Functions

> The `Function constructor` creates a new Function object. In JavaScript every function is actually a Function object.

[MDN] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function

A functions is still an object (inherit from `Object`)
```js
var func =  function () {}
func.name = 'Sarah'
func.hasOwnProperty('name') // true
```

----

An object is not a function, thought...

```js
var obj =  {}
obj.name = 'Sarah'
obj.hasOwnProperty('name') // true

obj() // TypeError: obj is not a function
```

Note: [Object.prototype.hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

----

Last but not least...

> String literals and strings returned from String calls in a non-constructor context are primitive strings. JavaScript automatically converts primitives to String objects, so that it's possible to use String object methods for primitive strings.


```js
log(typeof new String('5') ) // "object"
log(typeof '5' ) // "string"
log(typeof new Number(5) ) // "object"
log(typeof 5 ) // "number"
```

----

```js
var prim = 'foo';
var obj = new String('foo');

console.log(prim.split('')); // ["f", "o", "o"]
console.log(obj.split('')); // ["f", "o", "o"]
console.log('foo'.split('')); // ["f", "o", "o"]
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String?redirectlocale=en-US&redirectslug=JavaScript/Reference/Global_Objects/String#Description)


----

Same happens with numbers.

```js
var prim = 3.1415;
var obj = new Number(3.1415);

console.log(prim.toFixed(2)); // "3.14"
console.log(obj.toFixed(2)); // "3.14"
console.log(3.1415.toFixed(2)); // "3.14"
```

----

You can always retrieve the primitive value of an object

```js
var str = new String('js')
console.log(typeof str ) // "object"
console.log(typeof str.valueOf() ) // "string"
```

Note: [Object.prototype.valueOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)



> > Literals VS class instances
> > Mutability
> > Object API
> > Destructuring

## Must Read

* [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do)
https://www.youtube.com/watch?v=DqGwxR_0d1M
