import bus from "../../bus"

const MASTER_EMAIL = 'davidbarna@gmail.com'

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
            const userVO = {
              displayName,
              email,
              uid,
              photoURL,
              isTeacher: MASTER_EMAIL === email
            }
            bus.emit('UserHasChanged', {
              user: userVO
            })
            resolve(userVO)
          } else {
            bus.emit('UserHasChanged', { user: null })
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
