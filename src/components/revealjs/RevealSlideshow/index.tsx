import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import revealConfig from '../../../lib/config/reveal'
import Prism from 'prismjs'

type Props = {
  children: React.ReactNode
  className?: string
  onSlideChange?: (event: {slideId: string}) => void
}

let revealDOM: HTMLDivElement | null = null
let slidesDOM: HTMLDivElement | null = null

const getOrCreateRevealDOM = (className?: string): [HTMLDivElement, HTMLDivElement] => {
  if (!revealDOM) {
    slidesDOM = document.createElement('div')
    slidesDOM.className = 'slides'
    revealDOM = document.createElement('div')
    revealDOM.className = className ? `reveal ${className}` : 'reveal'
    revealDOM.appendChild(slidesDOM)
  }
  return [revealDOM, slidesDOM!]
}

const highlightCode = () => {
  document.querySelectorAll('pre code').forEach(el => {
    if (el.firstChild) {
      el.innerHTML = Prism.highlight(
        el.firstChild.nodeValue ?? '',
        Prism.languages.javascript,
        'javascript'
      )
    }
  })
}

const RevealSlideshow = ({children, className, onSlideChange}: Props) => {
  const [mounted, setMounted] = useState(false)
  const onSlideChangeRef = useRef(onSlideChange)
  const slidesDOMRef = useRef<HTMLDivElement | null>(null)
  onSlideChangeRef.current = onSlideChange

  useEffect(() => {
    const [rDOM, sDOM] = getOrCreateRevealDOM(className)
    slidesDOMRef.current = sDOM

    const handleSlideChange = ({currentSlide}: {currentSlide: Element}) => {
      onSlideChangeRef.current?.({
        slideId: currentSlide.getAttribute('data-slide-id') ?? '',
      })
    }

    const init = async () => {
      await Promise.all([
        import('prismjs/themes/prism-okaidia.css'),
        import('./index.scss'),
        import('reveal.js/lib/js/head.min.js'),
      ])

      const revealMod = await import('reveal.js/js/reveal.js')
      const Reveal = revealMod.default ?? revealMod
      ;(window as any).Reveal = Reveal

      document.body.insertBefore(rDOM, document.body.firstChild)
      setMounted(true)

      if ((window as any).revealReactPresentationAlreadyLoaded) {
        Reveal.sync()
        Reveal.slide(0, 0, 0)
        highlightCode()
      } else {
        Reveal.initialize(revealConfig)
        Reveal.addEventListener('ready', highlightCode)
        ;(window as any).revealReactPresentationAlreadyLoaded = true
      }

      if (onSlideChangeRef.current) {
        Reveal.addEventListener('slidechanged', handleSlideChange)
      }
    }

    init()

    return () => {
      if (rDOM.parentNode) {
        document.body.removeChild(rDOM)
      }
      const R = (window as any).Reveal
      if (R) {
        R.removeEventListener('slidechanged', handleSlideChange)
        R.removeEventListeners()
      }
    }
  }, [])

  if (!mounted || !slidesDOMRef.current) return null
  return ReactDOM.createPortal(children, slidesDOMRef.current)
}

export default RevealSlideshow
