# Operators and Expressions

---

# Operators

> Operators are constructs which behave generally like functions, but which differ syntactically or semantically from usual functions.

----

## Types

----

### Unary operators

x `operator`

```js
x++
x--
delete x
```

`operator` x

```js
++x
-x
+"3" // 3 (number)
!x
```

----

### Binary operators

x `operator` y

<space><space>

```js
x || y
x && y
12 % 5 // 2
```

----

### The ternary operator (conditional operator)

condition `?` x `:` y

```js
var status = (age >= 18) ? "adult" : "minor";
```


---

## Arithmetic operators

> **Arithmetic operators** take numerical values (either literals or variables) as their operands and return a single numerical value.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)

----

### Plus (+)

`+`x

> The unary plus operator precedes its operand and evaluates to its operand but **attempts to convert it into a number**, if it isn't already.

```js
+3     // 3
+"3"   // 3
+true  // 1
+false // 0
+null  // 0

```

----

### Negation (-)

`-`x

> The unary negation operator precedes its operand and negates it.

```js
var x = 3;
y = -x; // y = -3, x = 3

-"4" // -4

```

----

### Addition (+)

x `+` y

> The addition operator produces the sum of numeric operands or string concatenation.

----

```js
// ADDITION
// Number + Number
1 + 2 // 3
// Boolean + Number
true + 1 // 2
// Boolean + Boolean
true + false + true + true // 3

// CONCATENATION
// Number + String
5 + "foo" // "5foo"
// String + Boolean
"foo" + false // "foofalse"
// String + String
"foo" + "bar" // "foobar"
```

----

### Subtraction (-)

x `-` y

> The subtraction operator subtracts the two operands, producing their difference.

```js
5 - 3 // 2
3 - 5 // -2
"foo" - 3 // NaN - Not-A-Number
```

Note: `NaN` is a property of the global object. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)

----

### Division (/)

x `/` y

> The division operator produces the quotient of its operands where the left operand is the dividend and the right operand is the divisor.

```js
1 / 2 // 0.5
1.0 / 2.0  // 0.5
2.0 / 0 // Infinity
```

Note: The global Infinity property is a numeric value representing infinity. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)

----

### Multiplication (\*)

x `*` y

> The division operator produces the quotient of its operands where the left operand is the dividend and the right operand is the divisor.

```js
2 * 2 // 4
-2 * 2 // -4
Infinity * 0 // NaN
Infinity * Infinity // Infinity
"foo" * 2 // NaN
```

----

### Remainder (%)

x `%` y

> Returns the remainder left over when one operand is divided by a second operand.

```js
12 % 5 // 2
2 % 3 // 2
-1 % 2 // -1
```

----

### Exponentiation (\*\*)

x `**` y

> The exponentiation operator returns the result of raising first operand to the power second operand.

```js
2 ** 3 // 2*2*2 = 8
3 ** 2 // 3*3 = 9
```

----

### Increment (++)

x`++` or `++`x

> The increment operator increments (adds one to) its operand and returns a value.

```js
// Postfix
var x = 3;
y = x++; // y = 3, x = 4

// Prefix
var a = 2;
b = ++a; // a = 3, b = 3
```

----

### Decrement (--)

x`--` or `--`x

> The decrement operator decrements (subtracts one from) its operand and returns a value.

```js
// Postfix
var x = 3;
y = x--; // y = 3, x = 2

// Prefix
var a = 2;
b = --a; // a = 1, b = 1
```


---

## Assignment operators

> The basic assignment operator is equal (=), which assigns the value of its right operand to its left operand.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)

----

### Assignment

x `=` y

> Simple assignment operator which assigns a value to a variable.

```js
var x = 5, y = 10, z = 25

x = y     // x is 10
x = y = z // x, y and z are all 25

console.log(x = 3+2) // 5
console.log(x = y = z) // 25
```

----

### Compound assignment

| Name | Operator | Meaning |
| - | - | - |
| Addition assignment | x `+=` y | x `=` x `+` y |
| Subtraction assignment | x `-=` y | x `=` x `-` y |
| Multiplication assignment | x `*=` y | x `=` x `*` y |
| Division assignment | x `/=` y | x `=` x `/` y |
| Remainder assignment | x `%=` y | x `=` x `%` y |
| Exponentiation assignment | x `**=` y | x `=` x `**` y |


----

### Destructuring assignment

> The destructuring assignment syntax is a JavaScript expression that makes it possible to extract data from arrays or objects into distinct variables.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

----

#### Array Destructuring

Without destructuring:
```js
const foo = ["one", "two", "three"];
const one   = foo[0];
const two   = foo[1];
const three = foo[2];
```
With destructuring:
```js
const foo = ["one", "two", "three"];
const [one, two, three] = foo;
```

----

```js
var x = [1, 2, 3, 4, 5]; // Array literal

var [y, z] = x;
console.log(y); // 1
console.log(z); // 2
```

----

<!-- .slide: data-background="rgba(255,0,0,.3)" -->
##### Caution!

What's the difference ?

```js
var x = [1, 2, 3, 4, 5];
var [y, z] = x;
```

```js
var x = [1, 2, 3, 4, 5];
[y, z] = x;
```

Destructuring declares new variables, and follows the same rules as any variable declaration.

Note: as we are declaring new variables `y` and `z` and asigning a value,
we need to use `var`, otherwise variables will be declared on global scope.


----

##### Direct assignment

> A variable can be assigned its value via destructuring separate from the variable's declaration.

This code
```js
var x = 1;
var y = 2;
var z = 3;
```

Is the same as
```js
var [x, y, z] = [1, 2, 3];
```


----

##### Default values

A variable can be assigned a default, in the case that the value pulled from the array is undefined.

```js
var arr = [1, undefined, 3, null, '' ]

var [ a='a', b='b', c='c', d='d', e='e' ] = arr

console.log(a, b, c, d, e)
// 1, "b", 3, null, ""
```

Note: Notice that default values only works with undefined values, not with `null` or falsey values.

----

#### Swapping variables

Two variables values can be swapped in one destructuring expression.

```js
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

----

#### Ignoring some values

> You can ignore return values that you're not interested in

```js
function func() {
  return [1, 2, 3, 4, 5, 6];
}

var [a, , b, , , c] = func();
console.log(a); // 1
console.log(b); // 3
console.log(c); // 6
```

----

#### Nested array destructuring


```js
var series = [
  [1,2,3],
  [4,5,6]
]

var [[a, ,b], [c,d]] = series

console.log(a,b,c,d)
// 1, 3, 4, 5
```


----

### Object Destructuring

> With objects, destructuring is made by property name, not by order

```js
var {a, b} = {a:1, b:2};

console.log(a, b); // 1, 2
```

```js
var o = {a: 42, b: true, c: 36, d: 'David'};
var {a, d} = o;

console.log(a); // 42
console.log(d); // 'David'
```



----

#### Renaming properties

```js
var o = {a: 42, b: true, c: 36, d: 'David'};
var {a: first, d: second} = o;

console.log(first); // 42
console.log(second); // 'David'
```

----

#### Default values

```js
var o = {a: 42, b: true, c: 36, d: 'David'};
var {a: first, d: second, e: third=6} = o;

console.log(first); // 42
console.log(second); // 'David'
console.log(third); // 6
```


----

#### Default values

```js
var {a=10, b=5} = {a: 3};

console.log(a); // 3
console.log(b); // 5
```

----

This code

```js
// `options` is an object
var size = options.size === undefined ? 'big' : options.size;
var cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
var radius = options.radius === undefined ? 25 : options.radius;
console.log(size, cords, radius);

```

is the same as

```js
// `options`is an object
{size = 'big', cords = { x: 0, y: 0 }, radius = 25} = options
```

----

#### Destructuring function parameters

```js
function drawES5Chart(options) {
  options = options === undefined ? {} : options;
  var size = options.size === undefined ? 'big' : options.size;
  var cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
  var radius = options.radius === undefined ? 25 : options.radius;
  console.log(size, cords, radius);
  // now finally do some chart drawing
}
```

```js
function drawES6Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) {
  console.log(size, cords, radius);
  // now finally do some chart drawing
}
```



----

### Nested object and array destructuring

```js
var user = [
  {name: 'David'},
  {name: 'Joseph' }
]

var [{name: name1}, {name: name2 }] = user

console.log(name1) // "David"
console.log(name2) // "Joseph"
```

----

```js
var metadata = {
    title: "Scratchpad",
    translations: [
       {
        url: "/de/docs/Tools/Scratchpad",
        title: "JavaScript-Umgebung"
       }
    ],
    url: "/en-US/docs/Tools/Scratchpad"
};

var { title: englishTitle, translations: [{ title: localeTitle }] } = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
```


---

## Comparison operators

> left_operand `comparison_operator` right_operand

> JavaScript has both strict and type–converting comparisons.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)


----

#### Abstract comparison

> left_operand `==` right_operand
> left_operand `!=` right_operand

> Converts the operands to the same type before making the comparison.

----

##### Abstract equality

> left_operand `==` right_operand

```js
1    ==  1        // true
"1"  ==  1        // true
1    == '1'       // true
0    == false     // true
0    == null      // false
0    == undefined // false
null == undefined // true
```

[ECMA Spec](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)

----

##### Equality of objects

> Two distinct objects are never equal for either strict or abstract comparisons.
> An expression comparing Objects is only true if the operands reference the same Object.

```js
var object1 = {"value":"key"}, object2={"value":"key"};

object1 == object2 //false
```

The two objects are difference objects, in different allocation.
**They are not the same object**.

----

##### Abstract inequality

> left_operand `!=` right_operand

```js
1 !=   2     // true
1 !=  "1"    // false
1 !=  '1'    // false
1 !=  true   // false
0 !=  false  // false
```

----

##### Type conversion rules

----

###### When comparing string with number

> The string is converted to a number value.

```js
"1"  ==  1    // true
```

----

###### When comparing boolean with number

> The Boolean operand is converted to 1 if it is true and 0 if it is false.

```js
0    == false // true
```

----

###### Comparing object with number or string

> JavaScript attempts to return the default value for the object.

```js
var a = new String('foo');
var b = new String('foo');

a == b  // false as a and b are type Object and reference different objects
a == 'foo' // true as the Object (a) is converted to String 'foo' before comparison
```

----

#### Strict comparison

> left_operand `===` right_operand
> left_operand `!==` right_operand

> A strict comparison is only true if the operands are of the **same type** and the contents match.

----

##### Strict equality

```js
1    ===  1        // true (is true  in abstract)
"1"  ===  1        // false (is true in abstract)
1    === '1'       // false (is true in abstract)
0    === false     // false (is true in abstract)
0    === null      // false (is false in abstract)
0    === undefined // false (is false in abstract)
null === undefined // false (is true in abstract)
```

----

##### Strict inequality

> left_operand `!=` right_operand

```js
1 !==   2     // true
1 !==  "1"    // true (is false in abstract)
1 !==  '1'    // true (is false in abstract)
1 !==  true   // true (is false in abstract)
0 !==  false  // true (is false in abstract)
```

----

#### Relational operators

> left_operand `>` right_operand
>
> left_operand `>=` right_operand
>
> left_operand `<` right_operand
>
> left_operand `<=` right_operand

----

```js
4 > 3 // true
4 >= 3 // true
3 >= 3 // true

3 < 4 // true
3 <= 4 // true
3 <= 3 // true
```

----

#### Working with objects

> Each of these operators will call the `valueOf()` function on each operand before a comparison is made.
>
> Then, the primitive values are compared

[valueOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)

----

```js
var a = new Number(5);
var b = new Number(5);

a == b  // false as a and b are type Object and reference different objects
a == 5 // true as the Object (a) is converted to primitive 5 before comparison

a > b // false
a < b // false
```

---

## Logical Operators

> expr1 `&&` expr2
>
> expr1 `||` expr2
>
> `!`expr


----

> Logical operators are typically used with `Boolean` (logical) values
>
> However, the `&&` and `||` operators actually return the value of one of the specified operands,
so if these operators are used with non-Boolean values, they may return a non-Boolean value.


[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)

----

##### Expression conversion

> With non-Boolean values, "falsey" expressions are converted to false:
* null
* NaN
* 0
* "" (empty string)
* undefined

```js
var a;
null || "true" // "true"
NaN  || "true" // "true"
0    || "true" // "true"
""   || "true" // "true"
a    || "true" // "true"
```

----

### Logical `AND`

> expr1 `&&` expr2

```js
true  && true;     // t && t returns true
true  && false;    // t && f returns false
false && true;     // f && t returns false
false && (3 == 4); // f && f returns false
"Cat" && "Dog";    // t && t returns Dog
false && "Cat";    // f && t returns false
"Cat" && false;    // t && f returns false
```

----

### Logical `OR`

> expr1 `||` expr2

```js
true  || true;     // t || t returns true
false || true;     // f || t returns true
true  || false;    // t || f returns true
false || (3 == 4); // f || f returns false
"Cat" || "Dog";    // t || t returns Cat
false || "Cat";    // f || t returns Cat
"Cat" || false;    // t || f returns Cat
```

----

### Logical `NOT`

> `!`expr

```js
!true;  // !t returns false
!false; // !f returns true
!"Cat"; // !t returns false
```

----

### Short-Circuit Evaluation

> As logical expressions are evaluated left to right, they are tested for possible "short-circuit" evaluation.

```js
3 && "" && "Cat" // false | 3 and "" are evaluated
// "Cat" isn't evaluated as  "" was falsey
```

```js
3 || "" || "Cat" // true | 3 is evaluated
// "" and "Cat" aren't evaluated as 3 was thruthy
```

----

#### Using it for logic

This code:
```js
function equivalentEvaluation() {
  var flag = doSomething();
  if (!flag) {
    doSomethingElse();
  }
}
```

is the same as:

```js
function shortCircuitEvaluation() {
  doSomething() || doSomethingElse()
}
```

----

This code:
```js
function equivalentEvaluation() {
  var flag = doSomething();
  if (flag) {
    doSomethingElse();
  }
}
```

is the same as:

```js
doSomething() && doSomethingElse()
```

---

## Conditional (ternary) Operator

> condition `?` expr1 `:` expr2
>
> The conditional (ternary) operator is the only JavaScript operator that takes three operands. This operator is frequently used as a shortcut for the `if` statement.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

----

```js
// As an expression
"The fee is " + (isMember ? "$2.00" : "$10.00")

// To declare a variable
var fee = isMember ? "$2.00" : "$10.00"

// To create a property
{
  fee: isMember ? "$2.00" : "$10.00"
}
```

----

### Multiple ternary evaluations

```js
var check1 = false,
    check2 = false,
    access;

access = check1 ? "Denied" : check2 ? "Denied" : "Granted";

console.log( access ); // logs "Access granted"
```

----

### Multiple operations

```js
var stop = false, age = 23;

age > 18 ? (
    alert("OK, you can go."),
    location.assign("continue.html")
) : (
    stop = true,
    alert("Sorry, you are much too young!")
);
```

---

## Unary operators

> A unary operation is an operation with only one operand.
>
> `operator` operand

----

### delete

> The `delete` operator deletes an object, an object's property, or an element at a specified index in an array.
>
> `delete` operand

```js
obj = { name: 'Joseph', surname: 'Smith' }
delete obj.name; // obj === { surname: 'Smith' }
delete obj; // obj is not defined

arr = [1,2,3,4]
delete arr[1]; // arr === [1,undefined, 3,4]
delete arr; // arr is not defined
```

----

Objects (and arrays) can be deleted only if they are declared implicitly

```js
var obj = { name: 'Joseph', surname: 'Smith' }
delete obj; // obj is { name: 'Joseph', surname: 'Smith' }

var arr = [1,2,3,4]
delete arr; // arr is [1,2,3,4]
```

----

### typeof

> `typeof` operand
>
> The `typeof` operator returns a string indicating the type of the unevaluated operand.



----

| Type | Result |
| ---- | ------ |
| Undefined | "undefined" |
| Boolean | "boolean" |
| Number | "number" |
| String | "string" |
| Symbol (ES6) | "symbol" |
| Function object | "function" |
| Any other object | "object" |

----

### Spread operator

> `...`operand
>
> The spread syntax allows an expression to be expanded in places where comma separated variables are expected.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

----

```js

var numbers = [1, 2, 3]
console.log(numbers)
// OUTPUT:
// [1, 2, 3]
```

```js
console.log(...numbers)
// OUTPUT:
// 1
// 2
// 3

```

`numbers` array is spreaded, provided as comma separated values:

```js

// console.log(...numbers)
console.log(1, 2, 3)

```

----

#### Spreading arrays

----

##### Array concat

```js
var numbers = [1, 2, 3]
var letters = ['a', 'b', 'c']

[...numbers, ...letters]
// [1, 2, 3, 'a', 'b', 'c']
```

----

##### Array insertion

```js
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];
console.log(lyrics)
// ["head", "shoulders", "knees", "and", "toes"]
```

----

##### Array clone

```js
var arr = [1,2,3];
var arr2 = [...arr]; // like arr.slice()
arr2.push(4);

```

`arr2` becomes [1,2,3,4], `arr` stays unaffected

----

#### Spread in function calls

```js
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction(...args);
```

```js
function myFunction(v, w, x, y, z) { }
var args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);
```

----

#### Only valid for iterables

> The spread operator has no effect on objects

```js
var obj = { "key1": "value1" };
var args = [...obj];
console.log(args, args.length) //[] 0
```

----

#### Spread operator as rest parameter

> The `rest parameter` syntax allows us to represent an indefinite number of arguments as an array.

```js
function(a, b, ...theArgs) {
  // ...
}
```

----

##### Getting all arguments of a func

```js
function func(...args) {
  console.log(args.length);
}

func();  // 0
func(5); // 1
func(5, 6, 7); // 3
```


----

#### What's the difference between `arguments` and `...args` ?

> `arguments` is an iterable, but not an `Array`

```js
function sortRestArgs(...theArgs) {
  var sortedArgs = theArgs.sort();
  return sortedArgs;
}
console.log(sortRestArgs(5,3,7,1)); // shows 1,3,5,7
```

```js
function sortArguments() {
  var sortedArgs = arguments.sort();
  return sortedArgs; // this will never happen
}
// throws a TypeError: arguments.sort is not a function
console.log(sortArguments(5,3,7,1));
```

----


### Selective rest parameter

> `...` is usefull to get "the rest of the arguments"


```js
function filter(type, ...items) {  
  return items.filter(item => typeof item === type);
}
filter('boolean', true, 0, false);        // => [true, false]  
filter('number', false, 4, 'Welcome', 7); // => [4, 7]  
```

```js
var values = [1, 3, '4', true, '8']
console.log(filter('string', ...values));        // ["4", "8"]
```


----

##### Rest paramater in array destructure

```js
var seasons = ['winter', 'spring', 'summer', 'autumn'];  
var coldSeason, otherSeasons;  
[coldSeason, ...otherSeasons] = seasons;
console.log(coldSeason);   // => 'winter'  
console.log(otherSeasons); // => ['spring', 'summer', 'autumn']  
```

---

## Quiz

Read the slides again, and we'll start a small quiz on operators.

----


### 01. What would be the output of each code?

```js
/* 1 */ true && (3 == '3')
```
```js
/* 2 */ false || (3 == '3')
```
```js
/* 3 */ (3 != '3') || (3 === 3)
```
```js
/* 4 */ "Cat" || "Dog"
```
```js
/* 5 */ "Cat" && "Dog"
```
```js
/* 6 */ "" || "Dog"
```
```js
/* 7 */ !!"" && !!"Cat"
```
```js
/* 8 */ (18 >= 18) ? "adult" : "minor"
```

----

### 02. What would be the output of this code?

```js
var names = ["David", "Tim", "Roger", "Monica"];
delete names[2];
console.log(names)
```

----

### 03. What would be the output of this code?

```js
var animals = ["Dog", "Cat", "Rabbit", "Mouse"];
delete animals;
console.log(animals)
```

----

### 04. What would be the output of this code?

```js
var arr1 = [0, 4, 2];
var arr2 = [3, 1, 5];
arr1.push(...arr2);

console.log(arr1)
```

----

### 05. What would be the output of this code?

```js
var arr1 = [8, 7, 6, 14, 17];
var arr2 = [3, 1, 5, 3];

[a, b, ...cd]=arr1
arr3 = [a,...arr2, b, ...cd]

console.log(arr3)
```

----

### 06. What would be the output of this code?

```js
var str = 'javascript'
console.log([...str].join('|'))
```

----

### 07. What would be the output of this code?

```js
var str = 'javascript'
var [a, b, , , c, ...d] = str

console.log(a, b, c, d)
```

----

### 08. What would be the output of this code?

```js
var {
  prop: a=5,
  prop2: {
    prop2: {
      nested: [ , , b]
    }
  },
  prop3: c=10
} = { prop: "Hello", prop2: { prop2: { nested: ["a", "b", "c"]}}};
console.log(a, b, c);
```


----

## Quiz responses

----


### 01. What would be the output of each code?


```js
true && (3 == '3') // true
false || (3 == '3') // true
(3 != '3') || (3 === 3)) // true
"Cat" || "Dog" // "Cat"
"Cat" && "Dog" // "Dog"
"" || "Dog" // "Dog"
!!"" && !!"Cat" // false
(18 >= 18) ? "adult" : "minor" // "adult"
```

----

### 02. What would be the output of this code?

```js
var names = ["David", "Tim", "Roger", "Monica"];
delete names[2];
console.log(names)
// ["David", "Tim", undefined, "Monica"]
```

----

### 03. What would be the output of this code?


```js
var animals = ["Dog", "Cat", "Rabbit", "Mouse"];
delete animals;
console.log(animals)
// ["Dog", "Cat", "Rabbit", "Mouse"]
```

----

### 04. What would be the output of this code?

```js
var arr1 = [0, 4, 2];
var arr2 = [3, 1, 5];
arr1.push(...arr2);

console.log(arr1)

// [0, 4, 2, 3, 1, 5]
```

----

### 05. What would be the output of this code?

```js
var arr1 = [8, 7, 6, 14, 17];
var arr2 = [3, 1, 5, 3];

[a, b, ...cd]=arr1
arr3 = [a,...arr2, b, ...cd]

console.log(arr3)

// [8, 3, 1, 5, 3, 7, 6, 14, 17]
```

----

### 06. What would be the output of this code?

```js
var str = 'javascript'
console.log([...str].join('|'))

// "j|a|v|a|s|c|r|i|p|t"
```

String is iterable, so you can spread them.

----

### 07. What would be the output of this code?

```js
var str = 'javascript'
var [a, b, , , c, ...d] = str
console.log(a, b, c, d)

// "j"
// "a"
// "s"
// ["c", "r", "i", "p", "t"]
```

----

### 08. What would be the output of this code?

```js
var {
  prop: a=5,
  prop2: {
    prop2: {
      nested: [ , , b]
    }
  },
  prop3: c=10
} = { prop: "Hello", prop2: { prop2: { nested: ["a", "b", "c"]}}};
console.log(a, b, c);

// "Hello"
// "c"
// 10
```
