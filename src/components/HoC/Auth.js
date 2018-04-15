import React from 'react'
import AuthButtonsDialog from '../Auth/ButtonsDialog'
import { LinearProgress } from 'material-ui/Progress'
import { withDomainService } from '../HoC/Domain'

const requiresAuth = Component =>
  withDomainService('SignedInUserService')(
    class RequiredAuth extends React.Component {
      state = { executing: true, user: null }

      onAuth = user => {
        this.setState({ user, executing: false })
      }

      async componentDidMount() {
        const { SignedInUserService } = this.props
        const user = await SignedInUserService.execute(2000)
        this.setState({ user, executing: false })
      }

      render() {
        const { SignedInUserService, ...props } = this.props
        const { user, executing } = this.state
        if (executing) return <LinearProgress variant="query" />
        return user ? (
          <Component {...props} />
        ) : (
          <AuthButtonsDialog onAuth={this.onAuth} />
        )
      }
    }
  )

export { requiresAuth }
