const MOUSE_EVENT = 'mousemove'

let instance = null

export default class MousePosition {
  _mouseMoveHandler(evt) {
    this.x = evt.clientX
    return (this.y = evt.clientY)
  }

  constructor() {
    this._mouseMoveHandler = this._mouseMoveHandler.bind(this)
    if (instance) {
      return instance
    }
    instance = this
    this.x = this.y = 0
    document.addEventListener(MOUSE_EVENT, this._mouseMoveHandler, false)

    return instance
  }
}
