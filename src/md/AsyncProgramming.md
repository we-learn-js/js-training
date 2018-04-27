# Async programming

<!--section-->

## Asynchrony

<!--slide-->

> It’s easier to understand "asynchrony" if you first understand what “synchrony”, the opposite, means.

<!--slide-->

### Synchronous code

> Synchronous code as “a bunch of statements in sequence”; so each statement in your code is executed one after the other.

```js
console.log('First')
console.log('Second')
console.log('Third')
// "First" "Second" "Third"
```

<!--slide-->

### Asynchronous code

> Asynchronous code takes **statements outside of the main program flow**, allowing the code after the asynchronous call to be executed immediately without waiting.

<!--slide-->

### Let's see it in action

Consider:

```js
var users = jQuery
  .get('//jsonplaceholder.typicode.com/users')
  .done(function(response) {
    console.log('first log: ' + response.length)
  })
console.log('second log: ' + users.length)
```

Output:

```
"second log: undefined"
"first log: 10"
```

* Logs are not made by order of code lines
* The result of `getUsers` is not an array of users

<!--slide-->

Code executed now:

```js
var users = jQuery
  .get('//jsonplaceholder.typicode.com/users')
  .done(/* callback */)
console.log('second log: ' + users.length)
```

Code executed later:

```js
function(response){
  console.log('first log: ' + response.length)
}
```

This is a callback that will be executed only when `jsonplaceholder.typicode.com` responds with data.

<!--slide-->

> Asynchrony is essential for activities that are **potentially blocking**.

> While browser is waiting for a response from the web service, code execution is not blocked and keeps executing the rest of the lines.

<!--slide-->

### Going further

Consider:

```js
function log(content) {
  console.log(content)
}
function printing() {
  log(1)
  setTimeout(function callback1() {
    log(2)
  }, 0)
  setTimeout(function callback2() {
    log(3)
  }, 1000)
  log(4)
}
printing()
```

<!--slide-->

Output:

```
1
4
2
3
```

Why is `3` after `4` if the timeout has no time to wait?

<!--slide-->

To get it, we need to dive into runtime concepts.

<!--slide-->

Javascript engine is composed of:

* **Stack**: Function calls form a stack of frames.

* **Heap**: Objects are allocated in a heap which is just a name to denote a large mostly unstructured region of memory.

* **Queue**: A JavaScript runtime contains a message queue, which is a list of messages to be processed. **A function is associated with each message.** When the stack is empty, a message is taken out of the queue and processed.

<!--slide-->

![runtime](./images/js-event-loop.png)
Note: source here: http://liberablogo.com/wp-content/uploads/2017/01/chrome.png

<!--slide-->

#### Event loop

> The event loop got its name because of how it's usually implemented, which usually resembles:

```js
while (queue.waitForMessage()) {
  queue.processNextMessage()
}
```

`queue.waitForMessage` waits synchronously for a message to arrive if there is none currently.

[Check the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

<!--slide-->

Let's how it works with our code

```js
function log(content) {
  console.log(content)
}
function printing() {
  log(1)
  setTimeout(function callback1() {
    log(2)
  }, 0)
  setTimeout(function callback2() {
    log(3)
  }, 1000)
  log(4)
}
printing()
```

[http://latentflip.com/loupe/](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbG9nIChjb250ZW50KSB7CiAgY29uc29sZS5sb2coY29udGVudCkKfQpmdW5jdGlvbiBwcmludGluZygpIHsKICAgbG9nKDEpOwogICBzZXRUaW1lb3V0KGZ1bmN0aW9uIGNhbGxiYWNrMSgpIHsgbG9nKDIpOyB9LCAwKTsKICAgc2V0VGltZW91dChmdW5jdGlvbiBjYWxsYmFjazIoKSB7IGxvZygzKTsgfSwgMTAwMCk7CiAgIGxvZyg0KTsKfQpwcmludGluZygpOwo%3D!!!)

<!--slide-->

### Making the synchronous, asynchronous

Sometimes, synchronous heavy tasks blocks runtime until the end.

It can really damage user's experience.

But now that you understand asynchony in javascript, you can take advantage of it...

<!--slide-->

Consider:

```js
function times(count, func, callback) {
  if (!count) {
    callback()
  } else {
    func(count)
    times(--count, func, callback)
  }
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/xohecax-3?embed

[http://latentflip.com/loupe/](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gdGltZXMgKGNvdW50LCBmdW5jLCBjYWxsYmFjaykgewogIGlmKCFjb3VudCkgewogICAgY2FsbGJhY2soKQogIH0gZWxzZSB7CiAgICBmdW5jKGNvdW50KQogICAgdGltZXMoLS1jb3VudCwgZnVuYywgY2FsbGJhY2spCiAgfQp9CgoKZnVuY3Rpb24gdGFzayAobnVtKSB7CiAgY29uc29sZS50aW1lKCd0YXNrJykKICBNYXRoLnBvdyg1ICogMiwgMik7CiAgY29uc29sZS50aW1lRW5kKCd0YXNrJykKfQoKCmxldCBpbnRlcm5hbElkID0gc2V0SW50ZXJ2YWwoY29uc29sZS5sb2cuYmluZCh0aGlzLCAnY2xpY2shJyksIDEwKQoKc2V0VGltZW91dChmdW5jdGlvbigpIHsKICBjb25zb2xlLnRpbWUoJ3RpbWVzJykKICB0aW1lcygxMDAsIHRhc2ssIGZ1bmN0aW9uKCkgewogICAgY29uc29sZS50aW1lRW5kKCd0aW1lcycpCiAgICBjbGVhckludGVydmFsKGludGVybmFsSWQpCiAgfSkKfSwgNTApCg%3D%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

<!--slide-->

Make it asynchronous, non blocking:

```js
function times(count, func, callback) {
  if (!count) {
    callback()
  } else {
    func(count)
    setTimeout(function posponedTimes() {
      times(--count, func, callback)
    }, 0)
  }
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/kazequs?embed

[http://latentflip.com/loupe/](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gdGltZXMgKGNvdW50LCBmdW5jLCBjYWxsYmFjaykgewogIGlmKCFjb3VudCkgewogICAgY2FsbGJhY2soKQogIH0gZWxzZSB7CiAgICBmdW5jKGNvdW50KQogICAgc2V0VGltZW91dChmdW5jdGlvbigpewogICAgICB0aW1lcygtLWNvdW50LCBmdW5jLCBjYWxsYmFjaykKICAgIH0sIDApCiAgICAKICB9Cn0KCgpmdW5jdGlvbiB0YXNrIChudW0pIHsKICBjb25zb2xlLnRpbWUoJ3Rhc2snKQogIE1hdGgucG93KDUgKiAyLCAyKTsKICBjb25zb2xlLnRpbWVFbmQoJ3Rhc2snKQp9CgoKbGV0IGludGVybmFsSWQgPSBzZXRJbnRlcnZhbChjb25zb2xlLmxvZy5iaW5kKHRoaXMsICdjbGljayEnKSwgMTApCgpzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgewogIGNvbnNvbGUudGltZSgndGltZXMnKQogIHRpbWVzKDEwMCwgdGFzaywgZnVuY3Rpb24oKSB7CiAgICBjb25zb2xlLnRpbWVFbmQoJ3RpbWVzJykKICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJuYWxJZCkKICB9KQp9LCA1MCkK!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

<!--slide-->

Consider:

```js
function traverseRecursion(current, depth) {
  var children = current.childNodes
  for (var i = 0, len = children.length; i < len; i++) {
    traverseRecursion(children[i], depth + 1)
  }
}
```

<!--slide-->

Make it asynchronous, non blocking:

```js
function traverseRecursion(current, depth) {
  var children = current.childNodes
  for (var i = 0, len = children.length; i < len; i++) {
    setTimeout(
      (function(current, depth) {
        traverseRecursion(current, depth)
      })(children[i], depth + 1),
      0
    )
  }
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/fupuveh-9?embed

<!--section-->

## Callbacks

> Callbacks are the fundamental unit of asynchrony in JS.

> Instead of immediately returning some result like most functions, functions that use callbacks take some time to produce a result.

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice

Implement `getUsersPhotos()` to retrieve photos of all users.

```js
var getUsers = function (callback, limit) { ... }
var getUserAlbums = function (userId, callback, limit) { ... }
var getAlbumPhotos = function (albumId, callback, limit) { ... }

function getUsersPhotos(callback, limit) {
  // YOUR CODE GOES HERE
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/rojomaf?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

You've probably ended up with that kind of code

```js
function getUsersPhotos(callback, limit) {
  var result = []
  var albumsLeftToProcess = 0
  getUsers(function(users) {
    users.forEach(function(user) {
      getUserAlbums(
        user.id,
        function(albums) {
          albums.forEach(function(album) {
            albumsLeftToProcess++
            getAlbumPhotos(
              album.id,
              function(photos) {
                photos.forEach(function(photo) {
                  result.push(photo)
                })
                --albumsLeftToProcess || callback(result)
              },
              limit
            )
          })
        },
        limit
      )
    })
  }, limit)
}
```

Note: We call that the "Pyramid of Doom"

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/tevulew?embed

<!--slide-->

### The problem with callbacks

<!--slide-->

#### Callback hell | Pyramid of doom

> The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom.

http://callbackhell.com/

<!--slide-->

#### Inversion of control

> Callbacks suffer from inversion of control in that they implicitly give control over to another party.

> This control transfer leads us to a troubling list of [trust issues](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch2.md#tale-of-five-callbacks), such as whether the callback is called more times than we expect.

<!--section-->

## Promises

> Promises are now the official way to provide async return values in both JavaScript and the DOM.

> The `Promise` object is used for asynchronous computations. **A promise represents a value** which may be available now, or in the future, or never.

[Check the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

<!--slide-->

### Basics

Let's see how it looks like:

```js
var promise = getUsers()
promise.then(
  function(users) {
    console.log(users)
  },
  function(e) {
    console.error(e.message)
  }
)
```

Note: `getUsers` returns a promise. Promise always provides functions `then` and `catch`.
`then` handler will be called with the value if the promise is resolved
`catch` handler will be called with the value if the promise is rejected explicitly or any error occurs during the execution

<!--slide-->

### States of a promise

* **pending** - Hasn't resolved or rejected yet
* **settled** - Has resolved or rejected
  * **resolved** - The action relating to the promise succeeded
  * **rejected** - The action relating to the promise failed

<!--slide-->

```js
var promise = getUsers() // Promise is pending
promise.then(
  function(users) {
    // Promise is resolved and settled
    console.log(users)
  },
  function(e) {
    // Promise is rejected and settled
    console.error(e.message)
  }
)
```

<!--slide-->

### Immutability of settled promises

* A promise is resolved with a **value**, passed to **resolution handler**

* A promise is rejected for a **reason** or **a thrown exception**, passed to the **rejection handler**

* Once a promise is settled (resolved or rejected), it's immutable and can't be **resolved** with a different value or **rejected** afterwards

[Check full specs](https://promisesaplus.com/)

<!--slide-->

### Absence of race conditions

> **Race condition**: output is dependent on the sequence or timing of other uncontrollable events.

If the promise is settled when a corresponding handler is attached, the handler will be called.

Then, so there is no race condition between an asynchronous operation completing and its handlers being attached.

<!--slide-->

**http get with callbacks**

```js
function reqListener() {
  console.log(this.responseText)
}

var oReq = new XMLHttpRequest()
oReq.addEventListener('load', reqListener)
oReq.open('GET', 'http://www.example.org/example.txt')
oReq.send()
```

If `load` handler is attached **after** the response, the handler **will not** be executed

<!--slide-->

**http get with promises**

```js
function reqListener(response) {
  console.log(response.text())
}

var oReq = fetch('flowers.jpg')

oReq.then(reqListener)
```

If `then` handler is attached **after** the response, the handler **will** be executed

<!--section-->

### Consuming Promises

<!--slide-->

#### `Promise.prototype.then( onResolve, onReject )`

> `romise.then()` accepts both **resolution** and **rejection** handlers

```js
getUsers() // returns a promise
  .then(
    function(users) {
      console.log(users)
    },
    function(e) {
      console.error(e.message)
    }
  )
```

<!--slide-->

##### Resolution handling

> If the promise returned by `getUsers` is resolved, resolution handler will be called with the value.

```js
getUsers().then(
  function(users) {
    console.log(users)
  },
  function(e) {
    console.error(e.message)
  }
)
```

<!--slide-->

##### Rejection handling

> If the promise returned by `getUsers` is rejected, rejection handler will be called with a reason or `Error`.

```js
getUsers().then(
  function(users) {
    console.log(users)
  },
  function(e) {
    console.error(e.message)
  }
)
```

<!--slide-->

##### Chaining

`promise.then` always returns a new promise.

The returned value in the attached handler will resolved a newly created promise.

```js
getUsers()
  // promise 1
  .then(function(users) {
    return users.filter(user => !!user.active)
  })
  // promise 2
  .then(function(activeUsers) {
    console.log(activeUsers)
  })
// promise 3
```

<!--slide-->

##### Rejection cascade

> As each `then` returns a **new independant promise**, the rejection handler is only triggered if something happens is the "origin" promise.

> Also, the resolution handler will not be called on the next promise if first promise is rejected

<!--slide-->

```js
getUsers() // promise 1
  .then(
    function onResolve1(users) {
      throw new Error('No users')
      return users.filter(user => !!user.active)
    },
    function onReject1(e) {
      console.error(e)
    }
  ) // promise 2
  .then(
    function onResolve2(activeUsers) {
      console.log(activeUsers)
    },
    function onReject2(e) {
      console.error(e)
    }
  ) // promise 3
```

Only `onResolve1` and `onRejection2` will be called

<!--slide-->

##### Casting

> In a resolution handler, you can either return a plain value or **a new promise**

```js
getUsers()
  // promise 1, of getUsersPhotos
  .then(function(users) {
    return users.filter(user => !!user.active)
  })
  // promise 2, of active users
  .then(function(activeUsers) {
    return getAlbums(activeUsers[0].id)
    // promise 3, of first user's albums
  })
  // promise 3, of first user's albums
  .then(function(firstActiveUserAlbums) {
    console.log(firstActiveUserAlbums)
  })
// promise 4, of undefined (nothing was returned)
```

<!--section-->

### Creating Promises

<!--slide-->

#### The `Promise` object

```js
new Promise(function(resolve, reject) {
  /* code */
})
```

> In ES6, `Promise` is a new Object that can be instantiated

> A `resolve` and `reject` functions are provided to either resolve or reject the promise.

```js
var promise = new Promise(function(resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve(true)
  } else {
    reject("It's < 0.5")
  }
})
```

<!--slide-->

##### Getting rid of callbacks with promises

This code:

```js
var getUsers = function (callback, limit) {
  jQuery.get('//jsonplaceholder.typicode.com/users')
    .done(function (response) {
      callback(response.slice(0, limit))
    })
}

getUsers(function (users)
  console.log(users)
}, 5)
```

<!--slide-->

Becomes:

```js
var getUsers = function(limit) {
  return new Promise(function(resolve, reject) {
    jQuery.get('//jsonplaceholder.typicode.com/users').done(function(response) {
      resolve(response.slice(0, limit))
    })
  })
}

getUsers(5).then(function(users) {
  console.log(users)
})
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice

Print the number of photos of a user.

```js
var getOneUser = function () { ... }
var getUserAlbum = function (userId) { ... }
var getAlbumPhotos = function (albumId) { ... }

var printUserFirstPhotos = function(){
  // YOUR CODE GOES HERE
}

printUserFirstPhotos() // 50
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/xofebas-8?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

If you ended up with a code like that:

```js
var printUserFirstPhotos = function() {
  getOneUser().then(function(user) {
    return getUserAlbum(user.id).then(function(album) {
      return getAlbumPhotos(album.id).then(function(photos) {
        console.log(photos.length)
      })
    })
  })
}
```

You are still stuck with pyramides and not understanding promises...

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

What about that ?

```js
var printUserFirstPhotos = function() {
  getOneUser()
    .then(user => getUserAlbum(user.id))
    .then(album => getAlbumPhotos(album.id))
    .then(photos => console.log(photos.length))
}
```

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

Or that ?

```js
var printUserFirstPhotos = function() {
  getOneUser()
    .then(user => user.id)
    .then(getUserAlbum)
    .then(album => album.id)
    .then(getAlbumPhotos)
    .then(photos => photos.length)
    .then(console.log)
}
```

<!--section-->

### `Promise` static methods

* Promise.all()
* Promise.race()
* Promise.reject()
* Promise.resolve()

<!--slide-->

#### `Promise.resolve(value)`

> A static method to create a **promise resolved** with the given value (or another promise)

This code

```js
var promise = Promise.resolve(5)
```

is the same as

```js
var promise = new Promise(function(resolve) {
  resolve(5)
})
```

<!--slide-->

```js
var getSquare = function(x) {
  return Promise.resolve(x * x)
}

getSquare(4).then(square => console.log(square))
```

<!--slide-->

#### `Promise.reject(reason)`

> A static method to create a **promise reject** with the given reason

This code

```js
var promise = Promise.reject('Some error happened')
```

is the same as

```js
var promise = new Promise(function(resolve, reject) {
  reject('Some error happened')
})
```

<!--slide-->

#### `Promise.all(iterable)`

> A static method that returns a promise that will be resolved in an array of values of all given promises in the array.

```js
var promise = Promise.all([
  Promise.resolve(4),
  Promise.resolve(5),
  Promise.resolve('a'),
  Promise.resolve({})
])

promise.then(values => console.log(values)) // [4,5,"a",{}]
```

<!--slide-->

`Promise.all` executes promises **in parallel**, not sequentially

```js
var getUserPhotos = function(userId) {
  return getUser(userId)
    .then(user => getUserAlbum(user.id))
    .then(album => getAlbumPhotos(album.id))
    .then(photos => console.log(photos))
}

Promise.all([
  getUserPhotos(2),
  getUserPhotos(4),
  getUserPhotos(5),
  getUserPhotos(8)
])
```

Actually, it doesn't execute anything...

<!--slide-->

#### `Promise.race(iterable)`

> A static method that returns a promise that resolves or rejects as soon as **one of the promises** in the iterable resolves or rejects, with the value or reason from that promise.

<!--slide-->

```js
var getTimeoutPromise = function(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject('Timeout')
    }, time)
  })
}

var promise = Promise.race([getUserPhotos(), getTimeoutPromise(3000)])
```

If `getUserPhotos()` lasts more than 3 seconds, `promise` will be rejected with reason "Timeout"

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

#### Remember: promises are... **always asynchronous**

```js
console.log('###### case 1 #####')
Promise.resolve(1)
  .then(x => console.log('then 1.0'))
  .then(x => console.log('then 1.1'))

console.log('###### case 2 #####')
Promise.resolve(1)
  .then(x => console.log('then 2.0'))
  .then(x => console.log('then 2.1'))

// "###### case 1 #####"
// "###### case 2 #####"
// "then 1.0"
// "then 2.0"
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/kecemib?embed

Note: handlers are callbacks. Then, they get involved in the event loop.

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice

Let's redo our practice about callbacks to play with promises.

```js
var getUsers = function(limit) {
  /* Promise */
}
var getUserAlbums = function(userId, limit) {
  /* Promise */
}
var getAlbumPhotos = function(albumId, limit) {
  /* Promise */
}

function getUsersPhotos(limit) {
  // YOUR CODE GOES HERE
}

getUsersPhotos(6).then(photos =>
  console.log('Number of photos: ' + photos.length)
)
// OUTPUT : "Number of photos: 216"
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/wemevaj-1?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible solution

```js
function getUsersPhotos(limit) {
  return getUsers(limit)
    .then(users => users.map(user => getUserAlbums(user.id, limit)))
    .then(albumsPromises => Promise.all(albumsPromises))
    .then(usersAlbums => [].concat(...usersAlbums))
    .then(albums => albums.map(album => getAlbumPhotos(album.id, limit)))
    .then(photosPromises => Promise.all(photosPromises))
    .then(albumsPhotos => [].concat(...albumsPhotos))
}
```

<!--section-->

### Catching Rejections

<!--slide-->

#### `Promise.prototype.catch()`

The `catch()` method returns a Promise and deals with rejected cases only.

It behaves the same as calling `Promise.prototype.then(undefined, onReject)`.

```js
getUsersPhotos(6)
  .then(photos => console.log('Number of photos: ' + photos.length))
  .catch(e => console.log('getUsersPhotos call failed'))
```

[MDN // Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

<!--slide-->

> `catch()` always returns **a promise**, like `then`

Let's see it in action:

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/cibopuq?embed

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

##### Caution !

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

<!--slide-->

#### A thing to remember

> `catch()` is just sugar for `then(null, onRejection)``

This snippet...

```js
getUsersPhotos(limit).catch(onReject)
```

... is **exactly THE SAME** as

```js
getUsersPhotos(limit)
  .then (null, onReject })
```

<!--slide-->

On the other hand. This snippet...

```js
getUsersPhotos(limit)
  .then(onResolve)
  .catch(onReject)
```

... is **NOT** the same as:

```js
getUsersPhotos(limit).then(onResolve, onReject)
```

<!--slide-->

The snippet...

```js
getUsersPhotos(limit)
  .then(onResolve)
  .catch(onReject)
```

It's **exactly THE SAME** as

```js
getUsersPhotos(limit)
  .then(onResolve)
  .then(null, onReject)
```

Remember that the `onReject` catches errors from **'previous'** promise that has not a **rejection handler**.

<!--slide-->

### Each `then`, each `catch` returns a **NEW** Promise

What would be the output of this code?

```js
var promise = Promise.resolve(1)

promise
  .then(x => {
    return x + 1
  })
  .then(x => {
    return x + 1
  })

var promise2 = promise.then(x => {
  return x + 1
})
var promise3 = promise2
  .then(x => {
    throw 'Error'
  })
  .catch(x => {
    return x
  })

promise.then(console.log)
promise2.then(console.log)
promise3.then(console.log)
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/sigefo?embed

<!--slide-->

```js
var promise = Promise.resolve(1) // Promise 1: value(1)

promise
  .then(x => {
    return x + 1
  }) // Promise 2: value(2)
  .then(x => {
    return x + 1
  }) // Promise 3: value(3)

var promise2 = promise.then(x => {
  return x + 1
}) // Promise 4: value(2)
var promise3 = promise2
  .then(x => {
    throw 'Error'
  }) // Promise 5: reason("Error")
  .catch(x => {
    return x
  }) // Promise 5: value("Error")

promise.then(console.log) // 1
promise2.then(console.log) // 2
promise3.then(console.log) // 3
```

<!--slide-->

### `Promise.prototype.finally`

> Handler executed whatever the promise is resolved or rejected.

```js
showLoadingSpinner()
getUsersPhotos(6)
  .then( photos => console.log('Number of photos: ' + photos.length ) )
  .catch( e => console.log('getUsersPhotos call failed') )
  .finally( => hideLoadingSpinner() )
```

[MDN // Promise.prototype.finally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

<!--section-->

## Mastering Promises

<!--slide-->

### Old promises patterns you must avoid

> Promises have a long and storied history, and it took the JavaScript community a long time to get them right.

<!--slide-->

#### `progress` handler

> Handler to notify of value resolution progress.

```js
getJSON().then(
  function() {
    // resolution handler
    console.log('JSON loaded !')
  },
  function(e) {
    // rejection handler
    console.log('Error !')
  },
  function(progress) {
    // progress handler
    console.log(progress + '% loaded !')
  }
)
```

<!--slide-->

#### The deferred pattern (deferred objects)

```js
var deferred = Q.defer()
FS.readFile('foo.txt', 'utf-8', function(error, text) {
  if (error) {
    deferred.reject(new Error(error))
  } else {
    deferred.resolve(text)
  }
})
return deferred.promise
```

<!--slide-->

### More promise treats

<!--slide-->

#### Convert callback functions to promises

```js
FS.readFile('foo.txt', 'utf-8', function(error, text) {
  /* ... */
})
```

```js
var readFile = Q.denodeify(FS.readFile)
readFile('foo.txt', 'utf-8')
  .then(onResolve)
  .catch(onReject)
```

```js
Q.nfcall(FS.readFile, 'foo.txt', 'utf-8')
  .then(onResolve)
  .catch(onReject)
```

[Q.js](https://github.com/kriskowal/q)

<!--slide-->

#### Convert promises to callbacks based libs

```js
var getUsers = function(callback, limit) {
  window.fetch('//jsonplaceholder.typicode.com/users').asCallback(callback)
}

getUsers(function(err, result) {
  /* ... */
}, 5)
```

[Bluebird](http://bluebirdjs.com/docs/getting-started.html)

<!--slide-->

#### Delay with promises

```js
Promise
  .delay(1000)
  .then( => getUsers() )
```

[Bluebird](http://bluebirdjs.com/docs/getting-started.html)

<!--section-->

## Further info on promises

<!--slide-->

### Promise libraries

* [RSVP.js](https://github.com/tildeio/rsvp.js/)
* [Q.js](https://github.com/kriskowal/q)
* [Bluebird](http://bluebirdjs.com/docs/getting-started.html)

<!--slide-->

### Promise based new APIs

* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API)

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice

Write `getFirstCharNumber` body code so it would return a promise resolved with the char number of the uppercase first letter of a given string.

```js
function upper(text) { ... }

function firstChar(text) { ... }

function getChartCode(text) { ... }

getFirstCharNumber('abcde').then( console.log )

function getFirstCharNumber(text) {
  // YOUR CODE GOES HERE
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/zidohun?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible solutions

```js
function getFirstCharNumber(text) {
  return firstChar(text)
    .then(upper)
    .then(text => getChartCode(text)())
}
```

```js
function getFirstCharNumber(text) {
  return Promise.resolve(upper(text)).then(text => getChartCode(text)())
}
```

<!--section-->

## async functions (ES7)

> The **async function** declaration defines a async function.

> When async function is called, it returns a promise.

> When the async function returns a value, the promise will be resolved with the returned value.

[MDN // async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

<!--slide-->

Simple value promise:

```js
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('resolved: ' + x)
      resolve(x)
    }, 2000)
  })
}
```

<!--slide-->

```js
async function add1(x) {
  var a = await resolveAfter2Seconds(20)
  var b = await resolveAfter2Seconds(30)
  return x + a + b
}

add1(10).then(v => {
  console.log(v) // prints 60 after 4 seconds.
})

// "resolved: 20"
// "resolved: 30"
// 60
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/wizojay?embed

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

### Caution!

> `await` pauses the execution, so watch out when you execute your promises

```js
async function add2(x) {
  var a = resolveAfter2Seconds(20)
  var b = resolveAfter2Seconds(30)
  return x + (await a) + (await b)
}

add2(10).then(v => {
  console.log(v) // prints 60 after 2 seconds.
})
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/coyovas?embed

<!--slide-->

### Rejected promises

> If an **awaited promise** is rejected, the reason value is thrown.

```js
async function f3() {
  try {
    var z = await Promise.reject(30)
  } catch (e) {
    console.log(e) // 30
  }
}
f3()
```

<!--slide-->

### Using async functions instead of promise chains

```js
function getProcessedData(url) {
  return downloadData(url) // returns a promise
    .catch(e => {
      return downloadFallbackData(url) // returns a promise
    })
    .then(v => {
      return processDataInWorker(v) // returns a promise
    })
}
```

```js
async function getProcessedData(url) {
  let v
  try {
    v = await downloadData(url)
  } catch (e) {
    v = await downloadFallbackData(url)
  }
  return processDataInWorker(v)
}
```

<!--slide-->

## Must Read/Watch

* [Promise/A+ Specification](https://promisesaplus.com/)

* [Nolan Lawson - We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)

* [Fun Fun Function - Promises](https://www.youtube.com/watch?v=2d7s3spWAzo)

* [Jake Archivald - Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

* [You-Dont-Know-JS - async & performance](https://github.com/getify/You-Dont-Know-JS/tree/master/async%20&%20performance)

<!--section-->

## Practices

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Implement `Promise.delay(ms)`

Returns a promise that will resolved after given milliseconds.

```js
Promise.delay = function(ms) {
  // YOUR CODE GOES HERE
}

Promise.delay(1000).then(function() {
  console.log('delayed 1000ms')
})

setTimeout(function() {
  console.log('delayed 500ms')
}, 500)

// OUTPUT "delayed 500ms" "delayed 1000ms"
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/qidokig?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

### Solution

```js
Promise.delay = function(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms)
  })
}
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Implement `Promise.series(iterable)`

Works like `Promise.all`, but executes the promises **sequentially** instead of in parallel.

```js
var getDelayed = function(ms, name){ ... }

Promise.series = function(promises) {
  // YOUR CODE GOES HERE
}

Promise.series([
  getDelayed(500, 'promise 1'),
  getDelayed(400, 'promise 2'),
  getDelayed(300, 'promise 3')
])

// OUTPUT: "promise 1" "promise 2" "promise 3"
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/AsyncProgramming/mecalow?embed

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

#### Solution: NONE !!!!

You can't make promises change their execution order.

Once a promises is pending, it's in progress...

We could only implement it with:

```js
Promise.series([
  function() {
    getDelayed(500, 'promise 1')
  },
  function() {
    getDelayed(400, 'promise 2')
  },
  function() {
    getDelayed(300, 'promise 3')
  }
])

Promise.series = function(promiseConstructors) {
  // YOUR CODE GOES HERE
}
```
