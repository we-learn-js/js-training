require('isomorphic-fetch')
const glob = require('glob')
const fs = require('fs-extra')
const Listr = require('listr')
const {basename, join} = require('path')
const {Observable} = require('rxjs/Observable')

const MD_PATTERN = 'src/**/*.md'
const JSBIN_REGEXP = /https?:\/\/jsbin\.com\/([a-z]+\/?[0-9]?)\/[\w?,]+/g
const OUTPUT = './tmp/migrate-jsbins'

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

const parseJSBins = content => {
  let res
  let results = []
  while ((res = JSBIN_REGEXP.exec(content)) !== null) {
    results.push({url: res[0], bin: res[1]})
  }
  return results
}

const getBinData = bin =>
  fetch(`https://jsbin.com/api/${bin}`).then(res => res.json())

const extractBinsLinks = async files =>
  await files.reduce(async (arrP, file) => {
    const content = await readFile(file)
    const data = parseJSBins(content)
    const arr = await arrP
    data.forEach(bin => (bin.file = file))
    arr.push(...data)
    return arr
  }, [])

const parseJSBinDataToFiles = (bin, data) => {
  const description = `Code imported from JS Bin: [${bin}](https://jsbin.com/${bin}/edit)`
  const res = {name: bin.replace('/', '-'), description, files: []}
  const cssFileName =
    data.settings.processors.css === 'sass' ? 'src/index.scss' : 'src/index.css'

  data.javascript &&
    res.files.push({name: 'src/index.js', content: data.javascript})
  data.html && res.files.push({name: 'public/index.html', content: data.html})
  return res
}

const getReadmeContent = ({name, description}) => `# JS Training | ${name}

${description}
`
const getPackageJson = async ({name, description}) => {
  const base = await fs.readJSON(
    'scripts/fixtures/stackblitz-template/package.json'
  )
  return {
    ...base,
    name: base.name + '-' + name,
    description: 'Code for example or practice.'
  }
}

const getStackblitzUrl = folder =>
  `https://stackblitz.com/github/we-learn-js/js-training-code/tree/master/src/${folder}?embed=1&&view=editor`

const writeFiles = async (folder, descriptor) => {
  const dirPath = join(OUTPUT, folder)
  await fs.emptyDir(dirPath)
  await fs.ensureDir(dirPath)
  await fs.outputFile(join(dirPath, 'README.md'), getReadmeContent(descriptor))
  await fs.copy(
    'scripts/fixtures/stackblitz-template/.gitignore',
    join(dirPath, '.gitignore')
  )
  await fs.outputJson(
    join(dirPath, 'package.json'),
    await getPackageJson(descriptor),
    {spaces: 2}
  )
  await Promise.all(
    descriptor.files.map(
      async ({name, content}) =>
        await fs.outputFile(join(dirPath, name), content)
    )
  )

  return dirPath
}

const execute = async () => {
  fs.emptyDir(OUTPUT)
  const files = await getMarkdownFiles()
  const bins = await extractBinsLinks(files)

  const tasks = bins.map(({url, bin, file}) => {
    const outputFolder =
      basename(file).replace('.md', '') + '/' + bin.replace('/', '-')
    return {
      title: outputFolder,
      task: () =>
        new Observable(async observer => {
          observer.next('Retieving data')
          const data = await getBinData(bin)

          observer.next('Parsing data')
          const descriptor = parseJSBinDataToFiles(bin, data)

          observer.next('Writing files')
          const outputFile = await writeFiles(outputFolder, descriptor)

          observer.next('Renaming link in markdown')
          const newUrl = await getStackblitzUrl(outputFolder)
          const content = await readFile(file)
          await fs.outputFile(file, content.replace(url, newUrl))

          observer.complete()
        })
    }
  })
  const list = new Listr(tasks)

  list.run().catch(err => console.error(err))
}

execute()
