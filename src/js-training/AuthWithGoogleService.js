export default class AuthWithGithubService {
  constructor({ firebase }) {
    this.firebase = firebase
  }
  async execute() {
    var provider = new this.firebase.auth.GoogleAuthProvider()
    const {
      user: { displayName, email }
    } = await this.firebase.auth().signInWithPopup(provider)
    return { displayName, email }
  }
}
