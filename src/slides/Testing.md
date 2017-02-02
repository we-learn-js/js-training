
# Testing In Javascript

---

## Unit testing

----

### How does it look like?


```js

// PASS
it('Array.indexOf should return -1 when the value is not present', function () {
  expect([1, 2, 3].indexOf(5)).to.equal(-1)
})

// FAIL
it('Array.indexOf should return -1 when the value is not present', function () {
  expect([1, 2, 5, 3].indexOf(5)).to.equal(-1)
})

```

https://jsbin.com/jovanep/edit?js,output

----

### Testing frameworks

> A testing framework is a testing tool.

> It provides an API to describe your test cases.

> It handles both success and failed tests and provides info what failed.

> There are many testing frameworks: YUI test, Jasmine, **Mocka**, JSUnit, and many more...


----

#### MochaJs

> Mocha is one of the most popular testing frameworks.

> **describe** function allows to declare a suite of tests.

> **it** function allows to describe a test.

> These functions are used to make the output as explicit as possible.

[Mocha](https://mochajs.org/)

----

```js
describe('Array', function () {

  describe('#indexOf', function () {

    it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(5)).to.equal(-1)
    })
  })
})
```

https://jsbin.com/yukori/edit?js,output


----

#### Describing your tests

> Mocha is just a tool.

> It's up to you to describe your tests in a better or worse manner.

> [Better Specs](http://betterspecs.org/) (based on ruby), is a good source to help your make better tests descriptions.

----

```js
describe('Array', function () {

  describe('#indexOf', function () {

    it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(5)).to.equal(-1)
      expect([1, 2, 3].indexOf(0)).to.equal(-1)
    })

    it('should return 2 when the value is on third position', function () {
      expect([1, 2, 3].indexOf(3)).to.equal(2)
    })
  })
})
```

----

```js
describe('Array', function () {

  describe('#indexOf', function () {

    describe('When the value is not present', function () {
      it('should return -1 ', function () {
        expect([1, 2, 3].indexOf(5)).to.equal(-1)
        expect([1, 2, 3].indexOf(0)).to.equal(-1)
      })
    })

    describe('When the value is present', function () {
      it('should return its position', function () {
        expect([1, 2, 3].indexOf(3)).to.equal(2)
      })
    })
  })
})
```

https://jsbin.com/buzava/edit?js,output


----


### Assertion libraries

> A test assertion is an expression which encapsulates some testable logic specified about a target under test.

> Assertions are the "checks" that you perform to determine if test passes or fails.

> Tend to be one assertion per test (it).

> Many libraries offer slightly different interfaces: Must, Jasmine, Should, **Chai**, ...

----


#### Chai

> Chai is one of the most popular assertion libraries.

> It provides 3 different interfaces so you can pick the one your are more comfortable with.

[Chai](http://chaijs.com/)

----

#### Expect

```js
var expect = chai.expect;

expect(foo).to.be.a('string')
expect(foo).to.equal('bar')
expect(foo).to.have.lengthOf(3)
expect(tea).to.have.property('flavors').with.lengthOf(3)
```

----

#### Assert

```js
var assert = chai.assert;

assert.typeOf(foo, 'string')
assert.equal(foo, 'bar')
assert.lengthOf(foo, 3)
assert.property(tea, 'flavors')
assert.lengthOf(tea.flavors, 3)
```

----

#### Should

```js
chai.should()

foo.should.be.a('string')
foo.should.equal('bar')
foo.should.have.lengthOf(3)
tea.should.have.property('flavors').with.lengthOf(3)
```

----

#### Main Assertions


```js
expect(object).to
  .equal(expected) // target is strictly equal (===) to value
  .deep.equal(expected) // target is deeply equal to value.
  .exist // Asserts that the target is neither null nor undefined.
  .contain(val) // assert the inclusion of an object in an array or a substring in a string
```

----

#### to.be

```js
expect(object).to.be
  .a('string') // assert a value’s type
  .ok // Asserts that the target is truthy
  .true // Asserts that the target is true
  .false // Asserts that the target is false
  .null // Asserts that the target is null
  .undefined // Asserts that the target is undefined
  .empty // Asserts that the target’s length is 0
  .arguments // Asserts that the target is an arguments object.
  .function // Asserts that the target is an function object.
  .instanceOf(constructor) // Asserts that the target is an instance of constructor.

```

----

#### Comparison

```js
expect(object).to
  .gt(5)  // or .above .greaterThan
  .gte    // or .at.least
  .lt(5)  // or .below

  .satisfy(function(num) { return num > 0; })
  // Asserts that the target passes a given truth test.
```

----

#### Output of a function

```js
expect( function() { ... } ).to
  .throw // Asserts that the function target will throw an exception
  .throw(ReferenceError) // Asserts that the function target will throw a specific error
```

----

#### to.not

> Negates any of assertions following in the chain.


```js
expect(object)
  to.not.be.a('string') // assert a value is NOT given type
  to.not.be.ok // Asserts that the target is NOT truthy
  to.not.be.true // Asserts that the target is NOT true
  to.not.be.false // Asserts that the target is NOT false

expect(object).to.not
  .equal(expected) // target is NOT strictly equal (===) to value
```

----

### Practice: First Tests


Test behavior of  [Array.push](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/push) function.

Use chai expect assertion interface.

https://jsbin.com/miniqe/edit?js,output

----

### Test context

> What we've seen is enough to test pure functions.

> But, some tests need a context to be set in many cases.

> Mocha provides **hooks** to prepare a context/state and reset it afterwards.

> Also serves to undo side effects provoked by operations executed in test.

> Test execution **MUST NOT** have side effects.

----

```js
describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
  })
  after(function() {
    // runs after all tests in this block
  })
  beforeEach(function() {
    // runs before each test in this block
  })
  afterEach(function() {
    // runs after each test in this block
  })

  // test cases
})
```

https://jsbin.com/nezimuc/edit?js,console

----

#### Practice : reseting side effects

> Use `after` and `beforeEach` to undo side effects of tests

```js
before(function() {
  fixturesElement = document.createElement('DIV')
  document.body.appendChild(fixturesElement)
})
/* ... */
beforeEach(function() {
  button = document.createElement('Button')
  button.innerHTML = 'TEST APPEND BUTTON'
  button.id = 'test-append-button'
  $(fixturesElement).append(button)
})
```

https://jsbin.com/cokuxaj/edit?js,console,output

----

##### Solution

```js
before(function() {
  fixturesElement = document.createElement('DIV')
  document.body.appendChild(fixturesElement)
})
after(function() {
  document.body.removeChild(fixturesElement)
})
```
```js
beforeEach(function() {
  button = document.createElement('Button')
  button.innerHTML = 'TEST APPEND BUTTON'
  button.id = 'test-append-button'
  $(fixturesElement).append(button)
})
afterEach(function() {
  fixturesElement.removeChild(button)
})
```

https://jsbin.com/pifura/edit?js,console,output

---

### Mocking with SinonJs

> SinonJs is a library with tools to force behavior of the environment or the dependencies on which the testes obj relies on.

[SinonJs](http://sinonjs.org/docs/)

----

#### spies

> A test spy is a function that records functions calls: arguments, returned values, the values of this and exceptions thrown (if any) for all its calls.

> A test spy can be an anonymous function or it can wrap an existing function.

> `sinon.spy()` wraps the original function


----

```js
describe('getUsers', function(){

  beforeEach(function(){
    sinon.spy($, 'get')
    getUsers(function(){}, 5)
  })

  afterEach(function(){
    $.get.restore()
  })

  it( 'should make right ajax request to retrieve users', function() {
    expect($.get).to.have.been.calledOnce
    expect($.get.firstCall.args[0]).to.contain('/users')
  })

})
```

https://jsbin.com/hirehir/edit?js,output

----

##### Caution !

> Spies must always be restored to reset the original behaviour of spied method

```js
  afterEach(function(){
    $.get.restore()
  })
```

----

#### Main interface

Recorded activity

```js
spy.callCount
// The number of recorded calls.

spy.args
// Array of arguments received, spy.args[0] is an array of arguments received in the first call.

spy.exceptions
// Array of exception objects thrown, spy.exceptions[0] is the exception thrown by the first call. If the call did not throw an error, the value at the call’s location in .exceptions will be ‘undefined’.

spy.returnValues
// Array of return values, spy.returnValues[0] is the return value of the first call. If the call did not explicitly return a value, the value at the call’s location in .returnValues will be ‘undefined’.

spy.thisValues
// Array of this objects, spy.thisValues[0] is the this object for the first call.

```

----

Method calls

```js
spy.called
// true if the spy was called at least once

spy.calledOnce
// true if spy was called exactly once

spy.calledTwice
// true if the spy was called exactly twice

spy.calledThrice
// true if the spy was called exactly thrice

spy.firstCall.args
// The first call

spy.secondCall.args
// The second call

spy.thirdCall.args
// The third call

spy.lastCall.args
// The last call
```

----

Inputs

```js
spy.calledWith(arg1, arg2, ...);
// Returns true if spy was called at least once with the provided arguments. Can be used for partial matching, Sinon only checks the provided arguments against actual arguments, so a call that received the provided arguments (in the same spots) and possibly others as well will return true.

spy.calledWithExactly(arg1, arg2, ...);
// Returns true if spy was called at least once with the provided arguments and no others.
```


----

Outputs

```js
spy.threw();
// Returns true if spy threw an exception at least once.

spy.threw("TypeError");
// Returns true if spy threw an exception of the provided type at least once.

spy.threw(obj);
// Returns true if spy threw the provided exception object at least once.

spy.returned(obj);
// Returns true if spy returned the provided value at least once. Uses deep comparison for objects and arrays. Use spy.returned(sinon.match.same(obj)) for strict comparison (see matchers).

```

----

#### stubs

> Test stubs are spies with pre-programmed behavior.

> They replace the behavior of an existing method by the one expected by your test case.

----

```js
beforeEach(function(){
  sinon.stub($, 'get', function() {
    return {
      done (callback) {
        callback([
          {name: 'user1'}, {name: 'user2'}, {name: 'user3'},
          {name: 'user4'}, {name: 'user5'}, {name: 'user6'},
          {name: 'user7'}, {name: 'user8'}, {name: 'user9'},
          {name: 'user10'}, {name: 'user11'}, {name: 'user12'}
        ])
      }
    }
  })
})
```

https://jsbin.com/fiquqa/edit?js,output

----

#### Main interface

> Stubs inherit spies interface, with additional methods to determine the behavior on every call.

----

Defining behavior

```js
stub.returns(obj);
// Makes the stub return the provided value.

stub.returnsThis();
// Causes the stub to return its this value. Useful for stubbing jQuery-style fluent APIs.

stub.throws();
// Causes the stub to throw an exception (Error).

stub.throws("TypeError");
// Causes the stub to throw an exception of the provided type.
```

----

Filtering calls

```js
stub.onCall(n);
// Defines the behavior of the stub on the nth call.
// Useful for testing sequential interactions.
stub.onFirstCall(); // Alias for stub.onCall(0);
stub.onSecondCall(); // Alias for stub.onCall(1);
stub.onThirdCall(); // Alias for stub.onCall(2);
```

```js
var callback = sinon.stub();
    callback.onFirstCall().returns(1);
    callback.onCall(1).throws();
    callback.onThirdCall().returnsThis();
```


----

### Testing async code

> Mocha uses the `done()` pattern

> Require the `done` callback on your `it` callbacks and invoke the `done()` when your test is complete.

----

```js
describe('getOneUser', function(){
  it( 'should filter number of return results', function(done) {
    getOneUser(5)
      .then(function(result){
        expect(result).to.be.an('object')
        expect(result.id).to.equal(1)
        done()
      })
  })
})
```

https://jsbin.com/wuliyo/1/edit?js,output

----

### Working with time: Sinon Fake timers

> Fake timers helps you for time depending time.

> Use it to set the current dates

> Use it to make time pass without having to wait for real time to pass.

----

```js
beforeEach(function(){
  clock = sinon.useFakeTimers()
  sinon.spy(console, 'log')
  countdown(5)
})

afterEach(function(){
  clock.restore();
  console.log.restore()
})

it( 'should log numbers step by step', function() {
  clock.tick(500)
  expect(console.log).to.have.been.calledOnce
  clock.tick(1000)
  expect(console.log).to.have.been.calledTwice
})
```

https://jsbin.com/sofubep/edit?js,output


----

### Working with AJAX: Sinon Fake XMLHttpRequest

> Helps with testing requests made with XHR.

> Also fakes the native XMLHttpRequest.

----

```js
server = sinon.fakeServer.create()

server.respondWith(
  [200,
  {'Content-Type': 'application/json' },
  JSON.stringify([
    {name: 'user1'}, {name: 'user2'}, {name: 'user3'},
    {name: 'user4'}, {name: 'user5'}, {name: 'user6'},
    {name: 'user7'}, {name: 'user8'}, {name: 'user9'},
    {name: 'user10'}, {name: 'user11'}, {name: 'user12'}
  ])]
)

server.respond()
```

https://jsbin.com/kucugaz/edit?js,output

---

## Levels of testing

----

![Software testing](./images/software-testing.png)

----

### Unit Testing

> Unit testing is the first level of testing and focuses on testing small units of individual codes.

> Ensure that individual components of the app work as expected.

> Assertions test the component API.

----

### Integration testing

> Test the combined parts of the application to check that they function correctly together.

> Two or more units are combined to check their working functionality.

> Ensure that component collaborations work as expected.

> Assertions may test component API, UI, or side-effects (such as database I/O, logging, etc…)

----

### Functional testing

> Testing is conducted to test a system as a whole.

> The testing is carried out from the user’s point of view

> Ensure that the app works as expected from the user’s perspective.

> Goal is to verify the system specifications according to business requirements.

> Assertions primarily test the user interface.


---

## Dos and Donts

----

### Consitent

> Multiple runs of the same test should ALWAYS return same output.

----

### Atomic

> Only too possible resultss: PASS or FAIL.

> Each test must be isolated: Test B should not depend on Test A previous execution.

----

### Single responsability

> One test should be responsible for one concern, one scenario only.

> Test behaviors, no methods.

> one method, multiple behaviours -> multiple tests

> one behaviour, multiple methods -> One test

----

### Self-descriptive

> Name you test to read by humans.

http://betterspecs.org/

----

### No conditional logic or loops

> Test should have no uncertainty

> Method behavior should be predictable

> Expected output should be strictly defined

> If there is to conditional cases, split into too tests with each predefined condition

----

### No test logic in prod code

> Separate test in separated folder, repo, project

> Do not create methods of properties only used in testing context

---

## Must read

[Unit vs Functional vs Integration Tests]( https://www.sitepoint.com/javascript-testing-unit-functional-integration/)

[Better Specs](http://betterspecs.org/)

----

## Cheatsheets

[Mocha](http://ricostacruz.com/cheatsheets/mocha.html)

[Chai](http://ricostacruz.com/cheatsheets/chai.html)

[Sinon](http://ricostacruz.com/cheatsheets/sinon.html)

[SinonChai](http://ricostacruz.com/cheatsheets/sinon-chai.html)

[Mocha, Chai and Sinon](https://gist.github.com/yoavniran/1e3b0162e1545055429e)
