export default class ImagePixel {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  setRBG(red, green, blue) {
    if (red == null) {
      red = 0
    }
    this.red = red
    if (green == null) {
      green = 0
    }
    this.green = green
    if (blue == null) {
      blue = 0
    }
    this.blue = blue
    return this
  }
}
