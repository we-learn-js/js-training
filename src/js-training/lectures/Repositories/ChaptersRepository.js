import {
  MD_FOLDER,
  RAW_PATH,
  CODE_PATH,
  WIKI_PATH,
  CHAPTERS,
  SECTIONS
} from '../../config/chapters'
import paramCase from 'param-case'

class ChaptersRepository {
  async get() {
    return CHAPTERS.map(({ id, title, markdownName }) => ({
      id,
      title,
      url: {
        route: `/${paramCase(title)}`,
        wiki: WIKI_PATH + markdownName.replace('.md', ''),
        markdown: CODE_PATH + MD_FOLDER + markdownName,
        rawMarkdown: RAW_PATH + MD_FOLDER + markdownName
      }
    }))
  }

  async getBySections() {
    const chapters = await this.get()
    return SECTIONS.map(section => ({
      title: section.title,
      chapters: section.chapters.map(chapterId =>
        chapters.find(chapter => chapter.id === chapterId)
      )
    }))
  }
}

export default ChaptersRepository
