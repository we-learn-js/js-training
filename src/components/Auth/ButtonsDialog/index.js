import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import PersonIcon from '@material-ui/icons/Person'
import Typography from 'material-ui/Typography'
import blue from 'material-ui/colors/blue'
import GoogleIcon from '../../Icon/Google'
import GitHubIcon from '../../Icon/GitHub'
import ErrorNotification from '../../../components/Notification/Error'
import { withDomainService } from '../../../components/Hoc/Domain'

class AuthButtonsDialog extends React.Component {
  state = { error: null }
  signInWithGithub = async () => {
    try {
      const user = await this.props.AuthWithGithubService.execute()
      this.props.onAuth(user)
    } catch (error) {
      this.setState({ error })
    }
  }

  signInWithGoogle = async () => {
    try {
      const user = await this.props.AuthWithGoogleService.execute()
      this.props.onAuth(user)
    } catch (error) {
      this.setState({ error })
    }
  }

  render() {
    const {
      AuthWithGithubService,
      AuthWithGoogleService,
      ...props
    } = this.props
    const { error } = this.state
    return (
      <React.Fragment>
        <Dialog open={true} {...props}>
          <DialogTitle id="simple-dialog-title">
            Please Authenticate
          </DialogTitle>
          <List>
            <AuthButton Icon={GoogleIcon} onClick={this.signInWithGoogle}>
              <ListItemText
                primary="Google"
                secondary="Auth with google account"
              />
            </AuthButton>
            <AuthButton Icon={GitHubIcon} onClick={this.signInWithGithub}>
              <ListItemText
                primary="GitHub"
                secondary="Auth with github account"
              />
            </AuthButton>
          </List>
        </Dialog>
        {error && <ErrorNotification error={error} />}
      </React.Fragment>
    )
  }
}

const AuthButton = ({ Icon, name, onClick, children }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar>
        <Icon style={{ width: '60%' }} />
      </Avatar>
    </ListItemAvatar>
    {children}
  </ListItem>
)

export default withDomainService('AuthWithGoogleService')(
  withDomainService('AuthWithGithubService')(AuthButtonsDialog)
)
