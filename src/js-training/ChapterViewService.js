import ChapterListService from './ChapterListService'

export default class ChapterViewService {
  async execute({ url }) {
    console.log(url)
    const service = new ChapterListService()
    const sections = await service.execute()

    const chapter = sections
      .reduce((res, { chapters }) => [...res, ...chapters])
      .filter(({ url: chapterUrl }) => chapterUrl.includes(url))[0]
    return chapter
  }
}
