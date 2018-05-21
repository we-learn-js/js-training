import ChaptersRepository from '../Repositories/ChaptersRepository'
import { MD_FOLDER, RAW_PATH } from '../../config/chapters'

const RAW_GITHUB = RAW_PATH + MD_FOLDER + '/images/'
const VERTICAL_SEP = /<!--slide-->/gm
const HORIZONTAL_SEP = /<!--section-->/gm
const NOTE_REGEX = /Note:\s?([\w\s\`\.\[\]\/\(\(\:\-\\*\,)|'\(\)\{\}"?’]+)\n/gm
const IMAGE_REGEX = /\.\/[\w-]+\/([\w\/-]+\.[a-z]{2,4})/g
const ATTRIBUTES_REGEX = /<!-- \.slide\:\s([\s\w='"-]+)\s-->/
const ATTRIBUTE_REGEX = /([\w-]+)=[\"|\']{1}([\w-]+)/
const SEP = '-'

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

const getSlideId = (chapter, sectionNum, slideNum) =>
  `${chapter.url.route}${SEP}${chapter.id}${SEP}${sectionNum}${SEP}${slideNum}`

const parseSlideId = slideId => {
  const [, chapterId, sectionNum, slideNum] = slideId.split(SEP).map(Number)
  return { chapterId, sectionNum, slideNum }
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
                id: getSlideId(chapter, i, j),
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

  async getSlide({ slideId }) {
    const { chapterId } = parseSlideId(slideId)
    const slides = await this.get({ chapterId })
    return [].concat(...slides).find(slide => slideId === slide.id)
  }
}

export default SlidesRepository
