import MD_FILES from '../../md/*.md'
import MD_ASSETS from '../../md/**/*.(jpg|png)'

export const MD_IMAGES = Object.entries(MD_ASSETS.images).reduce(
  (images, [key, {jpg, png}]) => {
    images[key] = jpg || png
    return images
  },
  {}
)
export const MD_FOLDER = 'src/md/'
export const REPO_NAME = 'we-learn-js/js-training/'
export const BRANCH_NAME = 'v2'
export const RAW_PATH = `https://raw.githubusercontent.com/${REPO_NAME}${BRANCH_NAME}/`
export const CODE_PATH = `https://github.com/${REPO_NAME}blob/${BRANCH_NAME}/`
export const WIKI_PATH = `https://github.com/${REPO_NAME}wiki/`

export const CHAPTERS = Object.entries(MD_FILES).map(([key, path]) => {
  return {
    id: key,
    title: key,
    markdownName: path,
    markdownPath: path
  }
})
export const SECTIONS = [
  {title: 'Intro', chapters: ['Presentation']},
  {
    title: 'Syntax',
    chapters: [
      'Operators',
      'Objects',
      'Strings',
      'Classes',
      'Symbols',
      'Modules',
      'IteratorsAndGenerators'
    ]
  },
  {
    title: 'Core Concepts',
    chapters: ['ScopesAndClosures', 'Functions', 'AsyncProgramming']
  },
  {title: 'APIs', chapters: ['React', 'Testing', 'WebAnimationsAPI']},
  {
    title: 'Programming',
    chapters: [
      'FunctionalProgramming',
      'ObjectOrientedProgramming',
      'ObjectOrientedDesignPrinciples',
      'DesignPatterns',
      'DomainDrivenDesign'
    ]
  }
]
console.table(SECTIONS)
