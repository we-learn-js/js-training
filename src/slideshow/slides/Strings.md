# Strings

----

## Primitive vs Objects

<!--slide-->

### Types

> `String` instances hold a primitive string accessible thanks to the `String.prototype.valueOf()` function.

```js
typeof '5' // "string"
typeof new String('5') // "object"
typeof new String('5').valueOf() // "string"

```

<!--slide-->

### Comparison

> When an object, is compared to a string, `String.prototype.valueOf()` is called internally to make the comparison.

```js
var a = new String('foo');
var b = new String('foo');

a == b  // false as a and b are type Object and reference different objects
a == 'foo' // true as the Object (a) is converted to String 'foo' before comparison
```

----

## Template strings (ES6)

> Template literals are string literals allowing embedded expressions.

> You can use multi-line strings and string interpolation features with them.

> Template literals are enclosed by the back-tick (\` \`) (grave accent)

> ```js
>`string text`
>
>`string text line 1
>string text line 2`
>
>`string text ${expression} string text`
```

[MDN - Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)


<!--slide-->

> Template literals are a different syntax, not a different primitive of object.

```js
`\`` === "`" // true
```

<!--slide-->

### Multi-line strings

> Any new line characters inserted in the source are part of the template literal.

```js
var text1 = "string text line 1\n"+
"string text line 2";

var text2 = `string text line 1
string text line 2`;

text1 === text2 // true

```

<!--slide-->

### Expression interpolation

> In order to embed expressions within normal strings, you must enclosed them inside a `${}`

```js
var a = 5;
var b = 10;
var text1 = "Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".";
var text2 = `Fifteen is ${a + b} and\nnot ${2 * a + b}.`;

text1 === text2 // true
```

----

## Must Read

[exploringjs.com - Template literals](http://exploringjs.com/es6/ch_template-literals.html)
