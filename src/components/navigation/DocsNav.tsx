import React from 'react'
import {useMarkdownList} from '../providers/useMarkdownFiles'
import SecondaryNav from './SecondaryNav'

const DocumentsNav = () => {
  const mds = useMarkdownList()
  const links = mds.map(md => ({
    text: md.title,
    to: md.path.notes
  }))
  return <SecondaryNav heading="DOCUMENTS" links={links} />
}

export default DocumentsNav
