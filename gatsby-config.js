const path = require('path')

module.exports = {
  siteMetadata: {
    title: `JS Training`,
    description: `Slideshows to learn javascript`,
    author: `@gatsbyjs`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: 'UA-146160304-1'
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/md`
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          loadPaths: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src')
          ],
          quietDeps: true,
          silenceDeprecations: ['import', 'legacy-js-api', 'color-functions', 'global-builtin']
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `JS Training`,
        short_name: `js-training`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/logo.png`
      }
    }
  ]
}
