import PixelCubes from './cubes-from-pixels'

export default class RandomCubesMesh extends PixelCubes {
  addRandomPixels(materials, number, xRange = 0, yRange = 0, zRange = 0) {
    while (number > 0) {
      const materialIdx = Math.floor(materials.length * Math.random())
      const material = materials[materialIdx]

      const x = Math.floor(Math.random() * xRange)
      const y = Math.floor(Math.random() * yRange)
      const z = Math.floor(Math.random() * zRange)
      const {color} = material

      this.addPixel(color.r * 255, color.g * 255, color.b * 255, x, y, z)
      number--
    }

    return this.centerGeometry()
  }
}
