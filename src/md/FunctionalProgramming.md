# Functional Programming in javascript

<!--section-->

## What is functional programming?

A programming paradigm.

<!--slide-->

### What is a programming paradigm?

> Paradigms are a distinct set of concepts or thought patterns.

> Programming paradigms are a way to classify programming languages according to the style of computer programming.

<!--slide-->

**Other programming paradigms:**

- Imperative programming
- Object-oriented programming
- [and many more](https://en.wikipedia.org/wiki/Comparison_of_programming_paradigms#Main_paradigm_approaches)

<!--slide-->

### Main concepts

- **First-class functions**
  | functions to be treated like any other value
- **Immutability**
  | don't mutate data
- **Absence of side effects**
  | don't alter state (stateless)
- **Lambda Calculus**
  | function expressions with closures
- **Recursion**
  | don't iterate (no loops)

<!--section-->

## First-class functions

> Functions to be treated like any other value.
>
> This means they can be created, passed to functions, returned from functions and stored inside data structures

<!--slide-->

### Functions are objects

```js
var logToConsole = function(text) {
  console.log(text);
};

console.log(typeof logToConsole);
// object
```

[MDN // Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

<!--slide-->

### All functions are instances of `Function`

```js
var logToConsole = function(text) {
  console.log(text);
};
```

Is the same as:

```js
var logToConsole = new Function('text', 'console.log( text )');
```

<!--slide-->

As objects, they can have properties, methods, etc.

```js
logToConsole.count = 1;
console.log(logToConsole.count);
// 1
```

<!--slide-->

### Functions can be stored as variables

```js
var logToConsole = function(text) {
  console.log(text);
};

var log = logToConsole;
log('Hello World');
```

<!--slide-->

### Functions can be passed as parameter

```js
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});
```

<!--slide-->

### Functions can be returned

```js
var createIncrementer = function(increment) {
  return function(number) {
    return number + increment;
  };
};

var increment3 = createIncrementer(3);
increment3(5); // 8
increment3(10); // 13
```

<!--section-->

## Immutability

> An immutable object is an object whose state cannot be modified after it is created.

> A function is not supposed to mutate its input(s) but to return a newly created output.

<!--slide-->

```js
const f = function(x) {
  return x ** 2;
};
const g = function(x) {
  return x + 1;
};
g(f(3)); // 10
```

![input-output](https://perfectmaths.files.wordpress.com/2011/06/function_composite_fx.png?w=604)

<!--slide-->

### Data mutation in a function

```js
function increment1(numbers) {
  for (var i in numbers) {
    numbers[i]++;
  }
  return numbers;
}
var numbers = [4, 5, 6];
var incrementedNumbers = increment1(numbers);

console.log(numbers); // [5, 6, 7]
console.log(incrementedNumbers); // [5, 6, 7]
```

Note: in this function, `numbers` is mutated by `increment1`

<!--slide-->

### Without mutation

```js
function increment1(numbers) {
  var result = [];
  for (var i in numbers) {
    result[i] = numbers[i] + 1;
  }
  return result;
}
var numbers = [4, 5, 6];
var incrementedNumbers = increment1(numbers);

console.log(numbers); // [4, 5, 6]
console.log(incrementedNumbers); // [5, 6, 7]
```

Note: in this function, `numbers` is not mutated and an output array is created instead.

<!--section-->

## Lambdas

> In computer science, the most important defining characteristic of a lambda expression is that it is used as data.

- Passed as an argument to another function to be invoked
- Function returned as a value from a function
- Assigned to variables or data structures

Note: In JavaScript, not all lambdas are anonymous, and not all anonymous functions are lambdas, so the distinction has some practical meaning.

<!--slide-->

`λx.x*x`

```js
x => x * x;
```

Regular function:

```js
function square(x) {
  return x * x;
}
var squares = [3, 4, 6].map(square);
```

Arrow function:

```js
var squares = [3, 4, 6].map(x => x * x);
```

Note: Both `square` functions can be considered lambdas, but the first one would be the more pure as expressed as an expression

<!--slide-->

Consider:

```js
function plus(x, y) {
  return x + y;
}
plus(5, 7); // 12
```

<!--slide-->

`λx.λ.y.x+y`

```js
x => y => x + y;
```

Regular functions:

```js
function plus(x) {
  return function plusx(y) {
    return x + y;
  };
}
plus(5)(7); // 12
```

Arrow functions:

```js
(x => y => x + y)(5)(7); // 12
```

Note: `plus` is a lambda expression, even if it´s not anonymous.

<!--slide-->

### Closures

> Lambdas are possible in javascript thanks to closures.

> A closure is a special kind of object that combines two things: a function, and the environment in which that function was created.

<!--slide-->

```js
function makeFunc() {
  var name = 'Mozilla';
  function displayName() {
    console.log(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc(); // "Mozilla"
```

Note: When `displayName` is created, `name` is added to its closure with its value 'Mozilla'

<!--slide-->

```js
function makeAdder(x) {
  return function add(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/jegerel?embed

Note: When `add` is created, `x` is added to its closure with its current value. First with `x=5` and then with `x=10`
That´s why, `add5` and `add10` return different values as they have a different `x` in their closure.

<!--section-->

## Absence of side effects

> Don’t rely on data outside the current function.

> Don’t change data that exists outside the current function.

<!--slide-->

### Statelessness

> The state is a snapshot of a program’s current environment: all the variables that have been declared, functions created and what is currently being executed.

> An expression in a programming language can be **“stateful”** or **“stateless”**. A stateful expression is one that changes a program’s current environment.

<!--slide-->

### Don´t change state

Not functional:

```js
var number = 1;
var increment = function() {
  return (number += 1);
};
increment();
```

Functional:

```js
var number = 1;
var increment = function(n) {
  return n + 1;
};
increment(number);
```

<!--slide-->

### Don´t depend on state

Not functional:

```js
function isAdult(birthday) {
  var now = new Date();
  return now.getFullYear() - birthday.getFullYear() > 18;
}
isAdult(new Date('December 17, 1995 03:24:00'));
```

Functional but incorrect:

```js
function isAdult(birthday) {
  return 2017 - birthday.getFullYear() > 18;
}
isAdult(new Date('December 17, 1995 03:24:00'));
```

<!--slide-->

Functional:

```js
const isAdult = currentYear => birthday =>
  currentYear - birthday.getFullYear() > 18;
isAdult(2017)(new Date('December 17, 1995 03:24:00')); // true
isAdult(2017)(new Date('December 17, 2003 03:24:00')); // false
```

Event better:

```js
const isAdult = currentYear => birthday =>
  currentYear - birthday.getFullYear() > 18;
const isAdultIn2017 = isAdult(2017);
isAdultIn2017(new Date('December 17, 1995 03:24:00')); // true
isAdultIn2017(new Date('December 17, 2003 03:24:00')); // false
```

<!--section-->

## Recursion

> **As opposed to iteration**, method where the solution to a problem depends on solutions to smaller instances of the same problem

> A recursive function is one that calls itself

<!--slide-->

#### Don't iterate

> Use recursion functions instead: map, reduce, filter, etc...

<!--slide-->

Imperative style:

```js
var numbers = [1, 3, 5, 6];
var squares = [];
for (let i; i < numbers.length; i++) {
  squares = numbers[i] * numbers[i];
}
```

Functional style:

```js
var numbers = [1, 3, 5, 6];
var squares = numbers.map(function(num) {
  return num * num;
});
// [1, 9, 25, 36]
```

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

### The Recursion dilemma in JS

> Should we choose recursion over loops?

<!--slide-->

> "Recursion is not intrinsically better or worse than loops - each has advantages and disadvantages, and those even depend on the programming language (and implementation)."

> "Iterative loops require destructive state updates, which makes them incompatible with pure (side-effect free) language semantics"

[Source (stackoferflow)](http://programmers.stackexchange.com/questions/182314/recursion-or-while-loops)

<!--slide-->

> "The problem with recursion is that it (usually) uses more memory, a lot more. That's because each active call to a function is stored on what's called a [call stack](https://egghead.io/lessons/javascript-call-stack)."

[Watch animated explanation](https://youtu.be/FyHloXKnPWc?t=41s)

> "Use recursion when it's the easier option (and N won't be that large)."

[Source (reddit)](https://www.reddit.com/r/javascript/comments/2byqst/recursion_vs_while_loops_js/)

<!--slide-->

> "In my opinion, recursive algorithms are a natural fit when the data structure is also recursive."

[Source (stackoverflow)](http://stackoverflow.com/questions/1011448/necessary-uses-of-recursion-in-imperative-languages)

<!--slide-->

> "Practically speaking, if you're not using recursion for the following (even in imperative languages) you're a little mad:
>
> - Tree traversal
> - Graphs
> - Lexing/Parsing
> - Sorting"

[Source (stackoverflow)](http://stackoverflow.com/questions/1011448/necessary-uses-of-recursion-in-imperative-languages)

<!--slide-->

Traverse with recursion

```js
function traverse(current, depth) {
  var children = current.childNodes;
  for (var i = 0, len = children.length; i < len; i++) {
    // DO STUFF
    traverse(children[i], depth + 1);
  }
}
```

<!--slide-->

Traverse with iteration

```js
function traverse(current) {
  var stack = [current];
  var stackIdx = 0;
  var children, i, len;

  while ((current = stack[stackIdx++])) {
    children = current.childNodes;
    for (i = 0, len = children.length; i < len; i++) {
      // DO STUFF
      stack.push(children[i]);
    }
  }
}
```

<!--slide-->

Let's see if what we've read is true.

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/qajegal?embed

<!--section-->

## More about functions

<!--slide-->

### Pure functions

- Giving same input will always return same output
- Produces no side effect: user output, memory writing, logging...
- Does not mutate input

<!--slide-->

### Impure functions

- Relies on current time
- Random numbers
- Side effects
- Mutation

<!--slide-->

### Higher-order functions

> A higher-order function is a function that does at least one of the following:

- Take one or more functions as an input
- Output a function

> All other functions are first order functions.

```js
function negate(func) {
  return function(x) {
    return !func(x);
  };
}
var isNotNaN = negate(isNaN);
show(isNotNaN(NaN));
```

<!--slide-->

#### map()

> The `map()` method creates a new array with the results of calling a provided function on every element in this array.

```js
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});
// doubles is now [2, 8, 18]. numbers is still [1, 4, 9]
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice: print array

> Print, with one line of code, the same output printed with `printArray`

```js
var names = ['Ben', 'Jafar', 'Matt'];

var printArray = function(names, console) {
  var counter;

  for (counter = 0; counter < names.length; counter++) {
    console.log(names[counter]);
  }
};

printArray(names, console); // OUTPUT: "Ben" "Jafar" "Matt"
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/kokoqe?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Solution

```js
names.forEach(x => console.log(x));
```

Note: Why not using map? Map is to created to return a new array. We don´t need any return here.

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice: map implementation

> Implement `map2` function to obtain same output as `map`

- Do not use any for/while loops.

```js
Array.prototype.map2 = function(func) {
  // SOLUTION GOES HERE
};

var result = console.log(
  [1, 2, 3].map2(function(x) {
    return x + 1;
  }),
  [1, 2, 3].map(function(x) {
    return x + 1;
  }),
); // OUTPUT: [2, 3, 4] [2, 3, 4]
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/yaqite?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Solution

```js
Array.prototype.map2 = function(func) {
  var results = [];
  this.forEach(function(itemInArray) {
    results.push(func(itemInArray));
  });
  return results;
};
```

<!--slide-->

#### reduce()

> The `reduce()` method applies a function against an accumulator and each value of the array (from left-to-right) to reduce it to a single value.

```js
var result = [0, 1, 2, 3, 4].reduce(
  (previousValue, currentValue, currentIndex, array) => {
    return previousValue + currentValue;
  },
  10,
);
// 20
```

```js
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice: reduce

> Write a function `countZeroes`, which takes an array of numbers as its argument and returns the amount of zeroes that occur in it. Use `Array#reduce`.

```js
function countZeroes(array) {
  // SOLUTION GOES HERE
}

console.log(countZeroes([1, 2, 0, 0, 4, 1, 0, 2, 0, 1]));

// OUTPUT: 4
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/cubidal?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Solution

```js
function countZeroes(array) {
  function counter(total, element) {
    return total + (element === 0 ? 1 : 0);
  }
  return array.reduce(counter, 0);
}
```

<!--section-->

## Is Javascript really functional?

<!--slide-->

### It is

- Functions are first class objects
- Lambdas
- Closures (encapsulate the state of the function)
- Higher order functions (pass functions to functions)

<!--slide-->

#### But it can also be Imperative

> Sequence of steps / instructions that happen in order and modifies the state

- while statements
- for loops
- ...

<!--slide-->

#### And it's also Object-oriented

> Concept of "objects", which may contain data, in the form of fields, often known as attributes; and code, in the form of procedures, often known as methods.

- Everything is an object
- Native objects (and arrays) are mutable by default
- Prototype inheritance
- ES6 introduces "real" classes

<!--slide-->

### Javascript is a multi-paradigm programming language

<!--slide-->

**Imperative style: `loops`**

```js
function simpleJoin(stringArray) {
 var accumulator = ‘’
 for (var i=0, l=stringArray.length; i < l; i++) {
   accumulator = accumulator + stringArray[i]
 }
 return accumulator
}
```

Note: program state change is achieved by executing a series of statements, and does flow control primarily using conditional statements, loop statements and function calls.

<!--slide-->

**Functional style: `recursion`**

```js
function simpleJoin(stringArray, i, accumulator) {
  if (i === stringArray.length) {
    return accumulator;
  } else {
    return simpleJoin(stringArray, i + 1, accumulator + stringArray[i]);
  }
}
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/mocaya?embed

Note: does not have any loop statements. Instead it uses recursion for iteration.

<!--slide-->

And even more functional:

```js
function simpleJoin(stringArray, i, accumulator) {
  return i === stringArray.length
    ? accumulator
    : simpleJoin(stringArray, i + 1, accumulator + stringArray[i]);
}
simpleJoin(['a', 'b', 'c'], 0, '');
```

Note: does not have any `if`. It uses an expression that evaluate to some value, instead of statements that don’t evaluate to anything.

<!--slide-->

Taking advantage of ES6:

```js
function simpleJoin(stringArray, i = 0, accumulator = '') {
  return i === stringArray.length
    ? accumulator
    : simpleJoin(stringArray, i + 1, accumulator + stringArray[i]);
}

simpleJoin(['a', 'b', 'c']);
```

<!--slide-->

**Object-oriented style: `as method`**

```js
Array.prototype.simpleJoin = function() {
 var accumulator = “”
 for (var i=0, l=this.length; i < l; i++) {
   accumulator = accumulator + this[i]
 }
 return accumulator
}
```

Note: Object oriented languages tend to be imperative languages also. In this case the statements act on array object, not a given array.

<!--slide-->

### Functional libraries for javascript

- [underscore-js](http://underscorejs.org/)
- [functional-js](http://functionaljs.com/)
- [ramda-js](https://github.com/ramda/ramda)
- [lazy-js](http://danieltao.com/lazy.js/)
- etc

<!--section-->

## Practice

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice: chaining

> Create array with ids of videos that have a rating of 5.0

- Use only Array# higher-order methods

```js
var videos = [{...},, ...]

function getBestVideosIds (videos) {
  // SOLUTION GOES HERE
}

console.log(getBestVideosIds(videos)) // OUTPUT [654356453, 675465]
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/junawu?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Solution

```js
function getBestVideosIds(videos) {
  return videos
    .filter(function(video) {
      return video.rating === 5.0;
    })
    .map(function(video) {
      return video.id;
    });
}
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice: recursion

> Implement a function that takes a function as its first argument, a number num as its second argument, then executes the passed in function num times.

```js
function repeat(operation, num) {
  // SOLUTION GOES HERE
}

repeat(() => console.log(1), 7);
// OUTPUT: 1 1 1 1 1 1 1
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/joneliv?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Solution

```js
function repeat(operation, num) {
  if (num <= 0) return;
  operation();
  return repeat(operation, --num);
}
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice: immutability

> Replace `cloneDeep` to avoid data mutation

- Loops are not allowed

```js
var data = {
  /* ... */
};

function clone(data) {
  // YOUR CODE GOES HERE
  return data;
}

clonedData = clone(data);
clonedData.users[2].name = 'Fake user name';
clonedData.users[0].games[0].name = 'Fake game name';
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/kulufo?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Solution

```js
function clone(data) {
  var result;

  if (isArray(data)) {
    result = data.map(child => clone(child));
  } else if (typeof data == 'object') {
    result = {};
    Object.keys(data).forEach(function(i) {
      result[i] = clone(data[i]);
    });
  } else {
    result = data;
  }

  return result;
}
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Practice: abstraction

> Write the higher-order function `count`, which takes an array and a test function as arguments, and returns the amount of elements in the array for which the test function returned true. Re-implement `countZeroes` using this function.

```js
console.log(countZeroes([1, 2, 0, 0, 4, 1, 0, 2, 0, 1]));
// OUTPUT: 4
```

https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/FunctionalProgramming/sotepiq?embed

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Solution

```js
function count(test, array) {
  return array.reduce(function(total, element) {
    return total + (test(element) ? 1 : 0);
  }, 0);
}

function equals(x) {
  return function(element) {
    return x === element;
  };
}

function countZeroes(array) {
  return count(equals(0), array);
}
```

Note: now the code is pure and much more functional and reusable; each function does a single thing.
