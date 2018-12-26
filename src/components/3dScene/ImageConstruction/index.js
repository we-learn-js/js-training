import React from 'react'
import ImageUnderConstruction from '../../../packages/three-background/image-construction'
import imageUrl from './images/logo-small.png'
import {withLowPriority} from '../../HoC/Priority'

const styles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

class ImageConstruction3dScene extends React.Component {
  componentDidMount() {
    this.scene = new ImageUnderConstruction(imageUrl)
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

export default withLowPriority(ImageConstruction3dScene)
