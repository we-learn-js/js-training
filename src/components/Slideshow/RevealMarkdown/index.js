import React from 'react'
import RevealPresentation from '../Reveal'
import ReactMarkdown from 'react-markdown'

class RevealMarkownSlides extends React.Component {
  render() {
    const { slides, masterMode } = this.props
    console.log(slides)
    return (
      <RevealPresentation masterMode={masterMode}>
        {slides.map((slides, i) => {
          return (
            <section key={i}>
              {slides.map(({ content, attributes }, j) => (
                <section key={`${i}/${j}`} {...attributes}>
                  <ReactMarkdown source={content} escapeHtml={false} />
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
