export default class ImageSource {
  static getFromUrl(url) {
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = url

    return new Promise(function(resolve, reject) {
      image.addEventListener('load', event => resolve(event.target))
      return (image.onerror = evt => reject())
    })
  }
}
