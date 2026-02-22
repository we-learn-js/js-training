import {createFilePath} from 'gatsby-source-filesystem'
import {getPages} from './src/lib/pages'
import {urls} from './src/constants'
import {basename, resolve} from 'path'

export const onCreateNode = ({node, getNode, actions}) => {
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
      value: basename(node.internal.contentFilePath ?? node.fileAbsolutePath, '.md')
    })
  }
}

export const createPages = async ({graphql, actions}) => {
  const {createPage} = actions
  const pages = await getPages(graphql)
  pages.forEach(page => createPage(page))
}

export const onCreateWebpackConfig = ({stage, actions}) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          '@atlaskit/navigation-next': resolve(
            process.cwd(),
            'src/mocks/atlaskit-navigation-next.js'
          )
        }
      }
    })
  } else {
    // Suppress "Should not import the named export" warnings from Atlaskit
    // packages that import { name, version } from their package.json files
    actions.setWebpackConfig({
      module: {
        parser: {
          javascript: {
            exportsPresence: false
          }
        }
      }
    })
  }
}
