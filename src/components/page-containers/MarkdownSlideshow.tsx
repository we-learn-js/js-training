import React, {useEffect} from 'react'
import {graphql} from 'gatsby'
import {withNavigationViewController} from '@atlaskit/navigation-next'
import MarkdownParser from '../../lib/mappers/MarkdownParser'
import {mapMarkdownDtoToChapter} from '../../lib/mappers/markdown'
import RevealPresentation from '../revealjs/RevealSlideshow'
import RevealMarkownSlides from '../revealjs/RevealMarkownSlides'
import {slideshowsNavigationId} from '../providers/useChaptersNavigationView'
import ChapterSeo from '../chapters/ChapterSeo'
import {MarkdownDto} from '../../types'
import DocumentIcon from '@atlaskit/icon/glyph/document'
import ScreenCornerLink from '../elements/buttons/ScreenCornerLink'

type Props = {
  markdown: {
    slug: string,
    content: string
  }
}

const MarkdownSlideshow = ({markdown: {content, slug}}: Props) => {
  const slides = MarkdownParser.parseSlides(content, slug)
  return (
    <>
      <RevealPresentation
        className="full-width-nav-offset"
        masterMode={false}
        // eslint-disable-next-line
        onSlideChange={({slideId}) => console.log('onSlideChange', slideId)} 
      >
        <RevealMarkownSlides slides={slides} />
      </RevealPresentation>
    </>
  )
}

type ContainerProps = {
  data: {
    markdownRemark: MarkdownDto & {
      rawMarkdownBody: string
    }
  },
  navigationViewController: any
}

const MarkdownSlideshowContainer = ({
  data,
  navigationViewController: navView
}: ContainerProps) => {
  const content = data.markdownRemark.rawMarkdownBody
  const chapter = mapMarkdownDtoToChapter(data.markdownRemark)
  const slug = chapter.paths.slideshow
  useEffect(() => {
    navView.setView(slideshowsNavigationId)
  }, [])
  return (
    <>
      <ChapterSeo chapter={chapter} />
      <MarkdownSlideshow markdown={{content, slug}} />
      <ScreenCornerLink
        Icon={DocumentIcon}
        text={'Document'}
        to={chapter.paths.document}
      />
    </>
  )
}

export default withNavigationViewController(MarkdownSlideshowContainer)

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: {eq: $id}) {
      rawMarkdownBody
      ...MarkdownDtoFragment
    }
  }
`
