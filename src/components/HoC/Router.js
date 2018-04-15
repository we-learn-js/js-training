import React from 'react'
import deepEqual from 'fast-deep-equal'

const withMatch = Component =>
  class WithMatch extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return !deepEqual(this.props.match, nextProps.match)
    }
    render() {
      return <Component match={this.props.match} />
    }
  }

export { withMatch }
