import ChapterListService from './ChapterListService'
import SignedInUserService from './SignedInUserService'
import markdownImages from './config/md-images'

const MASTER_EMAIL = 'davidbarna@gmail.com'
const VERTICAL_SEP = /\n<!--slide-->/gm
const HORIZONTAL_SEP = /^\n<!--section-->/gm
const NOTE_REGEX = /^Note:\s?([\w\s\`\.\[\]\/\(\(\:\-\\*\,)]+)$/gm
const IMAGE_REGEX = /\.\/[\w-]+\/([\w\/-]+\.[a-z]{2,4})/g

const parseMarkdown = markdown =>
  markdown
    .replace(NOTE_REGEX, '<aside class="notes">$1</aside>')
    .replace(IMAGE_REGEX, (str, p1) => markdownImages[p1].url)

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
    chapter.slides = await fetch(chapter.markdownUrl)
      .then(res => res.text())
      .then(markdown =>
        markdown
          .split(HORIZONTAL_SEP)
          .map(parseMarkdown)
          .map(sectionMd => [...sectionMd.split(VERTICAL_SEP)])
      )
    return { ...chapter, masterMode: MASTER_EMAIL === email }
  }
}
