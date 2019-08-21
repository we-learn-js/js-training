import {Chapter} from '../types'
import {mapMarkdownDtoToChapter} from '../lib/mappers/markdown'
const templatesDir = '../components/page-containers'
const templatePaths = {
  markdownPage: require.resolve(`${templatesDir}/MarkdownDocument.tsx`),
  markdownSlideshow: require.resolve(`${templatesDir}/MarkdownSlideshow.tsx`)
}

type PageConfig = {
  path: string,
  component: string,
  context?: {
    slug?: string
  }
}

const getPages = async (graphql): Promise<PageConfig[]> => {
  const pages = []
  const result = await graphql(`
    {
      markdownFiles: allMarkdownRemark(
        filter: {headings: {elemMatch: {value: {ne: ""}}}}
      ) {
        nodes {
          id
          headings(depth: h1) {
            value
          }
          timeToRead
          fields {
            fileBasename
          }
        }
      }
    }
  `)

  const chapters: Chapter[] = result.data.markdownFiles.nodes.map(
    mapMarkdownDtoToChapter
  )

  chapters.forEach(c => {
    pages.push(
      {
        path: c.paths.document,
        component: templatePaths.markdownPage,
        context: {id: c.id}
      },
      {
        path: c.paths.slideshow,
        component: templatePaths.markdownSlideshow,
        context: {id: c.id}
      }
    )
  })

  return pages
}

export {getPages}
