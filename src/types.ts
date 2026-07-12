export type Chapter = {
  id: string
  title: string
  slug: string
  seo: {
    title: string
    canonicalUrl: string
  }
  filename: string
  paths: {
    slideshow: string
    document: string
  }
}
