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
