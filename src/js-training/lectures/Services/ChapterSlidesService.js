import { CDN_URL } from '../../config/constants'
import ChaptersRepository from '../Repositories/ChaptersRepository'

import SignedInUserService from '../../user/Services/SignedInUserService'

const RAW_GITHUB = CDN_URL + '/src/md/images/'
const VERTICAL_SEP = /<!--slide-->/gm
const HORIZONTAL_SEP = /<!--section-->/gm
const NOTE_REGEX = /Note:\s?([\w\s\`\.\[\]\/\(\(\:\-\\*\,)|'\(\)\{\}"?’]+)\n/gm
const IMAGE_REGEX = /\.\/[\w-]+\/([\w\/-]+\.[a-z]{2,4})/g
const ATTRIBUTES_REGEX = /<!-- \.slide\:\s([\s\w='"-]+)\s-->/
const ATTRIBUTE_REGEX = /([\w-]+)=[\"|\']{1}([\w-]+)/

const parseMarkdown = markdown =>
  markdown
    .replace(NOTE_REGEX, '<aside class="notes">$1</aside>')
    .replace(IMAGE_REGEX, (str, p1) => `${RAW_GITHUB}${p1}`)

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
export default class ChapterSlidesService {
  constructor({ firebase }) {
    this.signedInUserService = new SignedInUserService({ firebase })
    this.repository = new ChaptersRepository()
  }
  async execute({ url }) {
    const { isTeacher } = await this.signedInUserService.execute()
    const chapter = await this.repository.findByUrl(url)
    chapter.slides = await fetch(chapter.url.rawMarkdown)
      .then(res => res.text())
      .then(markdown =>
        markdown
          .split(HORIZONTAL_SEP)
          .map(parseMarkdown)
          .map((sectionMd, i) =>
            sectionMd.split(VERTICAL_SEP).map((content, j) => {
              const { class: className = '' } = extractAttributes(content)
              return {
                id: `${url}/${i}/${j}`,
                content,
                isExercise: className.includes('questionSlide'),
                isSolution: className.includes('responseSlide'),
                isImportant: className.includes('alertSlide')
              }
            })
          )
      )
    return { ...chapter, masterMode: isTeacher }
  }
}
