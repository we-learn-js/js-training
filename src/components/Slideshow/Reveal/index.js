import React from 'react'
import ReactDOM from 'react-dom'
import Reveal from 'reveal.js/js/reveal.js'
import 'reveal.js/lib/js/head.min.js'
import './index.scss'
import getRevealConfig from '../../../js-training/config/reveal'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'

let slidesDOM, revealDOM

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

const createRevealDom = () => {
  slidesDOM = document.createElement('DIV')
  slidesDOM.className = 'slides'
  revealDOM = document.createElement('DIV')
  revealDOM.className = 'reveal'
  revealDOM.appendChild(slidesDOM)
  return slidesDOM
}

window.Reveal = Reveal

class RevealSlideshow extends React.Component {
  componentWillMount() {
    !revealDOM && createRevealDom()
  }

  onSlideChange = ({previousSlide, currentSlide, indexh, indexv}) => {
    this.props.onSlideChange({
      slideId: currentSlide.getAttribute('data-slide-id')
    })
  }

  componentDidMount() {
    const {masterMode} = this.props
    const revealConfig = getRevealConfig(masterMode)
    document.body.appendChild(revealDOM)
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
    return ReactDOM.createPortal(this.props.children, slidesDOM)
  }
}

export default RevealSlideshow
