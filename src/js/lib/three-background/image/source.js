export default class ImageSource {
  static getFromUrl(url) {
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = url

    return new Promise(function(resolve, reject) {
      image.onload = function() {
        return resolve(this)
      }
      return (image.onerror = evt => reject())
    })
  }
}
