import React from 'react'
import AuthButtonsDialog from '../Auth/ButtonsDialog'
import { LinearProgress } from 'material-ui/Progress'
import { withDomainEvent, withDomainService } from '../HoC/Domain'

const requiresAuth = Component =>
  withDomainEvent('UserSignedIn')(
    withDomainService('SignedInUserService')(
      class RequiredAuth extends React.Component {
        state = { executing: true, user: null }

        async componentDidMount() {
          await this.props.SignedInUserService.execute(2000)
          this.setState({ executing: false })
        }

        componentWillReceiveProps(nextProps) {
          this.setState({ user: nextProps.UserSignedIn })
        }

        shouldComponentUpdate(nextProps, nextState) {
          return (
            nextState.user !== this.state.user ||
            nextState.executing !== this.state.executing
          )
        }

        render() {
          const { SignedInUserService, UserSignedIn, ...props } = this.props
          const { executing } = this.state
          if (executing) return <LinearProgress variant="query" />
          return UserSignedIn ? <Component {...props} /> : <AuthButtonsDialog />
        }
      }
    )
  )

export { requiresAuth }
