import firebaseConfig from './config/firebase'
import bus from './bus'
import ChapterSlidesService from './lectures/Services/ChapterSlidesService'

const loadFirebase = async () => {
  await import('@firebase/auth')
  const {firebase} = await import('@firebase/app')
  !firebase.apps.length && firebase.initializeApp(firebaseConfig)
  return firebase
}

const factories = {
  ChapterListService: () => import('./lectures/Services/ChapterListService'),
  ChapterSlidesService: () => ({default: ChapterSlidesService}),
  AuthWithGithubService: () => import('./user/Services/AuthWithGithubService'),
  AuthWithGoogleService: () => import('./user/Services/AuthWithGoogleService'),
  SignOutUserService: () => import('./user/Services/SignOutUserService'),
  SignedInUserService: () => import('./user/Services/SignedInUserService'),
  SlideViewService: () => import('./lectures/Services/SlideViewService')
}

export default class JsTraining {
  async get(key) {
    const firebase = await loadFirebase()
    const Service = await factories[key]()
    return new Service.default({firebase})
  }

  async on(event, callback) {
    bus.addListener(event, callback)
  }

  async off(event, callback) {
    bus.addListener(event, callback)
  }
}
