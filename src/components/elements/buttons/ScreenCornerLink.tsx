import React from 'react'
import {Link} from 'gatsby'
import Button from '@atlaskit/button'

import {css} from 'emotion'

const textClassName = css`
  display: none;
  margin-left: 4px;
`
const buttonClassName = css`
  position: absolute;
  top: 16px;
  right: 16px;
  text-decoration: none;
  font-size: 0.8em;
  background-color: rgb(218, 165, 32, 0.4);
  border-radius: 3px;
  &:hover {
    background-color: rgb(218, 165, 32, 0.8);
    .${textClassName} {
      display: inline;
    }
  }
`

const ScreenCornerLink = ({Icon, text, to}) => {
  return (
    <Link className={buttonClassName} to={to}>
      <Button
        appearance="primary"
        className={css`
          background-color: transparent !important;
        `}
      >
        <Icon size="small" label={text} />
        <span className={textClassName}>{text}</span>
      </Button>
    </Link>
  )
}

export default ScreenCornerLink
