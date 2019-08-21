import {useStaticQuery, graphql} from 'gatsby'

const useMarkdownFiles = () => {
  const {markdownPages} = useStaticQuery(
    graphql`
      query MyQuery {
        markdownPages: allMarkdownRemark(
          sort: {fields: headings___value, order: ASC}
        ) {
          nodes {
            timeToRead
            headings(depth: h1) {
              value
            }
            fields {
              fileBasename
              path {
                notes
                slides
              }
            }
          }
        }
      }
    `
  )
  return markdownPages.nodes.filter(node => node.headings.length).map(node => ({
    title: node.headings[0].value,
    name: node.fields.fileBasename,
    path: node.fields.path,
    timeToRead: `${node.timeToRead} min read`
  }))
}

export default useMarkdownFiles
