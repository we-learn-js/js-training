import { CDN_URL } from './constants'

const cacheHash = String(Math.random())
const getUrl = file => `${CDN_URL}/src/md/${file}.md?${cacheHash}`

export default [
  {
    section: 'Intro',
    chapters: [
      {
        title: 'Presentation',
        markdownUrl: getUrl('Presentation')
      }
    ]
  },
  {
    section: 'Syntax',
    chapters: [
      {
        title: 'Operators',
        markdownUrl: getUrl('Operators')
      },
      { title: 'Objects', markdownUrl: getUrl('Objects') },
      { title: 'Strings', markdownUrl: getUrl('Strings') },
      { title: 'Classes', markdownUrl: getUrl('Classes') },
      { title: 'Symbols', markdownUrl: getUrl('Symbols') },
      { title: 'Modules', markdownUrl: getUrl('Modules') },
      {
        title: 'Iterators And Generators',
        markdownUrl: getUrl('IteratorsAndGenerators')
      }
    ]
  },
  {
    section: 'Core Concepts',
    chapters: [
      {
        title: 'Scopes And Closures',
        markdownUrl: getUrl('ScopesAndClosures')
      },
      {
        title: 'Functions',
        markdownUrl: getUrl('Functions')
      },
      {
        title: 'Async Programming',
        markdownUrl: getUrl('AsyncProgramming')
      }
    ]
  },
  {
    section: 'APIs',
    chapters: [
      { title: 'React', markdownUrl: getUrl('React') },
      { title: 'Testing', markdownUrl: getUrl('Testing') },
      {
        title: 'Web Animations API',
        markdownUrl: getUrl('WebAnimationsAPI')
      }
    ]
  },
  {
    section: 'Programming',
    chapters: [
      {
        title: 'Functional Programming',
        markdownUrl: getUrl('FunctionalProgramming')
      },
      {
        title: 'Object-Oriented Programming',
        markdownUrl: getUrl('ObjectOrientedProgramming')
      },
      {
        title: 'Object-Oriented Design Principles',
        markdownUrl: getUrl('ObjectOrientedDesignPrinciples')
      },
      {
        title: 'Design Patterns',
        markdownUrl: getUrl('DesignPatterns')
      },
      {
        title: 'Domain Driven Design',
        markdownUrl: getUrl('DomainDrivenDesign')
      }
    ]
  }
]

const MD_FOLDER = 'src/md/'
const REPO_NAME = 'we-learn-js/js-training/'
const BRANCH_NAME = 'v2'
const RAW_PATH = `https://raw.githubusercontent.com/${REPO_NAME}${BRANCH_NAME}/`
const CODE_PATH = `https://github.com/${REPO_NAME}blob/${BRANCH_NAME}/`
const WIKI_PATH = `https://github.com/${REPO_NAME}wiki/`
const CHAPTERS = [
  {
    id: 0,
    title: 'Presentation',
    markdownName: 'Presentation.md'
  },
  {
    id: 1,
    title: 'Operators',
    markdownName: 'Operators.md'
  },
  { id: 2, title: 'Objects', markdownName: 'Objects.md' },
  { id: 3, title: 'Strings', markdownName: 'Strings.md' },
  { id: 4, title: 'Classes', markdownName: 'Classes.md' },
  { id: 5, title: 'Symbols', markdownName: 'Symbols.md' },
  { id: 6, title: 'Modules', markdownName: 'Modules.md' },
  {
    id: 7,
    title: 'Iterators And Generators',
    markdownName: 'IteratorsAndGenerators.md'
  },
  {
    id: 8,
    title: 'Scopes And Closures',
    markdownName: 'ScopesAndClosures.md'
  },
  {
    id: 9,
    title: 'Functions',
    markdownName: 'Functions.md'
  },
  {
    id: 10,
    title: 'Async Programming',
    markdownName: 'AsyncProgramming.md'
  },
  { id: 11, title: 'React', markdownName: 'React.md' },
  { id: 12, title: 'Testing', markdownName: 'Testing.md' },
  {
    id: 13,
    title: 'Web Animations API',
    markdownName: 'WebAnimationsAPI.md'
  },
  {
    id: 14,
    title: 'Functional Programming',
    markdownName: 'FunctionalProgramming.md'
  },
  {
    id: 15,
    title: 'Object-Oriented Programming',
    markdownName: 'ObjectOrientedProgramming.md'
  },
  {
    id: 16,
    title: 'Object-Oriented Design Principles',
    markdownName: 'ObjectOrientedDesignPrinciples.md'
  },
  {
    id: 17,
    title: 'Design Patterns',
    markdownName: 'DesignPatterns.md'
  },
  {
    id: 18,
    title: 'Domain Driven Design',
    markdownName: 'DomainDrivenDesign.md'
  }
]
const SECTIONS = [
  { title: 'Intro', chapters: [0] },
  { title: 'Syntax', chapters: [1, 2, 3, 4, 5, 6, 7] },
  { title: 'Core Concepts', chapters: [8, 9, 10] },
  { title: 'APIs', chapters: [11, 12, 13] },
  { title: 'Programming', chapters: [14, 15, 16, 17, 18] }
]

export { RAW_PATH, CODE_PATH, WIKI_PATH, MD_FOLDER, CHAPTERS, SECTIONS }
