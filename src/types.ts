export type MarkdownDto = {
  id: string,
  fields: {
    fileBasename: string
  },
  timeToRead: number,
  headings: Array<{value: string}>
}

export type Chapter = {
  id: string,
  title: string,
  seo: {
    title: string,
    canonicalUrl: string
  },
  filename: string,
  paths: {
    slideshow: string,
    document: string
  }
}
