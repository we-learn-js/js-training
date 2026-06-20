import {MD_FOLDER, MD_IMAGES, RAW_PATH} from '../config/chapters'

const RAW_GITHUB_IMGS = RAW_PATH + MD_FOLDER + '/images/'
const VERTICAL_SEP = /<!--slide-->/gm
const HORIZONTAL_SEP = /<!--section-->/gm
const NOTE_REGEX = /Note:\s?([\w\s\`\.\[\]\/\(\(\:\-\\*\,)|'\(\)\{\}"?']+)\n/gm
const IMAGE_REGEX = /\.\/[\w-]+\/(([\w\/-]+)\.[a-z]{2,4})/g
const ATTRIBUTES_REGEX = /<!-- \.slide\:\s([\s\w='"-]+)\s-->/
const ATTRIBUTE_REGEX = /([\w-]+)=[\"|\']{1}([\w-]+)/

type SlideAttributes = {class?: string; [key: string]: string | undefined}

export type Slide = {
  id: string
  content: string
  isExercise: boolean
  isSolution: boolean
  isImportant: boolean
}

const replaceNote = (_: string, note: string) =>
  `<aside class="notes">${note}</aside>`

const replaceImage = (_: string, file: string, fileName: string) =>
  MD_IMAGES[fileName] || `${RAW_GITHUB_IMGS}${file}`

const processMarkdown = (rawMarkdown: string): string =>
  rawMarkdown
    .replace(NOTE_REGEX, replaceNote)
    .replace(IMAGE_REGEX, replaceImage)

const extractAttributes = (rawMarkdown: string): SlideAttributes => {
  const attrsMatch = rawMarkdown.match(ATTRIBUTES_REGEX)
  if (!attrsMatch) return {}
  const pairs = attrsMatch[1].match(ATTRIBUTE_REGEX)
  if (!pairs) return {}
  const [, key, value] = pairs
  return {[key]: value}
}

const slideId = (prefix: string, section: number, slide: number): string =>
  `${prefix}-${section}-${slide}`

export const parseSlides = (rawMarkdown: string, prefix = ''): Slide[][] =>
  rawMarkdown
    .split(HORIZONTAL_SEP)
    .map(processMarkdown)
    .map((sectionMd, i) =>
      sectionMd.split(VERTICAL_SEP).map((content, j) => {
        const {class: className = ''} = extractAttributes(content)
        return {
          id: slideId(prefix, i, j),
          content,
          isExercise: className.includes('questionSlide'),
          isSolution: className.includes('responseSlide'),
          isImportant: className.includes('alertSlide'),
        }
      })
    )
