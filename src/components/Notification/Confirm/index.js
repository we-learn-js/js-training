import React from 'react'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'

class ConfirmNotification extends React.Component {
  componentWillReceiveProps() {
    this.setState({ open: true })
  }

  handleConfirm = event => {
    console.log('Exercise solved !')
  }

  render() {
    const { message, buttonText } = this.props
    return (
      <Snackbar
        open={this.state.open}
        onClose={this.handleClose}
        message={message}
        action={[
          <Button key="confirm" color="primary" onClick={this.handleConfirm}>
            {buttonText}
          </Button>
        ]}
      />
    )
  }
}

export default ConfirmNotification
