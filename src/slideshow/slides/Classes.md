# Classes

> JavaScript classes introduced in ES6 are **syntactical sugar** over JavaScript's existing **prototype-based inheritance**.


[MDN // Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)


<!--slide-->

## Defining classes

> Classes are in fact "special functions", and just as you can define function expressions and function declarations, the class syntax has two components: **class expressions** and **class declarations**.


<!--slide-->

### Class declarations

>  To declare a class, you use the `class` keyword with the name of the class  


```js
class User {
  constructor (name) {
    this.name = name
  }
}
var user = new User('Evan')
```

<!--slide-->

this code:
```js
class User {
  constructor (name) {
    this.name = name
  }
}
var user = new User('Evan')
```

is the same as:
```js
function User (name) {
  this.name = name
}
var user = new User('Evan')
```

<!--slide-->

#### Hoisting

Unlike **function declarations**, **class declarations** are not hoisted.


```js
var user = new User('Evan') // ReferenceError
class User {
  constructor (name) {
    this.name = name
  }
}
```

```js
var user = new User('Evan') // { name: 'Evan' }
function User (name) {
  this.name = name
}
```

<!--slide-->

### Class expressions

> Classes are declared with the `class` keyword.
>
> Class expressions can be named or unnamed.

```js
var User = class {
  constructor (name) {
    this.name = name
  }
}
var user = new User('Evan')
```

```js
var User = class GoogleUser {
  constructor (name) {
    this.name = name
  }
}
var user = new User('Evan')
```

<!--slide-->

this code:
```js
var User = class GoogleUser {
  constructor (name) {
    this.name = name
  }
}
var user = new User('Evan')
```

is the same as:
```js
var User = function GoogleUser (name) {
  this.name = name
}
var user = new User('Evan')
```

<!--slide-->

## Class body and method definitions

<!--slide-->

### Constructor

> The constructor method is a special method for creating and initializing an object created with a class.
> ```js
> constructor([arguments]) { ... }
> ```
> There can only be one special method with the name `constructor` in a class.

<!--slide-->

```js
class User {
  constructor (name) {
    this.name = name
  }
}
var user = new User('Evan')
```

<!--slide-->

#### Object.prototype.constructor

> Constructor is accessible in any instance.
>
> It is a reference to the function constructor itself

```js
class User {
  constructor (name) {
    this.name = name
  }
}
var user = new User('Evan')
console.log(user.__proto__.constructor === User) // true
console.log({}.__proto__.constructor === Object) // true
console.log(Object.prototype.constructor === Object) // true
```


<!--slide-->

### Prototype Methods

> Shorter syntax for method definitions are used for classes methods

```js
class User {
  constructor (name) {
    this.name = name
  }
  sayName () {
    console.log('My name is ' + this.name )
  }
  orderItem (item) {
    console.log(item + ' purchased: delivery in 3 days' )
  }
}

```

<!--slide-->

In ES5:

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
```

<!--slide-->

### Getters

> The `get` syntax binds an object property to a function that will be called when that property is looked up.


[MDN // getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)

<!--slide-->

Consider:

```js
class Logger {
  constructor() {
    this.logs = []
    this.length = 0
  }
  add (log) {
    this.logs.push(log)
    this.length = this.logs.length
    return this
  }
  remove () { ... }
  clear () { ... }
}

var logger = new Logger()
logger.add('Log 1').add('Log 2').add('Log 2').add('Log 2')
console.log(logger.length) // 4
```

Note: `length` property has to be maintained in view to be available as property.

<!--slide-->

```js
class Logger {
  constructor() {
    this.logs = []
  }
  add (log) {
    this.logs.push(log)
    return this
  }
  remove () { ... }
  clear () { ... }
  get length () { return this.logs.length }
}

var logger = new Logger()
logger.add('Log 1').add('Log 2').add('Log 2').add('Log 2')

console.log(logger.length)
```

Note: Now `length` isn't maintained and returned only if needed

<!--slide-->

#### Getters for calculated properties

> Use getters for properties that have a cost and could not be used at all

```js
get notifier() {
  delete this.notifier; // getters can be removed with delete operator
  return this.notifier = document.getElementById("bookmarked-notification-anchor");
}
```

Note: the getter is removed and replaced by the actual value


<!--slide-->

### Setters

> The `set` syntax binds an object property to a function to be called when there is an attempt to set that property.

[MDN // setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)

<!--slide-->

Consider:
```js
class User {
  constructor (firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
  setFullName (name) {
    var words = name.toString().split(' ');
    this.firstName = words[0] || '';
    this.lastName = words[1] || '';
  }
}

var user = new User('Evan', 'Graham')
console.log(user.getFullName()) // "Evan Graham"
user.setFullName('David Smith')
console.log(user.getFullName()) // "David Smith"
```

<!--slide-->

With a getter/setter:

```js
class User {
  constructor (firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
  set fullName (name) {
    var words = name.toString().split(' ');
    this.firstName = words[0] || '';
    this.lastName = words[1] || '';
  }
}

var user = new User('Evan', 'Graham')
console.log(user.fullName) // "Evan Graham"
user.fullName = 'David Smith'
console.log(user.fullName) // "David Smith"
```


<!--slide-->

### Static Methods

> The `static` keyword defines a static method for a class.
>
> Static methods are called without instantiating their class and are also not callable when the class is instantiated.
>
> They are often used for utility methods related to the class


<!--slide-->

```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
console.log(Point.distance(p1, p2)); // 7.0710678118654755
```

<!--slide-->

Same code in ES5:

```js
var Point = function (x, y) {
  this.x = x;
  this.y = y;
}
Point.distance = function(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.sqrt(dx*dx + dy*dy);
}
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
console.log(Point.distance(p1, p2));  
```

<!--slide-->

### Extending classes

> The `extends` keyword is used in class declarations or class expressions to create a class as a child of another class.

> ```js
> class ChildClass `extends` ParentClass { ... }
> ```

<!--slide-->

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}
class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}
var d = new Dog('Mitzie');
d.speak(); // "Mitzie barks."
```

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
var PremiumUser = function(name) {
  this.name = name
}
PremiumUser.prototype = new User()
PremiumUser.prototype.orderItem = function(item) {
  console.log(item + ' purchased: delivery in 1 day' )
}
```

<!--slide-->

Written in ES6

```js
class User {
  constructor (name) {
    this.name = name
  }
  sayName () {
    console.log('My name is ' + this.name )
  }
  orderItem (item) {
    console.log(item + ' purchased: delivery in 3 days' )
  }
}
class PremiumUser extends User {
  orderItem (item) {
    console.log(item + ' purchased: delivery in 1 day' )
  }
}
```

<!--slide-->

### Super class calls with super

> The `super` keyword is used to call functions on an object's parent.

<!--slide-->

```js
class PremiumUser extends User {

  constructor(name) {
    super(name + ' (Premium User)')
  }
  orderItem (item) {
    super.orderItem(item)
    console.log( 'Delivery in 1 day as Premium User' )
  }
}

var user = new PremiumUser('Evan')
user.sayName() // "My name is Evan"
user.orderItem('TV')
// "TV purchased: delivery in 1 day"
// "Delivery in 1 day as Premium User"
```

<!--slide-->

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var point = new Point(5, 10)
console.log(point.toString()) // "(5, 10)"
```

<!--slide-->

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // (A)
    this.color = color;
  }
  toString() {
    return super.toString() + ' in ' + this.color;
  }
}

var point = new Point(5, 10)
console.log(point.toString()) // "(5, 10)"
var colorPoint = new ColorPoint(5, 10, "Green")
console.log(colorPoint.toString()) // "(5, 10) in Green"
```

<!--slide-->

#### Super in static methods

> `super` can be used in static methods as well

```js
class Tripple {
  static tripple(n) {
    n = n | 1;
    return n * 3;
  }
}

class BiggerTripple extends Tripple {
  static tripple(n) {
    return super.tripple(n) * super.tripple(n);
  }
}

console.log(Tripple.tripple());
console.log(Tripple.tripple(6));
console.log(BiggerTripple.tripple(3));
```

----

### Practice

Convert to class syntax

```js
var Collection = function() {
}

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

https://jsbin.com/jovoce/edit?js,console,output


<!--slide-->

```js
class Collection extends Array {
  sortBy (property) {
    return this.sort(function(obj1, obj2){
      return obj1[property] > obj2[property]
    })
  }
  findBy (prop, value) {
    var result
    this.forEach(function(obj){
      result = result || (obj[prop] === value ? obj : undefined)
    })
    return result
  }
}
```

<!--slide-->

### Practice

Make `Manager` extend from `Employee` to reduce code

```js
class Employee {
  constructor(firstName, familyName) {
    this._firstName = firstName;
    this._familyName = familyName;
  }

  getFullName() {
    return this._firstName + ' ' + this._familyName;
  }
}

class Manager {
  constructor(firstName, familyName) {
    this._firstName = firstName;
    this._familyName = familyName;
    this._managedEmployees = [];
  }

  getFullName() {
    return this._firstName + ' ' + this._familyName;
  }

  addEmployee(...args) {
    this._managedEmployees.push(...args);
  }
}
```

https://jsbin.com/focidi/edit?js,console,output

<!--slide-->

Solution:

```js
class Manager extends Employee {
  constructor(...args) {
    super(...args);
    this._managedEmployees = [];
  }

  addEmployee(...args) {
    this._managedEmployees.push(...args);
  }
}
```

<!--slide-->

Create getter for employee names:

```js
var manager = new Manager('Evan', 'Graham')
var employee1 = new Employee('Rachel', 'Green')
var employee2 = new Employee('David', 'Smith')

manager.addEmployee(employee1, employee2 )

console.log(manager.employeeNames) // ["Rachel Green", "David Smith"]
```

https://jsbin.com/labubu/edit?js,console,output

<!--slide-->

```js
class Manager extends Employee {
  constructor(...args) {
    super(...args);
    this._managedEmployees = [];
  }
  addEmployee(...args) {
    this._managedEmployees.push(...args);
  }
  get employeeNames () {
    return this._managedEmployees.map( employee => employee.getFullName() )
  }
}
```
