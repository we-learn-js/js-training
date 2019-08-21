import {createFilePath} from 'gatsby-source-filesystem'
import {getPages} from './src/lib/pages'
import {urls} from './src/constants'
import {basename} from 'path'

exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({node, getNode})

    createNodeField({
      node,
      name: `path`,
      value: {
        notes: `${urls.documents}${slug}`,
        slides: `${urls.slideshows}${slug}`
      }
    })

    createNodeField({
      node,
      name: 'fileBasename',
      value: basename(node.fileAbsolutePath, '.md')
    })
  }
}

exports.onCreateWebpackConfig = ({getConfig, stage}) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions
  const pages = await getPages(graphql)
  pages.forEach(page => createPage(page))
}
