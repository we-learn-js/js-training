import React, {useEffect, useRef} from 'react'
import {withLowPriority} from '../../hoc/Priority'

const styles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

const ImageConstruction3d = () => {
  const elRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let scene
    let onResize

    ;(async () => {
      const imageUrl = (await import('./images/logo-small.png')).default
      const UnderConstruction = (
        await import('../../../packages/three-background/image-construction')
      ).default
      if (cancelled) return
      scene = new UnderConstruction(imageUrl)
      scene.appendTo(elRef.current)
      onResize = () => scene.resize()
      window.addEventListener('resize', onResize)
    })()

    return () => {
      cancelled = true
      if (onResize) window.removeEventListener('resize', onResize)
      scene?.destroy()
    }
  }, [])

  return <div style={styles} ref={elRef} />
}

export default withLowPriority(ImageConstruction3d)
