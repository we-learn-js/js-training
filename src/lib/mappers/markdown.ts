import {MarkdownDto, Chapter} from '../../types'
import {urls, siteUrl} from '../../constants'
const slugify = str => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

const mapMarkdownDtoToChapter = (md: MarkdownDto): Chapter => {
  const slug = slugify(md.fields.fileBasename)
  const title = md.headings[0].value
  return {
    id: md.id,
    filename: md.fields.fileBasename,
    title: title,
    seo: {
      title: `${title} | JavaScript Training`,
      canonicalUrl: `${siteUrl}${urls.documents}/${slug}`
    },
    paths: {
      slideshow: `${urls.slideshows}/${slug}`,
      document: `${urls.documents}/${slug}`
    }
  }
}

export {mapMarkdownDtoToChapter}
