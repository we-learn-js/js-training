import {defineCollection} from 'astro:content'
import {glob} from 'astro/loaders'

// The wiki subtree at src/md is the single source of content.
// Keep the raw file basename (e.g. `IteratorsAndGenerators`) as the entry id:
// chapter slugs are derived from it (see src/lib/chapters.ts).
const chapters = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/md',
    generateId: ({entry}) => entry.replace(/\.md$/, '')
  })
})

export const collections = {chapters}
