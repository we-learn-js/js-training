import ChapterListService from './ChapterListService'
import SignedInUserService from './SignedInUserService'

const MASTER_EMAIL = 'davidbarna@gmail.com'

export default class ChapterViewService {
  constructor({ firebase }) {
    this.chapterListService = new ChapterListService({ firebase })
    this.signedInUserService = new SignedInUserService({ firebase })
  }
  async execute({ url }) {
    const [sections, { email }] = await Promise.all([
      this.chapterListService.execute(),
      this.signedInUserService.execute()
    ])
    const chapter = sections
      .reduce((res, { chapters }) => [...res, ...chapters])
      .filter(({ url: chapterUrl }) => chapterUrl.includes(url))[0]

    return { ...chapter, masterMode: MASTER_EMAIL === email }
  }
}
