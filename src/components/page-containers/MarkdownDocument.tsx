import React, {useEffect} from 'react'
import {graphql} from 'gatsby'
import {withNavigationViewController} from '@atlaskit/navigation-next'
import MarkdownDoc from '../markdown/MarkdownDoc'
import Document from '../Layout/Document'
import {documentsNavigationId} from '../providers/useChaptersNavigationView'
import {mapMarkdownDtoToChapter} from '../../lib/mappers/markdown'
import ChapterSeo from '../chapters/ChapterSeo'
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
      <ChapterSeo chapter={chapter} />
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

export default withNavigationViewController(MarkdownPage)

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: {eq: $id}) {
      ...MarkdownDtoFragment
      rawMarkdownBody
    }
  }
`
