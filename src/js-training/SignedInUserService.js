import bus from './bus'

export default class SignedInUserService {
  constructor({ firebase }) {
    this.firebase = firebase
  }
  execute({ timeout = 2000 } = {}) {
    return Promise.race([
      new Promise((resolve, reject) => {
        this.firebase.auth().onAuthStateChanged(user => {
          if (user) {
            const { displayName, email, uid, photoURL } = user
            bus.emit('UserSignedIn', { displayName, email, uid, photoURL })
            resolve({ displayName, email, uid, photoURL })
          } else {
            bus.emit('UserSignedIn')
            resolve(null)
          }
        })
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(null), timeout)
      })
    ])
  }
}
