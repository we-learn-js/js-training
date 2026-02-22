import React, {useEffect} from 'react'
import {graphql} from 'gatsby'
import {withNavigationViewController} from '@atlaskit/navigation-next'
import MarkdownDoc from '../markdown/MarkdownDoc'
import Document from '../layout/Document'
import {documentsNavigationId} from '../providers/useChaptersNavigationView'
import {mapMarkdownDtoToChapter} from '../../lib/mappers/markdown'
import {MarkdownDto} from '../../types'
import ScreenCornerLink from '../elements/buttons/ScreenCornerLink'
import ScreenIcon from '@atlaskit/icon/glyph/screen'

type Props = {
  data: {markdownRemark: MarkdownDto & {rawMarkdownBody: string}},
  navigationViewController: any
}

const MarkdownPage = ({data, navigationViewController, ...props}: Props) => {
  useEffect(() => {
    navigationViewController.setView(documentsNavigationId)
  }, [])
  const node = data.markdownRemark
  const chapter = mapMarkdownDtoToChapter(node)
  return (
    <>
      <Document>
        <MarkdownDoc>{node.rawMarkdownBody}</MarkdownDoc>
        <ScreenCornerLink
          Icon={ScreenIcon}
          text={'Slideshow'}
          to={chapter.paths.slideshow}
        />
      </Document>
    </>
  )
}

export function Head({data}: {data: {markdownRemark: MarkdownDto}}) {
  const chapter = mapMarkdownDtoToChapter(data.markdownRemark)
  return (
    <>
      <title>{chapter.seo.title}</title>
      <link rel="canonical" href={chapter.seo.canonicalUrl} />
      <base target="_blank" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css"
      />
    </>
  )
}

export default withNavigationViewController(MarkdownPage)

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: {eq: $id}) {
      ...MarkdownDtoFragment
      rawMarkdownBody
    }
  }
`
