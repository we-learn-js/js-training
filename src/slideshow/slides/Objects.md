# Objects in Javascript

<!--section-->

### What is an object?

> Objects are key to understanding object-oriented technology

> Real-world objects share two characteristics: They all have **state** and **behavior**.

> Dogs have **state** (name, color, hungry) and **behavior** (barking, fetching, wagging tail).

[Java Docs // Object](https://docs.oracle.com/javase/tutorial/java/concepts/object.html)

<!--slide-->

> "In javascript", everything is an object

```js
typeof [] // "object"
typeof {} // "object"
typeof document.createElement('DIV')  // "object"
typeof new String('5')  // "object"
typeof new Number(5)  // "object"
```

It's "almost" true

<!--slide-->

### Primitives

> The simple types of JavaScript are

>  `numbers`, `strings`, `booleans`, `null`, `undefined`

All other values are objects.

<!--slide-->

Let's check:

```js
typeof '5' // "string"
typeof 5 // "number"
typeof false // "boolean"
typeof true // "boolean"
typeof null // "object"
typeof undefined // "undefined"
```

<!--slide-->

How weird is that?
```js
typeof null // "object"
```

<!--slide-->

#### Is `null` an object ?

`null` is often used to assign an empty reference to an object.

In fact, the ECMAScript specification defines null as the primitive value that represents the **intentional absence of any object value**.

However, it's still widely considered as an "official mistake" of the language.

[ECMA Spec // The typeof Operator](http://www.ecma-international.org/ecma-262/5.1/#sec-11.4.3)


Note: as in javascript everything is an object assigned by reference , a defined but "empty" value is considered as a reference to an object. In case of `null`, it's an empty reference.


<!--slide-->

So let's check everything else

```js
typeof [] // "object"
typeof {} // "object"
typeof document.createElement('DIV')  // "object"
typeof /javascript/i // "object"
typeof new RegExp("javascript", "i") // "object"
typeof function (x) { return x*x }  // "function"
typeof new Function("x", "return x*x")  // "function"
```

https://jsbin.com/zojele/edit?js,console

<!--slide-->

Again weird...

```js
typeof function (x) { return x*x }  // "function"
typeof new Function("x", "return x*x")  // "function"
```

<!--slide-->

### Functions

> The `Function constructor` creates a new Function object. In JavaScript every function is actually a Function object.

[MDN // Objects -> Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

<!--slide-->

A functions is still an object (inherits from `Object`)
```js
var func =  function () {}
func.name = 'Sarah'
func.hasOwnProperty('name') // true
```

`hasOwnProperty` is a method of `Object`

<!--slide-->

An object is not a function, though...

```js
var obj =  {}
obj.name = 'Sarah'
obj.hasOwnProperty('name') // true

obj() // TypeError: obj is not a function
```



Note: [Object.prototype.hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

<!--slide-->

Last but not least...

> String literals and strings returned from `String` calls in a non-constructor context are primitive strings.
>
> JavaScript **automatically converts primitives to String objects**, so that it's possible to use String object methods for primitive strings.

[MDN // Objects / String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String?redirectlocale=en-US&redirectslug=JavaScript/Reference/Global_Objects/String#Description)

<!--slide-->

Types
```js
typeof new String('5')  // "object"
typeof '5'  // "string"
typeof new Number(5)  // "object"
typeof 5  // "number"
```

Object convertion
```js
var prim = 'foo'
var obj = new String('foo')

console.log(prim.split('')) // ["f", "o", "o"]
console.log(obj.split('')) // ["f", "o", "o"]
console.log('foo'.split('')) // ["f", "o", "o"]
```



<!--slide-->

Same happens with numbers.

```js
var prim = 3.1415
var obj = new Number(3.1415)

console.log(prim.toFixed(2)) // "3.14"
console.log(obj.toFixed(2)) // "3.14"
console.log(3.1415.toFixed(2)) // "3.14"
```

<!--slide-->

You can always retrieve the primitive value of an object with `valueOf()`

```js
var str = new String('js')
console.typeof str  // "object"
console.typeof str.valueOf()  // "string"
```

[MDN // Object.prototype.valueOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)


<!--section-->


## What is an object?

> An object is a container of properties, where a property has a name and a value.

```js
var user = {
  name: 'Evan',
  lastName: 'Graham',
  country: 'USA'
}
```

<!--slide-->

### Properties

> A property has a **name** and a **value**.
>
> A property name can be any string, including the empty string.
>
> A property value can be any JavaScript value except for undefined.

<!--slide-->

> All property names are converted to string

```js
var obj = {}
obj[''] = 1             // obj[""]
obj[2] = 2              // obj["2"]
obj[null] = 3           // obj["null"]
obj.property4 = 4       // obj["property4"]
obj['property: 5'] = 5  // obj["property: 5"]
obj[true] = 6           // obj["true"]

Object.keys(obj) // ["2", "", "null", "property4", "property: 5", "true"]
```

<!--slide-->

> Properties can also be assign by variable name (shorthand)

this code
```js
var name = 'Evan'
var surname = 'Graham'
var user = { name, surname }
```

is the same as

```js
var name = 'Evan'
var surname = 'Graham'
var user = { name: name, surname: surname }
```

<!--slide-->


### Methods

> When a property has a function as a value, it's called a method.
>
> **Properties** are like nouns. They have a value or state.
>
> **Methods** are like verbs. They perform actions.

<!--slide-->

```js
var door = {
  state: 'open',    // property named state
  width: 123,       // property named width
  height: 213,      // property named height
  openDoor: function (){ this.state = 'open' }    // method named openDoor
  closeDoor: function (){ this.state = 'closed' } // method named closeDoor
}
```

[Stackoverflow // properties vs methods](http://stackoverflow.com/questions/14953047/example-of-properties-vs-methods-in-js)


<!--section-->

## Working with objects

<!--slide-->

### Updating objects

<!--slide-->

#### Change a value

> Value in an object can be updated by assignment. If the property name already exists in the object, the property value is **replaced**.

```js
var user = { name: 'Evan', lastName: 'Graham' }
console.log(user.name) // "Evan"

user.name = 'Joseph'
console.log(user.name) // "Joseph"
```

<!--slide-->

#### Add a value

> If the object does not already have that property name, the object is **augmented**.

```js
var user = { name: 'Evan', lastName: 'Graham' }
console.log(user)
// { name: 'Evan', lastName: 'Graham' }

user.country = 'USA'
console.log(user)
// { name: 'Evan', lastName: 'Graham', country: 'USA' }
```

<!--slide-->

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

<!--slide-->

> Objects are always passed around **by reference**, even when they are assign to an object´s property.

```js
var measures = { weight: 90, height: 1.75 }
var user = { name: 'Evan', lastName: 'Graham', measures: measures }
measures.weight = 95

console.log(user.measures.weight) // 95
```

![](../images/objects-playground-1.png)

<!--slide-->

### Creating objects

> There are two ways to create an object:
> * Using literals
> * Using `Object` constructor function

<!--slide-->

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


<!--slide-->

#### `Object` constructor

> `Object` is a `function` , which is an `object`.
>
> If a function is invoked with the `new` prefix, then a new object will be created. It's called the **constructor invocation pattern**.


```js
var emptyObj = new Object()
var user = new Object()
user.name = 'Rachel'
user.lastName = 'Green'
```

<!--slide-->

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

<!--slide-->

### Creating objects constructors

> `Function` is an object.
>
> When invoked with `new` keyword, the function creates a new object.
>
> It's called the **constructor invocation pattern**.
>
> Invoked with `new` keywords, **any function can be a constructor**.

<!--slide-->

```js
function Animal () {}

var cat = new Animal() // New object is constructed
var mouse = new Animal() // New object is constructed

cat.firstName = "Tom"
mouse.firstName = "Jerry"

console.log(cat.firstName) // "Tom"
console.log(mouse.firstName) // "Jerry"
```

![](../images/objects-playground-2.png)

<!--slide-->

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


<!--section-->


## `Object`

> `Object` is a function.
>
> As a function, `Object` is an object, which can contain properties and methods.
>
> As a function, `Object` is a **constructor** and can be invoked with **new** keyword to create new instances.
>
> As a constructor, `Object` contains a prototype object that will be linked to any instances of `Object`.

<!--slide-->

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

[MDN // Object.prototype](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/prototype)

Note: this is a simplified representation.

<!--slide-->

### `Object` as an object

> `Object` is an object, then it contains properties and methods.

```js
var user = { name: 'Evan', lastName: 'Graham' }
Object.keys(user)  // ["name", "lastName"]
```

<!--slide-->

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

<!--slide-->

### Inheritance of objects

> JavaScript is a **prototypal inheritance** language.
>
> Every object is linked to a **prototype** object from which it can **"inherit"** properties.
>
> All objects created from object literals (or constructor) are linked to `Object.prototype`, an object that comes standard with JavaScript.

<!--slide-->

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

[MDN // Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

Note: this is a simplified representation of `Object` and its prototype object.

<!--slide-->

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

<!--slide-->

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


<!--slide-->


## `Array`

> `Array` is a function.
>
> As a function, `Array` is an object, which can contain properties and methods.
>
> As a function, `Array` is a **constructor** and can be invoked with **new** to create new instances.
>
> As a constructor, `Array` contains a prototype object that will be linked to any instances of `Array`.

<!--slide-->

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

[MDN // Array.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)


<!--slide-->

### `Array` as an object

> `Array` is an object, thus it contains properties and methods.

```js
var numbers = Array.of(0,1,2,3,4)
console.log(numbers)  // [0, 1, 2, 3, 4]
```

<!--slide-->

### `Array` as a constructor

> As a function, `Array` is a **constructor** and can be invoked with **new** to create  instances.

```js
var odd = new Array(1, 3, 5)
var even = new Array(2, 4, 6)
odd[0] = 2
even[0] = 1

console.log(odd) // [2, 3, 5]
console.log(even) // [1, 4, 6]
```

<!--slide-->

### `Array`'s instances

> As a constructor, `Array` contains a prototype object that will be linked to any instances of `Array`.

```js
var odd = new Array(1, 3, 5)
var even = new Array(2, 4, 6)

odd.push(7)
even.push(8)

console.log(odd) // [1, 3, 5, 7]
console.log(even) // [2, 4, 6, 8]
```

Note: `push` is a method of `Array.prototype`, available in any instance of `Array`.

<!--slide-->

## `Array` extends `Object`

> `Array` is an extension of `Object`
>
> It means that `Array.prototype` has a prototype that points to `Object.prototype`

<!--slide-->

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
    __proto__: Object.prototype
  }
}
```

[MDN // Array.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

Note: As `Array` inherits from `Object`, it only has access to `Object`'s prototype, not `Object`'s properties and methods.

<!--slide-->



#### The `__proto__` property

> It's the property used to link instances to their `prototype`

> Then, `prototype` is a property belonging only to functions. It is used to build __proto__ when the function happens to be used as a constructor with the `new` keyword.

<!--slide-->

### Instances of `Array` are linked to `Object.prototype` also

> `Array` has a prototype object, `Array.prototype`
>
> `Array.prototype` is linked to `Object.prototype` through `__proto__`
>
> Instances of `Array` are linked to `Array.prototype`, which is linked to `Object.prototype`.

<!--slide-->


Any `Array` instance implements `Object.prototype`'s methods
```js
var odd = new Array(1, 3, 5)

odd.hasOwnProperty(0) // true
odd.hasOwnProperty(1) // true
odd.hasOwnProperty(2) // true
odd.hasOwnProperty(3) // false
```

The prototype chain of `Array`
```js
var odd = new Array(1, 3, 5)

odd.__proto__ === Array.prototype // true

Array.prototype.__proto__ === Object.prototype // true
```

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

### Caution!

`Array` does not implement `Object` methods

```js
var odd = new Array(1, 3, 5)
var even = new Array(2, 4, 6)

Array.keys(odd) // TypeError: Array.keys is not a function
```

<!--slide-->

### `Array.prototype` methods override

> `Array.prototype` has a method `toString()`
>
> `Object.prototype` has a method `toString()`
>
> `Array.prototype.toString()` overrides `Object.prototype.toString()`

<!--slide-->


```js
var odd = new Array(1, 3, 5)

odd.push(7) // from Array.prototype.push
odd.toString() // "1,3,5,7"


// Methods inheritance
odd.hasOwnProperty === Object.prototype.hasOwnProperty // true
odd.toString === Array.prototype.toString // true
odd.toString === Object.prototype.toString // false
```

<!--section-->

## The Prototype Chain

> Inheritance is possible thanks to the prototype chain.
>
> When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype, and so on until either a property with a matching name is found or the end of the prototype chain is reached.


<!--slide-->

### The `__proto__` property

> Any instance of `Object` has a property named `__proto__`.
>
> The `__proto__` property of an object is an accessor property that exposes the internal prototype (either an object or null) of the object through which it is accessed.
>
> As prototypes are objects, they are assigned by reference.
>
> `__proto__` is a reference to the constructor's prototype

<!--slide-->

```js
var user = { name: "Evan", lastName: "Graham" }
console.log(user.__proto__ === Object.prototype) // true
```
Note: `user.__proto__` and `Object.prototype` 2 references to the same object.

[__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

<!--slide-->

### The logic

> When trying to access a property of an object:
> * if the object (instance of `Object`) has the property, it's returned
> * else if the prototype has the property, it's returned
> * else if the prototype has a prototype which has the property, it's returned
> and so on, accessing prototypes of prototypes

<!--slide-->

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
```

https://jsbin.com/nazefo/edit?js,console

Note: This is a programatic representation of the prototype chain

<!--slide-->

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

<!--slide-->

```js

console.log(getObjectProperty([], 'toString'))
// Chain: [].__proto__.toString

console.log(getObjectProperty([], 'hasOwnProperty'))
// Chain: [].__proto__.__proto__.hasOwnProperty

console.log(getObjectProperty('', 'hasOwnProperty'))
// Chain: "".__proto__.__proto__.hasOwnProperty

```

<!--slide-->

### Extending prototype on runtime

> Prototype is an object
>
> As an object, it's assign by reference
>
> If prototype is modified, all reference to it will access its modifications

<!--slide-->

```js
var user = { name: "Evan", lastName: "Graham"  }
user.printType()

// TypeError: user.printType is not a function
```

```js
var user = { name: "Evan", lastName: "Graham"  }
Object.prototype.printType = function() {
  console.log("It's a person!")
}

user.printType()
// "It's an person!"
```

Note: `printType` is accessible on `user` even if the function was added to prototype **after** `user` was created.

<!--section-->

## this

> `this` keyword is accessible in functions executions
>
> The value of `this` is determined by how a function is called.
>
> When a function is called as a method of an object, its `this` is set to the object the method is called on.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

<!--slide-->

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
})
// "hello=world"
```

Note: `forEach` is accessible on `user` even if the function was added to prototype **after** user was created

<!--slide-->

### Using `this` in constructors

> In constructors, `this` refers to the current instance being created.

```js
function User (name, lastName) {
  this.name = name
  this.lastName = lastName
  this.fullName = name + ' ' + lastName
}

var user1 = new User( "Evan", "Graham")
var user2 = new User( "Rachel", "Green")

console.log(user1.name) // "Evan"
console.log(user2.name) // "Rachel"
console.log(user2.fullName) // "Rachel Green"

```

Note: as `this` refers to the instance being created, we are defining properties of the instance.

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice: Mutating Array prototype

> Implement new method on arrays, so the following output matches

```js
var arr = [ 1, "", 8, null, "Evan", true, false]

console.log(arr.compact()) // [1, 8, "Evan", true]
console.log(arr.first()) // 1
console.log(arr.last()) // false

arr.remove( x => typeof x === 'string' )
console.log(arr) // [1, 8, null, true, false]
```

https://jsbin.com/fovasetuse/1/edit?js,console

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

```js
Array.prototype.compact = function () {
  return this.filter( x => !!x )
}
Array.prototype.first = function () {
  return this[0]
}
Array.prototype.last = function () {
  return this[this.length-1]
}
Array.prototype.remove = function (func) {
  this.forEach((item, i, array) => {
    if(func(item, i, array)){
      this.splice(i, 1)
    }
  })
  return this
}
```

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

### Caution! Don't mutate prototypes

> Prototype mutation can slow your app.
>
> Harming javaScript engines optimization.

[MDN // The performance hazards of Prototype mutation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/The_performance_hazards_of__%5B%5BPrototype%5D%5D_mutation)

<!--section-->

## Creating new constructors

> A constructor is a function
>
> If the constructor is called with **new**, an instance of the constructor is created.
>
> A constructor has a prototype which defines accessible methods and properties for its instances.

<!--slide-->

Consider:

```js
var User = function(name) {
  this.name = name
}
User.prototype.sayName = function() {
  console.log('My name is ' + this.name )
}
User.prototype.orderItem = function(item) {
  console.log(item + ' purchased: delivery in 3 days' )
}

var user1 = new User('Evan')
user1.sayName() // "My name is Evan"
user1.orderItem('TV') // "TV purchased: delivery in 3 days"

```

<!--slide-->

We need a premium user object. It behaves same as user, but has a shorter delivery delay.

We can **extend** `User` constructor to create a `PremiumUser` constructor.

<!--slide-->

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


<!--slide-->

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

<!--slide-->

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

https://jsbin.com/bajura/edit?js,console

<!--slide-->

### Test objects prototypes with `instanceof` operator

> The `instanceof` operator tests whether an object has in its prototype chain the prototype property of a constructor.

```js
function Animal () {}

var cat = new Animal() // New object is constructed

console.log(cat instanceof Animal) // true
console.log(cat instanceof Object) // true
console.log(cat instanceof Array) // false
console.log(Animal instanceof Object) // true

```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice: Mutating Array prototype

> Implement `Collection`, as an array of objects, , so the following output matches

```js
var collection = new Collection()
collection.push(
  { name: 'Evan', lastName: 'Graham' },
  { name: 'Rachel', lastName: 'Green' },
  { name: 'Janice', lastName: 'Yemen' },
  { name: 'Ross', lastName: 'Green' }
)

console.log(collection.length) // 4
console.log(collection.findBy('lastName', 'Green'))
// [object Object] { lastName: "Green", name: "Rachel" }
console.log(collection.sortBy('name'))
// 0: [object Object] { lastName: "Graham", name: "Evan" },
// 1: [object Object] { lastName: "Yemen", name: "Janice" },
// ...
```

https://jsbin.com/naqogu/edit?js,console

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

```js

function Collection() {}
Collection.prototype = new Array()

Collection.prototype.sortBy = function (property) {
  return this.sort(function(obj1, obj2){
    return obj1[property] > obj2[property]
  })
}
Collection.prototype.findBy = function (prop, value) {
  var result
  this.forEach(function(obj){
    result = result || (obj[prop] === value ? obj : undefined)
  })
  return result
}
```


<!--section-->

## Mastering Objects

<!--slide-->

###  `Object.getPrototypeOf()`

> The `Object.getPrototypeOf()` method returns the prototype of the specified instance.
> ```js
> Object.getPrototypeOf(obj)
> ```

```js

Object.getPrototypeOf(new String("foo")) // String.prototype
Object.getPrototypeOf([]) // Array.prototype
Object.getPrototypeOf({}) // Object.prototype

```

<!--slide-->

### `Object.assign()`

> The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object.
>
> It will return the target object.
>
> ```js
> Object.assign(target, ...sources)
> ```


[MDN // Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<!--slide-->

Merging objects

```js
var o1 = { a: 1 }
var o2 = { b: 2 }
var o3 = { c: 3 }

var obj = Object.assign(o1, o2, o3)
console.log(obj) // { a: 1, b: 2, c: 3 }
console.log(o1)  // { a: 1, b: 2, c: 3 }
console.log(o2)  // { b: 2 }
console.log(o3)  // { c: 3 }
```

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

#### Caution! Not suitable for deep objects

```js
var o1 = { a: 1  }
var o2 = { b: { c: 2 } }

var obj = Object.assign(o1, o2)
console.log(o1) // { a: 1, b: { c: 2 } }
console.log(o2) // { b: { c: 2 } }

o2.b.c = 3
console.log(o1) // // { a: 1, b: { c: 3 } }
```

<!--slide-->

### `Object.defineProperty()`

> The `Object.defineProperty()` method defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
> ```js
> Object.defineProperty(obj, prop, descriptor)
> ```
>
> * **obj**: The object on which to define the property.
> * **prop**: The name of the property to be defined or modified.
> * **descriptor**: The descriptor for the property being defined or modified.


[MDN // Object.defineProperty() ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

<!--slide-->

#### `descriptor.enumerable`

> true if and only if this property shows up during enumeration of the properties on the corresponding object.
>
> Defaults to `false`.

```js
var obj = { name: 'Evan', surname: 'Graham'}
Object.defineProperty(obj, 'name', { enumerable: false })
Object.defineProperty(obj, 'surname', { enumerable: true })


console.log(Object.keys(obj)) // ["surname"]
for (var key in obj) {
  console.log(key)
}
// "surname"

```

<!--slide-->

#### `descriptor.value`

> The value associated with the property. Can be any valid JavaScript value (number, object, function, etc).
>
> Defaults to `undefined`.

```js
var obj = { name: 'Evan', surname: 'Graham'}
Object.defineProperty(obj, 'name', { value: "Rachel" })

console.log(obj) // { name: "Rachel", surname: "Graham" }
```

<!--slide-->

#### `descriptor.writable`

> true if and only if the value associated with the property may be changed with an assignment operator.
>
> Defaults to `false`.

```js
var obj = { name: 'Evan', surname: 'Graham'}
Object.defineProperty(obj, 'name', { writable: false })

obj.name = 'Rachel'
obj.surname = 'Green'
console.log(obj) // {  name: "Evan", surname: "Green" }
```

<!--slide-->

#### `descriptor.get`

> A function which serves as a getter for the property

```js
var obj = { name: 'Evan', surname: 'Graham'}
Object.defineProperty(obj, 'fullName', { get: function(){ return this.name + ' ' + this.surname} })

console.log(obj.fullName) // "Evan Graham"
```

<!--slide-->

#### `descriptor.set`

> A function which serves as a setter for the property

```js
var obj = { name: 'Evan', surname: 'Graham'}
Object.defineProperty(obj, 'fullName', { set: function(name){
  var words = name.toString().split(' ')
  this.name = words[0] || ''
  this.surname = words[1] || ''
} })

obj.fullName = 'Rachel Green'
console.log(obj.name, obj.surname) // "Rachel" "Green"
```


<!--slide-->

This code...
```js
obj.name = 'Evan'
```

Is the same as...
```js
Object.defineProperty(obj, 'name', {
  enumerable: true,
  writable: true,
  value: 'Evan'
})
```

<!--slide-->

### `Object.defineProperties()`

> The `Object.defineProperties()`  method defines new or modifies existing properties directly on an object, returning the object.
>
> ```js
> Object.defineProperties(obj, props)
> ```

[MDN // Object.defineProperties() ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

<!--slide-->

```js
var obj = {};
Object.defineProperties(obj, {
  name: {
    value: 'Evan',
    writable: true
  },
  surname: {
    value: 'Graham',
    writable: false
  }
})
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### Practice

> Retrieving values from checkboxes is tricky. Let's make it easier

```js
var form = document.getElementById('my-form')

console.log(form.color.value) // ["Green", "Blue", "Black"]

form.color.value = ["Red", "White"]
console.log(form.color.value) // ["Red", "White"]

```

https://jsbin.com/nerila/edit?js,output

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

```js
Object.defineProperty(RadioNodeList.prototype, 'value', {
  get () {
    var result = []
    this.forEach(function(input){
      input.checked && result.push(input.value)
    })
    return result
  },
  set (values = []) {
    this.forEach(function(input){
      input.checked  = values.indexOf(input.value) !== -1
    })
  }
})
```
