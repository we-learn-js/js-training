# Web Animations API

<!--section-->

## WAAPI

Web Animation API implemented on top of CSS animations.

It's a new JavaScript API that enables us to hook into the browser’s animation engine and to manipulate animations using
JavaScript.

[W3C Editor's Draft](https://drafts.csswg.org/web-animations/)

<!--slide-->

### Imperative VS Declarative

CSS `@keyframes` is a way declare animations.

WAAPI is the imperative way of doing the same.

That opens a new world of control over keyframe-based animations:

* Dynamic values
* Timelines and playback control
* Callbacks
* Off main-thread animations (compositor layer)

<!--section-->

## Web Animations Spec

Let's see what we can actually do.

<!--slide-->

### Create basic element animation

```js
element.animate(keyframes, options)
```

`element.animate()` is shorthand method to create a new web animation.

Like CSS `@keyframes`/`animation` declarations, but in imperative JavaScript.

[MDN // element.animate](https://developer.mozilla.org/es/docs/Web/API/Element/animate)

<!--slide-->

```js
element.animate(
  [
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(.7)' },
    { transform: 'scale(.8)', opacity: 0.2 }
  ],
  {
    duration: 500, // milliseconds
    easing: 'ease-in-out', // 'linear', a bezier curve, etc. delay: 10, // milliseconds
    iterations: Infinity, // or a number
    direction: 'alternate' // 'normal', 'reverse', etc.
  }
)
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-1%2Findex.js&initialpath=%2F%23demo-1">Live demo</a>

<!--slide-->

#### Built on top of CSS

CSS equivalence

```css
@keyframes heart-beats {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.7);
  }

  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

.animated-icon {
  animation: heart-beats 500ms ease-in-out infinite alternate;
}
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-2%2Findex.js&initialpath=%2F%23demo-2" >Live demo</a>

<!--slide-->

### Keyframe Formats

Different formats can be used as shorthands

```js
element.animate(
  {
    transform: ['scale(1)', 'scale(.7)', 'scale(.8)'],
    opacity: [1, 0.2]
  },
  {
    duration: 500, // milliseconds
    easing: 'ease-in-out', // 'linear', a bezier curve, etc. delay: 10, // milliseconds
    iterations: Infinity, // or a number
    direction: 'alternate' // 'normal', 'reverse', etc.
  }
)
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-11%2Findex.js&initialpath=%2F%23demo-11" >Live demo</a>

[MDN // Keyframe Formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)

<!--slide-->

### Offset option

CSS percentages can be expressed as offset values

```js
const animKeyframes = [
  { transform: 'scale(1)', opacity: 1 }, // offset: 0%
  { transform: 'scale(.7)' }, // offset: 50%
  { transform: 'scale(.8)', opacity: 0.2 } // offset: 100%
]
```

```js
const animKeyframes = [
  { transform: 'scale(1)', opacity: 1, offset: 0.5 }, // offset: 50%
  { transform: 'scale(.7)', offset: 0.7 }, // offset: 70%
  { transform: 'scale(.8)', opacity: 0.2 } // offset: 100%
]
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-10%2Findex.js&initialpath=%2F%23demo-10" >Live demo</a>

[MDN // Keyframe Formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)

<!--slide-->

### Keyframes timing options

Options taken from CSS

```js
const animOptions = {
  // animation-duration
  duration: 500, // milliseconds
  // animation-timing
  easing: 'ease-in-out', // 'linear', a bezier curve, etc.
  // animation-iteration-count
  iterations: Infinity, // or a number
  // animation-direction
  direction: 'alternate', // 'normal', 'reverse', etc.
  // animation-fill-mode
  fill: 'forwards' //'backwards', 'both', 'none', 'auto'
  // animation-delay
  delay: 500, // milliseconds
}
```

<!--slide-->

### Keyframes timing options

Specific JavaScript options

```js
const animOptions = {
  // string to reference the animation
  id: 'my-animation'

  // milliseconds to add to the end of the animation
  endDelay: 500,

  // Describes at what point in the iteration the animation should start.
  iterationStart: 0.5,

  // how values are combined: 'add', 'accumulate', 'replace'
  composite: 'replace',

  // how keyframes should be distributed: 'distribute', 'paced'
  spacing: 'distribute'
}
```

<!--slide-->

### Timing Option: endDelay

Number of milliseconds to delay after the end time of an animation. The end time of an animation effect is simply the sum of its `delay`, `duration`, and `endDelay`.

```js
const animOptions = {
  duration: 1000, // milliseconds
  iterations: 2, // or a number
  direction: 'alternate', // 'normal', 'reverse', etc.
  delay: 1000, // milliseconds
  endDelay: 1000 // milliseconds
}

// Total animation time: 4000ms
```

<!--slide-->

### Timing Option: composite

Composition of CSS properties that take multiple values.

Composite allows other modes:

* `'replace'` (default) overwrites the previous value with the new one.

* `'add'` dictates an additive effect, where each successive iteration builds on the last.

* `'accumulate'` is similar but a little smarter: blur(2) and blur(5) become blur(7), not blur(2) blur(5).

<!--slide-->

```js
element.animate({
  transform: 'translateX(10px) rotate(1turn)'
})
element.animate({
  transform: 'scale(3) translateX(20px)'
})

// 'replace'    = transform: 'scale(3) translateX(20px)'
// 'add'        = transform: 'scale(3) translateX(20px) rotate(1turn)'
// 'accumulate' = transform: 'scale(3) translateX(30px) rotate(1turn)'
```

<!--slide-->

```js
element.animate({
  transform: 'scale(.7)'
})
element.animate({
  transform: 'scale(.3) rotate(1turn)'
})

// 'replace'    = transform: 'scale(.3)'
// 'add'        = transform: 'scale(.3) rotate(1turn)'
// 'accumulate' = transform: 'scale(0.7*0.3) rotate(1turn)'
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-12%2Findex.js&initialpath=%2F%23demo-12" >Live demo</a>

<!--slide-->

Soon available for css

```css
div {
  animation: spin 2s infinite, swell 1s alternate 2;
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
@keyframes swell {
  to {
    transform: scale(2);
    animation-composite: add;
  }
}
```

<!--slide-->

### The `Animation` Object

`element.animate()` returns an instance of `Animation` which controls your animation.

[MDN // Animation](https://developer.mozilla.org/en-US/docs/Web/API/Animation)

<!--slide-->

![Animation Object](./images/waapi-animation-object.png)

<!--slide-->

#### `Animation.constructor()`

```js
var animation = new Animation([effect][, timeline]);
```

| Param    | Description                               | Types                                             |
| -------- | ----------------------------------------- | ------------------------------------------------- |
| effect   | Keyframes and animation config.           | `KeyframeEffect`, `SequenceEffect`, `GroupEffect` |
| timeline | Timeline associated (`document.timeline`) | `AnimationTimeline`, `DocumentTimeline`           |

<!--slide-->

#### Constructing an animation from scratch

Animations are created with the `KeyframeEffect` constructor.

```js
var animationEffect = new KeyframeEffect(
  document.getElementById('my-element'), // element to animate
  animKeyframes,
  animOptions
)

const anim = new Animation(animationEffect)
anim.play()
```

Which is the same as:

```js
const anim = document
  .getElementById('my-element')
  .animate(animKeyframes, animOptions)
```

** ⚠︎ `element.animate()` autoplays the animation **

<!--slide-->

### Animation methods

```js
const anim = element.animate(animKeyframes, animOptions)

anim.play()
// Starts or resumes playing of an animation,
// or begins the animation again if it previously finished.
anim.pause()
// Suspends playing of an animation.
anim.cancel()
// Clears all keyframes caused by this animation and aborts its playback.
anim.finish()
// Seeks either end of an animation, depending on whether
// the animation is playing or reversing.
anim.reverse()
// Reverses playback direction, stopping at the start of the animation.
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-3%2Findex.js&initialpath=%2F%23demo-3" >Live demo</a>

<!--slide-->

### `Animation.playbackRate`

Sets the speed of an animation

```js
const anim = element.animate(/* animation */)
anim.playbackRate = 2.5 // anim.updatePlaybackRate(2.5)
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-4%2Findex.js&initialpath=%2F%23demo-4&expanddevtools=1" >Live demo</a>

<!--slide-->

### `Animation.currentTime`

```js
var anim = element.animate(/* animation */)
anim.currentTime = 200 // Set animation to 200ms time
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-5%2Findex.js&initialpath=%2F%23demo-5&expanddevtools=1" >Live demo</a>

<!--slide-->

### Animation events

```js
var anim = element.animate(/* animation */)

anim.onfinish = event => console.log('Animation finished', event)
// Gets and sets the event handler for the finish event.

anim.oncancel = event => console.log('Animation cancel', event)
// Gets and sets the event handler for the cancel event.
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-6%2Findex.js&initialpath=%2F%23demo-6&expanddevtools=1" >Live demo</a>

Note: Demo of a game to kill duckhunt

<!--slide-->

### `element.getAnimations()`

Control animations creating in JavaScript **and CSS**

> As css statements are converted to the `style` property in the DOM API, CSS `@keyframes` statements are also abstract to instances of `Animation`

```js
const anims = element.getAnimations()
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-7%2Findex.js&initialpath=%2F%23demo-7&expanddevtools=1" >Live demo</a>

<!--slide-->

### Timeline

```js
var animation = new Animation([effect][, timeline]);
```

By default, `Animation` instances are assigned to `document.timeline`.

But a `KeyframeEffect` can be played directly by a timeline.

```js
const animationEffect = new KeyframeEffect(
  element, // element to animate
  animKeyframes,
  animOptions
)

document.timeline.play(animationEffect)
```

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-9%2Findex.js&initialpath=%2F%23demo-9" >Live demo</a>

<!--slide-->

### GroupEffect

`KeyframeEffect` instances can be grouped to be controlled played as a group.

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-8%2Findex.js&initialpath=%2F%23demo-8" >Live demo</a>

<!--slide-->

### SequenceEffect

Same as `GroupEffect` but `KeyframeEffect` instances are played sequentially.

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-13%2Findex.js&initialpath=%2F%23demo-13" >Live demo</a>

<!--section-->

## What's available today?

Today, this is what we have:

* Chrome, and Opera have foundation implemented.
* Safari is in development.
* Edge is under consideration.
* But Firefox (Nightly) did the job ! 😍

[CanIUse // Web Animation](https://caniuse.com/#feat=web-animation)

<!--slide-->

### Browser support and dev

* [CodePen // WAAPI](https://codepen.io/danwilson/embed/xGBKVq?height=960): Specific WAAPI features detector by Dan Wilson.

* [GitHub // web-animations-js](https://github.com/web-animations/web-animations-js): Polyfill already available with most features.

<!--section-->

## Status of Animation in Web

The many ways of animating.

<!--slide-->

### Canvas and WebGL

Canvas and webgl are bitmap based animations. They have infinite possiblities but not suitable for accessible/indexable DOM elements.

<!--slide-->

### Style property animation

There are several ways to animate assigning values to `element.style`:

* Vanilla:
  * `setInterval()`
  * `requestAnimationFrame()`
* Libraries:
  * [jQuery.animate()](http://api.jquery.com/animate/)
  * [GreenSock](https://greensock.com/gsap)
  * [AnimeJS](http://animejs.com/)
  * [VelicityJS](http://velocityjs.org/)
  * many more...

<!--slide-->

#### GSAP (GreenSock)

* **Pros:**

  * It’s extraordinarily performant for something that’s not native.
  * Many sequencing tools.
  * They have a ton of other plugins if you want to do fancy things like animate text, morph SVGs, or draw paths.
  * It solves SVG cross-browser compatibility.

* **Cons:**
  * External library
  * Not always performant: main thread

<!--slide-->

### SVG ([SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL))

* **Pros:**

  * Tons of unique features: Shape Morphingm, motion path
  * Wonderfull Filter Animations

* **Cons:**
  * Not performant many times
  * Losing support

<!--slide-->

### CSS animations

There are several ways to animate in css:

* Native:
  * `@keyframes` and `animation`
  * `transition`
* Libraries:

  * [Animate.css](https://daneden.github.io/animate.css/)
  * [CSShake](http://elrumordelaluz.github.io/csshake/#1)
  * many more...

<!--slide-->

* **Pros:**

  * Native: You don’t need an external library.
  * Performance: transforms and opacity cheap to animate.
  * will-change property for transitions
  * Motion along a path is coming [caniuse](https://caniuse.com/#feat=css-motion-paths)
  * Can be controlled by media queries.

* **Cons:**
  * Sequencing is difficult and unmaintainable
  * No control over animation
  * Static unless you use css properties (poor support, no polyfill)

<!--slide-->

### WAAPI

Create css keyframes animations from javascript.

* **Pros:**

  * All CSS aniamtion pros
  * Grouping, Sequencing
  * Control over animations

* **Cons:**
  * Poor support
  * Sequencing much more advanced in GSAP for instance

<!--section-->

## Performance in web animation

WAAPI does not guarantee that your animations are performant.

Rendering operations are optimized depending on how you declare your animations, like in CSS.

So, let's dig into animations performance in the browser to become better web animators.

<!--slide-->

### Rendering phases

![](./images/render-phases-all.jpg)

<!--slide-->

#### JavaScript

* Parse code
* Evaluate/execute code that modifies DOM elements
  * Moving them (in the DOM tree)
  * Adding classes
  * Modifying `element.style` properties.

![](./images/render-phases-all.jpg)

<!--slide-->

#### Style

* Match selectors (like `.head p`) to DOM elements
* Calculate final styles for each element

![](./images/render-phases-all.jpg)

<!--slide-->

#### Layout

Calculate positions of each DOM element according to its properties and outer elements' position (float, inline, flex, grid).

![](./images/render-phases-all.jpg)

<!--slide-->

#### Paint

Fill in pixels, drawing out text, colors, images, borders, and shadows, essentially every visual part of the elements.

Paint is done on multiple "layers".

![](./images/render-phases-all.jpg)

<!--slide-->

#### Compositing

Draw the painted layers into the screen in the right order (elements order in page, z-index, etc).

![](./images/render-phases-all.jpg)

<!--slide-->

### Re-rendering phases

What you change matters:

* Some styles need to recalulate positions (layout) on any change.

* Some styles only need a re-render of some pixels of a layer (paint).

* Some styles only need to alter how an a paint layer is actually drawn into the screen (composite).

<!--slide-->

![composite animations](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/devtools-waterfall.jpg)

<!--slide-->

#### Styles that affect layout

> Properties that modify size/position of the element box and might alter inner/outer elements' position.

![](./images/render-phases-all.jpg)

width, height, padding, margin, display, border-width, border, top, position, font-size, float, text-align, overflow-y, font-weight, overflow, left, font-family, line-height, vertical-align, right, clear, white-space, bottom, min-height

<!--slide-->

#### Styles that affect paint

> Properties that only modifiy the inner aspect of the element and don't affect size/position.

![](./images/render-phases-no-layout.jpg)

color, border-style, visibility, background, text-decoration, background-image, background-position, background-repeat, outline-color, outline, outline-style, border-radius, outline-width, box-shadow, background-size

<!--slide-->

#### Styles that affect composite

> Properties that only affects the way the painted layer if drawn into the screen.

![](./images/render-phases-no-layout-paint.jpg)

opacity, transform (translate, scale, rotate, skew, matrix)

<!--slide-->

### More about the composite phase

* Style, Layout and Paint are based on calculations from values. They're mapping data to pixels.
* Paint will map this data to bitmap layers, composed by pixels.
* Composite layers are more or less DOM/CSS data rasterized to bitmaps and treated like it.

Pixels-based operations (translate, skew, rotate) are delegated to **GPU**. They don't alter main thread blocking user interaction

<!--slide-->

### Force-promote layer creation

In Blink and WebKit browsers a new layer is created for any element which has a CSS transition or animation on opacity

But many developers use `translateZ(0)` or `translate3d(0,0,0)` or `will-change` to manually force layer creation and inform browser of best optimization.

<!--slide--><!-- .slide: class="jsTraining-alertSlide" -->

### Caution!

**Don't take everything for granted**

The phase triggers by each style property may differ from browsers engine and their version.

[Check the differences](https://csstriggers.com/)

<!--slide-->

### Let's check it with DevTools

<a href="https://codesandbox.io/embed/github/davidbarna/web-animations-api-demos/tree/master/?hidenavigation=1&module=%2Fsrc%2Fdemo-14%2Findex.js&initialpath=%2F%23demo-14" >Live demo</a>

<!--section-->

## THE END
