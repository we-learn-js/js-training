import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import cx from 'classnames'
import {Slide} from '../../../lib/mappers/MarkdownParser'

type Props = {
  slides: Slide[][]
}

const RevealMarkdownSlides = ({slides}: Props) =>
  slides.map((section, i) => (
    <section key={i}>
      {section.map(({content, id, isExercise, isSolution, isImportant}) => (
        <section
          key={id}
          data-slide-id={id}
          className={cx({
            'jsTraining-exerciseSlide': isExercise,
            'jsTraining-solutionSlide': isSolution,
            'jsTraining-importantSlide': isImportant,
          })}
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
        </section>
      ))}
    </section>
  )) as unknown as React.ReactElement

export default RevealMarkdownSlides
