import React from 'react'
import Reveal from 'reveal.js/js/reveal.js'
window.Reveal = Reveal

import 'reveal.js/lib/js/head.min.js'
import '../../scss/js-training.scss'
import revealConfig from '../../config/reveal'

class RevealPresentation extends React.Component {
  componentDidMount() {
    if (window.revealReactPresentationAlreadyLoaded) {
      document.location.reload()
    } else {
      Reveal.initialize(revealConfig)
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
