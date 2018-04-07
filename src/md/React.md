# React

<!--section-->

## What is React ?

> React is **not a framework**.

> It's an UI library.

> It's the "V" in MVC.

<!--slide-->

## Why React ?

<!--slide-->

### Abstraction of DOM manipulation

DOM manipulation can get really slow in web apps.

Every time you modify the DOM, the browser does the job (parses html, sets layout, etc)

If you modify the dom in several places in your source code, the flow may be repeated many times and unnecessary operations may be executed.

![render-flow](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg) [source](https://developers.google.com/web/fundamentals/performance/rendering/)

<!--slide-->

#### DOM performance

Have a look at this code: https://codesandbox.io/s/oxqlz8089y

Inspect DOM changes with DevTools. All elements are recreated every time.

We could modify our code to append/remove only the corresponding DOM element each time.

But what would happen when we add filtering, sorting, etc? A specific optimal DOM manipulation might be implemented each time.

**What if we had something to compare effectively the "before and after" of the DOM to only modify what's needed ?**

<!--slide-->

### The Virtual DOM

> The Virtual DOM is an abtraction of the DOM in form of plain objects.

React keeps a virtual tree representing the DOM (given by declaration of components). When there's a change, it creates a new Virtual DOM with the changes.

![virtual-dom](https://cdn-images-1.medium.com/max/1600/1*VKN_mqVAzDfqcTU1PM47wg.png) [source](https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf)

<!--slide-->

Each time the VirtualDOM changes, React compares those changes with the current virtual dom and applies those changes **in minimal number of steps** to the real dom.

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

React.createElement('div', { align: 'center' }, 'Welcome to JS Training')
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
  React.createElement('button', null, 'Start !')
)
```

```html
<div align='center'>
  Welcome to JS Training - React<br />
  <button>Start !</button>
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

const reactElement = <div align="center">Welcome to JS Training - React</div>
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
  React.createElement('button', null, 'Start !')
)
```

JSX (using children)

```js
const reactElement = (
  <div align="center">
    Welcome to JS Training - React <br />
    <button>Start !</button>
  </div>
)
```

https://codesandbox.io/s/n57xo06j44

<!--slide-->

> With JSX, we can declare the VirtualDOM with a syntax very similar to HTML.

> Although, JSX is still JavaScript, **not a template language**.

> The "markup" is compiled to a Raw React declaration of elements as seen previously.

<!--slide-->

#### Embedding Expressions in JSX

> As JSX is Javascript, any expression can be embedded using `{}`

```js
const userName = 'Evan Graham'
const reactElement = (
  <div align="center">
    Welcome to JS Training, {userName.toUpperCase()} !
    <br />
    <button>Start !</button>
  </div>
)
```

```html
<div align='center'>
  Welcome to JS Training, EVAN GRAHAM !
  <br />
  <button></button>
</div>
```

https://codesandbox.io/s/3vkr326njq

<!--slide-->

##### Conditional Rendering

> You can use lazy operators or ternaries to conditionnaly render certain parts of your component.

```js
const reactElement = (
  <div align="center">
    Welcome to JS Training{userName && `, ${userName.toUpperCase()}`}
    <br />
    {userName ? <button>Start !</button> : <button>Login</button>}
  </div>
)
```

<!--slide-->

##### Lists rendering

> Array of elements are accepted as children, so you can easily map them from any data array.

JSX

```js
const items = ['Topic 1', 'Topic 2', 'Topic 3']
const reactElement = <ul>{items.map(item => <li>{item}</li>)}</ul>
```

HTML

```html
<ul align='center'>
  <li>Topic 1</li>
  <li>Topic 2</li>
  <li>Topic 3</li>
</ul>
```

<!--slide-->

### Built-in elements

> React provides built-in shortcuts for creating commonly used HTML element nodes like `<button>`, `<a>`, `<div>`, [etc](https://www.reactenlightenment.com/react-nodes/4.6.html).
>
> When you use a `<div>` or any other know element in JSX, you're actually instantiating a built-in element.

<!--slide-->

### Props and Naming

> Built-in elements will accept as props any of their HTML-related attributes.

> Although, React provides a **JavaScript-centric API** to the DOM.

> Since React components often take both custom and DOM-related props, React uses the `camelCase` convention just like the DOM APIs:

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

JSX (DOM properties)

```html
<div tabIndex="-1" />      // Just like node.tabIndex DOM API
<div className="Button" /> // Just like node.className DOM API
<input
  readOnly={true}
  style={{fontSize: '12px'}}
/>  // Just like node.readOnly DOM API
```

<!--slide-->

### Updating the Rendered Elements

> On updates, React only changes what's necessary.

```js
function update() {
  const userName = 'Evan Graham'
  const reactElement = (
    <div align="center">
      Welcome to JS Training,
      <strong> {userName.toUpperCase()}</strong>
      <br />
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

> Functional components are functions that only receive props.

> As pure functions, they are **stateless**.

<!--slide-->

./App.js

```js
export default props => (
  <div align="center">
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

> In classes, `props` are a member of `this` and React calls `render` method on every reflow.

<!--slide-->

```js
class AppComponent extends React.Component {
  render() {
    const { userName, time } = this.props
    return (
      <div align="center">
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

v

<!--slide-->

### State

> Class components can manage their state.

> Each state change will trigger a "re-render" from React.

> State can be read in `this.state` property.

> State must be set with `this.setState` method.

Let's put time as part of the state of `<AppComponent>`.

https://codesandbox.io/s/7wnkx5vx7j?module=%2FApp.js

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

Let's split our code into components to end up with something like:

```js
<div align="center">
  <Welcome userName={userName} />
  <br />
  Time <Clock />.
</div>
```

https://codesandbox.io/s/q3vz183wm4?&module=%2FApp.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

Clock is now a component that manages its own stsate and is easily resusable.

```js
class Clock extends React.Component {
  state = { time: null }

  constructor() {
    super()
    setInterval(this._updateTime.bind(this), 1000)
  }

  _updateTime() {
    this.setState({
      time: new Date().toLocaleTimeString()
    })
  }

  render() {
    const { time } = this.state
    return <span>{time}</span>
  }
}
```

https://codesandbox.io/s/30jkqqzmkp?module=%2Fcomponents%2FClock.js

<!--slide-->

### Special prop `children`

> React injects as `props.children` everything that was put inside your component.

> Then, it's a great opportunity to make components wrappers (layout components for instances).

```js
const Panel = props => (
  <div
    align="center"
    style={{
      border: '1px solid grey',
      padding: '20px'
    }}
  >
    {props.children}
  </div>
)
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

Let's try to abrast the layout of our app into a wrapping component.

https://codesandbox.io/s/30jkqqzmkp?module=%2Fcomponents%2FApp.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

```js
const Panel = props => (
  <div
    align="center"
    style={{
      border: '1px solid grey',
      padding: '20px'
    }}
  >
    {props.children}
  </div>
)
```

https://codesandbox.io/s/kk5j8zlqvo?module=%2Fcomponents%2FApp.js

<!--section-->

### Workshop !

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

The following exercises will make you implement - step by step - a React version of [Todo App](http://todomvc.com/examples/vanilla-es6/).

Please keep in mind that the **css classes** expected are the same if you want your results to be style by exercises' stylesheet.

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### First react component

Create a `<Title>` component and use it in `<TodoApp>`.

`<Title>` accepts "text" prop, so the implementation should fit this snippets:

```js
<Title text="todos" />
```

output

```html
<h1>todos</h1>
```

https://codesandbox.io/s/234j97x1kj?module=%2FTodoApp.js

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
<button onClick={activateLasers}>Activate Lasers</button>
```

<!--slide-->

As JSX handles javascript expression, any expression can be assigned as a prop.

```js
<button onClick={() => activateLasers()}>Activate Lasers</button>
```

<!--slide-->

### Communication between components

<!--slide-->

#### Child to Parent (Ownee to Owner)

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
const LabeledInput = props => (
  <label className="custom-input">
    {props.label}
    <input type="text" />
  </label>
)

const CustomForm = props => (
  <form>
    <LabeledInput label="name" />
    <LabeledInput label="surname" />
  </form>
)
```

What if `CustomForm` needs to know whenever an input is edited to make live validation?

<!--slide-->

Make it accept a callback prop that will notify changes.

```js
const LabeledInput = props => (
  <label className="custom-input">
    {props.label}
    <input type="text" onChange={props.onChange} />
  </label>
)

const CustomForm = props => (
  <form>
    <LabeledInput label="name" onChange={() => console.log('Name changed!')} />
    <LabeledInput
      label="surname"
      onChange={() => console.log('Surname changed!')}
    />
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
    <input className="new-todo" name="todo" placeholder={props.placeholder} />
  </form>
)
```

https://codesandbox.io/s/l2j1nrp27l?module=%2Fcomponents%2FTodoForm.js

<!--slide-->

#### Parent to Children (Owner to Ownee)

> We do it all the time in react.

> When you pass `props` to a child components, you

<!--slide-->

> Everytime `<Clock>` updates its state, it's re-rendered.

> It passes a different value for `props.children` to `<span>`.

> Everytime `<span>` receives new props, it's re-rendered.

```js
class Clock extends React.Component {
  constructor() {
    super()
    setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() })
    }, 1000)
  }

  render() {
    const { time } = this.state
    return <span>{time}</span>
  }
}
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### TodoList

> Create a new `<TodoList>` that displays the list of `todos` from `props.items`.

```html
<TodoList items={todos} />
```

```html
<ul class="todo-list">
  <li class="completed">
    <input type="checkbox" class="toggle" />
    <label>Description</label>
    <button class="destroy"></button>
  </li>
  <!-- ... -->
</ul>
```

https://codesandbox.io/s/l2j1nrp27l?module=%2FTodoApp.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

##### Possible Solution

```js
import React from 'react'

export default props => (
  <ul class="todo-list">
    {props.items.map(item => (
      <li className={item.done ? 'completed' : ''}>
        <input className="toggle" type="checkbox" checked={item.done} />
        <label>{item.desc}</label>
        <button className="destroy" />
      </li>
    ))}
  </ul>
)
```

https://codesandbox.io/s/611p3687ww?module=%2Fcomponents%2FTodoList.js

<!--slide-->

### Reconciliation and keys

Consider:

Current State:

```html
<ul>
  <li>Evan</li>
  <li>Rachel</li>
</ul>
```

Next State

```html
<ul>
  <li>Robin</li>
  <li>Evan</li>
  <li>Rachel</li>
</ul>
```

<!--slide-->

> Inserting an element at the beginning has worse performance.

> React will mutate every child instead of realizing it can keep the `<li>Evan</li>` and `<li>Rachel</li>` subtrees intact. This inefficiency can be a problem.

> In order to solve this issue, React supports a `key` attribute. React uses the key to match children in the original tree with children in the subsequent tree.

<!--slide-->

Current State:

```html
<ul>
  <li key={1059}>Evan</li>
  <li key={1098}>Rachel</li>
</ul>
```

Next State

```html
<ul>
  <li key={1031}>Robin</li>
  <li key={1059}>Evan</li>
  <li key={1098}>Rachel</li>
</ul>
```

> ** The key only has to be unique among its siblings, not globally unique. **

<!--slide-->

Let's fix it in our previous exercise:

https://codesandbox.io/s/611p3687ww?module=%2Fcomponents%2FTodoList.js

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### TodoList events

> When a todo's toggle (checkbox) is clicked, `store.update(item)` should be called to update storage.

> When a todo's delete button is clicked, `store.remove(item)` should be called to update storage.

> `<TodoList>` should reflect the changes on realtime.

Use events (callbacks) and `<TodoApp>`'s state to make the magic happen.

https://codesandbox.io/s/611p3687ww?module=%2FTodoApp.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

##### Possible Solution

```js
<input
  className="toggle"
  type="checkbox"
  checked={item.done}
  onClick={() => props.onToggleItem(item)}
/>
<label>{item.desc}</label>
<button
  className="destroy"
  onClick={() => props.onDeleteItem(item)}
/>
```

https://codesandbox.io/s/nv9pw39y4?module=%2FTodoApp.js

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### More events

> When user submits the content of `<TodoForm>`, `store.add(item)` should be called to update storage.

> When user clicks on "Clear completed", all "done" items should be remove from storage.

> `<TodoList>` should reflect the changes on realtime.

https://codesandbox.io/s/nv9pw39y4?module=%2FTodoApp.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

##### Possible Solution

```js
<TodoForm
  placeholder="What needs to be done?"
  onNew={this.handleNew.bind(this)}
/>

/* ... */

<button
  className="clear-completed"
  onClick={this.handleClearCompleted.bind(this)}>
  Clear completed
</button>
```

https://codesandbox.io/s/6wv9rxlmk3?module=%2FTodoApp.js

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### Add Time

> In `<TodoList>` item's logic has been encapsulated in `<TodoItem>`

> Create a `<TimeAgo>` component and use it in `<TodoItem>` so each item displays its time:

```html
<li>
  <input type="checkbox" class="toggle" value="on">
  <label>
    Celebrate with a good lunch <small>(5m 14s)</small>
  </label>
  <button class="destroy"></button>
</li>
```

Make use of installed dep `pretty-ms`

https://codesandbox.io/s/4xkjw44yow?module=%2Fcomponents%2FTodoItem.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

##### Possible Solution

```js
export default class TimeAgo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { now: Date.now() }
    setInterval(() => {
      this.setState({ now: Date.now() })
    }, REFRESH_TIME)
  }

  render() {
    const { date } = this.props
    const { now } = this.state
    const timestamp = new Date(date).getTime()
    const diff = now - timestamp
    return prettyMs(diff, PRETTY_MS_OPTIONS)
  }
}
```

https://codesandbox.io/s/6wv9rxlmk3?module=%2Fcomponents%2FTimeAgo.js

<!--section-->

## Component life cycle

<!--slide-->

> Functional components are pure functions executed on any props change, without any state.

> Class component have a state, and may be rendered for state changes instead of props change only.

> Also, in applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

> React provides hooks to handle all cases depending on the phase.

<!--slide-->

### Life Cycle Phases

<!--slide-->

Let have an overview.

https://codesandbox.io/s/movoy4xr8p?module=%2FLifeCycle.js

<!--slide-->

#### Mounting: Initialization

> A container component places our component as part of its content. It's being added to the DOM.

* constructor()
* componentWillMount()
* render()
* componentDidMount()

<!--slide-->

#### Updating: State change

> Our component calls `this.setState()` to update its own state.

* shouldComponentUpdate(nextProps, nextState)
  * componentWillUpdate(nextProps, nextState)
  * render()
  * componentDidUpdate(prevProps, prevState)

<!--slide-->

#### Updating: Props Change

> The container component in which our component was mounted makes a change on the provided props to our component.

* componentWillReceiveProps(nextProps)
* shouldComponentUpdate(nextProps, nextState)
  * componentWillUpdate(nextProps, nextState)
  * render()
  * componentDidUpdate(prevProps, prevState)

<!--slide-->

#### Error Handling

> There was an error during rendering, in a lifecycle method, or in the constructor of any child component.

* componentDidCatch()

<!--slide-->

#### constructor

```js
constructor(props)
```

> Invoked **before** component is actually mounted.

> The component's state is not defined yet. `this.props` and `this.state` are set yet.

> It's a good place to set our default state.

> Avoid introducing any side-effects or subscriptions in the constructor. For those use cases, use `componentDidMount()` instead.

```js
  constructor(props) {
    super(props);
    this.state = { mode: undefined } ;
  }
```

<!--slide-->

#### component Will Mount

```js
componentWillMount()
```

> Invoked immediately before mounting occurs (before first render, adding component to the DOM).

> The `componentWillMount()` is a chance for us to handle configuration, update our state, and in general prepare for the first render.

> We can start performing calculations or processes based on the prop values.

```js
componentWillMount() {
  const mode = this.props.age < 18 ? 'child' : 'adult';
  this.setState({mode})
}
```

**This is the only lifecycle hook called on server rendering.**

<!--slide-->

#### component Did Mount

```js
componentDidMount()
```

> Invoked immediately after a component is mounted. Right after first `render()` (component just added to the DOM).

> If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

> This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in `componentWillUnmount()`.

```js
componentDidMount() {
  this.intervalId = this.setInterval(this.update, 1000)
}
/*
componentWillUnmount() {
  this.intervalId && clearInterval(this.intervalId)
}*/
```

<!--slide-->

#### component Will Receive Props

```js
componentWillReceiveProps(nextProps)
```

> Invoked before a mounted component receives new props.

> If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

```js
componentWillReceiveProps(nextProps) {
  const mode = nextProps.age < 18 ? 'child' : 'adult';
  this.setState({mode})
}
```

**Just because this method was called, doesn't mean the value of props has changed.**

<!--slide-->

#### should Component Update

```js
shouldComponentUpdate(nextProps, nextState)
```

> Invoked before rendering when new props or state are being received. Defaults to `true`.

> Used for optimization, to let React know if a component’s output is not affected by the current change in state or props.

```js
shouldComponentUpdate(nextProps, nextState) {
  return this.state.mode !== nextState.mode
}
```

**Returning false just stops ongoing updating phase**

<!--slide-->

#### component Will Update

```js
componentWillUpdate(nextProps, nextState)
```

> Invoked immediately before rendering when new props or state are being received.

> Use this as an opportunity to perform preparation before an update occurs.

Note that you cannot call `this.setState()` here

```js
componentWillUpdate(nextProps, nextState) {
  if (nextState.open == true && this.state.open == false) {
    this.props.onWillOpen();
  }
}
```

<!--slide-->

#### component Did Update

```js
componentDidUpdate(nextProps, nextState)
```

> Invoked immediately after updating occurs. This method is not called for the initial render.

> Use this as an opportunity to operate on the DOM when DOM of the component has been updated.

```js
componentWillUpdate(nextProps, nextState) {
  // only update chart if the data has changed
  if (prevProps.data !== this.props.data) {
    this.chart = c3.load({
      data: this.props.data
    });
  }
}
```

<!--slide-->

#### component Will Unmount

```js
componentWillUnmount()
```

> Invoked immediately before a component is unmounted and destroyed.

> Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().

```js
/*
componentDidMount() {
  this.intervalId = this.setInterval(this.update, 1000)
}
*/
componentWillUnmount() {
  this.intervalId && clearInterval(this.intervalId)
}
```

<!--slide-->

#### component Did Catch

```js
componentDidCatch(error, info)
```

> Error boundaries are React components that catch JavaScript errors anywhere in their child component tree.

> A class component becomes an error boundary if it defines `componentDidCatch` method.

```js
componentDidCatch(error, info) {
  this.setState({ error, info });
}
/*
render() {
  if (this.state.error) {
    return <h1>Error: {this.state.error.toString()}</h1>;
  }
  return this.props.children;
}
*/
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### Improving performance

> There are several performance problems in `<TimeAgo>`
>
> * It's re-rendered every time `<TodoList>` is updated.
> * It might cause memory leaks and errors, not clearing the `setInterval`

Refactor `<TimeAgo>` using life cycle functions, fixing these issues.

https://codesandbox.io/s/6wv9rxlmk3?module=%2Fcomponents%2FTimeAgo.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible Solution

```js
componentDidMount() {
  this.intervalId = setInterval(() => {
    this.setState({ now: Date.now() })
  }, REFRESH_TIME)
}

componentWillUnmout() {
  clearInterval(this.intervalId)
}

shouldComponentUpdate(nextProps, nextState) {
  return nextState.now !== this.state.now
}
```

https://codesandbox.io/s/2399w1289y?module=%2Fcomponents%2FTimeAgo.js

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### Reducing calculations

> `<TimeAgo>` calculates `timestamp` on every render.

```js
const timestamp = new Date(date).getTime()
```

But, as it comes from a prop (date), it's the same value in each render.

Refactor `<TimeAgo>` to make sure `timestamp` is calculated only when needed.

https://codesandbox.io/s/2399w1289y?module=%2Fcomponents%2FTimeAgo.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible Solution

```js
componentWillMount() {
  this.setState({
    now: Date.now(),
    timestamp: new Date(this.props.date).getTime()
  })
}
render() {
  const { date } = this.props
  const { now, timestamp } = this.state
  const diff = now - timestamp
  return prettyMs(diff, PRETTY_MS_OPTIONS)
}
```

https://codesandbox.io/s/zrnyxx683p?module=%2Fcomponents%2FTimeAgo.js

<!--section-->

## Advanced Props

<!--slide-->

### Prop types

> As your app grows, you can catch a lot of bugs with typechecking.

> React has some built-in typechecking abilities.

> To run typechecking on the props for a component, you can assign the special propTypes property.

<!--slide-->

```js
import React from 'react'
import PropTypes from 'prop-types'

const Welcome = props => (
  <span>
    Welcome to JS Training,
    <strong> {props.userName.toUpperCase()}</strong>
  </span>
)

Welcome.propTypes = {
  userName: PropTypes.string
}
```

https://codesandbox.io/s/v034l8yvw7?module=%2Fcomponents%2FWelcome.js

<!--slide-->

#### Built-in checkers

> `PropTypes` exports a range of validators that can be used to make sure the data you receive is valid.

```js
import PropTypes from 'prop-types'

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element
}
```

<!--slide-->

#### OneOf and collections checkers

```js
MyComponent.propTypes = {
  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number)
}
```

<!--slide-->

#### Object properties checker

```js
MyComponent.propTypes = {
  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  })
}
```

<!--slide-->

#### Required props

> You can chain any of the above with `isRequired` to make sure a warning is shown if the prop isn't provided.

```js
MyComponent.propTypes = {
  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  requiredArray: PropTypes.array.isRequired,
  requiredBool: PropTypes.bool.isRequired,
  requiredFunc: PropTypes.func.isRequired,
  requiredNumber: PropTypes.number.isRequired,
  requiredObject: PropTypes.object.isRequired,
  requiredString: PropTypes.string.isRequired,
  requiredSymbol: PropTypes.symbol.isRequired,

  requiredNode: PropTypes.node.isRequired,

  requiredElement: PropTypes.element.isRequired
}
```

<!--slide-->

#### Custom Checkers

```js
MyComponent.propTypes = {
  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      )
    }
  }
}
```

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

#### Adding prop types

Add `propTypes` properties to the following components:

* `<TodoItem>`, all props required but `date`.
  * `item.date` and `onClickDelete` are optional. Make sure to apply conditional rendering, not showing the date or delete button.
* `<TimeAgo>`, making sure that `date` is parsable by [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

https://codesandbox.io/s/zrnyxx683p?module=%2Fcomponents%2FTodoItem.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible Solution

```js
TimeAgo.propTypes = {
  date: function(props, propName, componentName) {
    const date = props[propName]
    if (!Date.parse(date)) {
      const msg = `Invalid prop '${propName}' supplied to ${componentName}. Not a parsable date.`
      return new Error(msg)
    }
  }
}
```

https://codesandbox.io/s/mm9pj5350j?module=%2Fcomponents%2FTimeAgo.js

<!--slide-->

### Default Props

> `defaultProps` can be defined as a property on the component class itself, to set the default props for the class.

> This is used for undefined props, but not for null props.

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
}
```

If `props.color` is not provided, it will be set by default to `'blue'`

<!--slide-->

### Refs

> In the typical React dataflow, props are the only way that parent components interact with their children.

> Sometimes a component may need to directily access its children's DOM elements:

* Managing focus, text selection, or media playback.
* Triggering imperative animations.
* Integrating with third-party DOM libraries.

<!--slide-->

```js
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null

  function handleClick() {
    textInput.focus()
  }

  return (
    <div>
      <input
        type="text"
        ref={input => {
          textInput = input
        }}
      />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  )
}
```

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

### Caution!

> Refs are only available after first render.

> It means that in class components, they're available starting on `componentDidMount()`

<!--slide--><!-- .slide: class="jsTraining-questionSlide" -->

### Controling DOM elements

Improve `<TodoForm>` to have a reference of the input, instead of dansgerously accessing `e.target[0]`

You might have top convert it into a class component.

https://codesandbox.io/s/mm9pj5350j?module=%2Fcomponents%2FTodoForm.js

<!--slide--><!-- .slide: class="jsTraining-responseSlide" -->

#### Possible Solution

```js
class TodoForm extends React.Component {
  onSubmit(e) {
    e.preventDefault()
    this.props.onNew(this.textInput.value)
    this.textInput.value = ''
  }

  render() {
    const { placeholder } = this.props
    return (
      <form className="todo-form" onSubmit={this.onSubmit.bind(this)}>
        <input
          ref={input => (this.textInput = input)}
          className="new-todo"
          name="todo"
          placeholder={placeholder}
        />
      </form>
    )
  }
}
```

https://codesandbox.io/s/7579260oq?module=%2Fcomponents%2FTodoForm.js

<!--section-->

## Docs

* [React Official Docs](https://reactjs.org/docs/hello-world.html)

* [Cheat Sheet](https://devhints.io/react)
