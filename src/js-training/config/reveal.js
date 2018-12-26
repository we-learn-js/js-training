const REVEAL_CDN = '//unpkg.com/reveal.js@3.6.0'

export default masterMode => ({
  controls: false,
  progress: true,
  slideNumber: true,
  multiplex: {
    secret: '15082678359209497874',
    id: '9646eff52aeec7df',
    url: 'https://reveal-js-multiplex-ccjbegmaii.now.sh'
  },
  hideAddressBar: true,
  transition: 'slide',
  parallaxBackgroundImage: require('../../components/Slideshow/Reveal/images/slideshow-background.png'),
  parallaxBackgroundSize: '',
  parallaxBackgroundHorizontal: 100,
  parallaxBackgroundVertical: 100,
  margin: 0.1,
  history: true,
  previewLinks: false,
  dependencies: [
    // {
    //   src: `${REVEAL_CDN}/plugin/notes/notes.js`,
    //   async: true
    // },
    {src: '//cdn.socket.io/socket.io-1.3.5.js', async: true},
    {
      src: `${REVEAL_CDN}/plugin/multiplex/${
        masterMode ? 'master' : 'client'
      }.js`,
      async: true
    }
  ]
})
