export const MD_FOLDER = 'src/md/'
export const REPO_NAME = 'we-learn-js/js-training/'
export const BRANCH_NAME = 'v2'
export const RAW_PATH = `https://raw.githubusercontent.com/${REPO_NAME}${BRANCH_NAME}/`
export const CODE_PATH = `https://github.com/${REPO_NAME}blob/${BRANCH_NAME}/`
export const WIKI_PATH = `https://github.com/${REPO_NAME}wiki/`
export const CHAPTERS = [
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
export const SECTIONS = [
  { title: 'Intro', chapters: [0] },
  { title: 'Syntax', chapters: [1, 2, 3, 4, 5, 6, 7] },
  { title: 'Core Concepts', chapters: [8, 9, 10] },
  { title: 'APIs', chapters: [11, 12, 13] },
  { title: 'Programming', chapters: [14, 15, 16, 17, 18] }
]
