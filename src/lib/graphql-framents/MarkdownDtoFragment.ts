import {graphql} from 'gatsby'

export const markdownDtoFragment = graphql`
  fragment MarkdownDtoFragment on MarkdownRemark {
    id
    headings(depth: h1) {
      value
    }
    timeToRead
    fields {
      fileBasename
    }
  }
`
