import React from 'react'
import ImageConstruction from '../components/3d/ImageConstruction'
import Seo from '../components/root/Seo'
import {css} from 'emotion'
import {withLowPriority} from '../components/hoc/Priority'
import HomeCard from '../components/elements/cards/HomeCard'

const className = css`
  position: relative;
  width: 100%;
  height: 50%;
  background: #333;
`
const cardsClass = css`
  width: 100%;
  height: 50%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  max-width: 820px;
  margin: auto;
`

const LazyImageConstruction = withLowPriority(ImageConstruction)

const IndexPage = () => {
  return (
    <>
      <div className={className}>
        <Seo title="Welcome to JS Training" />
        <LazyImageConstruction />
      </div>
      <div className={cardsClass}>
        <HomeCard
          label="Documents"
          title="Read content"
          image="images/card-practice.png"
          href="docs/presentation"
        />
        <HomeCard
          label="Slideshows"
          title="Teaching sessions"
          image="images/card-slideshow.png"
          href="slides/presentation"
        />

        <HomeCard
          label="Markdowns"
          title="Check source"
          image="images/card-wiki.png"
          href="https://github.com/we-learn-js/js-training/tree/master/src/md"
          target="_blank"
        />
      </div>
    </>
  )
}

export default IndexPage
