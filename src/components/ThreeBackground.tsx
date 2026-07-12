import {useEffect, useRef} from 'react'

type Scene = {
  appendTo: (el: HTMLElement) => void
  resize: () => void
  destroy: () => void
}

type Props = {
  imageUrl: string
}

// Decorative homepage hero: the js-training logo rebuilt from 3d cubes.
// Loaded as a client:idle island so it never blocks the page.
const ThreeBackground = ({imageUrl}: Props) => {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scene: Scene | null = null
    let disposed = false
    const onResize = () => scene?.resize()

    import('../packages/three-background/image-construction/index.js').then(
      ({default: ImageConstruction}) => {
        if (disposed || !el.current) return
        scene = new ImageConstruction(imageUrl) as Scene
        scene.appendTo(el.current)
        window.addEventListener('resize', onResize)
      }
    )

    return () => {
      disposed = true
      window.removeEventListener('resize', onResize)
      scene?.destroy()
    }
  }, [imageUrl])

  return (
    <div
      style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
      ref={el}
    />
  )
}

export default ThreeBackground
