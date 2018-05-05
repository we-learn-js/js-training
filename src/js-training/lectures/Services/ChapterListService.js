import paramCase from 'param-case'
import chapters from '../../config/chapters'

export default class ChapterListService {
  async execute() {
    return chapters.map(({ section, chapters }) => ({
      title: section,
      chapters: chapters.map(({ url, title, markdownUrl }) => {
        return {
          title,
          url: `/${paramCase(title)}`,
          markdownUrl
        }
      })
    }))
  }
}
