const path = require('path')

const CWD = process.cwd()

module.exports = {
  includePaths: [path.resolve(CWD, 'node_modules'), path.resolve(CWD, 'src')],
  importer: require('node-sass-package-importer/dist/cli.js')
}
