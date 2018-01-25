# React

<!--section-->

## What is React ?

React is **not a framework**.

It's an UI library. It's the "V" in MVC.

<!--slide-->

## Why React ?

<!--slide-->

### Abstraction of DOM manipulation

DOM manipulation can get really slow in web apps.

Every time you modify the DOM, the browser does the job (parse html, layout, etc)

If you modify the dom in several places in your source code, the flow may be repeated many times and unnecessary operations may be executed.

![render-flow](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg) [source](https://developers.google.com/web/fundamentals/performance/rendering/)

<!--slide-->

#### DOM performance

Have a look at this code: https://codesandbox.io/s/oxqlz8089y

Inspect DOM changes with DevTools. All elements are recreated every time.

We could modify our code to append/remove only the corresponding element each time.

But what would happen when we add filtering, sorting, etc. A specific optimal DOM manipulation might be implemented each time.

What if we had something to compare effectively the "before and after" of the DOM to only modify what's needed ?

<!--slide-->

### The Virtual DOM

> The Virtual DOM is an abtraction of the DOM in form of plain objects.

React keeps a virtual tree representing the DOM (given by declaration of components). When there's a change, it creates a new Virtual DOM with the changes.

![virtual-dom](https://cdn-images-1.medium.com/max/1600/1*VKN_mqVAzDfqcTU1PM47wg.png) [source](https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf)

<!--slide-->

Each time the VirtualDOM changes, React compares those changes with the current virtual dom and applies those changes in minimal number of steps to the real dom.

![diffing](https://cdn-images-1.medium.com/max/1600/1*cV-klTo3DKl0Uo2Znk3V6g.png) [source](https://www.infoq.com/presentations/react-reconciliation)

<!--slide-->

#### How to declare Virtual DOM element

```
import React from 'react'

React.createElement(
  type,
  [props],
  [...children]
)
```

<!--slide-->

React code
```js
import React from 'react'

React.createElement(
  'div',
  { align: 'center' },
  'Welcome to JS Training'
)
```

DOM result
```html
<div align='center'>
    Welcome to JS Training - React
</div>
```

https://codesandbox.io/s/04nw9zpxxl

<!--slide-->

With children elements

```js
import React from 'react'
const reactElement = React.createElement(
  'div',
  { align: 'center' },
  'Welcome to JS Training - React',
  React.createElement('br', null),
  React.createElement('button', null, 'Login')
)
```

```html
<div align='center'>Welcome to JS Training - React
  <br />
  <button>Login</button>
</div>
```

https://codesandbox.io/s/9yrxv8y28o

<!--slide-->

### JSX


> JSX is a syntax extension to JavaScript. It's helpful as a visual aid when working with UI inside the JavaScript code.

JavaScript
```js
import React from 'react'
const reactElement = React.createElement(
  'div',
  { align: 'center' },
  'Welcome to JS Training'
)
```

JSX
```js
import React from 'react'

const reactElement = <div align='center'>Welcome to JS Training - React</div>
```

<!--slide-->

JavaScript (using children)
```js
import React from 'react'

const reactElement = React.createElement(
  'div',
  { align: 'center' },
  'Welcome to JS Training - React',
  React.createElement('br', null),
  React.createElement('button', null, 'Login')
)
```

JSX (using children)
```js
const reactElement = (
  <div align='center'>
    Welcome to JS Training - React <br />
    <button>Login</button>
  </div>
)
```

https://codesandbox.io/s/n57xo06j44

<!--slide-->

> With JSX, we can declare the VirtualDOM with a syntax very similar to HTML

> Although, JSX is still JavaScript, **not a template language**.

> The "markup" es compiled to a Raw React declaration of elements as seen previously.

<!--slide-->

#### Embedding Expressions in JSX

> As JSX is Javascript, any expression can be embedded using `{}`

```js
const userName = 'Evan Graham'
const reactElement = (
  <div align='center'>
    Welcome to JS Training, {userName.toUpperCase()} !
    <br />
    <button>Login</button>
  </div>
)
```

```html
<div align='center'>
  Welcome to JS Training, EVAN GRAHAM !
  <br />
  <button>Login</button>
</div>
```

https://codesandbox.io/s/3vkr326njq

<!--slide-->

### Built-in elements

> React provides built-in shortcuts for creating commonly used HTML element nodes like `<button>`, `<a>`, `<div>`, [etc](https://www.reactenlightenment.com/react-nodes/4.6.html).
>
> When you use a `<div>` or any other know element in JSX, you're actually instantiating a built-in element.

<!--slide-->

### Props and Naming

> Built-in elements will accept as props any of their HTML-related attributes.
>
> Although, React provides a JavaScript-centric API to the DOM. Since React components often take both custom and DOM-related props, React uses the `camelCase` convention just like the DOM APIs:

<!--slide-->

HTML
```html
<div tabindex="-1"/>
<div class="Button" />
<input
  readonly
  style="font-size: 12px;"
/>
```

JSX
```html
<div tabIndex="-1" />      // Just like node.tabIndex DOM API
<div className="Button" /> // Just like node.className DOM API
<input
  readOnly={true}
  style={{fontSize: '12px'}}
/>  // Just like node.readOnly DOM API
```

<!--slide-->

### Updating the Rendered Element

> On updates, React only changes what's necessary.

```js
function update() {
  const userName = 'Evan Graham'
  const reactElement = (
    <div align='center'>
      Welcome to JS Training,
      <strong> {userName.toUpperCase()}</strong><br />
      Time {new Date().toLocaleTimeString()}.
    </div>
  )
  render(reactElement, document.getElementById('root'))
}

setInterval(update, 1000)
```

Inspect DOM changes with DevTools
https://codesandbox.io/s/3rlm92jnw5


<!--section-->

## React Components

> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.


<!--slide-->

### Functional Components

> Functional components are functions that only receive props. They are stateless.

<!--slide-->

./App.js
```js
export default props => (
  <div align='center'>
    Welcome to JS Training,
    <strong> {props.userName.toUpperCase()}</strong>
    <br />
    Time {props.time}.
  </div>
)
```

./index.js
```js
import App from './App'
<App
  userName="Evan Graham"
  time={new Date().toLocaleTimeString()}
/>
```


https://codesandbox.io/s/9j7joyo79r

<!--slide-->

### Class Components

> Classes have some additional features that will be discussed later.

> In classes, `props` are a member of `this` and React calls then `render` method on every reflow.


<!--slide-->

```js
class AppComponent extends React.Component {
  render() {
    const { userName, time } = this.props
    return (
      <div align='center'>
        Welcome to JS Training,
        <strong>{userName.toUpperCase()}</strong>
        <br />
        Time {time}.
      </div>
    )
  }
}

export default AppComponent
```

https://codesandbox.io/s/7wnkx5vx7j

<!--slide-->

### State

> Class components can manage their state.

> Each state change will trigger a "re-render" from React.

> State can be read in `this.state` property.

> State must be set with `this.setState` method.


<!--slide-->


```js
class AppComponent extends React.Component {
  state = { time: null }

  constructor() {
    super()
    setInterval(() => {
      this.setState({
        time: new Date().toLocaleTimeString()
      })
    }, 1000)
  }

  render() {
    const { userName } = this.props
    const { time } = this.state
    return (
      <div align="center">
        Welcome to JS Training,
        <strong> {userName.toUpperCase()}</strong>
        <br />
        Time {time}.
      </div>
    )
  }
}
```

https://codesandbox.io/s/q3vz183wm4?&module=%2FApp.js

<!--slide-->

### Composing Components

> Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail.

> A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.


<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

Let's split our code into components.



```js
<div align='center'>
  <Welcome userName={userName} />
  <br />
  Time <Clock />.
</div>
```

https://codesandbox.io/s/30jkqqzmkp?module=%2Fcomponents%2FApp.js

Note: Clock is now a component that manages its own stsate and is easily resusable.


<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

### Caution !

The following exercises will make you implement in React - step by step - the Todo app seen in https://codesandbox.io/s/oxqlz8089y

Please keep in mind that the css classes expected are the same if you want your results to be style by exercises' stylesheet.

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### First react component

Create a `<Title>` component and use it in `<TodoApp>`.

`<Title>` accepts "text" prop, so the implementation should fit this snippets:

```js
<Title text="todos"></Title>
```
output
```html
<h1>todos</h1>
```

https://codesandbox.io/s/234j97x1kj

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible solution

```js
// ./components/Title.js

import React from 'react'
export default ({ text }) => <h1>{text}</h1>
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Using special prop `children`

Refactor `<Title>` so it displays the content given by the client.

```js
<Title>todos</Title>
```
output
```html
<h1>todos</h1>
```

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible solution

```js
// ./components/Title.js
import React from 'react'
export default ({ children }) => <h1>{children}</h1>
```


<!--slide-->

### Handling Events

> Handling events with React elements is very similar to handling events on DOM elements.

HTML
```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

JSX

```js
<button onClick={activateLasers}>
  Activate Lasers
</button>
```


<!--slide-->

As JSX handles javascript expression, any expression can be assigned as a prop.

```js
<button onClick={() => activateLasers()}>
  Activate Lasers
</button>
```


<!--slide-->

### Communication between components

<!--slide-->

#### Child to parent

> Events are used to communicate events to a component's parent.

In the following code, the `<button>` built-in component uses `onClick` callback provided to communicate a click to his parent.

```js
<button onClick={() => console.log(`button clicked !!!`)}>
  Activate Lasers
</button>
```

<!--slide-->

Consider:

```js
const LabeledInput = (props) => (
  <label className='custom-input'>
   {props.label}
    <input type='text'/>
  </label>
)

const CustomForm = (props) => (
  <form>
    <LabeledInput label="name" />
    <LabeledInput label="surname" />
  </form>
)
```

What if `CustomForm` what to know whenever an input is edited to make live validation?


<!--slide-->

Make accept a callback prop that will notify changes

```js
const LabeledInput = (props) => (
  <label className='custom-input'>
   {props.label}
    <input type='text' onChange={props.onChange} />
  </label>
)

const CustomForm = (props) => (
  <form>
    <LabeledInput label="name" onChange={() => console.log('Name changed!')} />
    <LabeledInput label="surname" onChange={() => console.log('Surname changed!')} />
  </form>
)
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->


#### TodoForm

> Create a new `<TodoForm>` that displays an input form and accepts theses props:
* placeholder: to be displayed in the input
* onNew: a callback executed everytime the users submits a new todo description

```js
<TodoForm
  placeholder="What needs to be done?"
  onNew={todo => console.log('New todo:', todo)}
/>
```

https://codesandbox.io/s/21r3l6qyrj

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

### Possible Solution

```js
const onSubmit = props => e => {
  e.preventDefault()
  const input = e.target[0]
  props.onNew(input.value)
  input.value = ''
}

export default props => (
  <form className="todo-form" onSubmit={onSubmit(props)}>
    <input
      className="new-todo"
      name="todo"
      placeholder={props.placeholder}
    />
  </form>
)
```

https://codesandbox.io/s/2vzpj744mr