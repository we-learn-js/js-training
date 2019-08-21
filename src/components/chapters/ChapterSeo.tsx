import React from 'react'
import {Chapter} from '../../types'
import {Helmet} from 'react-helmet'

const ChapterSeo = ({chapter}: {chapter: Chapter}) => (
  <>
    <Helmet>
      <title>{chapter.seo.title}</title>
      <link rel="canonical" href={chapter.seo.canonicalUrl} />
      // Needs new release of Helmet to work https://bit.ly/2ZhLl5K
      <base target="_blank" />
    </Helmet>
  </>
)

export default ChapterSeo
