import ImagePixel from "./pixel"
export default class ImageProcessor {
  constructor(image) {
    this.image = image
  }

  getImageData() {
    let height, width
    const canva = document.createElement('canvas')
    canva.width = width = this.image.width
    canva.height = height = this.image.height

    document.body.appendChild(canva)
    const context = canva.getContext('2d')
    context.drawImage(this.image, 0, 0)

    const imageData = context.getImageData(0, 0, width, height)
    document.body.removeChild(canva)

    return imageData
  }

  getPixels() {
    const imgData = this.getImageData()
    let col = 0
    let row = imgData.height
    const { data } = imgData
    const pixels = []

    for (let i = 0; i < data.length; i += 4) {
      const value = data[i]
      col++
      if (i % (imgData.width * 4) === 0) {
        col = 0
        row--
      }

      const pixel = new ImagePixel(col, row)
      pixel.setRBG(data[i], data[i + 1], data[i + 2])
      pixels.push(pixel)
    }

    return pixels
  }

  removePixelsByRGB(pixels, r, g, b) {
    const result = []
    for (let px of Array.from(pixels)) {
      if (px.red !== r && px.red !== g && px.red !== b) {
        result.push(px)
      }
    }

    return result
  }

  randomSplit(pixels, number) {
    const group2 = []
    while (number > 0) {
      const idx = Math.round(Math.random() * pixels.length)
      const pixel = pixels.splice(idx, 1)[0]
      if (!!pixel) {
        group2.push(pixel)
      }

      number--
    }

    return [pixels, group2]
  }
}
