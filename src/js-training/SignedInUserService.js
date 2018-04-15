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
            resolve({ displayName, email, uid, photoURL })
          } else {
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
