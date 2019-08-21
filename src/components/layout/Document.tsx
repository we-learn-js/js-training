import React from 'react'
import {gridSize} from '@atlaskit/theme'

type Props = {
  children: React.ReactNode
}

export default ({children}: Props) => (
  <div
    style={{
      padding: `${gridSize() * 4}px ${gridSize() * 8}px`,
      margin: 'auto',
      maxWidth: '800px'
    }}
  >
    {children}
  </div>
)
