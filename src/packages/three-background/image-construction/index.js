import THREE from 'three'
import ImageConstructionScene from '../scene/image-construction'
import MeshObserverViewport from '../viewport/mesh-observer'
import ImageUnderConstructionLighting from './lighting'
// import MeshPerspectiveViewPort from '../viewport/mesh-perspective'
// import CubeObserverViewPort from '../viewport/cube-observer'

export default class ImageUnderConstruction {
  constructor(imgUrl) {
    this.runningAnimations = []
    this.render = this.render.bind(this)
    this.imgUrl = imgUrl
    this.viewports = []
    this.scene = new ImageConstructionScene(this.imgUrl)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    // if (this.renderer.shadowMap) {
    //   this.renderer.shadowMap.enabled = true
    // } else {
    //   this.renderer.shadowMapEnabled = true
    // }
    this.renderer.setClearColor(this.scene.fog.color, 1)
    this.viewports.push(new MeshObserverViewport())
    // this.viewports.push(new MeshPerspectiveViewPort())
    // this.viewports.push(new CubeObserverViewPort())

    this.lighting = new ImageUnderConstructionLighting(this.scene.scene)
    // this.lighting.addHelpers()

    this.scene.onLoad(() => {
      this.viewports[0].setTargetMesh(this.scene.getMainMesh())

      const cubeAnimation = () => {
        this.runningAnimations.push(this.scene.getCubeAnimator())
        this.timeoutId = setTimeout(cubeAnimation, 300)
      }

      // this.viewports[1].lookAt(anim.xTarget, anim.yTarget, anim.zTarget)
      // this.viewports[1].setTargetMesh(anim.mesh)
      // this.viewports[2].lookAt(anim.xTarget, anim.yTarget, anim.zTarget)
      // this.viewports[2].setTargetMesh(anim.mesh)

      cubeAnimation()

      return this.render()
    })
  }

  appendTo(element) {
    this.element = element
    this.element.appendChild(this.renderer.domElement)
    this.resize()
    return this
  }

  resize() {
    return this.setSize(this.element.offsetWidth, this.element.offsetHeight)
  }

  setSize(width, height) {
    this.width = width
    this.height = height
    this.renderer.setSize(this.width, this.height)
    for (let viewport of Array.from(this.viewports)) {
      const v = viewport
      v.setSize(this.width, this.height)
    }
    return this
  }

  render() {
    for (let v of Array.from(this.viewports)) {
      v.updateCamera()
      this.renderer.setViewport(v.left, v.bottom, v.width, v.height)
      this.renderer.setScissor(v.left, v.bottom, v.width, v.height)
      this.renderer.render(this.scene.scene, v.camera)
    }

    this.animationFrameRequestId = requestAnimationFrame(this.render)
  }

  destroy() {
    this.timeoutId && clearTimeout(this.timeoutId)
    this.animationFrameRequestId &&
      cancelAnimationFrame(this.animationFrameRequestId)
    this.runningAnimations.forEach(anim => anim.cancel())
    this.element.removeChild(this.renderer.domElement)
  }
}
