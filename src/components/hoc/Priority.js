import React from 'react'

const withLowPriority = Component =>
  class WithLowPriority extends React.Component {
    state = {shouldRender: false}
    componentDidMount() {
      window.requestIdleCallback(() => this.setState({shouldRender: true}))
    }
    render() {
      return this.state.shouldRender && <Component {...this.props} />
    }
  }

export {withLowPriority}
