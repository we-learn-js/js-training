export default [
  {
    section: 'Intro',
    chapters: [
      {
        title: 'Presentation',
        markdownUrl: require('../../md/Presentation.md')
      }
    ]
  },
  {
    section: 'Syntax',
    chapters: [
      { title: 'Operators', markdownUrl: require('../../md/Operators.md') },
      { title: 'Objects', markdownUrl: require('../../md/Objects.md') },
      { title: 'Strings', markdownUrl: require('../../md/Strings.md') },
      { title: 'Classes', markdownUrl: require('../../md/Classes.md') },
      { title: 'Symbols', markdownUrl: require('../../md/Symbols.md') },
      { title: 'Modules', markdownUrl: require('../../md/Modules.md') },
      {
        title: 'Iterators And Generators',
        markdownUrl: require('../../md/IteratorsAndGenerators.md')
      }
    ]
  },
  {
    section: 'Core Concepts',
    chapters: [
      {
        title: 'Scopes And Closures',
        markdownUrl: require('../../md/ScopesAndClosures.md')
      },
      { title: 'Functions', markdownUrl: require('../../md/Functions.md') },
      {
        title: 'Async Programming',
        markdownUrl: require('../../md/AsyncProgramming.md')
      }
    ]
  },
  {
    section: 'APIs',
    chapters: [
      { title: 'React', markdownUrl: require('../../md/React.md') },
      { title: 'Testing', markdownUrl: require('../../md/Testing.md') },
      {
        title: 'Web Animations API',
        markdownUrl: require('../../md/WebAnimationsAPI.md')
      }
    ]
  },
  {
    section: 'Programming',
    chapters: [
      {
        title: 'Functional Programming',
        markdownUrl: require('../../md/FunctionalProgramming.md')
      },
      {
        title: 'Object-Oriented Programming',
        markdownUrl: require('../../md/ObjectOrientedProgramming.md')
      },
      {
        title: 'Object-Oriented Design Principles',
        markdownUrl: require('../../md/ObjectOrientedDesignPrinciples.md')
      },
      {
        title: 'Design Patterns',
        markdownUrl: require('../../md/DesignPatterns.md')
      },
      {
        title: 'Domain Driven Design',
        markdownUrl: require('../../md/DomainDrivenDesign.md')
      }
    ]
  }
]
