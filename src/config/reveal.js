export default {
  controls: false,
  progress: true,
  slideNumber: true,
  multiplex: {
    secret: '15082678359209497874',
    id: '9646eff52aeec7df',
    url: 'https://reveal-js-multiplex-ccjbegmaii.now.sh'
  },
  hideAddressBar: true,
  transition: 'fade',
  parallaxBackgroundImage: require('../images/slideshow-background.png'),
  parallaxBackgroundSize: '',
  parallaxBackgroundHorizontal: 100,
  parallaxBackgroundVertical: 100,
  margin: 0.1,
  history: true,
  dependencies: [
    {
      src: 'https://unpkg.com/reveal.js@3.6.0/lib/js/classList.js',
      condition: function() {
        return !document.body.classList
      }
    },
    {
      src: 'https://unpkg.com/reveal.js@3.6.0/plugin/markdown/marked.js',
      condition: function() {
        return !!document.querySelector('[data-markdown]')
      }
    },
    {
      src: 'https://unpkg.com/reveal.js@3.6.0/plugin/markdown/markdown.js',
      condition: function() {
        return !!document.querySelector('[data-markdown]')
      }
    },
    {
      src: 'https://unpkg.com/reveal.js@3.6.0/plugin/highlight/highlight.js',
      async: true,
      callback: function() {
        hljs.initHighlightingOnLoad()
      }
    },
    {
      src: 'https://unpkg.com/reveal.js@3.6.0/plugin/zoom-js/zoom.js',
      async: true
    },
    {
      src: 'https://unpkg.com/reveal.js@3.6.0/plugin/notes/notes.js',
      async: true
    },
    {
      src: 'https://unpkg.com/reveal.js@3.6.0/plugin/math/math.js',
      async: true
    }
  ]
}
