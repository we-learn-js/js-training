import firebaseConfig from './config/firebase'
import ChapterListService from './ChapterListService'

const loadFirebase = async () => {
  const firebase = await import('firebase')
  !firebase.apps.length && firebase.initializeApp(firebaseConfig)
  return firebase
}

const factories = {
  ChapterViewService: () => import('./ChapterViewService'),
  // Hack for parcel. with aync import markdowns were not loaded.
  ChapterListService: async () => ({ default: ChapterListService }),
  AuthWithGithubService: () => import('./AuthWithGithubService'),
  AuthWithGoogleService: () => import('./AuthWithGoogleService'),
  SignedInUserService: () => import('./SignedInUserService')
}

export default class JsTraining {
  async get(key) {
    const firebase = await loadFirebase()
    const Service = await factories[key]()
    return new Service.default({ firebase })
  }
}
