import React from 'react'
import AuthButtonsDialog from '../Auth/ButtonsDialog'
import {LinearProgress} from 'material-ui/Progress'
import {withDomainEvent, withDomainService} from '../hoc/Domain'

let SignedInUserPromise

const withUser = Component => {
  class WithUser extends React.Component {
    state = {}

    async componentWillMount() {
      const {SignedInUserService, UserHasChanged} = this.props
      SignedInUserPromise =
        SignedInUserPromise || SignedInUserService.execute(2000)

      this.setState({user: await SignedInUserPromise})
    }

    componentWillReceiveProps(nextProps) {
      const {UserHasChanged} = nextProps
      this.setState({user: UserHasChanged && UserHasChanged.user})
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState.user !== this.state.user
    }

    render() {
      const {SignedInUserService, UserHasChanged, ...props} = this.props
      const {user} = this.state
      return <Component {...props} user={user} />
    }
  }

  return withDomainService('SignedInUserService')(
    withDomainEvent('UserHasChanged')(WithUser)
  )
}

class RequiredAuth extends React.Component {
  render() {
    const {user, ...props} = this.props
    if (user === undefined) return <LinearProgress variant="query" />
    return user ? <Component {...props} /> : <AuthButtonsDialog />
  }
}

const requiresAuth = Component => withUser(RequiredAuth)

export {requiresAuth, withUser}
