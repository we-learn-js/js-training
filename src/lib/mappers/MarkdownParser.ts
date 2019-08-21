import {MD_FOLDER, MD_IMAGES, RAW_PATH} from '../config/chapters'

const RAW_GITHUB_IMGS = RAW_PATH + MD_FOLDER + '/images/'
const VERTICAL_SEP = /<!--slide-->/gm
const HORIZONTAL_SEP = /<!--section-->/gm
const NOTE_REGEX = /Note:\s?([\w\s\`\.\[\]\/\(\(\:\-\\*\,)|'\(\)\{\}"?’]+)\n/gm
const IMAGE_REGEX = /\.\/[\w-]+\/(([\w\/-]+)\.[a-z]{2,4})/g
const ATTRIBUTES_REGEX = /<!-- \.slide\:\s([\s\w='"-]+)\s-->/
const ATTRIBUTE_REGEX = /([\w-]+)=[\"|\']{1}([\w-]+)/
const SEP = '-'

const parseMarkdown = rawMarkdown =>
  rawMarkdown
    .replace(NOTE_REGEX, '<aside class="notes">$1</aside>')
    .replace(
      IMAGE_REGEX,
      (str, file, fileName) =>
        MD_IMAGES[fileName] || `${RAW_GITHUB_IMGS}${file}`
    )

const extractAttributes = (
  rawMarkdown
): {class: string, [key: string]: string} => {
  const attrsMatch = rawMarkdown.match(ATTRIBUTES_REGEX)
  if (attrsMatch) {
    const [, ...keyValues] = attrsMatch[1].match(ATTRIBUTE_REGEX)
    const [key, value] = keyValues
    return {[key]: value}
  } else {
    return {}
  }
}

type Slide = {
  id: string,
  content: string,
  isExercise: boolean,
  isSolution: boolean,
  isImportant: boolean
}
const getSlideId = (preflix, sectionNum, slideNum) =>
  `${preflix}${SEP}${sectionNum}${SEP}${slideNum}`

class MarkdownParser {
  static parseSlides(rawMarkdown: string, prefix?: string): Slide[] {
    const slides = rawMarkdown
      .split(HORIZONTAL_SEP)
      .map(parseMarkdown)
      .map((sectionMd, i) =>
        sectionMd.split(VERTICAL_SEP).map((content, j) => {
          const {class: className = ''} = extractAttributes(content)
          return {
            id: getSlideId(prefix, i, j),
            content,
            isExercise: className.includes('questionSlide'),
            isSolution: className.includes('responseSlide'),
            isImportant: className.includes('alertSlide')
          }
        })
      )
    return slides
  }
}

export default MarkdownParser
