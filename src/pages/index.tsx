import React from 'react'
import ImageConstruction from '../components/3d/ImageConstruction'
import Seo from '../components/root/Seo'

const styles = {
  position: 'relative',
  width: '100%',
  height: '100%',
  background: '#333'
}

type Props = {
  children: React.ReactNode
}
const IndexPage = ({children}: Props) => {
  return (
    <div style={styles}>
      <Seo title="Welcome to JS Training" />
      <ImageConstruction />
      {children}
    </div>
  )
}

export default IndexPage
