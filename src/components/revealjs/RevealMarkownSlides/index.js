import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import cx from 'classnames'

class RevealMarkownSlides extends React.Component {
  render() {
    const {slides} = this.props
    return slides.map((slides, i) => (
      <section key={i}>
        {slides.map(slide => {
          const {content, id, isExercise, isSolution, isImportant} = slide
          return (
            <section
              key={id}
              data-slide-id={id}
              className={cx({
                'jsTraining-exerciseSlide': isExercise,
                'jsTraining-solutionSlide': isSolution,
                'jsTraining-importantSlide': isImportant
              })}
            >
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
            </section>
          )
        })}
      </section>
    ))
  }
}

export default RevealMarkownSlides
