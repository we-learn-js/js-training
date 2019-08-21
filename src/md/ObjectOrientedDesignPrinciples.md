# Object-Oriented Design Principles

<!--section-->

## S.O.L.I.D. Principles

<!--slide-->

SOLID stands for:

- **S** – Single-responsiblity principle (SRP)
- **O** – Open-closed principle (OCP)
- **L** – Liskov substitution principle (LSP)
- **I** – Interface segregation principle (ISP)
- **D** – Dependency Inversion Principle (DIP)

<!--slide-->

### Single Responsibility Principle (SRP)

> Every object should have a single responsibility, and that responsibility should be entirely encapsulated by the class.

> A class should have only one reason to change.

> Classes must be focused.

<!--slide-->

![Single Responsibility](https://lostechies.com/derickbailey/files/2011/03/SingleResponsibilityPrinciple2_71060858.jpg)

Note: A pocket knife that was extended to the point that it can do anything, except fitting in your pocket.

<!--slide-->

> Always strive for **low coupling**, but **high cohesion**

---

> **Cohesion** is how strongly-related and focused are the various operations of a module.

---

> **Coupling** is the degree to which each program module relies on each of of the other module.

> Having multiple responsibilities within a class couples theses responsibilities.

<!--slide-->

### Open/Close Princple (OCP)

> Software elements (classes, modules, functions, etc.) should be open for extension, but closed for modification.

> Create classes in a way you can **extend their behaviour without modifying their code**.

<!--slide-->

![Open/Close Princple](https://lostechies.com/derickbailey/files/2011/03/OpenClosedPrinciple2_2C596E17.jpg)

<!--slide-->

Consider:

```js
class EntityController {
  addComment(comment) {
    if (this.validateNotSpam(comment)) {
      // Save the comment to database
    }
  }
  validateNotSpam() {
    //Check if the IP-address is known as a spammer
  }
}
```

<!--slide-->

> What would happen if we want to validate that the user is logged?

> We would have to update `EntityController` for a reason which is not really the comment addition responsibility.

<!--slide-->

```js
class EntityController {
  addComment(comment) {
    if (this.validateNotSpam() && this.validateLoggedUser()) {
      // Save the comment to database
    } else {
      return false;
    }
  }
  validateNotSpam() {
    //Check if the IP-address is known as a spammer
  }
  validateLoggedUser() {
    //Check if the user has session
  }
}
```

<!--slide-->

> What if now we need to the user to be of a specific type to comment ?

> We need `EntityController` behaviour to be extendable, without modifying the class every time.

<!--slide-->

```js
class EntityController {
  constructor(validators) {
    this.validators = validators;
  }
  addComment(comment) {
    const isValid = this.validators.reduce((isValid, validator) => {
      return validator.validate(comment) || isValid;
    }, true);

    if (!isValid) {
      return false;
    }
    // Save the comment to database
  }
}
```

<!--slide-->

Could also be lazy (stop of first failure):

```js
class EntityController {
  constructor(validators) {
    this.validators = validators;
  }
  addComment(comment) {
    for (var i = 0; this.validators.length; i++) {
      if (!this.validators[i].validate(comment)) {
        return false;
      }
    }
    // Save the comment to database
  }
}
```

<!--slide-->

Now `EntityController` is extendable with more validations, without actually modifying the class.

```js
class IValidator {
  validate() {
    throw new Error('Expected IValidator.validate() not implemented');
  }
}
class SpamValidator extends IValidator {
  validate() {
    /* Check if the IP-address is known as a spammer */
  }
}
class UserLoggedValidator extends IValidator {
  validate() {
    /* Check if user has session */
  }
}
var ctrl = new EntityController([new SpamValidator(), new SessionValidator()]);
ctrl.addComment('a comment');
```

<!--slide-->

### Liskov Substitution Principal (LSP)

> LSP is a particular definition of a subtyping relation, called **strong behavioural subtyping**.

> An object of a super class, should be replaced by **any** of its sub class objects, without altering the program.

<!--slide-->

> The behaviour of a subclass, should be as correct as the behaviour of a super class.

> Child classes should never break the parent class' type definitions.

> A Child class has to do the same operation, in a different way, not a different operation.

> LSP violation breaks **polymorphism** principle.

<!--slide-->

#### LSP Violation examples

<!--slide-->

##### The classic example: Rectangle/Square

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}
class Square extends Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = width;
  }
}

var square = new Square(4, 6);
var rectangle = new Rectangle(4, 6);

square.getArea() === rectangle.getArea(); // False
```

Square violates rectangle laws of geometry.

<!--slide-->

![Liskov Substitution Principal](https://lostechies.com/derickbailey/files/2011/03/LiskovSubtitutionPrinciple_52BB5162.jpg)

<!--slide-->

##### Another example: The Penguin

Consider:

```js
class Bird {
  contructor (height, weight)
  speak() { console.log('Pi!') }
  eat()
  walk(distance)
  fly(distance)
}
class Duck extends Bird {
  speak() { console.log('Cuak!') }
}
class Penguin extends Bird {
  speak() { console.log('Creck!') }
  fly() { thown new Error('Can\'t fly') }
}
```

<!--slide-->

> Duck will always behave as Bird.

> Penguin will work sometimes, but sometimes it won't behave as expected with Bird.

```js
function birdBehaviorSequence1(bird) {
  bird.eat('corn');
  bird.walk(30);
}
function birdBehaviorSequence2(bird) {
  bird.eat('corn');
  bird.speak();
  bird.fly(30);
}
```

<!--slide-->

#### Interface segregation principle (ISP)

> ISP is about business logic to clients communication.

> A client should never be forced to depend on methods it does not use.

> A client should depend on the smallest set of interface methods.

> Interfaces has to be as narrow as possible.

> Segregate, decompose your operations in small interfaces.

<!--slide-->

#### About Interfaces

> "Every operation declared by an object specifies the operation’s name, the objects it takes as parameters, and the operation’s return value. This is known as the operation’s signature.

> The set of all signatures defined by an object’s operations is called the interface to the object. An object’s interface characterises the complete set of requests that can be sent to the object."

[source](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)

<!--slide-->

> An interface is the description of the set of operations that an object could perform.

> Interface is actually a concept of abstraction and encapsulation.

> For a given "box", it declares the "inputs" and "outputs" of that box.

<!--slide-->

##### Real life interface: TV

> In a TV, you have a few buttons to execute operations: turn on/off, volume up/down, next/previous channel, ...

> Buttons are TV's interface. Buttons are like **methods** we can invoke to perform an operation. The name of the **operations** are represented by icons or words.

> The screen is TV's **output**.

> Besides buttons, we have plugs for HDMI, VGA, etc. The plugs expect an input: a cable that provides a stream of video and sound. Plugs are part of the interface, but they require an input, like the **arguments** we provide on a **method invocation**.

<!--slide-->

Let's see a TV class:

```js
class TV {
  turnOn()
  turnOff()
  nextChannel()
  previousChannel()
  volumeUp()
  volumeDown()
  mute()
}
```

> Some TVs may have more of buttons. But we all know what is the smallest set of buttons of a TV.

<!--slide-->

> But, you have another device, the remote. You know how to use it as it has the same buttons (interface) as a TV.

> Tv changes internally on any operation. Remote sends signals, but the operations ARE THE SAME.

> To use the TV, the user only needs to receive something that have the buttons: nextChannel, turnOn/Off, volumeUp, ...

> The object provided (device) is irrelevant, only the implemented buttons matter. Only the interface matters.

<!--slide-->

```js
class TVInterface {
  turnOn()
  turnOff()
  nextChannel()
  previousChannel()
  volumeUp()
  volumeDown()
  mute()
  /**/
}
class TV extends TVInterface {
  /* operations */
}
class TVRemove extends TVInterface {
  /* operations */
}
```

<!--slide-->

> `TV` and `TVRemote` have the same interface.

> When you want to use a TV, you will be able to use it no matters what device is provide to you, as soon as it has the **SAME INTERFACE**.

> With an app, a cell phone can control the TV, as it implements the well know TV basic interface.

<!--slide-->

> Our client `TVWatcher` only relies on an interface: the `TVInterface`.

> The object (device) provided does not matter. Then, `TVWatcher` can expect a list of operations instead of a specific class instance.

```js
class TVWatcher {
  watchChannel(device, channel) {
    while (device.currentChannel !== channel) {
      device.nextChannel();
    }
  }
}
```

<!--slide-->

#### To sum up

> The interface does not have to do with what a class is, or what properties it has,
> It has to do with:
>
> - What are the operations
> - What are the name of theses operations and its required inputs (parameters)

<!--slide-->

#### Interface segregation principle (ISP)

![Interface segregation principle](https://lostechies.com/derickbailey/files/2011/03/InterfaceSegregationPrinciple_60216468.jpg)

<!--slide-->

##### Example of interface that needs to be segregated

Let's see our interface:

```js
class TVInterface {
  turnOn()
  turnOff()
  nextChannel()
  previousChannel()
  volumeUp()
  volumeDown()
  mute()
  /**/
}
```

<!--slide-->

> Now we have to created a minimalistic device `MiniRemote`.

> It will be used only by `TVWatcher` that only turns on the TV and sets channel.

> But, as `TVInterface`as more methods, we should implement ALL its methods in `MiniRemote`

<!--slide-->

If we had segregated our interface on design:

```js
class DeviceInterface {
  turnOn()
  turnOff()
}
class ChannelsControlInterface {
  nextChannel()
  previousChannel()
}
class VolumeControlInterface {
  volumeUp()
  volumeDown()
  mute()
}
```

TVWatcher would expect `ChannelsControlInterface` and `MiniRemote` would have to implement 2 methods, instead of 7.

<!--slide-->

### Dependency Inversion Principle (DIP)

> This principle is also called Inversion of Control (IoC)

> High level objects, should not depend on low level implementations. They should depend on abstractions (interfaces).

> Abstractions should not depend on details. Details should depend on abstractions.

> DIP is all about how interfaces force input objects to have the methods we expect.

<!--slide-->

![Dependency Inversion Principle](https://lostechies.com/derickbailey/files/2011/03/DependencyInversionPrinciple_0278F9E2.jpg)

<!--slide-->

What are dependencies?

- Framework
- Third Party Libraries
- Database
- File system
- Email service
- Web service
- ...

<!--slide-->

#### Real world example: City Hall

> When you want a specific service (operation) to be done by the City Hall. You MUST fill in a form, with a format.

> The form fields are an abstraction/interface and the filled form is an instance of it.

> City Hall controls how to make request. You don't.

<!--slide-->

#### Real world example: Car charging

> When you want to charge you cell phone in your car, you only have one plug: the lighter.

> Car does not care about what king of plug needs your cell phone or tablet, or other devices.

> If you want to use car's energy, you must buy an **adapter** to comply car's plugging interface.

> The car controls the way a device should be charged with its interface.

<!--slide-->

#### High level to low level Dependency

```js
class FormCtrl {
  onSuccess() {
    AlertLibrary.message('Data saved in database!');
  }
  onError() {
    AlertLibrary.message('Error!');
  }
}
```

> `FormCtrl` depends on the interface of `AlertLibrary`.

> If it changes, `FormCtrl` would have to be modified.

<!--slide-->

![DI](http://www.javabrahman.com/wp-content/uploads/Dependency-Inversion-Principle-Dependencies-Procedural-Systems.png)

<!--slide-->

#### Inverting the control

```js
class IMessageService {
  showMessage() {
    throw new Error('IMessageService.showMessage not implemented');
  }
}
class FormMessageService extends IMessageService {
  showMessage(msg) {
    AlertLibrary.message(msg);
  }
}
class FormCtrl {
  constructor(messageService) {
    // Expects object the implements IMessageService
    this.messages = messageService;
  }
  onSuccess() {
    this.messages.showMessage('Data saved in database!');
  }
  /**/
}
```

<!--slide-->

> `FormCtrl` depends on an abstraction, `IMessageService`.

> Injected message dependency depends on a higher level abstraction, `IMessageService`.

<!--slide-->

![DI](http://www.javabrahman.com/wp-content/uploads/Dependency-Inversion-Principle-Dependencies-Object-Oriented-Systems.png)

<!--slide-->

#### To sum up

> When you force your input to implemented an interface YOU define, you are inverting the control.

> You decide what are the methods and the input has to fullfill your requirements

<!--section-->

## G.R.A.S.P

### General Responsibility Assignment Software Patterns

<!--slide-->

> GRASP provide a way to identify the single responsibility for a class or module.

> They aid abstracting in a methodical, rational, explainable way.

<!--slide-->

Responsibility is defined as a contract or obligation of a class and is related to behaviour.

There are 2 types of responsibilities:

- **Knowing** - responsibilities of an object includes
  - Knowing about private encapsulated data-member data
  - Knowing about related objects
  - Knowing about things it can derive or calculate
- **Doing** - responsibility of an object includes
  - Doing something itself-assign, calculate, create
  - Initiating action in other objects
  - Controlling and coordinating activities in other objects

<!--slide-->

> GRASP patterns describe fundamental principles of assigning responsibilities to objects.

> There are a number of principles for determining what counts as responsibility

<!--slide-->

##### Controller

> Responsible of executing a use case or story.

> Receives request from UI layer object and then controls/coordinates with other object of the domain layer to fulfill the request.

> It delegates the work to other class and coordinates the
> overall activity.

Example: a class in charge of managing a form.

<!--slide-->

##### Information Expert

> Has all the data require for a particular process.

> It's focused on data, more than processing.

Example: A class in charge of filtering, processing a lot of instances of a class.

<!--slide-->

##### Creator

> Responsible for creating other objects

> In general, a class `B` should be responsible for creating instances of class `A` if one, or preferably more, of the following apply:

> - Instances of `B` contains instances of `A`
> - Instances of `B` record instances of `A` to a file or database
> - Instances of `B` closely use instances of `A`
> - Instances of `B` have data needed on instantiate `A`

Example: factories for simple instances, builders of complex objects

<!--slide-->

##### High Cohesion

> In computer programming, cohesion refers to the degree to which the elements of a module belong together

> High cohesion is a measure of how focused the responsibilities of an object are.

> All the operations of a class must be related. A class should not do things that are not related.

> Make a **cohesion class** responsible for closely related features when related.

Example: a class that saves to database and shows a message to user has low cohesion.

<!--slide-->

##### Indirection

> Assign the responsibilities to an intermediate object which in turn collaborates with two objects avoiding the directly coupling

> Adapters allow system objects to interact with external interfaces

> Related design patterns: Adapter, Bridge, Facade, Observer, Mediator

Example: an events manager (publishers subscribers)

<!--slide-->

##### Pure Fabrication

> Classes that are technical ingredients in the solution, but are not directly tied to the problem domain.

> Related design patterns: Adapter, Command, ...

Example: Object that only save information in a database

<!--slide-->

##### Low Coupling

> Reduce coupling between classes

> A class with high coupling relies on many other classes. It makes the code:

- Not reusable
- Hard to understand in isolation
- Easily brojken with other class changes

> A class should depend in as few as possible objecs/interfaces

ISP and DIP helps with the low coupling principle

<!--slide-->

##### Polymorphism

> When a responsibility depends on the type of data, use polymorphism.

> LSP helps with polymorphism.

<!--slide-->

##### Protected Variations

> Encapsulate responsibilities that may change in a new class with a stable interface

> Open/Close Principle helps with protected variations.

<!--slide-->

#### How to use GRASP ?

> If your class is creates instances (creator) and controls inputs of a form (controller), and processes data (expert), it has too much responsibilities...

> If your class relies on 8 other classes of different kind, your design is wrong.

<!--section-->

## Practice

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

> Apply OO principles on the code.

```js
class LoginForm {
  constructor(form) {}
  submit(event) {}
  showMessage(text) {}
  /* */
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/ObjectOrientedDesignPrinciples/yozudi?embed

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

> LoginForm has several responsibilities.
>
> - Manage UI inputs
> - Send http requests
> - Show interface messages
> - Change page

<!--section-->

## Must Read

[SOLID - EnvatoTuts](https://code.tutsplus.com/series/the-solid-principles--cms-634)

[SOLID - Code Magazine](http://www.codemag.com/article/1001061)

[DIP - Java Brahman](http://www.javabrahman.com/programming-principles/dependency-inversion-principle-example-java/)
