# Async programming

---

## Asynchrony

----

### Let's see it in action

----

Consider:
```js
var users = $.get('//jsonplaceholder.typicode.com/users')
  .done(function(response){
    console.log('first log: ' + response.length)
  })

console.log('second log: ' + users.length)

```

----

Output:
```
"second log: undefined"
"first log: 10"
```

* Logs are not made by order of code lines
* The result of `getUsers` is not an array of users

----

Code executed now:
```js
var users = $.get('//jsonplaceholder.typicode.com/users')
  .done( ... )
console.log('second log: ' + users.length)

```

Code executed later:

```js
function(response){
  console.log('first log: ' + response.length)
}
```
This is a callback that will be executed only when `jsonplaceholder.typicode.com` responds with data.

----

> Asynchrony is essential for activities that are potentially blocking.

> While browser is waiting for a response from the web service, code execution is not blocked and keeps executing the rest of the lines.

----

### Going further

Consider:
```js
function log (content) {
  console.log(content)
}
function printing() {
   log(1);
   setTimeout(function callback1() { log(2); }, 0);
   setTimeout(function callback2() { log(3); }, 1000);
   log(4);
}
printing();
```

----

Output:

```
1
4
2
3
```

Why is `3` after `4` if the timeout has no time to wait.

----

To get it, we need to get into runtime concepts.

----

Javascript engine is composed of:

* **Stack**: Function calls form a stack of frames.

* **Heap**: Objects are allocated in a heap which is just a name to denote a large mostly unstructured region of memory.

* **Queue**: A JavaScript runtime contains a message queue, which is a list of messages to be processed. **A function is associated with each message.** When the stack is empty, a message is taken out of the queue and processed.


----

![runtime](https://mdn.mozillademos.org/files/4617/default.svg)

----

** Event loop **

> The event loop got its name because of how it's usually implemented, which usually resembles:

```js
while(queue.waitForMessage()){
  queue.processNextMessage();
}
```

`queue.waitForMessage` waits synchronously for a message to arrive if there is none currently.

[Check the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

----

Let's how it works with our code

```js
function log (content) {
  console.log(content)
}
function printing() {
   log(1);
   setTimeout(function callback1() { log(2); }, 0);
   setTimeout(function callback2() { log(3); }, 1000);
   log(4);
}
printing();
```

[http://latentflip.com/loupe/](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbG9nIChjb250ZW50KSB7CiAgY29uc29sZS5sb2coY29udGVudCkKfQpmdW5jdGlvbiBwcmludGluZygpIHsKICAgbG9nKDEpOwogICBzZXRUaW1lb3V0KGZ1bmN0aW9uIGNhbGxiYWNrMSgpIHsgbG9nKDIpOyB9LCAwKTsKICAgc2V0VGltZW91dChmdW5jdGlvbiBjYWxsYmFjazIoKSB7IGxvZygzKTsgfSwgMTAwMCk7CiAgIGxvZyg0KTsKfQpwcmludGluZygpOwo%3D!!!)


---

## Callbacks

> Callbacks are the fundamental unit of asynchrony in JS.

> Instead of immediately returning some result like most functions, functions that use callbacks take some time to produce a result.

----

### Practice

```js
var getUsers = function (callback, limit) { ... }
var getUserAlbums = function (userId, callback, limit) { ... }
var getAlbumPhotos = function (albumId, callback, limit) { ... }

function getUsersPhotos(callback, limit) {
  // YOUR CODE GOES HERE
}

```
https://jsbin.com/rojomaf/edit?js,console,output

----

You've probably ended up but that kind of code

```js
function getUsersPhotos(callback, limit) {
  var result = []
  var albumsLeftToProcess = 0
  getUsers(function(users){
    users.forEach(function(user){
      getUserAlbums(user.id, function(albums){
        albums.forEach(function(album){
          albumsLeftToProcess++
          getAlbumPhotos(album.id, function(photos){
            photos.forEach(function(photo){
              result.push(photo)
            })
            --albumsLeftToProcess || callback(result)
          }, limit)
        })
      }, limit)
    })
  }, limit)
}
```

----

### Callbacks deficiencies

#### Callback hell | Pyramid of doom

> The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom.

http://callbackhell.com/

----

#### Inversion of control

> Callbacks suffer from inversion of control in that they implicitly give control over to another party.

> This control transfer leads us to a troubling list of [trust issues](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch2.md#tale-of-five-callbacks), such as whether the callback is called more times than we expect.

---

## Promises

> Promises are now the official way to provide async return values in both JavaScript and the DOM.

> The Promise object is used for asynchronous computations. A Promise represents a value which may be available now, or in the future, or never.

[Check the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

----

### Basics

Let's see how it looks like:

```js
var promise = getUsers()
promise
  .then(function(users){
    console.log(users)
  }, function(e){
    console.error(e.message)
  })
```

Note: `getUsers` returns a promise. Promise always provides functions `then` and `catch`.
`then` handler will be called with the value if the promise is fulfilled
`catch` handler will be called with the value if the promise is rejected explicitly or any error occurs during the execution


----

### States of a promise

* **fulfilled** -  The action relating to the promise succeeded
* **rejected** -  The action relating to the promise failed
* **pending** -  Hasn't fulfilled or rejected yet
* **settled** -  Has fulfilled or rejected

----

```js
var promise = getUsers() // Promise is pending
promise
  .then(function(users){ // Promise is fulfilled and settled
    console.log(users)
  },
  function(e){ // Promise is rejected and settled
    console.error(e.message)
  })

```

----

### Immutability of settled promises

* A promise is fulfilled with a **value**, passed to **fulfillment handler**

* A promise is rejected for a **reason** or **a thrown exception**, passed to the **rejection handler**

* Once a promise is settled (fulfilled or rejected), it's immutable and can't be **resolved** with a different value or **rejected** afterwards

[Check full specs](https://promisesaplus.com/)


----

### Absence of race conditions

> **Race condition**: output is dependent on the sequence or timing of other uncontrollable events.

* If the promise is settled when a corresponding handler is attached, the handler will be called.

* Then, so there is no race condition between an asynchronous operation completing and its handlers being attached.

---

### Consume Promises


----

#### `Promise.prototype.then`

> promise.then( onFulfilled, onRejected )

> `promise.then` accepts both fulfillment and rejection handlers

```js
getUsers()
  .then(function(users){
    console.log(users)
  }, function(e){
    console.error(e.message)
  })
```

----

##### Rejection handling

> If promise return by `getUsers` is rejected, rejection handler will be called.

```js
getUsers()
  .then(function(users){
    console.log(users)
  }, function(e){
    console.error(e.message)
  })
```

----

##### Chaining

> `promise.then` always returns a new promise.

> The returned value in the attached handler will fulfilled a newly created promise.

```js
getUsers() // promise 1
  .then(function(users){
    return users.filter( user => !!user.active )
  }) // promise 2
  .then(function(activeUsers){
    console.log(activeUsers)
  }) // promise 3

```

----

##### Rejection cascade

> As each `then` returns a **new independant promise**, the rejection handler is only triggered if something happens is the 'previous' promise.

> Also, the fulfillment handler will not be called on the next promise if first promise is rejected

----

```js

getUsers() // promise 1
  .then(
    function onFullfill1(users){
      throw new Error( 'No users' )
      return users.filter( user => !!user.active )
    },
    function onReject1(e) { console.error(e)} )
  .then(
    function onFullfill2(activeUsers){
      console.log(activeUsers)
    },
    function onReject2(e) { console.error(e) })

// Only `onFullfill1` and `onRejection2` will be called
```

----

##### Casting

> In a fulfillment handler, you can either return a plain value or **a new promise**

```js
getUsers() // promise 1
  .then(function(users){
    return users.filter( user => !!user.active )
  }) // promise 2
  .then(function(activeUsers){
    return getAlbums( activeUsers[0].id )
  }) // promise 3
  .then(function(firstActiveUserAlbums){
    console.log(firstActiveUserAlbums)
  })

```

---

### Create Promises

----

#### new Promise( function( resolve, reject ){} )

> In ES6, `Promise` is a new Object can instantiate

> A `resolve` and `reject` function are provided to either fulfill or reject the promise.

```js
var promise = new Promise(function(resolve, reject){
  if (true) {
    resolve(true)
  } else {
    reject('It\'s false ')
  }
})
```

----

##### Getting rid of callbacks with promises

This code:
```js
var getUsers = function (callback, limit) {
  $.get('//jsonplaceholder.typicode.com/users')
    .done(function (response) {
      callback(response.slice(0, limit))
    })
}

getUsers(function (users)
  console.log(users)
}, 5)
```

----

Becomes:
```js
var getUsers = function (limit) {
  return new Promise(function(resolve, reject){
    $.get('//jsonplaceholder.typicode.com/users')
      .done(function (response) {
        resolve(response.slice(0, limit))
      })
  })
}

getUsers(5)
  .then( function(users){
    console.log(users)
  })
```

----

### Practice

```js
var getOneUser = function () { ... }
var getUserAlbum = function (userId) { ... }
var getAlbumPhotos = function (albumId) { ... }

var printUserFirstPhotos = function(){
  // YOUR CODE GOES HERE
}

printUserFirstPhotos() // 50

```

https://jsbin.com/xofebas/8/edit?js,console

----

If you ended up with a code like that:

```js
var printUserFirstPhotos = function(){
  getOneUser()
    .then(function(user){
      return getUserAlbum(user.id)
        .then(function(album){
          return getAlbumPhotos(album.id)
            .then(function(photos){
              console.log(photos.length)
            })
        })
    })
}
```

You are still stuck with pyramides and not taking advantage of promises...

----

What about that ?

```js

var printUserFirstPhotos = function(){
  getOneUser()
    .then( user => getUserAlbum(user.id) )
    .then( album => getAlbumPhotos(album.id) )
    .then( photos => console.log(photos.length) )
}

```

----

Or that ?

```js

var printUserFirstPhotos = function(){
  getOneUser()
    .then( user => user.id )
    .then( getUserAlbum )
    .then( album => album.id )
    .then( getAlbumPhotos )
    .then( photos => photos.length )
    .then( console.log )
}

```

---

### `Promise` static methods

* Promise.all()
* Promise.race()
* Promise.reject()
* Promise.resolve()

----

#### Promise.resolve(value)

> A static method to create a **promise resolved** with the given value (or another promise)

This code
```js
var promise = Promise.resolve(5)
```

is the same as
```js
var promise = new Promise(function(resolve){
  resolve(5)
})
```

----


```js
var getSquare = function(x) {
  return Promise.resolve(x*x)
}

getSquare(4)
  .then( num => console.log(num) )

```

----

#### Promise.reject(reason)

> A static method to create a **promise reject** with the given reason

This code
```js
var promise = Promise.reject('Some error happened')
```

is the same as
```js
var promise = new Promise(function(resolve, reject){
  reject('Some error happened')
})
```

----

#### Promise.all(iterable)

> A static method that returns a promise that will be resolved an array of values of all given promises in the array.


```js
var promise = Promise.all([
  Promise.resolve(4),
  Promise.resolve(5),
  Promise.resolve("a"),
  Promise.resolve({})
])

promise.then( values => console.log(values) ) // [4,5,"6",{}]
```

----

`Promise.all` executes promises **in parallel**, not sequentially

----

```js
var getUserPhotos = function (userId) {
  return getUser(userId)
    .then( user => getUserAlbum(user.id) )
    .then( album => getAlbumPhotos(album.id) )
    .then( photos => console.log(photos) )
}

Promise.all([
  getUserPhotos(2), getUserPhotos(4),
  getUserPhotos(5), getUserPhotos(8)
])
```

----

#### Promise.race(iterable)

> A static method that returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.

----

```js
var getTimeoutPromise = function(time) {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      reject('Timeout')
    }, time)
  })
}

var promise = Promise.all([
  getUserPhotos(),
  timeoutRejection(3000)
])

```

If `getUserPhotos()` lasts more than 3 seconds, `promise` will be rejected with reason "Timeout"

----

#### Promises are... asynchronous

```js
console.log('###### case 1 #####')
Promise.resolve(1)
  .then( x => console.log('then 1.0') )
  .then( x => console.log('then 1.1') )

console.log('###### case 2 #####')
Promise.resolve(1)
  .then( x => console.log('then 2.0') )
  .then( x => console.log('then 2.1') )

// OUTPUT
// "###### case 1 #####"
// "###### case 2 #####"
// "then 1.0"
// "then 2.0"
```

https://jsbin.com/kecemib/edit?js,console,output

Note: handlers are callbacks. Then, they get involved in the event loop.


---

### Practice

Let's redo our practice about callbacks to play with promises.

```js
var getUsers = function (limit) { /* Promise */ }
var getUserAlbums = function (userId, limit) { /* Promise */ }
var getAlbumPhotos = function (albumId, limit) { /* Promise */ }

function getUsersPhotos(limit) {
  // YOUR CODE GOES HERE
}

getUsersPhotos(6)
  .then( photos => console.log('Number of photos: ' + photos.length ) )
// OUTPUT : "Number of photos: 216"
```

https://jsbin.com/wemevaj/1/edit?js,console,output

----

#### Possible solution

```js
function getUsersPhotos(limit) {
  return getUsers(limit)
    .then( users => users.map( user => getUserAlbums(user.id, limit) ) )
    .then( albumsPromises => Promise.all( albumsPromises ) )
    .then( usersAlbums => [].concat(...usersAlbums) )
    .then( albums => albums.map( album => getAlbumPhotos(album.id, limit) ) )
    .then( photosPromises => Promise.all( photosPromises ) )
    .then( albumsPhotos => [].concat(...albumsPhotos) )
}
```

----

#### Catching errors with `catch`

----

##### `Promise.prototype.catch`

> The `catch()` method returns a Promise and deals with rejected cases only. It behaves the same as calling `Promise.prototype.then(undefined, onRejected)`.

```js
getUsersPhotos(6)
  .then( photos => console.log('Number of photos: ' + photos.length ) )
  .catch( e => console.log('getUsersPhotos call failed') )
```

[Check the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

----

> `catch()` always returns **a promise**, like `then`

Let's see it in action:

https://jsbin.com/cibopuq/edit?js,console

----

> Be responsible. Catch your own errors and control your output.

```js
function getUsersPhotos(limit) {
  return getUsers(limit)
    .then( users => users.map( user => getUserAlbums(user.id, limit) ) )
    .then( albumsPromises => Promise.all( albumsPromises ) )
    .then( usersAlbums => [].concat(...usersAlbums) )
    .then( albums => albums.map( album => getAlbumPhotos(album.id, limit) ) )
    .then( photosPromises => Promise.all( photosPromises ) )
    .then( albumsPhotos => [].concat(...albumsPhotos) )
    .catch( => return [])
}
```

----

##### A thing to remember

> `catch()` is just sugar for `then(null, onRejection)``

This snippet...
```js
getUsersPhotos(limit)
  .catch(onRejected)
```

... is **exactly THE SAME** as
```js
getUsersPhotos(limit)
  .then (null, onRejected })
```

----

On the other hand. This snippet...
```js
getUsersPhotos(limit)
  .then(onFulfilled)
  .catch(onRejected)
```
... is **NOT** the same as:
```js
getUsersPhotos(limit)
  .then(onFulfilled, onRejected)
```

----

It's **exactly THE SAME** as
```js
getUsersPhotos(limit)
  .then(onFulfilled)
  .then(null, onRejected)
```

> Remember that the `onRejected` catches errors from **'previous'** promise.


---

### Old promises patterns you must avoid

> Promises have a long and storied history, and it took the JavaScript community a long time to get them right.

----

#### `finally` handler

```js
showLoadingSpinner()
getUsersPhotos(6)
  .then( photos => console.log('Number of photos: ' + photos.length ) )
  .catch( e => console.log('getUsersPhotos call failed') )
  .finally( => hideLoadingSpinner() )
```

----

#### `progress` handler

```js
getJSON().then(function(){ // fulfillment handler
  console.log('JSON loaded !')
},function(e){ // rejection handler
  console.log('Error !')
},function(progress){ // progress handler
  console.log( progress + '% loaded !')
})
```

----

#### The deferred pattern

```js
var deferred = Q.defer();
FS.readFile("foo.txt", "utf-8", function (error, text) {
    if (error) {
        deferred.reject(new Error(error));
    } else {
        deferred.resolve(text);
    }
});
return deferred.promise;
```

---

### More promise treats

----

#### Convert callback functions to promises

```js
FS.readFile("foo.txt", "utf-8", function (error, text) {
  /* ... */
});
```

```js
var readFile = Q.denodeify(FS.readFile);
readFile("foo.txt", "utf-8")
  .then(onFulfilled)
  .catch(onRejected)
```

```js
Q.nfcall(FS.readFile, "foo.txt", "utf-8")
  .then(onFulfilled)
  .catch(onRejected)
```

[Q.js](https://github.com/kriskowal/q)

----

#### Convert promises to callbacks

```js
var getUsers = function (callback, limit) {
  window.fetch('//jsonplaceholder.typicode.com/users')
    .asCallback(callback)
}

getUsers(function(err, result){ /* ... */ }, 5)

```

[Bluebird](http://bluebirdjs.com/docs/getting-started.html)

----

#### Delay with promises

```js
Promise
  .delay(1000)
  .then( => getUsers() )
```

[Bluebird](http://bluebirdjs.com/docs/getting-started.html)

---

## Further info on promises

----

### Promise libraries

* [RSVP.js](https://github.com/tildeio/rsvp.js/)
* [Q.js](https://github.com/kriskowal/q)
* [Bluebird](http://bluebirdjs.com/docs/getting-started.html)

----

### Promise based new APIs

* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API)

----

## Must Read/Watch

* [Promise/A+ Specification](https://promisesaplus.com/)

* [Nolan Lawson - We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)

* [Fun Fun Function -  Promises](https://www.youtube.com/watch?v=2d7s3spWAzo)

* [Jake Archivald - Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

* [You-Dont-Know-JS - async & performance](https://github.com/getify/You-Dont-Know-JS/tree/master/async%20&%20performance)


---

## Practice

----

# Implement `Promise.prototype.delay`

----

# Implement `Promise.prototype.series`

---


callback de tweets y de facebook con callbacks.
