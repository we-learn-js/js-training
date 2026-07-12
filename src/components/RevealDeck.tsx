import {useEffect, useRef} from 'react'
import Reveal from 'reveal.js'
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js'
import 'reveal.js/dist/reveal.css'
import '../styles/reveal/index.scss'
import getRevealConfig from '../lib/config/reveal'
import type {SlideVm} from '../lib/slides'

type Props = {
  sections: SlideVm[][]
  backgroundImage: string
}

const slideClassName = (slide: SlideVm) =>
  [
    slide.isExercise && 'jsTraining-exerciseSlide',
    slide.isSolution && 'jsTraining-solutionSlide',
    slide.isImportant && 'jsTraining-importantSlide'
  ]
    .filter(Boolean)
    .join(' ') || undefined

const RevealDeck = ({sections, backgroundImage}: Props) => {
  const deckElement = useRef<HTMLDivElement>(null)
  const deck = useRef<Reveal | null>(null)

  useEffect(() => {
    if (!deckElement.current || deck.current) return
    deck.current = new Reveal(deckElement.current, {
      ...getRevealConfig(backgroundImage),
      plugins: [RevealNotes]
    })
    deck.current.initialize()

    return () => {
      try {
        deck.current?.destroy()
      } catch {
        // Reveal throws if the deck is destroyed before initialize() resolves
      }
      deck.current = null
    }
  }, [backgroundImage])

  return (
    <div className="reveal" ref={deckElement}>
      <div className="slides">
        {sections.map((slides, i) => (
          <section key={slides[0]?.id ?? i}>
            {slides.map(slide => (
              <section
                key={slide.id}
                data-slide-id={slide.id}
                className={slideClassName(slide)}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: slide HTML is rendered at build time from our own markdown
                dangerouslySetInnerHTML={{__html: slide.html}}
              />
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}

export default RevealDeck
