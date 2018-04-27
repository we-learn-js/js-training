import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import LoginIcon from '@material-ui/icons/AccountCircle'
import Avatar from 'material-ui/Avatar'
import GitHubIcon from '../../Icon/GitHub'
import AuthButtonsDialog from '../../Auth/ButtonsDialog'
import Tooltip from 'material-ui/Tooltip'
import { Link } from 'react-router-dom'
import { withDomainService } from '../../../components/Hoc/Domain'
import { withUser } from '../../../components/Hoc/Auth'
import './index.css'

const styles = {
  avatar: {
    width: 25,
    height: 25
  }
}

const AppBarButton = ({ title, ...props }) => (
  <Tooltip leaveDelay={300} title={title}>
    <IconButton color="primary" {...props} />
  </Tooltip>
)

const UserButton = withStyles(styles)(
  withDomainService('SignOutUserService')(
    withUser(({ user, classes, SignOutUserService }) => {
      const { displayName, photoURL } = user || {}
      return displayName ? (
        <AppBarButton
          title="Sign out"
          onClick={() => SignOutUserService.execute()}
        >
          <Avatar alt={displayName} src={photoURL} className={classes.avatar} />
        </AppBarButton>
      ) : (
        <AppBarButton title="Not signed in">
          <LoginIcon />
        </AppBarButton>
      )
    })
  )
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
        <UserButton />
      </nav>
    </header>
  )
}

export default ButtonAppBar
