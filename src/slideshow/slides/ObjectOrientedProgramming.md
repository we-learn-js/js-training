# Object-Oriented programming

<!--section-->

### What is it for?

> Procedural or functional programming, functions are not related to any type of data. They receive data as input, execute a task and return an output.

> OOP is another way to organize code. OOP is data oriented.

> Data and tasks are encapsulated in a single piece of code: an object.

> Methods of the object are directly related to the object's state.

<!--slide-->

## Classes and Objects

> The class is the idea of a thing, the object is the thing.

<!--slide-->

### What is a class?

> Class is a blueprint: the definition, the description of an object.
>
> Describes what **objects are** with attributes (properties) that describe the state : name, height, weight, gender, age, ...
>
> Describes what **objects can do** with verbs (methods) that describe the behavior: walk, run, jump, speak, ...


<!--slide-->

### What does it describe ?

> A class can describe any concept that you can talk about when you try to describe your program:
>
> * Real life concepts: Restaurant, Review, User, ...
> * Visual parts of the app: TextBox, Button, Window, ...
> * Invisible things: Date, TimeZone, ...

<!--slide-->

### What is an object?


> It's a thing created based on the blueprint (the class).

> An object is an instance of a class.

> One class can create multiple objects, like you create multiple houses based on a unique blueprint.

<!--section-->

## OOP Principles

> * **Abstraction** Split program into smaller responsibilities and data types (classes).
> * **Encapsulation**
> Hide the internals of a class.
> * **Inheritance**
> Inherit members from parent class.
> * **Polymorphism**
> Access a class through its parent interface.

<!--slide-->

### Abstraction

> Abstraction is managing complexity, ignoring irrelevant features, properties and emphazing the relevant ones.
>
> A program can include a lot of data types and operations. Abstracting is extracting the commons concepts that relate data types and actions between each other.
>
> Objects have properties and capabilities. Theses capabilities can be used by other objects tu achieve their own operations.
>
> Abstraction is used to think and communicate more effectively when we talk about our program.

<!--slide-->

#### Real life abstraction: the city

> In a city, there lot of things (buildings, people, animals), and they do a lot of things (eat, drive, shop, ...)

> There are cars, citizens, companies, a city hall, hospitals, ... All of them are learnt concepts that have characteristics and capabilities we all know.

> For instance, we know that a person can drive or not. But a dog can't drive.

<!--slide-->

> A hospital has rooms, doctors, nurses.

> It has a set of capabilities related to its nature: emergency, blood analysis, intensive care, ...

> But we know a hospital can't deliver an ID (card). For that, you can to request it to another entity: the City Hall.

> **Abstracting is extracting what concepts/entities have your program and which capabilities belong to each of them**

<!--slide-->

> **Abstracting is hard** and usually you can abstract a program in many different ways.

> You could say that a hospital and a school are both buildings.

> But a teammate could see a hospital is a health service that have a building as location and a school another service.

<!--section-->

### Encapsulation

> Encapsulation is a strategy used as part of abstraction.

> Abstraction solves the problem in the design level.

> Encapsulation solves the problem in the implementation level.

<!--slide-->

> A class is a single logically organized unit where are enclosed operations (methods) to its related data (properties).

> The idea of encapsulation is to keep classes separated and prevent them from being tightly coupled with each other.

<!--slide-->

> Classes announces some operations (methods) available for consume.

> The set of declared operations with its names are called its **interface**.

> Encapsulation hides the implementation details.

> All data members (properties) should be hidden and be accessed by accessors (getters and setters)

<!--slide-->

#### Real life encapsulation: the city hall

> A city hall has a lot of services (operations). You don't know them all, just the ones you use.

> To request a service, you don't enter the building, go to the mayor office and ask him.

> Instead, you must follow the operations provided by the city hall: to request a service, you have to go to reception, and request a form. You fill in the form with your data and the city hall will respond later.

> To respond, city hall delegates to its employees, uses internal resources but you don't know about that. You just get a response.

<!--slide-->

##### City Hall has an interface

> The interface is the reception. The front desk.

> You are informed of all the operations you can perform there.

> One of them is requesting a service, but you have to follow city hall's rules filling its form.


<!--slide-->

```js
class CityHallServiceRequest () {
  set requesterId ()
  set type ()
  set comment ()
}
class CityHall {
  requestService (request) {
    if(request instanceof CityHallServiceRequest) {
      // process request and return response
    } else {
      throw new Error("Request form required")
    }
  }
}
```

<!--slide-->

##### City Hall hides the implementation details

> You can't know how city hall processes the request. Who does it? Is a phone used to do so?

> City may delegate part the the work to another entity, like the government, to request more info about you.

> In that case, city will send an info request to the government with the ID you provided. Then it will wait for government's answer, to execute some processing and THEN answer you back.

<!--slide-->

```js
class CityHall {
  requestService (request) {
    switch(request.type) {
      case 'ID_CARD':
        return new IdCardRequest(request).execute()
      case 'WEDDING_DATE':
        return new WeddingRequest(request).execute()
      [...]
    }
  }
}
```

<!--slide-->

##### City Hall hides its data members

> City Hall has employees you don't have access to.

> City Hall even does internal operations that are not exposed to you. For instance, paying  the employees, using the banks, that have its own interface.

> You can't access an employee's instance and check its salary even if you know exactly where is the archive room, as it's not exposed to you on purpose. That info is **private**

```js
CityHall.employees[0].salary // Uncaught TypeError: Cannot read property '0' of undefined
```

<!--slide-->

### Privacy techniques for encapsulation

> Unfortunately, there is no syntax for private object properties or methods in JavaScript.

> We have to take care of it on our own ...

<!--slide-->

Consider:
```js
class SimpleDate {
  constructor(month, day) {
    this.month = month
    this.day = day
  }
  getDay() { return this.day }
  getMonth() { return this.month }
  toString() {
    return new Date(2000,this.month-1, this.day).toLocaleString()
  }
}
var halloween = new SimpleDate(10, 31)
var christmas = new SimpleDate(12, 25)

console.log(halloween.toString()) // "31/10/2000 0:00:00"
console.log(christmas.toString()) // "25/12/2000 0:00:00"
```


<!--slide-->

We want to maintain our properties private, so that no consumer will mutate our object.

```js
console.log(halloween.month = 3)
console.log(halloween.toString()) // "31/3/2000 0:00:00"
```

<!--slide-->

#### Privacy with Conventions

> The most common way to make properties private in javascript  is to adhere to a simple convention:

> If a property name is prefixed and/or suffixed with an underscore, then it should be treated **by consumer** as non-public.

<!--slide-->

Underscore prefix convention:

```js
class SimpleDate {
  constructor(month, day) {
    this._month = month
    this._day = day
  }
  getDay() { return this._day }
  getMonth() { return this._month }
  toString() {
    return new Date(2000,this._month-1, this._day).toLocaleString()
  }
}
```

<!--slide-->

Underscore prefix and suffix convention:

```js
class SimpleDate {
  constructor(month, day) {
    this.__month__ = month
    this.__day__ = day
  }
  getDay() { return this.__day__ }
  getMonth() { return this.__month__ }
  toString() {
    return new Date(2000,this.__month__-1, this.__day__).toLocaleString()
  }
}
```


<!--slide-->

##### Problem

> The data is still technically accessible to everyone

```js
console.log(halloween.__month__ = 3)
console.log(halloween.toString()) // "31/3/2000 0:00:00"
```

<!--slide-->

#### Privacy with Privileged Methods

> Create local variables in the constructor
>
> Create methods inside the constructor so they have access to constructor's closure


```js
class SimpleDate {
  constructor(month, day) {
    this.getDay = function() { return day }
    this.getMonth = function() { return month }
    this.toString = function() {
      return new Date(2000,this._month-1, this._day).toLocaleString()
    }
  }
}
```

<!--slide-->

##### Problem

> Were are not using the class syntax, which means we are not taking advantage of the prototype chain.

With prototype:

```js
console.log(christmas.getDay == halloween.getDay) // true
```

With provileged methods:

```js
console.log(christmas.getDay == halloween.getDay) // false
```

Note: N instances of `Function` are created and saved in memory for **each** instance of `SimpleDate`.

<!--slide-->

#### Privacy with Symbols

<!--slide-->

##### About Symbols (ES6)

> A symbol is a unique and immutable data type.

> The Symbol object is an implicit object wrapper for the symbol primitive data type.

> ```js
> Symbol([description])
> ```

[MDN - Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

<!--slide-->

```js
var sym1 = Symbol()
var sym2 = Symbol("foo")

console.log(sym1) // Symbol()
console.log(sym2) // Symbol(foo)
console.log(typeof sym1) // "symbol"
```

<!--slide-->

> Symbol("foo") does not coerce the string "foo" into a symbol.

> It creates a new symbol each time

```js
var sym1 = Symbol("foo")
var sym2 = Symbol("foo")
var obj = {[sym1]:1, [sym2]:2}

sym1 === sym2 // false
obj[sym1] // 1
obj[sym2] // 2
```

<!--slide-->

##### Privacy with Symbols

```js
let dayKey = Symbol('day')
let monthKey = Symbol('month')

class SimpleDate {
  constructor(month, day) {
    this[monthKey] = month
    this[dayKey] = day
  }
  getDay() { return this[dayKey] }
  getMonth() { return this[monthKey] }
  toString() {
    return new Date(2000,this[monthKey]-1, this[dayKey]).toLocaleString()
  }
}
```

<!--slide-->


##### Problem 1

> Private variables are not accessible to child classes if they are in separated files

```js
class ComplexDate extends SimpleDate { }
```

<!--slide-->

##### Problem 2

> Symbols are can be accessed with `Object.getOwnPropertySymbols`, but not explicitly

```js
let symbolKeys = Object.getOwnPropertySymbols(halloween)
halloween[symbolKeys[0]] = 3
console.log(halloween.toString()) // "31/3/2000 0:00:00"
```

<!--slide-->

#### Privacy with Weak Maps

<!--slide-->

##### About Weak Maps

> The `WeakMap` object is a collection of key/value pairs in which the keys are weakly referenced.  The keys must be objects and the values can be arbitrary values.
>
> ```js
> new WeakMap([iterable])
> ```

[MDN - WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)


<!--slide-->

> Keys of WeakMaps are of the type Object only

```js
var wm1 = new WeakMap()
var o1 = {}
wm1.set(o1, 37)
wm2.has(o1) // true
wm3.delete(o1)
wm2.has(o1) // false
```

<!--slide-->

##### Privacy with Weak Maps

> We can store private object properties in key/value pairs using our instance as the key, and our class can capture those key/value maps in a closure.

```js
let priv = new WeakMap()

class SimpleDate {
  constructor(month, day) {
    priv.set(this, { day, month })
  }
  getDay() { return priv.get(this).day }
  getMonth() { return priv.get(this).month }
  toString() {
    return new Date(2000,priv.get(this).month-1, priv.get(this).day).toLocaleString()
  }
}
```


<!--slide-->

##### Problem

> Private variables are not accessible to child classes if they are in separated files

```js
class ComplexDate extends SimpleDate {}
```

<!--section-->

## Inheritance

> Inheritance allows to define a hierarchy between entities (classes)

> Inheritance allows **child** classes inherits the characteristics of existing **parent** class: properties and methods.

<!--slide-->

> **Child** class can extend the **parent** class and:
> * Redefine properties (defining the new class)
> * Redefine methods (modifying existing behaviour)
> * Add new properties and methods
>
> Inheritance has benefits:
> * Extensibility
> * Reusability: eliminates redundant code
> * Abstraction



<!--slide-->

### Real life inheritance: ATMs

> A city is full of ATMs.
>
> When you try to withdraw money, they all execute a set of operations.
>
> You have a class, ATM, and instances of ATM all over the city.

<!--slide-->

```js
class CreditCard () {
  get code()
  get owner()
}
class ATM {
  withdrawMoney (creditCard) {
    this.askForCode()
      .then(this.askForAmount)
      .then(this.checkAccountAvailableMoney)
      .then(this.deliverMoney)
      .then(this.printTicket)
  }
  askForCode()
  askForAmount()
  checkAccountAvailableMoney()
  deliverMoney()
  printTicket()
}
```


<!--slide-->

> All ATMs do basically the same thing, but  some differ.
>
> Some ATMs will print a ticket of the operation. Others will worry about the environment and ask you if you want a printed ticket of not.
>
> The ATMs differ depending on Bank's business rules.
>
> Then, we should created a new ATM class that inherits ATM basic operation, and change only what's different.

<!--slide-->

```js
class EcoATM  extends ATM {
  withdrawMoney (creditCard) {
    this.askForCode()
      .then(this.askForAmount)
      .then(this.checkAccountAvailableMoney)
      .then(this.deliverMoney)
      .then(this.askForTicketPrinting)
      .then(function(shouldPrint){
        return shouldPrint ? this.printTicket() : null
      })
  }
  askForTicketPrinting()
}
```

<!--slide-->

### Exercise: The School

> We are given a School.
>
> In the school, there are classes of students. Each class has a set of teachers. Each teacher a set of disciplines.
>
> Students have a name and are assigned to a unique class. Classes have a unique text identifier. Teachers have name. Disciplines have name, number of lectures and number of exercises.
>
> Both teachers and students are people

Identify the classes. Define the classes properties and methods with a hierarchy.

<!--slide-->

### Exercise: The animals

> Consider a hierarchy composed by Dog, Frog, Cat, Kitten, Tomcat.
>
> All of them are Animals. Kittens and tomcats are cats. All animals are described by age, name and sex.
>
> Kittens can be only female and tomcats are only male.
> Each animal produces a sound.

Identify the classes. Define the classes properties and methods with a hierarchy.

Create static method in Animal that returns average age of an array of animals.

<!--section-->

## Polymorphism

> Polymorphism is the ability to take more than one form. Its means that a class can be used to its parent interface.

> Polymorphism allows abstract operations to be defined in base class (parent), but implemented only in the child class.

> Abstract method is when it can be consumed in the same way but its implementation differs depending on class


<!--slide-->

### Real life polymorphism: Cameras

> People use cameras that take pictures. There is digital and analogic cameras that take the picture in a different manner.

> You can capture a scene. All camera use a lens for it. But the way they save it is different.

<!--slide-->

> We create a base camera class

> The class is abstract as one of its methods is not implemented. An instance of `CameraAbstract` can't fullfill the purpose on its own.

```js
class CameraAbstract {
  captureScene () {} // returns an image
  takePicture () {
    this.saveImage(this.captureScene())
  }
  savePicture () { } // abstract method
}
```

<!--slide-->

> We create are types of cameras. They inherit their parent behaviour, and only the picture storage is implemented.

```js
class DigitalCamera extends CameraAbstract {
  savePicture () { } // Saves on hardisk
}
class AnalogicCamera extends CameraAbstract {
  savePicture () { } // Saves on reel
}
```

<!--slide-->

> Now any kind of camera can be used to take picture. They have the same interface that executes same operation, but differently.

> That's polymorphism: `DigitalCamera` and `AnalogicCamera` can be used exactly the same way as they inherit the same interface from its parent.

> Both camera types can be passed to a photographer and he will make the same us of them.

<!--slide-->

```js

class Photographer {
  setCamera (camera) {
    this.camera = camera
  }
  takePicture () {
    this.camera.takePicture(this.position)
  }
}

var person = new Photographer('Evan')
person.setCamera(digitalCamera)
person.takePicture()

```

<!--slide-->

### Exercise: The Bank

A bank holds different types of accounts for its consumers: deposit account, loan accounts and mortgage accounts.

All accounts have customer, balance, and interest rate (monthly based).
* Deposit accounts are allowed to deposit and withdraw money
* Loan and mortgage accounts can only deposit money

All accounts can calculate their interest amount fir a given period (in months.)
* Loan accounts have no interest for the first 3 months.
* Deposit accounts have no interest if their balance is positive and less than 1000
* Mortgage accounts 1/2 interest for the first 12 months for the companies and 6 for individuals.


Identify classes, interfaces, abstract actions and implement calculation of the interest functionality.

<!--section-->


## Must read

[EloquentJs](http://eloquentjavascript.net/1st_edition/chapter8.html)

[Youtube - Composition over Inheritance](https://www.youtube.com/watch?v=wfMtDGfHWpA)

[Youtube - Object-Oriented is bad](https://www.youtube.com/watch?v=QM1iUe6IofM)
