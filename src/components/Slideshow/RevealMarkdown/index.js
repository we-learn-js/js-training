import React from 'react'
import RevealPresentation from '../Reveal'

class RevealMarkownSlides extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { markdownUrl, masterMode } = this.props
    return (
      <RevealPresentation masterMode={masterMode}>
        <section
          data-markdown={markdownUrl}
          data-separator="^(\r\n?|\n)<!--section-->(\r\n?|\n)$"
          data-separator-vertical="^(\r\n?|\n)<!--slide-->"
          data-separator-notes="^Note:"
        />
      </RevealPresentation>
    )
  }
}

export default RevealMarkownSlides
