import firebaseConfig from './config/firebase'

const loadFirebase = async () => {
  const firebase = await import('firebase')
  !firebase.apps.length && firebase.initializeApp(firebaseConfig)
  return firebase
}

const factories = {
  ChapterViewService: () => import('./ChapterViewService'),
  ChapterListService: () => import('./ChapterListService'),
  AuthWithGithubService: () => import('./AuthWithGithubService'),
  AuthWithGoogleService: () => import('./AuthWithGoogleService')
}

export default class JsTraining {
  async get(key) {
    const firebase = await loadFirebase()
    const Service = await factories[key]()
    return new Service.default({ firebase })
  }
}
