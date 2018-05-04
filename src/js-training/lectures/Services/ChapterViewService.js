import ChapterListService from "./ChapterListService"
import SignedInUserService from "../../user/Services/SignedInUserService"
import markdownImages from "../../config/md-images"

const VERTICAL_SEP = /<!--slide-->/gm
const HORIZONTAL_SEP = /<!--section-->/gm
const NOTE_REGEX = /Note:\s?([\w\s\`\.\[\]\/\(\(\:\-\\*\,)|'\(\)\{\}"?’]+)\n/gm
const IMAGE_REGEX = /\.\/[\w-]+\/([\w\/-]+\.[a-z]{2,4})/g
const ATTRIBUTES_REGEX = /<!-- \.slide\:\s([\s\w='"-]+)\s-->/
const ATTRIBUTE_REGEX = /([\w-]+)=[\"|\']{1}([\w-]+)/

const parseMarkdown = markdown =>
  markdown
    .replace(NOTE_REGEX, '<aside class="notes">$1</aside>')
    .replace(IMAGE_REGEX, (str, p1) => markdownImages[p1].url)

const extractAttributes = markdown => {
  const attrsMatch = markdown.match(ATTRIBUTES_REGEX)
  if (attrsMatch) {
    const [, ...keyValues] = attrsMatch[1].match(ATTRIBUTE_REGEX)
    const [key, value] = keyValues
    return { [key]: value }
  } else {
    return {}
  }
}
export default class ChapterViewService {
  constructor({ firebase }) {
    this.chapterListService = new ChapterListService({ firebase })
    this.signedInUserService = new SignedInUserService({ firebase })
  }
  async execute({ url }) {
    const [sections, { isTeacher }] = await Promise.all([
      this.chapterListService.execute(),
      this.signedInUserService.execute()
    ])

    const chapter = sections
      .reduce((res, { chapters }) => [...res, ...chapters], [])
      .filter(({ url: chapterUrl }) => chapterUrl.includes(url))[0]

    chapter.slides = await fetch(chapter.markdownUrl)
      .then(res => res.text())
      .then(markdown =>
        markdown
          .split(HORIZONTAL_SEP)
          .map(parseMarkdown)
          .map(sectionMd =>
            sectionMd.split(VERTICAL_SEP).map(content => ({
              attributes: extractAttributes(content),
              content
            }))
          )
      )
    return { ...chapter, masterMode: isTeacher }
  }
}
