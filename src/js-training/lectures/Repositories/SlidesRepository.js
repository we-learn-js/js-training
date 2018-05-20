import ChaptersRepository from '../Repositories/ChaptersRepository'
import { MD_FOLDER, RAW_PATH } from '../../config/chapters'

const RAW_GITHUB = RAW_PATH + MD_FOLDER + '/images/'
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

class SlidesRepository {
  constructor() {
    this.chaptersRepository = new ChaptersRepository()
  }
  async get({ chapterId }) {
    const chapter = await this.chaptersRepository.findById(chapterId)
    const slides = await fetch(chapter.url.rawMarkdown)
      .then(res => res.text())
      .then(markdown =>
        markdown
          .split(HORIZONTAL_SEP)
          .map(parseMarkdown)
          .map((sectionMd, i) =>
            sectionMd.split(VERTICAL_SEP).map((content, j) => {
              const { class: className = '' } = extractAttributes(content)
              return {
                id: `${chapter.url.route}/${i}/${j}`,
                content,
                isExercise: className.includes('questionSlide'),
                isSolution: className.includes('responseSlide'),
                isImportant: className.includes('alertSlide')
              }
            })
          )
      )
    return slides
  }
}

export default SlidesRepository
