# Design Patterns

----

> A design pattern is a proven solution to common software development problems

> A language that team can use to discuss about design

---

## Strategy Pattern

> Allow a behavior to be selected at run time.

> The different behaviors are the different strategies.

> Useful when we have lot of behaviors slightly different and we don't know which one will be used.

> Separate what changes of may change from what stays the same

----

### Example: Entended inputs

> Our `Input` object is a wrapper of `HTMLInputElement` that handles different types pf validation.

```js

class Input {
  setElement(inputElement) {
    this.element = inputElement
  }
  getValue () {}
  setValue () {}
  validate () {
    var type = this.element.getAttribute('type')
    if (type === 'phone') {
      return (/^[0-9]{11}$/g).test(this.getValue());
    } else if (type === 'email') {
      return this.getValue().indexOf('@') !== -1
    }
  }
  /* ... */
}
```

----

#### The problem

> We know other types of input/validation could happen

> We want to add input type number that is valid if value is a number

> We have to change `validate()`, which is a violation of the OCP

```js
validate () {
  var type = this.element.getAttribute('type')
  if (type === 'phone') {
    return (/^[0-9]{11}$/g).test(this.getValue());
  } else if (type === 'email') {
    return this.getValue().indexOf('@') !== -1
  } else if (type === 'number') {
    return typeof this.getValue() === 'number'
  }
}
```

----

> We need to encapsulate the validation implementation

> Validation implementation detail is encapsulated in different strategies

```js
var emailValidator = {
  validate (value) {
    return value.indexOf('@') !== -1;
  }
}
var phoneValidator =  {
  validate (value) {
    return (/^[0-9]{11}$/g).test(value);
  }
}
```

----

> Base class is created to hold the responsibility of abstract strategy implementation

```js
class InputValidationStrategy {
  selectValidator (validator) {
    this._validator = validator;
  }
  validate() {
    this._validator.validate(this.getValue());
  }
}
```

----

> Strategy is implemented.

```js
class Input extends InputValidationStrategy {
  setElement(DOMElement) {}
  getValue () {}
  setValue () {}
  /* ... */
}
class InputEmail {
  constructor () {
    super()
    this.selectValidator(emailValidator)
  }
}
class InputPhone {
  constructor () {
    super()
    this.selectValidator(phoneValidator)
  }
}
```

----

> The main strategy does not know anything about concrete strategies.

> Concrete strategies don't know anything about each other.

> Code can be maintained with new strategies with less effort.


----

### Example: DuckLand

> DuckLand shows a large variety of ducks species.

> Ducks swim and make quack sounds.

> For now, we have only two types of duck: mallard and redhead.

[Source example](http://www.amazon.com/First-Design-Patterns-Elisabeth-Freeman/dp/0596007124/ref=sr_1_1?ie=UTF8&qid=1316512770&sr=8-1)


----

#### OO Design

```js
class AbstractDuck {
  quack()
  swim()
  display() // Abstract method as all docks look different
}
class MallardDuck extends AbstractDuck {
  display() // Looks like a mallard
}
class RedheadDuck extends AbstractDuck {
  display() // Looks like a redhead
}
```

----

#### New feature: ducks should fly

> Fly method is added

> All ducks will inherit that behavior

```js
class AbstractDuck {
  quack()
  swim()
  display() // Abstract method as all docks look different
  fly()
}
```

----

#### New feature: robot ducks are added to DuckLand

> * SteamDuck that swims with steam jet and flies with steam jet
> * PropellerDuck that swims with propeller jet and flies with propeller
> * HybridDuck that swims with steam jet and flies with propeller

----

```js
class SteamDuck extends AbstractDuck {
  swim() // steam jet
  fly () // steam jet
}
class PropellerDuck extends AbstractDuck {
  swim () // propeller
  fly () // propeller
}
class HybridDuck extends SteamDuck {
  fly () // propeller
}
```

----

### Problem

> Propeller fly behaviour is duplicated in `PropellerDuck` and `HybridDuck`...

> How do we do it without duplicating code, and preventing problem when new types of dick will be invented?

----

> Inheritance is clearly not the response, as it does not allow our classes to change isolated behaviors, and lead to duplicated code...

> New features of DuckLand make require a RobotMallardDuck that looks like a mallard but flies like a PropellerDuck ...

> We must **encapsulate behaviors** that are different of may change

----

> Let's implement abstract strategies in `AbstractDuck`

```js
class AbstractDuck {
  setFlyBehavior(flyBehavior) { this.flyBehavior = flyBehavior }
  setSwimBehavior(swimBehavior) { this.swimBehavior = swimBehavior }
  fly() { this.flyBehavior.fly(); }
  swim() { this.quackBehavior.swim(); }
  quack()
  display() // Abstract method as all docks look different
}
```

----

> Concrete strategies are implemented separately, in an encapsulate way...

```js
class FlyBehavior {
  fly() { throw new Error("This method must be overwritten"); }
}
class FlyWithWings extends FlyBehavior {
  fly() { console.log('Flap!Flap!'); }
}
class FlyWithPropeller extends FlyBehavior {
  fly() { console.log('Fluflufluflu!'); }
}
class FlyWithSteamJet extends FlyBehavior {
  fly() { console.log('Psht!Psht!Psht!'); }
}
```

----

> Our ducks are now close for modification, open for extension

> And our design is much more flexible

```js
class SteamDuck extends AbstractDuck {
  constructor () {
    super()
    this.setFlyBehavior(new FlyWithSteamJet())
    this.setSwimBehavior(new SwimWithSteamJet())
  }
}
class PropellerDuck extends AbstractDuck {
  constructor () {
    super()
    this.setFlyBehavior(new FlyWithPropeller())
    this.setSwimBehavior(new SwimWithPropeller())
  }
}
class HybridDuck extends SteamDuck {
  constructor () {
    super()
    this.setSwimBehavior(new SwimWithSteamJet())
    this.setFlyBehavior(new SwimWithPropeller())
  }
}
```

----

> Related OO Principles:
> * Open-Close (SOLID)
> * Protected Variations (GRASP)
> * Favor composition over inheritance

---

## State Pattern

> State is the brother of Strategy pattern

> It responds to the same problem, but is used for multiple behaviors that depend on the state of the object, not the type.

----

### Example: Super Mario Bros

> Mario can be regular (small), tall and gets super powerfull when is takes a magical star.

> Depending of its state, Mario's behaviors change depending of his state...

----

```js
const NORMAL = 'MARIO', TALL = 'TALL_MARIO', INVINCIBLE = 'SUPER_MARIO'

class SuperMario {
  constructor () {
    this.setState(NORMAL)
  }
  setState (state) {
    this.state = state
  }
  collisionWith(object) {
    if(object instanceOf Mushroom) {
      this.collisionWithMushroom(object)
    } else if (object instanceof MagicStar ) {
      this.collisionWithStar(object)
    } else if (object instanceof Enemy) {
      this.collisionWithEnemy(object)
    }
  }
  collisionWithStar (star) {
    this.setState(INVINCIBLE)
  }
  collisionWithMushroom (mushroom) {
    if(this.state === NORMAL) { this.setState(TALL) }
  }
  collisionWithEnemy(enemy) {
    if(this.state === NORMAL) {
      this.die()
    } else if(this.state === TALL) {
      this.setState(NORMAL)
    } else if(this.state === INVINCIBLE) {
      enemy.die()
    }
  }
}
```


----

> That's a log of code, and a lot of "if" statements.

> More over, some have high cohesion, like what happens to normal mario if he hits a mushroom or hits an enemy.

> As Mario gets more states (raccoon, etc) and collision to more types of objects, the code will grow and get converted into a nightmare.

> We need to encapsulated behaviors that depend on MArios's state

----

#### Implementing the State Pattern

> State depend behaviors are implemented separately

```js
class MarioState {
  constructor(mario) {
    this.mario = mario
  }
  collisionWithStar()
  collisionWithMushroom()
  collisionWithEnemy()
}
class InvincibleMario extends MarioState {
  collisionWithEnemy(enemy) { enemy.die() }
}
class NormalMario extends MarioState {
  collisionWithEnemy(enemy) { this.mario.die() }
  collisionWithMushroom(mushroom) { this.mario.setState(this.mario.getTallState()) }
}
class TallMario extends MarioState {
  collisionWithEnemy(enemy) { this.mario.setState(this.mario.getNormalState()) }
}
```

----

> `SuperMario` now uses its states to behave...

```js
class SuperMario {
  constructor () { this.setState(this.getNormalState()) }
  setState (state) { this.state = state }

  collisionWithStar (star) { this.state.collisionWithStar(star) }
  collisionWithMushroom (mushroom) { this.state.collisionWithMushroom(mushroom) }
  collisionWithEnemy (enemy) { this.state.collisionWithEnemy(enemy) }

  getInvincibleState() { return new InvincibleMario(this) }
  getNormalState () { return new NormalMario(this) }
  getTallState() { return new TallMario(this) }

}
```

----

### Example: Gumball Machine

https://github.com/tcorral/Design-Patterns-in-Javascript/blob/es6/State/


----

> Related OO Principles:
> * High Cohesion (GRASP)
> * Favor composition over inheritance


---

## Multi Inheritance Pattern

> It's a base pattern that favors composition over inheritance design.

> Helpful to implement multiple interface inheritance.

> In this case, interfaces are created on the fly.


----

```js
const Flyable = Sup => class extends Sup {
  fly() {
    console.log('Flap, Flap!');
  }
}
const Swimable = Sup => class extends Sup {
  quack() {
    console.log('Quack!');
  }
}
class Duck extends Swimable(Flyable(null)) {
  swim() {
    console.log('Chop!');
  }
}
```

[Source](https://github.com/tcorral/Design-Patterns-in-Javascript/tree/es6/Multi-Inheritance-ES6)

----

> Related OO Principles:
> * Interface Segregation Principle (SOLID)
> * Favor composition over inheritance

---

## Publisher/Subscriber Pattern

> Communicate modules indirectly without coupling.

> Instead of consuming other modules's method, we communicate through event channels.

> **Caution:** easy to overuse and make relationship between modules confusing.


----

```js
// pubsub.js
var subscribers = {};
export default {
    publish (topic, data) {
      if (!subscribers[topic]) {
          return;
      }
      subscribers[topic].forEach(function (subscriber) {
          subscriber(data);
      });
    },
    subscribe (topic, callback) {
      var index;
      if (!subscribers[topic]) {
          subscribers[topic] = [];
      }
      index = subscribers[topic].push(callback) - 1;
      return {
          dispose: function () {
              subscribers[topic].splice(index, 1);
          }
      }
    }
};
```

----

A global session object that publishes changes by events

```js
import pubSub from './pubsub.js'

export class Session {
  static SESSION_CHANGE = 'session:change'
  static setUser(user) {
    this.user = user
    pubSub.publish(Session.SESSION_CHANGE, this.user);
  }
  static getUser() {
    return this.user
  }
}
```

----

The header, which always displays currents user's name, listens to the event:

```js
import pubSub from './pubsub.js'
import Session from './session.js'

class AppHeader {
  constructor (domElement) {
    this.title = domElement.getElementsByClassName('title')[0]
    this._sessionHandler = pubSub.subscribe(
      Session.SESSION_CHANGE, this.setUser.bind(this)
    )
  }
  setUser (user) {
    this.title.innerHTML = 'User: ' + user.name
  }
  destroy() {
    this._sessionHandler.dispose()
  }
}
```

Note: **Always** remember to unregister handlers when you don't need them anymore.

----

> Communication takes place over a named channel.

> Based on callbacks which are triggered when events occur.

> Can pass data to callbacks.

> Subscription can return a destroy method to unsubscribe events.

----

> Related OO Principles:
> * Low coupling
> * Indirection (GRASP)

---

## Observer Pattern

> Closely related to the Publisher/Subscriber pattern.

> Observers subscribe directly to the object being observed (the subject).

> Useful for decoupling.

> It's the responsibility of the subject to maintain the list of observers

> Subject's interface should include observing, unobserving and notifying methods.


----

### Example: Implementation of  Weather console

> `WeatherData` data holds state of weather

> Each time data is update, we want it to be logged to the console

----

> Data object with observing, unobserving and notifying methods.

```js
class WeatherData {
  constructor () {
    this.observers = [];
  }
  setMeasurements (temperature, humidity) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.notifyObservers({temperature, humidity})
  }
  registerObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    this.observers = this.observers.filter( observer => observer !== observerToRemove )
  }
  notifyObservers(data) {
    this.observers.forEach(function (observer) { observer(data); });
  }
}
```

----

```js
class WeatherConsole {
  constructor (weatherData) {
    this.weatherData = weatherData
    this.weatherData.registerObserver(this.log.bind(this))
  }
  log (data) {
    console.log("Current conditions: " + data.temperature + "F degrees and " + data.humidity + "% humidity.");
  }
}

```

----

> We know that many other types of data could apply the observer pattern

> Then, it's convenient to encapsulated the observer behavior as a separated responsibility.

----

```js
class Observable {
  constructor () {
    this.observers = [];
  }
  registerObserver (observer) {
    this.observers.push(observer);
  }
  removeObserver (observer) {
    this.observers = this.observers.filter(function (observer) {
      return observer !== observerToRemove;
    });
  }
  notifyObservers (data) {
    this.observers.forEach(function (observer) {
      observer(data);
    });
  }
}
class WeatherData extends Observable {
  setMeasurements (temperature, humidity) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.notifyObservers({temperature, humidity})
  }
}
```

----

#### Caution! Never forget to unobserve on tear down

```js
class WheatherConsole {
  constructor (weatherData) {
    this.weatherData = weatherData
    this.observer = this.log.bind(this)
    this.weatherData.registerObserver(this._observer)
  }
  log (data) {
    console.log('Current conditions: ' + data.temperature + 'F degrees and ' + data.humidity + '% humidity.');
  }
  destroy () {
    this.weatherData.removeObserver(this._observer)
  }
}
```

----

We can also extract the "observer" behavior, as we did with "observable"

```js
class Observer {
  constructor (observable) { // Expected any instance of Observer
    this.observable = observable
    this.observer = this.update.bind(this)
    this.observable.registerObserver(this.observer)
  }
  update() // abstract method
  destroy () {
    this.observable.removeObserver(this.observer)
  }
}
```

----

```js
class WheatherConsole extends Observer {
  update (data) {
    console.log('Current conditions: ' + data.temperature + 'F degrees and ' + data.humidity + '% humidity.');
  }
}
class WheaterEmailer extends Observer {
  update (data) {
    this.sendEmail(
      subject: 'Weather changed !',
      body: 'Current conditions: ' + data.temperature + 'F degrees and ' + data.humidity + '% humidity.'
    );
  }
}
```


----

### Example: EventEmitter-based implementation

```js
import EventEmitter from 'events'

class WeatherData extends EventEmitter {
  setMeasurements (temperature, humidity) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.emit('update', {temperature, humidity})
  }
}
class Observer {
  constructor (observable) { // Expected any instance of Observer
    this.observable = observable
    this.observer = this.update.bind(this)
    this.observable.on('update', this.observer)
  }
  update() // abstract method
  destroy () {
    this.observable.removeObserver(this.observer)
  }
}

```

[EventEmitter](https://nodejs.org/api/events.html)

----

### Example: Interface-based implementation

https://github.com/tcorral/Design-Patterns-in-Javascript/tree/es6/Observer

----

> Related OO Principles:
> * Indirection (GRASP)
> * Low coupling
> * Favor composition over inheritance

---

## Decorator Pattern

> Attaches additional responsibilities to an object dynamically.

> Decorators provide a flexible alternative to subclassing for extending functionality.

> Behaviors are extended in an isolated way, on runtime.

> OCP tells us to open for extension. Decorator is a pattern to open for decoration.

----

### Example: CoffeeShop

> CoffeeShop offers different types of coffee: espresso, decaf, dark roast, etc.

> Each coffee has a different cost

----

```js
class Beverage {
  constructor () {
    this.description = "Unknown Beverage";
  }
  getDescription() { return this.description }
  cost() // abstract method
}
class Espresso extends Beverage {
  constructor () { this.description = "Espresso Coffee"; }
  cost() { return 1.99 }
}
class Decaf extends Beverage {
  constructor () { this.description = "Decaf Coffee"; }
  cost() { return 2.09 }
}
class DarkRoast extends Beverage {
  constructor () { this.description = "DarkRoast Coffee"; }
  cost() { return 2.39 }
}
```

----

> In addition to your coffee, you can also ask for several condiments: milk, soy, and mocha (chocolate)

> A coffee can have several condiments, that have their own cost.

----

### How do we solve the problem?

> With Inheritance?
> It would be a nightmare of classes: DecafWithMilk, DecafWithMilkAndChocolate, DecafWithSoyAndChocolate, etc...

> With Strategy?
> Strategy is useful for conditional behavior. In this case, we are talking about nested behaviors.

----

> Let's try the Decorator Pattern

```js
class CondimentDecorator extends Beverage {
  constructor (beverage) { this.beverage = beverage; }
  getDescription() // abstract method
  cost() // abstract method
}
class Milk extends CondimentDecorator {
  getDescription() { return this.beverage.getDescription() + ", Milk" }
  cost() { return 0.20 + this.beverage.cost() }
}
class Soy extends CondimentDecorator {
  getDescription() { return this.beverage.getDescription() + ", Soy" }
  cost() { return 0.24 + this.beverage.cost() }
}
class Mocha extends CondimentDecorator {
  getDescription() { return this.beverage.getDescription() + ", Mocha" }
  cost() { return 0.59 + this.beverage.cost() }
}
```

----

> Decorators have the same supertype as the objects they decorate.

> You can use one or more decorators to wrap an object.

> The decorator adds its own behavior either before and/or after delegating to the object it decorates to do the rest of the job.


----

```js
import Espresso from './espresso'
import Mocha from './mocha'
import Milk from './milk'

var beverage = new Espresso()
beverage = new Mocha(beverage)
beverage = new Milk(beverage)

console.log(beverage.getDescription() + “ $” + beverage.cost())
// Espresso Coffee, Mocha, Milk $2.78
```

[Full implementation](https://github.com/tcorral/Design-Patterns-in-Javascript/tree/es6/Decorator)

----

> Related OO Principles:
> * Open/Close Principle (SOLID)
> * Favor composition over inheritance
> * Low coupling

---

## Factory Pattern

> Creational Pattern.

> Wrap a constructor to return instances of classes (objects).

> Simplifies creation of complex objects or creation at once of large number of similar objects.

> The knowledge os how objects are created is delegated to the factory, as a separated responsibility.

----

```js
import Espresso from './espresso'
import Decaf from './decaf'
import DarkRoast from './dark-roast'

class CoffeeShop {
  orderCoffee (type, condiments) {
    var beverage
    if(type == 'espresso') {
      beverage = new Espresso()
    } else if ( type = "decaf" ) {
      beverage = new Decaf()
    } else if (type="darkroast") {
      beverage = new DarkRoast()
    }
    if(condiments.indexOf('mocha') !== -1) {
      beverage = new Mocha(beverage)
    }
    if(condiments.indexOf('milk') !== -1) {
      beverage = new Milk(beverage)
    }

    beverage.prepare()
    return beverage
  }
}
```

----

> CoffeeShop has got dependencies: Espresso, Decaf, DarkRoast, ...

> CoffeeShop instantiates in different ways Espresso and Mocha.

> Instantiation is conditional.

> It's definitely an **implementation**, a responsibility.

----

```js
class BeverageFactory {
  static createCondimentedCoffee(beverage, condiments) {
    if(condiments.indexOf('mocha') !== -1) {
      beverage = new Mocha(beverage)
    }
    if(condiments.indexOf('milk') !== -1) {
      beverage = new Milk(beverage)
    }
  }
  static createCoffee (type, condiments) {
    var beverage
    if(type == 'espresso') {
      beverage = new Espresso()
    } else if ( type = "decaf" ) {
      beverage = new Decaf()
    } else if (type="darkroast") {
      beverage = new DarkRoast()
    }
    var beverage = this.createCondimentedCoffee(beverage, condiments)
    beverage.prepare()
    return beverage
  }
}
```

----

> Now CoffeeShop doesn't have to know anything about how to create and condiment.

> If the way to prepare a coffee changes, CoffeeShop won't have to change.

----

```js
class CoffeeShop {
  prepareCoffee (type, condiments) {
    var beverage = BeverageFactory.createCondimentedCoffee(type, condiments)
    return beverage
  }
}
```

----

> Our `BeverageFactory` still depends on many classes.

> What if we need a "HealthyCoffeeShop" that uses different condiments?

----

```js
var const COFFEE = {
  espresso: 'createEspresso',
  decaf: 'createDecaf',
  darkroast: 'createDarkRoast'
}
class CoffeeFactory {
  static createCoffee (type) {
    return this[COFFEE[type]]()
  }
  static createExpresso() { return new Espresso() }
  static createDecaf() { return new Decaf() }
  static createDarkRoast() { return new DarkRoast() }
}
```

----

```js
var const CONDIMENT = {
  milk: 'createMilk',
  mocha: 'createMocha'
}
class CondimentFactory {
  static createCondiment (beverage, condiments) {
    return condiments.reduce(function (condiment, beverage) {
      return this[CONDIMENT[condiment]](beverage)
    }, beverage)
  }
  static createMilk(beverage) { return new Milk(beverage) }
  static createMocha(beverage) { return new Mocha(beverage) }
}
```

----

```js
class BeverageFactory {
  static coffeeFactory = CoffeeFactory
  static condimentFactory = CondimentFactory
  createCoffee (type, condiments) {
    var beverage = this.coffeeFactory.createCoffee(type)
    beverage = this.condimentFactory.createCondiment(beverage, condiments)
    beverage.prepare()
    return beverage
  }
}
```

----

```js
class CoffeeShop {
  constructor () {
    this.factory = BeverageFactory
  }
  prepareCoffee (type, condiments) {
    var beverage = this.factory.createCoffee(type, condiments)
    return beverage
  }
}
```

----

```js
class HealthyCondimentFactory extends BeverageFactory  {
  static createMilk(beverage) { return new LowFatMilk(beverage) }
}
class HealthyBeverageFactory extends BeverageFactory {
  static condimentFactory = HealthyCondimentFactory
}
class HealthyCoffeeShop extends CoffeeShop {
  constructor () {
    super()
    this.factory = HealthyBeverageFactory
  }
}
```

----

> Related OO Principles:
> * Creator (GRASP)
> * Pure Fabrication (GRASP)
> * Open-Close Principle (SOLID)

---

## Singleton Pattern

> Sometimes, we only need a unique instance of a class.

> The Singleton Pattern ensures a class has only one instance, and provides a global point access to it.

> Point access creates its own instance and returns always the first one created.

----

### Example: Cache global object with instance getter

```js
// cache.js
var uniqueInstance = null
class Cache {
  set (key, data)
  get (key)
  has (key)
  clear()
}
export default {
  getInstance () {
    if (!uniqueInstance) {
      uniqueInstance = new Cache()
    }
    return uniqueInstance
  }
}
```

```js
import Cache from './cache'
var cache = Cache.getInstance()
cache.set('myVar', 1)
```

Note: `Cache` constructor remains private.

----

> Instance getter is explicit.

> Consumer is forced to always explicitly call the `getInstance` function.

----

### Example: Cache global object with unique instance return

```js
// cache.js
class Cache {
  set (key, data)
  get (key)
  has (key)
  clear()
}
export default new Cache()
```

```js
import cache from './cache'
cache.set('myVar', 1)
```

----

> Simple import.

> Not lazy. Instance will be created on import, not only if instance is required...

> If use of `Cache` is conditional, it will be instantiated anyways...

---

## Command Pattern

> Encapsulated method invocation: encapsulates a request as an object.

> Allows to decouple the requester of an action from the object that performs the action.

> Lets you parameterize other objects with different requests, queue, ...

> Commands contains everything require for an operation and exposes an `execute` method.

----

### Example: Assign commands to remote

```js
class ICommand {
  execute () { throw new Error('ICommand.execute not implemented') }
}
class TurnOnCommand extends ICommand { // Command receiver
  constructor (device) {
    this.device = device
  }
  execute () {
    device.lightOn()
  }
}
```

----

```js
class RemoteControlButton { // Command invoker
  setCommand(command) { this.command = command }
  onPress () { this.command.execute() }
}
class RemoteControl {
  constructor () {
    this.buttons = [
      new RemoteControlButton(),
      new RemoteControlButton(),
      new RemoteControlButton(),
      new RemoteControlButton()
    ]
  }
  setCommand(slot, command) {
    this.buttons[slot].setCommand(command)
  }
}
```

----

### Example: Alarms UI

```js
class AlarmCommand {
  constructor (device) { this.alarm = alarm }
}
class EnableAlarm extends AlarmCommand {
  execute () { this.alarm.enable() }
}
class DisableAlarm extends AlarmCommand {
  execute () { this.alarm.disable() }
}
```

```js
var alarms = [/* array of alarms */]
alarms.forEach(function(alarm){
  alarmView.addButtons ([
    new Button('enable', new EnableAlarm(alarm))
    new Button('disable', new DisableAlarm(alarm))
    new Button('reset', new ResetAlarm(alarm))
  ])
})
```

---

## Adapter Pattern

> Convert one interface into an another

> Used to avoid extensive refactoring when a dependency changes


----

### Example: From console logging to remote logging

> We have a logger in charge of runtime messages

```js
class LoggerFactory {
  static getLogger () {
    return window.console;
  }
}
var logger = LoggerFactory.getLogger();
logger.log("something happened");
```

----

> Another logger, used in another app logs remotely through a web service

```js
class AjaxLogger {
  static sendLog: function(...args) {
    var data = this.urlEncode(args);
    jQuery.ajax({
        url: "http://example.com/log",
        data: data
    })
  }
}
```

----

> We cant the AjaxLogger to be the main logger of our application

> But our app already uses console interface, and we want to avoid refactoring all `logger.log` statements

```js
class AjaxLoggerAdapter {
  static log (...args) {
    AjaxLogger.sendLog(args)
  }
}
class LoggerFactory {
  static getLogger () {
    return AjaxLoggerAdapter
  }
}
```

---

## Façade Pattern

> Simple and easy-to-use interface exposed to hide complexity of the underlying system.

> Conceals an implementation that may change.

> Protects from effects of change of a subsystem.

----

### Example: Jquery is THE Façade to forget about cross-browser's implementations

```js
$(element).click(onClick)
```
```js
function click(element, func) {
  if (window.addEventListener) {
    element.addEventListener('click', func, false);
  }
  else if (window.attachEvent) {
    element.attachEvent('onclick', func);
  }
  else {
    element['onclick'] = func;
  }
}
```

----

```js
$(element).css({ top: '30px', left: '100px' })
```

```js
function css(element, properties) {
  Object.keys(properties).forEach(function(key){
    element.style[key] = properties[key]
  })
}
```

---

## Template Method Pattern

> Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.

> Template Method let subclasses redefine certain steps of an algorithm without changing the algorithm structure.

> Template Method will be called internally by the main algorithm, no by the client.

> Can be used as hooks.

----

## Example: Decomposing algorithms

```js
class Parser {
  parse (data) {
    var labels = this._parseLabels(data)
    var names = this._parseNames(data)
    var metas = this._parseMetas(data)
    return { labels, names, metas }
  }
  _parseLabels(data) { /* parsing algorithm */ } // Template method
  _parseNames(data) { /* parsing algorithm */ } // Template method
  _parseMetas(data) { /* parsing algorithm */ } // Template method
}

class CustomParser extends Parser {
  _parseLabels(data) { /* different parsing algorithm */ }
}
```

----

## Example: Hooks

```js
class BaseController {
  init () {
    this._preInit()
    // Main operations
    this._postInit()
  }
  _preInit() // Template method
  _postInit() // Template method
}
class MyController extends BaseController {
  _preInit() { /* Operations to execute before main init */ }
}
```

----

## Example: Implicit template methods

> `==` operand implicitly calls object.valueOf when objects are compared.

```js
class Person {
  constructor (firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  valueOf() {
    return this.firstName + ' ' + this.lastName
  }
}
console.log(new Person("Evan", "Graham") == 'Evan Graham') // true
```

----

> Related OO Principles:
> * Open/Close Principle (SOLID)
> * Protected variations (GRASP)

---

## Composite Pattern

> Lets clients treat individual objects and compositions uniformly.

> Treat single objects or collections of objects in the same way.

> Used to create nested structures of nodes.

> A node may be a leaf or a container.

> Traversal of a tree is usually implicit.

----

### Example: Jquery interface

> In jQuery, single elements or collections of elements are treated in the same way.

```js
$('.container').css({ opacity: .5 })
$('.container').find('div').css({ opacity: .5 })
$('.container').children().css({ opacity: .5 })
$(element).css({ opacity: .5 })

```

----

### Example: People Tree

```js
class Person {
  constructor (name) {
    this.name = name
    this.children = []
    this.parent = null
  }
  addChild (child) {
    this.children.push(child)
    child.parent = this
  }
  traverseUp () {
    if (this.parent) {
      console.log(this.name + ' is the child of ' + this.parent.name)
      this.parent.traverseUp()
    } else {
      console.log(this.name + ' is the root node')
    }
  }
}
```

---

## Proxy Pattern

> Use one object as the interface for another object.

> Control access from clients to the object being proxied.

> Clients may or may not know if they are using the proxy.

> May throttle requests to the object of include cache for performance.


----

### Example: Cache Proxy

```js
class Users {
  getOne(id) {
    return executeSql('SELECT * FROM Users WHERE id = ' + id)
  }
  getCount() {
    return executeSql('SELECT COUNT(*) FROM Users')
  }
}
```

----

#### Improving performance with cache

```js
var cache = {}
var count = null
class UsersProxy {
  constructor(users) {
    this.users = users
  }
  getOne (id) {
    if(cache[id]) {
      return cache[id]
    } else {
      return cache[id] = this.users.getOne(id)
    }
  }
  getCount () {
    if(count !== null) {
      return count
    } else {
      return count = this.users.getCount()
    }
  }
}
```


----

### Example: Debounce Proxy

```js
class UsersPaginator {
  constructor () {
    this.page = 0
    this.usersPerPage = 10
    this.loadList()
  }
  nextPage() {
    this.page++
    this.loadList()
  }
  prevPage() {
    this.page--
    this.loadList()
  }
  loadList () {
    let offset = this.usersPerPage*this.page
    return executeSql('SELECT * FROM Users LIMIT ' + offset + ',' + offset+this.usersPerPage)
  }
}
```

Note: What if user clicks "nextPage" button very fastly. We really need to load the list when he stops clicking...

----

```js
class UsersPaginatorProxy extends UsersPaginator {
  loadList () {
    _.debounce(this.loadList.bind(this), 300)
  }
}
```

[_.debounce](http://underscorejs.org/#debounce)
[Debouncing - CSS tricks](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)

----

### Example: Proxy method to extend behavior

```js
var proxied = jQuery.ajax; // Preserving original function
jQuery.ajax = function() {
    jQuery("#loading").dialog({modal: true});
    return proxied.apply(this, arguments);
}
```


---

## Model-View-Controller, the compound pattern

> A compound pattern combines two or more patterns into a solution that solves a recurring or general problem.

> Model-View-Controller splits the responsibilites of most common programs

> Model on a side, View on another, Controller in between.


----

### The Model

> Model holds all the data, state, and application logic.

> Model can send notifications of state changes to observers.

----

### The View

> View are controls to display and edit data.

> View is a representation of the model.

> View never knows about the model and never calls it directly.

> View gets the state and data it needs to display from the model.

----

### The Controller

> Controller knows about Model and View and medidate between them.

> Controller synchronizes Data with View.

> Controller takes user input and figures how to translate it into request on the Model.

> Controller injects data and state needed to the view directly from the model.

> Controller separates the logic of control from the view so the view can be reused with other models.

----

### Patterns composition

----

#### Controller is kind of a strategy

> It's the behaviour of the view, and can be swapped with another controller, maintaining the same view.

> Controller is a concrete strategy of the view

----

#### View tend to implement the Composite pattern

> It accesses the document component that contains other DOM components that contains other DOM components.

----

#### Model implements Observer Pattern

> It communicates state changes to the View of Controller through events.


----

### Example: Mp3 player

> Let's do mp3 player.

> It plays songs from a playlist (model)

> It has 4 buttons (the view): stop, next song, previous song, shuffle.

----

> Let's retrieve `Observable` we created for our WeatherData example.

```js
class Observable {
  constructor () {
    this.observers = [];
  }
  registerObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    this.observers = this.observers.filter(function (observer) {
      return observer !== observerToRemove;
    });
  }
  notifyObservers(data) {
    this.observers.forEach(function (observer) {
      observer(data);
    });
  }
}
```

----

#### Model

```js
class PlayList extends Observable {
  constructor(songs) {
    this.songs = songs
  }
  get length() { this.songs.length }
  get current() { this.current }
  play (songIndex) {
    this.current = songIndex
    // execute song play
  }
}
```

----

#### Controller

```js
class PlayerCtrl {
  constructor(playlist) {
    this.playlist = playlist
    this.view = new PlayerView(this, playlist)
  }
  next () { this.changeSong(this.playlist.current + 1) }
  previous () { this.changeSong(this.playlist.current - 1) }
  stop () { this.changeSong(null) }
  shuffle() {
    var index = Math.round(Math.random()*this.playlist.length)
    this.changeSong(songIndex)
  }
  changeSong(index) {
    this.playlist.play(index)
    this.view.toggleNext(this.playlist.current < this.playlist.length)
    this.view.togglePrevious(this.playlist.current > 0)
    this.view.toggleStop(this.playlist.current !== null)
    this.view.togglePlay(this.playlist.current === null)
  }
}
```

----

#### View

```js
class PlayerView {
  constructor(controller, model) {
    this.controller = controller
    this.model = model
    this.model.registerObserver(this.onItemChange.bind(this))
    this.setEvents()
  }
  setEvents () {
    $('.next').click(this.controller.next.bind(this.controller))
    $('.prev').click(this.controller.prev.bind(this.controller))
    $('.stop').click(this.controller.stop.bind(this.controller))
    $('.play').click(this.controller.play.bind(this.controller))
    $('.shuffle').click(this.controller.shuffle.bind(this.controller))
  }
  onItemChange (item) { this.setTitle(item.title + ' - ' + item.author) }
  setTitle(title) { /* change title in the view */ }
  toggleNext(enable) { /* enable/disable next button */ }
  togglePrevious(enable) { /* enable/disable previous button */ }
  toggleStop(enable) { /* enable/disable stop button */ }
  togglePlay(enable) { /* enable/disable play button */ }
}
```

---

## Summing up

----

### Creational Patterns

> Involve object instantiation and all provide a way to decouple a client from objects it needs to instantiate.

> * Singleton
> * Factory
> * Builder

----

### Structural Patterns

> Let you compose classes or objects into larger structures

> * Proxy
> * Decorator
> * Adapter
> * Façade
> * Composite
> * Bridge

----

### Behavioral Patterns

> Concerned with how classes and objects interact and distribute responsibility

> * Template Method
> * Iterator
> * Command
> * Observer
> * State
> * Strategy
> * Mediator

---

## Must Read


[More about Observer Pattern](https://github.com/millermedeiros/js-signals/wiki/Comparison-between-different-Observer-Pattern-implementations)

[Bridge Pattern](https://www.joezimjs.com/javascript/javascript-design-patterns-bridge/)

[Chain of Responsibility](https://www.joezimjs.com/javascript/javascript-design-patterns-chain-of-responsibility/)

[Main Source (Java)](https://www.amazon.com/First-Design-Patterns-Elisabeth-Freeman/dp/0596007124/ref=sr_1_1?ie=UTF8&qid=1316512770&sr=8-1)
