import React from 'react'
import RevealPresentation from '../Reveal'
import ReactMarkdown from 'react-markdown'

class RevealMarkownSlides extends React.Component {
  render() {
    const { slides, masterMode } = this.props

    return (
      <RevealPresentation masterMode={masterMode}>
        {slides.map((slides, i) => {
          return (
            <section key={i}>
              {slides.map((slide, j) => (
                <section key={`${i}/${j}`}>
                  <ReactMarkdown source={slide} />
                </section>
              ))}
            </section>
          )
        })}
      </RevealPresentation>
    )
  }
}

export default RevealMarkownSlides
