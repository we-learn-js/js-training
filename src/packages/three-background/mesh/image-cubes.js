import PixelCubes from "./cubes-from-pixels"

export default class ImageCubesMesh extends PixelCubes {
  constructor() {
    super()
  }

  addPixels(pixels) {
    for (let pixel of Array.from(pixels)) {
      this.addPixel(
        pixel.red,
        pixel.green,
        pixel.blue,
        pixel.x,
        pixel.y,
        pixel.z
      )
    }

    this.centerGeometry()
    return this
  }
}
