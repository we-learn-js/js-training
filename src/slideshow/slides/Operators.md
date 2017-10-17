# Operators

> Operators are constructs which behave generally like functions, but which differ syntactically or semantically from usual functions.

---

## Types of operators

----

### Unary operators

x `OP`

```js
x++
x--
delete x
```

`OP` x

```js
++x
-x
+"3" // 3 (number)
!x
```

----

### Binary operators

x `OP` y

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
let status = (age >= 18) ? "adult" : "minor";
```

```js
let status = (age >= 18)
  ? "adult"
  : "minor";
```

---

## Conditional Operator

condition `?` expression `:` expression

> The conditional (ternary) operator is the only JavaScript operator that takes three operands. This operator is frequently used as a shortcut for the `if` statement.

[MDN // Conditional Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

----


As an expression:
```js
"The fee is " + (isMember ? "$2.00" : "$10.00")
```

To declare a variable:
```js
let fee = isMember ? "$2.00" : "$10.00"
```

To create a property:
```js
{
  fee: isMember ? "$2.00" : "$10.00"
}
```

----

### Multiple ternary evaluations

```js
let check1 = false,
    check2 = false,
    access;

access = check1 ? "Denied" : check2 ? "Denied" : "Granted";

console.log( access ); // "Access granted"
```

----

### Multiple operations

```js
let stop = false,
    age = 23;

age > 18
  ? ( alert("OK, you can go."),
      location.assign("continue.html") )
  : ( stop = true,
      alert("Sorry, you are much too young!") );
```

---

## Arithmetic operators

> **Arithmetic operators** take numerical values (either literals or variables) as their operands and return a single numerical value.

[MDN // Arithmetic Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)

----

### Plus `+`

`+`x

> The unary plus operator precedes its operand and evaluates to its operand but **attempts to convert it into a number**, if it isn't already.

```js
+3      // 3
+"3"    // 3
+"a"    // NaN
+true   // 1
+false  // 0
+null   // 0

```

Note: `NaN` is a property of the global object. [MDN // NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)

----

### Negation `-`

`-`x

> The unary negation operator precedes its operand and negates it.

```js
-"4" // -4
-"a" // NaN
x = 4;
y = -x; // y = -4, x = 4

```

----

### Addition `+`

x `+` y

> The addition operator produces the sum of numeric operands or string concatenation.

----

#### Addition

```js
// Number + Number
1 + 2 // 1 + 2 = 3

// Boolean + Number
true + 1 // 1 + 1 = 2

// Boolean + Boolean
true + false + true + true // 1 + 0 + 1 + 1 =  3
```

#### Concatenation

```js
// Number + String
    5 + "foo"
// "5" + "foo" = "5foo"

// String + Boolean
   "foo" + false
// "foo" + "false" = "foofalse"

// String + String
   "foo" + "bar"
// "foo" + "bar" = "foobar"
```

----

<!-- .slide: class="jsTraining-alertSlide" -->

### Caution !

> Addition operators are parsed from **left to right**

```js
// Number + String + Number
    5 + "foo" + 5
// ("5" + "foo") + 5 = "5foo5"


// Number + Number + String
   5 + 5 + "foo"
// (5 + 5) + "foo" = "10foo"


// Number + Number + Boolean + String
   5 + 5 + true + "foo"
// ((5 + 5) + true) + "foo" = "11foo"
```

----

### Subtraction `-`

x `-` y

> The subtraction operator subtracts the two operands, producing their difference.

```js
5 - 3     // 2
3 - 5     // -2
"foo" - 3 // NaN
```

----

### Division `/`

x `/` y

> The division operator produces the quotient of its operands where the left operand is the dividend and the right operand is the divisor.

```js
1 / 2       // 0.5

1.0 / 2.0   // 0.5

2.0 / 0     // Infinity
```

Note: The global Infinity property is a numeric value representing infinity. [MDN  | Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)

----

### Multiplication `*`

x `*` y

> The multiplication operator produces the product of the operands.

```js
2 * 2       // 4
"2" * 2     // 4

-2 * 2      // -4
"-2" * 2    // -4
"foo" * 2   // NaN

Infinity * 0  // NaN
Infinity * Infinity // Infinity

```

----

<!-- .slide: class="jsTraining-alertSlide" -->

### Caution !

> The multiplication operator has **higher precedence** than the addition operator.

```js
// Number + Number + Number
   3 + 4 + 5
// (3 + 4) + 5 = 12

// Number + Number * Number
   3 + 4 * 5
// 3 + (4 * 5) = 23

// Number + Number * Number
   3 + "4" * 5
// 3 + ("4" * 5) = 23
```

----

### Remainder `%`

x `%` y

> Returns the remainder left over when one operand is divided by a second operand.

```js
12 % 5 // 2

2 % 3 // 2

-1 % 2 // -1
```

----

### Exponentiation `**`

x `**` y

> The exponentiation operator returns the result of raising first operand to the power second operand.

```js
2 ** 3 // 2 * 2 * 2 = 8
3 ** 2 // 3 * 3 = 9
```

----

### Increment `++`

x`++` or `++`x

> The increment operator increments (adds one to) its operand and returns a value.

```js
// Postfix
let x = 3;
y = x++;
// x = 4, y = 3
```
```js
// Prefix
let x = 2;
y = ++x;
// x = 3, y = 3
```

----

### Decrement `--`

x`--` or `--`x

> The decrement operator decrements (subtracts one from) its operand and returns a value.

```js
// Postfix
let x = 3;
y = x--;
// x = 2, y = 3
```
```js
// Prefix
let x = 2;
y = --x;
// x = 1, y = 1
```


---

## Assignment operators

> The basic assignment operator is equal (=), which assigns the value of its right operand to its left operand.

[MDN // Assignment Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)

----

### Simple Assignment

x `=` y

> Simple assignment operator which assigns a value to a variable.

```js
let x = 5, y = 10, z = 25

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

[MDN // Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

----

#### Array Destructuring

> With arrays, destructuring is made by order

Without destructuring:
```js
const numbers = ["one", "two", "three"];
const one   = numbers[0];
const two   = numbers[1];
const three = numbers[2];

console.log(one, two, three) // "one", "two", "three"
```

With destructuring:
```js
const numbers = ["one", "two", "three"];
const [one, two, three] = foo;

console.log(one, two, three) // "one", "two", "three"
```

----

<!-- .slide: class="jsTraining-alertSlide" -->

##### Caution!

> Destructuring declares new variables, and follows the same rules as any variable declaration.

```js
let x = [1, 2, 3, 4, 5];
```

```js
let [y, z] = x;
// let y = x[0]
// let z = x[1]
```

```js
const [y, z] = x;
// const y = x[0]
// const z = x[1]
```



Note: as we are declaring new variables `y` and `z` and asigning a value,
we need to use `var`, otherwise variables will be declared on global scope.


----

##### Direct assignment

> A variable can be assigned its value via destructuring separate from the variable's declaration.

without destructuring:
```js
let x = 1;
let y = 2;
let z = 3;
```

with destructuring:
```js
let [x, y, z] = [1, 2, 3];
```


----

##### Default values

A variable can be assigned a default, in the case that the value pulled from the array is undefined.

```js
let arr = [1, undefined, 3, null, '' ]
```

without destructuring:
```js
let a = (chars[0] !== undefined) ? chars[0] : 'a';
let b = (chars[1] !== undefined) ? chars[1] : 'b';
let c = (chars[2] !== undefined) ? chars[2] : 'c';
let d = (chars[3] !== undefined) ? chars[3] : 'd';
let e = (chars[4] !== undefined) ? chars[4] : 'e';

console.log(a, b, c, d, e) // 1, "b", 3, null, ""
```

with destructuring:
```js
let [ a='a', b='b', c='c', d='d', e='e' ] = arr

console.log(a, b, c, d, e) // 1, "b", 3, null, ""
```

Note: Notice that default values only works with undefined values, not with `null` or falsey values.

----

#### Swapping variables

Two variables values can be swapped in one destructuring expression.

```js
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a, b); // 3, 1
```

----

#### Skipping values

> You can ignore return values that you're not interested in

```js
let numbers = [1, 2, 3, 4, 5, 6];
```

without destructuring:
```js
let a = numbers[0]
let b = numbers[2]
let c = numbers[5]
console.log(a, b, c); // 1, 3, 6
```

with destructuring:
```js
let [a, , b, , , c] = numbers;
console.log(a, b, c); // 1, 3, 6
```


----

#### Nested array destructuring


```js
let arrays = [
  [1,2,3],
  [4,5,6]
]

let [[a, ,b], [c,d]] = arrays

console.log(a,b,c,d) // 1, 3, 4, 5
```


----

### Object Destructuring

> With objects, destructuring is made by property name, not by order

```js
let o = {a: 42, b: true, c: 36, d: 'Evan'};
```

with destructuring:
```js
let {a, d} = o;
console.log(a, d); // 42, 'Evan'
```

without destructuring:
```js
let a = o.a
let d = o.d

console.log(a, d); // 42, 'Evan'
```

----

#### Default values

with destructuring:
```js
let { a=10, b=5 } = {a: 3};

console.log(a, b); // 3, 5
```

without destructuring:
```js
let _ref = {a: 3}
let a = (_ref.a !== undefined) ? _ref.a : 10
let b = (_ref.b !== undefined) ? _ref.b : 5

console.log(a, b); // 3, 5
```

----

#### Renaming properties


```js
let o = {a: 42, b: true, c: 36, d: 'Evan'};
```

with destructuring:
```js
let { a: first, d: second } = o;

console.log(first, second); // 42, 'Evan'
```

without destructuring:
```js
let first = o.a
let second = o.d

console.log(first, second); // 42, 'Evan'
```

----

#### Default values or renamed properties

```js
let o = {a: 42, b: true, c: 36, d: 'Evan'};
```

with destructuring:
```js
let { a: first, c=10, d: second, e: third=6 } = o;

console.log(first, second, third); // 42, 'Evan', 6
```


without destructuring:
```js
let first   = o.a
let c       = o.c !== undefined ? o.c : 10
let second  = o.d
let third   = o.e !== undefined ? o.e : 6


console.log(first, second, third); // 42, 'Evan', 6
```

----

without destructuring:
```js
// `options` is an object
let size = options.size === undefined ? 'big' : options.size;
let cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
let radius = options.radius === undefined ? 25 : options.radius;
console.log(size, cords, radius);

```

with destructuring:
```js
// `options`is an object
let {size = 'big', cords = { x: 0, y: 0 }, radius = 25} = options
```

----

#### Destructuring function parameters

```js
drawChart({radius: 45})
```

with destructuring:
```js
function drawChart(
  {size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}
) {
  console.log(size, cords, radius);
}
```

without destructuring:
```js
function drawChart(options) {
  options = options === undefined ? {} : options;
  let size = options.size === undefined ? 'big' : options.size;
  let cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
  let radius = options.radius === undefined ? 25 : options.radius;

  console.log(size, cords, radius);
}
```

----

### Nested object and array destructuring

```js
let user = [
  {name: 'Evan'},
  {name: 'Joseph'}
]

let [{name: name1}, {name: name2 }] = user

console.log(name1) // "Evan"
console.log(name2) // "Joseph"
```

----

### Complex destructuring

```js
const metadata = {
    title: "Scratchpad",
    translations: [
       {
        url: "/de/docs/Tools/Scratchpad",
        title: "JavaScript-Umgebung"
       }
    ],
    url: "/en-US/docs/Tools/Scratchpad"
};

let {
  title: englishTitle,
  translations: [{ title: localeTitle }]
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
```


---

## Comparison operators

x `OP` y

> JavaScript has both strict and type–converting comparisons.

[MDN // Comparison Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)


----

### Abstract comparison

x `==` y

x `!=` y

> Converts the operands to the same type before making the comparison.

----

#### Abstract equality

x `==` y

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

#### Equality of objects

> Two distinct objects are never equal for either strict or abstract comparisons.

> An expression comparing objects is only true if the operands reference the same object.

```js
const object1 = {"value":"key"};
const object2 = {"value":"key"};
object1 == object2 // false

const object3 = object1
object1 == object3 // true
```

Note: The two objects are difference objects, in different allocation.
**They are not the same object**.

----

#### Abstract inequality

x `!=` y

```js
1 !=   2     // true
1 !=  "1"    // false
1 !=  '1'    // false
1 !=  true   // false
0 !=  false  // false
```

----

#### Type conversion rules

----

##### String `==` Number

>  The string is converted to a number value.

```js
  "1"  ==  1    // true
// 1  ==  1     // true
```

----

##### Boolean `==` Number

> The Boolean operand is converted to 1 if it is true and 0 if it is false.

```js
0 == false  // true
// 0 == 1   // true

1 == true   // true
// 1 == 1   // true

1 == false  // false
// 1 == 0   // false
```

----

##### Object `==` Number || Object `==` String

> JavaScript attempts to return the default value for the object.

```js
let a = new String('foo');
let b = new String('foo');

a == b            // false, as a and b are both objects and reference different objects
// a = b          // false

a == 'foo'        // true, as the Object (a) is converted to String 'foo'
// 'foo' = 'foo'  // true
```

----

### Working with objects

> Each of these operators will call the `valueOf()` function on each operand before a comparison is made.
>
> Then, the primitive values are compared

[MDN // Object.protrotype.valueOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)

----

```js
let a = new Number(5);
let b = new Number(5);

a == b  // false as a and b are type Object and reference different objects
a == 5 // true as the Object (a) is converted to primitive 5 before comparison

a > b // false
a < b // false
```

----

### Strict comparison

x `===` y

x `!==` y

> A strict comparison is only true if the operands are of the **same type** and the contents match.

----

#### Strict equality

```js
1    ===  1        // true  (true  in abstract comparison)
"1"  ===  1        // false (true in abstract comparison)
1    === '1'       // false (true in abstract comparison)
0    === false     // false (true in abstract comparison)
0    === null      // false (false in abstract comparison)
0    === undefined // false (false in abstract comparison)
null === undefined // false (true in abstract comparison)
```

----

#### Strict inequality

x `!=` y

```js
1 !==   2     // true
1 !==  "1"    // true (false in abstract comparison)
1 !==  '1'    // true (false in abstract comparison)
1 !==  true   // true (false in abstract comparison)
0 !==  false  // true (false in abstract comparison)
```

----

### Relational operators

x `>` y

x `>=` y

x `<` y

x `<=` y

----

```js
4 > 3   // true
4 >= 3  // true
3 >= 3  // true

3 < 4   // true
3 <= 4  // true
3 <= 3  // true
```

---

## Logical Operators

expression `&&` expression

expression `||` expression

`!`expression


----

> Logical operators are typically used with `Boolean` (logical) values
>
> However, the `&&` and `||` operators actually return the value of one of the specified operands,
so if these operators are used with non-Boolean values, they may return a non-Boolean value.


[MDN // Logical Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)


----

### Logical `AND`

expression `&&` expression

> The return is not `true` or `false`, it's the last evaluated expression

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

expression `||` expression

> The return is not `true` or `false`, it's the last evaluated expression

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

#### Expression conversion

> With non-Boolean values, "falsey" expressions are evaluated to false:

> `undefined`, `null`, `NaN`, `0`, `""`

```js
let a;
a    || "truthy" // "truthy"
null || "truthy" // "truthy"
NaN  || "truthy" // "truthy"
0    || "truthy" // "truthy"
""   || "truthy" // "truthy"
```

Note: The return is not `true` or `false`, it's the last evaluated expression.

----

### Logical `NOT`

`!`expression

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

### Using it for logic

This code:
```js
let flag = doSomething();
if (!flag) {
  doSomethingElse();
}
```

is the same as:

```js
doSomething() || doSomethingElse()

```

----

### Using it for logic

This code:
```js
let flag = doSomething();
if (flag) {
  doSomethingElse();
}
```

is the same as:

```js
doSomething() && doSomethingElse()
```

---

## Other unary operators

`OP` x

> An unary operation is an operation with only one operand.



----

### delete

`delete` x

> The `delete` operator deletes an object, an object's property, or an element at a specified index in an array.



```js
obj = { name: 'Joseph', surname: 'Smith' }
delete obj.name;  // obj === { surname: 'Smith' }
delete obj;       // obj is not defined

arr = [1,2,3,4]
delete arr[1];    // arr === [1,undefined, 3,4]
delete arr;       // arr is not defined
```

----

<!-- .slide: class="jsTraining-alertSlide" -->

### Caution !

Objects (and arrays) can be deleted only if they are declared implicitly

```js
let obj = { name: 'Joseph', surname: 'Smith' }
delete obj; // obj is { name: 'Joseph', surname: 'Smith' }

let arr = [1,2,3,4]
delete arr; // arr is [1,2,3,4]
```

----

### typeof

`typeof` x

> The `typeof` operator returns a string indicating the type of the unevaluated operand.

```js
typeof x    // "undefined"
typeof 5    // "number"
typeof "5"  // "string"
typeof {}  // "object"
typeof null  // "object"
```

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

`...`x

> The spread syntax allows an expression to be expanded in places where comma separated variables are expected.

[MDN // Spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

----

`numbers` passed as a single argument to `console.log`:
```js
let numbers = [1, 2, 3]
console.log(numbers)
// [1, 2, 3]
```

`numbers` spread, as separated arguments:
```js
let numbers = [1, 2, 3]
console.log(...numbers)
// 1, 2, 3
```

which is the same as:

```js
// console.log(...numbers)
console.log(numbers[0], numbers[1], numbers[2])

```

----

### Spreading arrays

----

#### Array concat

```js
let numbers = [1, 2, 3]
let letters = ['a', 'b', 'c']

[...numbers, ...letters]
// [1, 2, 3, 'a', 'b', 'c']
```

----

#### Array insertion

```js
let parts = ['shoulders', 'knees'];
let lyrics = ['head', ...parts, 'and', 'toes'];

console.log(lyrics)
// ["head", "shoulders", "knees", "and", "toes"]
```

----

#### Array clone

```js
let arr = [1,2,3];
let arr2 = [...arr]; // [arr[0],arr[1],arr[2]]

arr2.push(4); // [1, 2, 3, 4]

```

`arr2` becomes [1,2,3,4], `arr` stays the same

----

### Spreading objects

```js
let user = { name: 'Evan', surname: 'Graham' }
let userWithJob = {...user, job: 'Barber'}
console.log(user)         // {name: "Evan", surname: "Graham"}
console.log(userWithJob)  // {name: "Evan", surname: "Graham", job: "Barber"}

userWithJob.name = 'James'
console.log(user)         // {name: "Evan", surname: "Graham"}
console.log(userWithJob)  // {name: "James", surname: "Graham", job: "Barber"}
```

----

#### Spread with overriding


```js
let user = { name: 'Evan', surname: 'Graham' }
let jamesUser = {...user, name: 'James'}
console.log(jamesUser)  // {name: "James", surname: "Graham"}
```

----

<!-- .slide: class="jsTraining-alertSlide" -->

### Caution !

#### Can't spread an object into an array

```js
let obj = { "key1": "value1" };
let args = [...obj];
// TypeError: obj is not iterable
```

----

### Spread arguments

```js
function myFunction(x, y, z) { }
let args = [0, 1, 2];
myFunction(...args);
// myFunction(args[0], args[1], args[2]);
// myFunction(1, 2, 3);
```

```js
function myFunction(v, w, x, y, z) { }
let args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);
// myFunction(-1, args[0], args[1], [3][0]);
// myFunction(-1, 0, 1, 3);
```

----

### Spread operator as rest parameter

> The `rest parameter` syntax allows us to represent an indefinite number of arguments as an array.

```js
function(a, b, ...theArgs) {
  // ...
}
```

----

#### Getting all arguments of a func

```js
function func(...args) {
  console.log(args.length);
}

func();  // 0
func(5); // 1
func(5, 6, 7); // 3
```


----

### `arguments` VS `...args` ?

> `arguments` is an iterable (array-like), but not an `Array`

Array of arguments
```js
function sortRestArgs(...theArgs) {
  let sortedArgs = theArgs.sort();
  return sortedArgs;
}
console.log(sortRestArgs(5,3,7,1)); // shows 1,3,5,7
```

arguments built-in variable
```js
function sortArguments() {
  let sortedArgs = arguments.sort();
  return sortedArgs; // this will never happen
}
// throws a TypeError: arguments.sort is not a function
console.log(sortArguments(5,3,7,1));
```

----


### Selective rest parameter

> `...` is usefull to get "the rest of the arguments"


```js
function filterByType(type, ...items) {  
  return items.filterByType(item => typeof item === type);
}
filterByType('boolean', true, 0, false);        // => [true, false]  
filterByType('number', false, 4, 'Welcome', 7); // => [4, 7]  
```

Spreading arguments
```js
let values = [1, 3, '4', true, '8']
console.log(filterByType('string', ...values)); // ["4", "8"]
```


----

#### Rest paramater in array destructure

```js
let seasons = ['winter', 'spring', 'summer', 'autumn'];  
let [coldSeason, ...otherSeasons] = seasons;

console.log(coldSeason);   // => "winter"  
console.log(otherSeasons); // => ["spring", "summer", "autumn"]  
```

---

<!-- .slide: class="jsTraining-questionSlide" -->

## Quiz

Read the slides again, and we'll start a small quiz on operators.

----

<!-- .slide: class="jsTraining-questionSlide" -->
### 01. What would be the output of each code?

```js
/* 1 */ true && (3 == '3')
/* 2 */ false || (3 == '3')
/* 3 */ (3 != '3') || (3 === 3)
/* 4 */ "Cat" || "Dog"
/* 5 */ "Cat" && "Dog"
/* 6 */ "" || "Dog"
/* 7 */ !!"" && !!"Cat"
/* 8 */ (18 >= 18) ? "adult" : "minor"
```

----

<!-- .slide: class="jsTraining-responseSlide" -->
### 01. Solution
```js
/* 1 */ true && (3 == '3')        // true
/* 2 */ false || (3 == '3')       // true
/* 3 */ (3 != '3') || (3 === 3))  // true
/* 4 */ "Cat" || "Dog"            // "Cat"
/* 5 */ "Cat" && "Dog"            // "Dog"
/* 6 */ "" || "Dog"               // "Dog"
/* 7 */ !!"" && !!"Cat"           // false
/* 8 */ (18 >= 18) ? "adult" : "minor" // "adult"
```

----

<!-- .slide: class="jsTraining-questionSlide" -->
### 02. What would be the output of this code?

```js
let names = ["Evan", "Tim", "Roger", "Monica"];
delete names[2];
console.log(names)
```

----

<!-- .slide: class="jsTraining-responseSlide" -->
### 02. Solution

```js
let names = ["Evan", "Tim", "Roger", "Monica"];
delete names[2];
console.log(names)
// ["Evan", "Tim", undefined, "Monica"]
```

----

<!-- .slide: class="jsTraining-questionSlide" -->
### 03. What would be the output of this code?

```js
let animals = ["Dog", "Cat", "Rabbit", "Mouse"];
delete animals;
console.log(animals)
```

----

<!-- .slide: class="jsTraining-responseSlide" -->
### 03. Solution


```js
let animals = ["Dog", "Cat", "Rabbit", "Mouse"];
delete animals;
console.log(animals)
// ["Dog", "Cat", "Rabbit", "Mouse"]
```

----

<!-- .slide: class="jsTraining-questionSlide" -->
### 04. What would be the output of this code?

```js
let arr1 = [0, 4, 2];
let arr2 = [3, 1, 5];
arr1.push(...arr2);

console.log(arr1)
```

----

<!-- .slide: class="jsTraining-responseSlide" -->
### 04. Solution

```js
let arr1 = [0, 4, 2];
let arr2 = [3, 1, 5];
arr1.push(...arr2);

console.log(arr1)

// [0, 4, 2, 3, 1, 5]
```

----

<!-- .slide: class="jsTraining-questionSlide" -->
### 05. What would be the output of this code?

```js
let arr1 = [8, 7, 6, 14, 17];
let arr2 = [3, 1, 5, 3];

[a, b, ...cd]=arr1
arr3 = [a,...arr2, b, ...cd]

console.log(arr3)
```

----

<!-- .slide: class="jsTraining-responseSlide" -->
### 05. Solution

```js
let arr1 = [8, 7, 6, 14, 17];
let arr2 = [3, 1, 5, 3];

[a, b, ...cd]=arr1
arr3 = [a,...arr2, b, ...cd]

console.log(arr3)

// [8, 3, 1, 5, 3, 7, 6, 14, 17]
```

----

<!-- .slide: class="jsTraining-questionSlide" -->
### 06. What would be the output of this code?

```js
let str = 'javascript'
console.log([...str].join('|'))
```

----

<!-- .slide: class="jsTraining-responseSlide" -->
### 06. Solution

```js
let str = 'javascript'
console.log([...str].join('|'))

// "j|a|v|a|s|c|r|i|p|t"
```

String is iterable, so you can spread them.


----

<!-- .slide: class="jsTraining-questionSlide" -->
### 07. What would be the output of this code?

```js
let str = 'javascript'
let [a, b, , , c, ...d] = str

console.log(a, b, c, d)
```

----

<!-- .slide: class="jsTraining-responseSlide" -->
### 07. Solution

```js
let str = 'javascript'
let [a, b, , , c, ...d] = str
console.log(a, b, c, d)

// "j"
// "a"
// "s"
// ["c", "r", "i", "p", "t"]
```

----

<!-- .slide: class="jsTraining-questionSlide" -->
### 08. What would be the output of this code?

```js
let {
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

<!-- .slide: class="jsTraining-responseSlide" -->
### 08. Solution

```js
let {
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
