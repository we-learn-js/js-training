import {useMemo} from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import {Chapter, MarkdownDto} from '../../types'
import {mapMarkdownDtoToChapter} from '../../lib/mappers/markdown'

export const graphqlQuery = graphql`
  query MarkdownFiles {
    markdownFiles: allMarkdownRemark(
      filter: {headings: {elemMatch: {value: {ne: ""}}}}
    ) {
      nodes {
        ...MarkdownDtoFragment
      }
    }
  }
`
const useChapters = (): Chapter[] => {
  const result = useStaticQuery(graphqlQuery)

  const markdownFiles: MarkdownDto[] = result.markdownFiles.nodes
  const chapters = useMemo(() => markdownFiles.map(mapMarkdownDtoToChapter), [])
  return chapters
}

export default useChapters
