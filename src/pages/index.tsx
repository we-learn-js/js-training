import React from 'react'
import ImageConstruction from '../components/3d/ImageConstruction'
import Seo from '../components/root/Seo'
import {css} from 'emotion'

const className = css`
  position: relative;
  width: 100%;
  height: 100%;
  background: #333;
`

type Props = {
  children: React.ReactNode
}
const IndexPage = ({children}: Props) => {
  return (
    <div className={className}>
      <Seo title="Welcome to JS Training" />
      <ImageConstruction />
      {children}
    </div>
  )
}

export default IndexPage
