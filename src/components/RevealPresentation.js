import React from 'react'
import Reveal from 'reveal.js/js/reveal.js'

window.Reveal = Reveal

import 'reveal.js/lib/js/head.min.js'
import './scss/js-training.scss'
import revealConfig from '../domain/config/reveal'
import markdownImages from '../domain/config/md-images'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'

const relocateImages = () => {
  Array.from(document.querySelectorAll('img')).forEach(img => {
    const imgInfo = markdownImages[img.getAttribute('src')]
    if (imgInfo) {
      img.src = imgInfo.url
    }
  })
}

const highlightCode = () => {
  Array.from(document.querySelectorAll('pre code')).map(el => {
    const elem = document.createElement('PRE')
    el.innerHTML = Prism.highlight(
      el.firstChild.nodeValue,
      Prism.languages.javascript,
      'javascript'
    )
  })
}

class RevealPresentation extends React.Component {
  componentDidMount() {
    if (window.revealReactPresentationAlreadyLoaded) {
      document.location.reload()
    } else {
      Reveal.initialize(revealConfig)
      Reveal.addEventListener('ready', () => {
        relocateImages()
        highlightCode()
      })
      window.revealReactPresentationAlreadyLoaded = true
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className="reveal">
        <div className="slides" ref={div => (this.slidesElement = div)}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default RevealPresentation
