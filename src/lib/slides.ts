import rehypeShiki from '@shikijs/rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import {parseSlides} from './mappers/MarkdownParser'
import {remarkBaseImages} from './remark-base-images.mjs'

export type SlideVm = {
  id: string
  html: string
  isExercise: boolean
  isSolution: boolean
  isImportant: boolean
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkBaseImages)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(rehypeRaw)
  .use(rehypeShiki, {theme: 'monokai', fallbackLanguage: 'text'})
  .use(rehypeStringify)

// Slides are rendered to HTML at build time (including syntax
// highlighting): the browser only receives static markup and boots Reveal.
export const renderSlides = (
  markdown: string,
  idPrefix: string
): Promise<SlideVm[][]> => {
  const sections = parseSlides(markdown, idPrefix)
  return Promise.all(
    sections.map(slides =>
      Promise.all(
        slides.map(async ({content, ...slide}) => ({
          ...slide,
          html: String(await processor.process(content))
        }))
      )
    )
  )
}
