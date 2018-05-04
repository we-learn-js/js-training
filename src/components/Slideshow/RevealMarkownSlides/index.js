import React from 'react'
import ReactMarkdown from 'react-markdown'

class RevealMarkownSlides extends React.Component {
  render() {
    const { slides } = this.props
    return slides.map((slides, i) => (
      <section key={i}>
        {slides.map(({ content, attributes }, j) => (
          <section key={`${i}/${j}`} {...attributes}>
            <ReactMarkdown source={content} escapeHtml={false} />
          </section>
        ))}
      </section>
    ))
  }
}

export default RevealMarkownSlides
