const glob = require('glob')
const fs = require('fs-extra')
const { basename, join } = require('path')

const MD_PATTERN = 'src/**/*.md'
const LOCAL_IMAGES_REGEXP = /\.\/images\/([\w\-\.]+)/g
const OUTPUT_FILE = './src/config/md-images.js'

const getMarkdownFiles = () => {
  return new Promise(resolve => {
    glob(MD_PATTERN, {}, (er, files) => {
      resolve(files)
    })
  })
}

const readFile = async path =>
  require('fs')
    .readFileSync(path, 'utf8')
    .toString()

const parseLocalImages = content => {
  let res
  let results = []
  while ((res = LOCAL_IMAGES_REGEXP.exec(content)) !== null) {
    results.push({ url: res[0], image: res[1] })
  }
  return results
}

const extractLocalImages = async files =>
  await files.reduce(async (arrP, file) => {
    const content = await readFile(file)
    const data = parseLocalImages(content)
    const arr = await arrP
    data.forEach(image => (image.file = file))
    arr.push(...data)
    return arr
  }, [])

const execute = async () => {
  const files = await getMarkdownFiles()
  const images = await extractLocalImages(files)
  const imageImports = images.reduce((obj, { image, url }) => {
    obj[url] = `  '${url}': require('../md/images/${image}'),`
    return obj
  }, {})

  const configFile = `export default {\n${Object.values(imageImports).join(
    '\n'
  )}\n}`

  await fs.outputFile(OUTPUT_FILE, configFile)
}

execute()
