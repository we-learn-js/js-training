const getGithubUrl = file =>
  `https://raw.githubusercontent.com/we-learn-js/js-training/v2${file}`
export default [
  {
    section: 'Intro',
    chapters: [
      {
        title: 'Presentation',
        markdownUrl: getGithubUrl('/src/md/Presentation.md')
      }
    ]
  },
  {
    section: 'Syntax',
    chapters: [
      {
        title: 'Operators',
        markdownUrl: getGithubUrl('/src/md/Operators.md')
      },
      { title: 'Objects', markdownUrl: getGithubUrl('/src/md/Objects.md') },
      { title: 'Strings', markdownUrl: getGithubUrl('/src/md/Strings.md') },
      { title: 'Classes', markdownUrl: getGithubUrl('/src/md/Classes.md') },
      { title: 'Symbols', markdownUrl: getGithubUrl('/src/md/Symbols.md') },
      { title: 'Modules', markdownUrl: getGithubUrl('/src/md/Modules.md') },
      {
        title: 'Iterators And Generators',
        markdownUrl: getGithubUrl('/src/md/IteratorsAndGenerators.md')
      }
    ]
  },
  {
    section: 'Core Concepts',
    chapters: [
      {
        title: 'Scopes And Closures',
        markdownUrl: getGithubUrl('/src/md/ScopesAndClosures.md')
      },
      {
        title: 'Functions',
        markdownUrl: getGithubUrl('/src/md/Functions.md')
      },
      {
        title: 'Async Programming',
        markdownUrl: getGithubUrl('/src/md/AsyncProgramming.md')
      }
    ]
  },
  {
    section: 'APIs',
    chapters: [
      { title: 'React', markdownUrl: getGithubUrl('/src/md/React.md') },
      { title: 'Testing', markdownUrl: getGithubUrl('/src/md/Testing.md') },
      {
        title: 'Web Animations API',
        markdownUrl: getGithubUrl('/src/md/WebAnimationsAPI.md')
      }
    ]
  },
  {
    section: 'Programming',
    chapters: [
      {
        title: 'Functional Programming',
        markdownUrl: getGithubUrl('/src/md/FunctionalProgramming.md')
      },
      {
        title: 'Object-Oriented Programming',
        markdownUrl: getGithubUrl('/src/md/ObjectOrientedProgramming.md')
      },
      {
        title: 'Object-Oriented Design Principles',
        markdownUrl: getGithubUrl('/src/md/ObjectOrientedDesignPrinciples.md')
      },
      {
        title: 'Design Patterns',
        markdownUrl: getGithubUrl('/src/md/DesignPatterns.md')
      },
      {
        title: 'Domain Driven Design',
        markdownUrl: getGithubUrl('/src/md/DomainDrivenDesign.md')
      }
    ]
  }
]
