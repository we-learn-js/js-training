import React from 'react'
import {Link} from 'gatsby'
import {useMarkdownList} from '../providers/useMarkdownFiles'

import {Item} from '@atlaskit/navigation-next'

const NotesNavigation = () => {
  const mds = useMarkdownList()
  return mds.map(md => (
    <Link to={md.path.notes}>
      <Item text={md.title} />
    </Link>
  ))
}

export {NotesNavigation}
