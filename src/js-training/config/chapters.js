const getGithubUrl = file =>
  `https://raw.githubusercontent.com/we-learn-js/js-training/js-training-v2/src${file}`
export default [
  {
    section: 'Intro',
    chapters: [
      {
        title: 'Presentation',
        markdownUrl: getGithubUrl('/md/Presentation.md')
      }
    ]
  },
  {
    section: 'Syntax',
    chapters: [
      {
        title: 'Operators',
        markdownUrl: getGithubUrl('/md/Operators.md')
      },
      { title: 'Objects', markdownUrl: getGithubUrl('/md/Objects.md') },
      { title: 'Strings', markdownUrl: getGithubUrl('/md/Strings.md') },
      { title: 'Classes', markdownUrl: getGithubUrl('/md/Classes.md') },
      { title: 'Symbols', markdownUrl: getGithubUrl('/md/Symbols.md') },
      { title: 'Modules', markdownUrl: getGithubUrl('/md/Modules.md') },
      {
        title: 'Iterators And Generators',
        markdownUrl: getGithubUrl('/md/IteratorsAndGenerators.md')
      }
    ]
  },
  {
    section: 'Core Concepts',
    chapters: [
      {
        title: 'Scopes And Closures',
        markdownUrl: getGithubUrl('/md/ScopesAndClosures.md')
      },
      {
        title: 'Functions',
        markdownUrl: getGithubUrl('/md/Functions.md')
      },
      {
        title: 'Async Programming',
        markdownUrl: getGithubUrl('/md/AsyncProgramming.md')
      }
    ]
  },
  {
    section: 'APIs',
    chapters: [
      { title: 'React', markdownUrl: getGithubUrl('/md/React.md') },
      { title: 'Testing', markdownUrl: getGithubUrl('/md/Testing.md') },
      {
        title: 'Web Animations API',
        markdownUrl: getGithubUrl('/md/WebAnimationsAPI.md')
      }
    ]
  },
  {
    section: 'Programming',
    chapters: [
      {
        title: 'Functional Programming',
        markdownUrl: getGithubUrl('/md/FunctionalProgramming.md')
      },
      {
        title: 'Object-Oriented Programming',
        markdownUrl: getGithubUrl('/md/ObjectOrientedProgramming.md')
      },
      {
        title: 'Object-Oriented Design Principles',
        markdownUrl: getGithubUrl('/md/ObjectOrientedDesignPrinciples.md')
      },
      {
        title: 'Design Patterns',
        markdownUrl: getGithubUrl('/md/DesignPatterns.md')
      },
      {
        title: 'Domain Driven Design',
        markdownUrl: getGithubUrl('/md/DomainDrivenDesign.md')
      }
    ]
  }
]
