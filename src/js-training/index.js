const factories = {
  ChapterViewService: () => import('./ChapterViewService'),
  ChapterListService: () => import('./ChapterListService')
}

export default class JsTraining {
  async get(key) {
    const Service = await factories[key]()
    return new Service.default()
  }
}
