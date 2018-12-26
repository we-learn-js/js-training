import {
  MD_FOLDER,
  RAW_PATH,
  CODE_PATH,
  WIKI_PATH,
  CHAPTERS,
  SECTIONS
} from '../../config/chapters'
import paramCase from 'param-case'

const getUrlFromTitle = title => `/${paramCase(title)}`
const configToChapter = ({id, title, markdownName}) => ({
  id,
  title,
  url: {
    route: getUrlFromTitle(title),
    wiki: WIKI_PATH + markdownName.replace('.md', ''),
    markdown: CODE_PATH + MD_FOLDER + markdownName,
    rawMarkdown: RAW_PATH + MD_FOLDER + markdownName
  }
})

class ChaptersRepository {
  async get() {
    return CHAPTERS.map(configToChapter)
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

  async findByUrl(url) {
    return configToChapter(
      CHAPTERS.find(({title}) => url === getUrlFromTitle(title))
    )
  }

  async findById(chapterId) {
    return configToChapter(CHAPTERS.find(({id}) => id === chapterId))
  }
}

export default ChaptersRepository
