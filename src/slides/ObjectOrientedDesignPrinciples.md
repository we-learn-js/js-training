
## Principles for better OOP

----

### S.O.L.I.D

> S.O.L.I.D is an acronym for the
> * S – Single-responsiblity principle
> * O – Open-closed principle
> * L – Liskov substitution principle
> * I – Interface segregation principle
> * D – Dependency Inversion Principle


----

#### Interface segregation principle (ISP)

> A client should never be forced to depend on methods it does not use.
>
> A client should depend on the smallest set of interface methods.
>
> Interfaces has to be as narrow as possible.
>
> Segregate, decompose your operations in small interfaces.

https://jsbin.com/yozudi/edit?js,output


----

> But now phones can take pictures.
>
> But a phone does not fit into our concept of CameraAbstract.

> A phone **IS NOT** a camera but can **BE USED AS** a camera.

> Phone cannot extend from `CameraAbstract`.
>
> But phone is a CameraDevice, as well as a Mp3PlayerDevice, as

----

```js
class ShooterInterface {
  takePicture () { }
}
class DigitalCamera extends ShooterInterface {
  takePicture () { ... }
}
class Phone extends ShooterInterface {
  takePicture () { ... }
  makeCall(phoneNumber) {}
  playSong(song) {}
}

var person = new Person('Evan')
person.setCamera(phone)
person.takePicture()
```

----

#### Interfaces

> An interface is the description of the set of operations that an object could perform
>
> Interface is actually a concept of abstraction and encapsulation.
>
> For a given "box", it declares the "inputs" and "outputs" of that box.

----

##### Real life interface: TV

> In a TV, you have a few buttons to execute operations: turnOn, volume up, input source, extracting
> You also have a few plugs for video inputs: HDMI, Antenna, VDI, etc
> Some TVs have more of less inputs. But each input provides video stream and sometimes audio stream as well.
> The ouput of the TV is always what you see in the screen

> Buttons are your interface. You can either
> * execute simple operations (methods) : turn on, volume up, etc
> * provide an input (methods with parameters) : hdmi cable, etc
> * get the output looking at the screen: TV images and sounds

----

```js
class TV {
  setChannel (channelNumber)
  turnOn()
  turnOff()
  volumeUp()
  volumeDown()
}
```

----

> But, you have another device, the remote. You know how to use it as it has the same buttons (methods)
as a TV.
>
> Tv changes internally on any operation. Remote sends signals, but the operations ARE THE SAME.
>
> To use the TV, the user only needs to receive something that have the buttons: setChannel, turnOn, turnOff, volumeUp, volumeDown.
>
> The object provided is irrelevant, only the implemented buttons matter.

```js
class DisplayInterface {
  setChannel(channelNumber)
  turnOn()
  turnOff()
  volumeUp()
  volumeDown()
}
class TV extends DisplayInterface {}
class Remote extends DisplayInterface {}

```

----

```js
class Person {
  setTV(tv)
  watchChannel(channelNumber, time, callback) {
    tv.turnOn()
      .setChannel(channelNumber)
      .volumeUp()
    setTimeout( function(){
      tv.turnOff()
      callback()
    }, time)
  }
}
person
  .setTV(remote)
  .watchChannel(4, 30, function(){
    // Do something else
  })
```


----

#### To sum up

> The interface does not have to do with what a class is, or what properties it has,
> It has to do with:
> * What are the operations
> * What are the name of theses operations and its required parameters



----

#### Single-responsiblity Principle

> A class should have one and only one reason to change, meaning that a class should have only one job.
>
> A class should have only a single responsibility.



----

#### Open-closed Principle

> Objects or entities should be open for extension, but closed for modification.

----

#### Liskov substitution principle

> All this is stating is that every subclass/derived class should be substitutable for their base/parent class.

----

#### Dependency Inversion principle

> Entities must depend on abstractions not on concretions. It states that the high level module must not depend on the low level module, but they should depend on abstractions.



----

### Low Coupling http://www.codemag.com/article/1001061
### DRY principle
### GRASP Principles
### KISS principle
### Composition over inheritance








----
