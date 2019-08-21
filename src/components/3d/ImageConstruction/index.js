import React from 'react'
import {withLowPriority} from '../../hoc/Priority'

const styles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

class ImageConstruction3d extends React.Component {
  async componentDidMount() {
    const imageUrl = (await import('./images/logo-small.png')).default
    const UnderConstruction = (await import('../../../packages/three-background/image-construction'))
      .default
    this.scene = new UnderConstruction(imageUrl)
    this.scene.appendTo(this.element)
    this.resizeHandler = () => this.scene.resize()
    window.addEventListener('resize', this.resizeHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
    this.scene.destroy()
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div style={styles} ref={el => (this.element = el)} />
  }
}

export default withLowPriority(ImageConstruction3d)
