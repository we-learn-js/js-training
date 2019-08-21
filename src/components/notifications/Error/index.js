import React from 'react'
import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
})

class ErrorNotification extends React.Component {
  state = {
    open: true
  }

  componentWillReceiveProps() {
    this.setState({open: true})
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({open: false})
  }

  render() {
    const {classes, error} = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{error.message}</span>}
        action={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            onClick={this.handleClose}
          >
            Close
          </Button>
        ]}
      />
    )
  }
}

export default withStyles(styles)(ErrorNotification)
