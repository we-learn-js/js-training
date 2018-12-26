import React from 'react'
import './index.css'
const LayoutContent = ({children, hasHeader}) => (
  <div className={`jst-LayoutContent${hasHeader ? ' hasHeader' : ''}`}>
    {children}
  </div>
)

export default LayoutContent
