import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import LoginIcon from '@material-ui/icons/AccountCircle'
import GitHubIcon from '../../Icon/GitHub'
import Tooltip from 'material-ui/Tooltip'
import { Link } from 'react-router-dom'

import './index.css'

const AppBarButton = ({ title, ...props }) => (
  <Tooltip leaveDelay={300} title={title}>
    <IconButton color="primary" {...props} />
  </Tooltip>
)

const ButtonAppBar = props => {
  return (
    <header className="jst-Header">
      <AppBarButton
        title="List of Chapters"
        color="primary"
        to="/chapters"
        component={Link}
      >
        <MenuIcon />
      </AppBarButton>
      <nav className="jst-Header-Button">
        <AppBarButton title="Sign In">
          <LoginIcon />
        </AppBarButton>
      </nav>
    </header>
  )
}

export default ButtonAppBar
