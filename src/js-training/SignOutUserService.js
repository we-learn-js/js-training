import bus from './bus'
export default class SignOutService {
  constructor({ firebase }) {
    this.firebase = firebase
  }
  execute() {
    return new Promise((resolve, reject) => {
      this.firebase
        .auth()
        .signOut()
        .then(() => {
          resolve()
          bus.emit('UserSignedIn')
        }, reject)
    })
  }
}
