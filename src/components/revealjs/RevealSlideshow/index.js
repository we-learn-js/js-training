import React from 'react'
import ReactDOM from 'react-dom'
import getRevealConfig from '../../../lib/config/reveal'
import Prism from 'prismjs'

let slidesDOM, revealDOM

let dependenciesLoaded = false
const highlightCode = () => {
  Array.from(document.querySelectorAll('pre code')).map(el => {
    const elem = document.createElement('PRE')
    if (el.firstChild) {
      el.innerHTML = Prism.highlight(
        el.firstChild.nodeValue,
        Prism.languages.javascript,
        'javascript'
      )
    }
  })
}

const createRevealDom = className => {
  slidesDOM = document.createElement('DIV')
  slidesDOM.className = 'slides'
  revealDOM = document.createElement('DIV')
  revealDOM.className = className ? `reveal ${className}` : 'reveal'
  revealDOM.appendChild(slidesDOM)
  return slidesDOM
}

class RevealSlideshow extends React.Component {
  onSlideChange = ({previousSlide, currentSlide, indexh, indexv}) => {
    this.props.onSlideChange({
      slideId: currentSlide.getAttribute('data-slide-id')
    })
  }

  async componentDidMount() {
    !revealDOM && createRevealDom(this.props.className)
    await Promise.all([
      import('prismjs/themes/prism-okaidia.css'),
      import('./index.scss'),
      await import('reveal.js/lib/js/head.min.js')
    ])

    const Reveal = await import('reveal.js/js/reveal.js')
    dependenciesLoaded = true
    window.Reveal = Reveal
    const {masterMode} = this.props
    const revealConfig = getRevealConfig(masterMode)
    document.body.insertBefore(revealDOM, document.body.firstChild)

    if (window.revealReactPresentationAlreadyLoaded) {
      Reveal.sync()
      Reveal.slide(0, 0, 0)
      highlightCode()
    } else {
      Reveal.initialize(revealConfig)
      Reveal.addEventListener('ready', highlightCode)
      window.revealReactPresentationAlreadyLoaded = true
    }

    this.props.onSlideChange &&
      Reveal.addEventListener('slidechanged', this.onSlideChange)
  }

  componentWillUnmount() {
    document.body.removeChild(revealDOM)
    Reveal.removeEventListener('slidechanged', this.onSlideChange)
    Reveal.removeEventListeners()
  }

  render() {
    return revealDOM
      ? ReactDOM.createPortal(this.props.children, slidesDOM)
      : null
  }
}

export default RevealSlideshow
