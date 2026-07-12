import {type CollectionEntry, getCollection} from 'astro:content'
import {siteUrl, urls} from '../constants'
import type {Chapter} from '../types'

const H1_REGEX = /^#\s+(.+)$/m

const slugify = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const mapEntryToChapter = (
  entry: CollectionEntry<'chapters'>
): Chapter | null => {
  const h1 = entry.body?.match(H1_REGEX)
  if (!h1) return null
  const title = h1[1].trim()
  const slug = slugify(entry.id)
  return {
    id: entry.id,
    filename: entry.id,
    title,
    slug,
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

export type ChapterWithEntry = {
  chapter: Chapter
  entry: CollectionEntry<'chapters'>
}

// Chapters are markdown files with an h1 title; files without one
// (e.g. the wiki's _Footer.md) are not chapters.
export const getChapters = async (): Promise<ChapterWithEntry[]> => {
  const entries = await getCollection('chapters')
  return entries
    .map(entry => {
      const chapter = mapEntryToChapter(entry)
      return chapter ? {chapter, entry} : null
    })
    .filter((c): c is ChapterWithEntry => c !== null)
}
