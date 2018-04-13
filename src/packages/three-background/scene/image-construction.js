import THREE from 'three'
import ImageSource from "../image/source"
import ImageProcessor from "../image/processor"
import ImageCubesMesh from "../mesh/image-cubes"
import RandomCubesMesh from "../mesh/random-cubes"
import PixelCubeMesh from "../mesh/cube-from-pixel"
import PixelCubesMesh from "../mesh/cubes-from-pixels"
import MainLight from "../light/main"
import CubePlacementAnimator from "../animator/cube-placement"
import GroundMesh from "../mesh/ground"

const backgroundColor = 0xefefef

export default class ImageConstruction {
  constructor(imgUrl) {
    this.imgUrl = imgUrl
    this._onLoadCallbacks = []
    this.fog = new THREE.Fog(backgroundColor, 1000, 1500)
    this.scene = new THREE.Scene()
    this.scene.fog = this.fog

    // Add meshes to the scene
    this.scene.add(new MainLight().light)
    this.scene.add(new GroundMesh().mesh)

    ImageSource.getFromUrl(this.imgUrl).then(image => {
      this.setPixelsGroups(image)
      this.addPixelsMesh(this.selectedPixels)
      this.addRandomCubesMesh(this.pixelsMesh.materials)
      this.addDisplacedPixelsMesh(this.discardedPixels)
      return Array.from(this._onLoadCallbacks).map(cb => cb())
    })

    return this
  }

  setPixelsGroups(image) {
    const processor = new ImageProcessor(image)
    let pixels = processor.getPixels()
    pixels = processor.removePixelsByRGB(pixels, 255, 255, 255)
    const pixelsGroups = processor.randomSplit(pixels, pixels.length * 0.5)
    this.selectedPixels = pixelsGroups[0]
    return (this.discardedPixels = pixelsGroups[1])
  }

  addPixelsMesh(pixels) {
    this.pixelsMesh = new ImageCubesMesh()
    this.pixelsMesh.addPixels(pixels)
    this.pixelsMesh.mesh.position.y = this.pixelsMesh.height / 2
    return this.scene.add(this.pixelsMesh.getMesh())
  }

  addRandomCubesMesh(materials) {
    this.randomMesh = new RandomCubesMesh()
    this.randomMesh.addRandomPixels(materials, 5000, 300, 300, 500)
    this.randomMesh.mesh.position.y = 1.5
    this.pixelsMesh.mesh.castShadow = true
    return this.scene.add(this.randomMesh.getMesh())
  }

  addDisplacedPixelsMesh(pixels) {
    this.animators = []
    return (() => {
      const result = []
      for (let pixel of Array.from(pixels)) {
        const mesh = new PixelCubeMesh(pixel)
        mesh.mesh.position.x -= this.pixelsMesh.width / 2
        const animator = new CubePlacementAnimator(mesh.mesh, 400, 400, 700)
        result.push(this.animators.push(animator))
      }
      return result
    })()
  }

  getMainMesh() {
    return this.pixelsMesh.mesh
  }

  getCubeAnimator() {
    if (this.animators.length === 0) {
      return
    }
    const idx = Math.floor(Math.random() * this.animators.length)
    const animator = this.animators[idx]
    this.animators.splice(idx, 1)
    this.scene.add(animator.mesh)
    animator.animate()
    return animator
  }

  addHelpers() {
    return this.scene.add(new THREE.AxisHelper(500))
  }

  onLoad(callback) {
    return this._onLoadCallbacks.push(callback)
  }
}
