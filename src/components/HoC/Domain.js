import React from 'react'
import Domain from '../../lib/'

const domain = new Domain()

const withDomain = WrappedComponent => props => (
  <WrappedComponent {...props} domain={domain} />
)

const withDomainService = (...serviceNames) => WrappedComponent =>
  withDomain(
    class WithDomainService extends React.Component {
      state = {services: null}
      async componentDidMount() {
        const services = await Promise.all(
          serviceNames.map(serviceName => this.props.domain.get(serviceName))
        )
        this.setState({services})
      }
      render() {
        const {services} = this.state
        const servicesProps =
          services &&
          services.reduce((obj, service, i) => {
            return {...obj, [serviceNames[i]]: service}
          }, {})
        const {domain, ...props} = this.props
        const newProps = {...props, ...servicesProps}

        return services ? <WrappedComponent {...newProps} /> : null
      }
    }
  )

const withDomainEvent = eventName => WrappedComponent =>
  withDomain(
    class WithDomainEvent extends React.Component {
      listener = data => {
        this.setState({[eventName]: data})
      }
      async componentDidMount() {
        const {domain} = this.props
        domain.on(eventName, this.listener)
      }

      async componentWillUnmount() {
        const {domain} = this.props
        domain.off(eventName, this.listener)
      }

      render() {
        const {domain, ...props} = this.props
        return <WrappedComponent {...props} {...this.state} />
      }
    }
  )

const withServiceResponse = (serviceName, params) => WrappedComponent =>
  withDomainService(serviceName)(
    class WithServiceResponse extends React.Component {
      state = {response: null}
      async componentDidMount() {
        const response = await this.props[serviceName].execute(params)
        this.setState({response})
      }
      render() {
        const {sercice, ...props} = this.props
        const {response} = this.state
        const newProps = {...props, [serviceName]: response}

        return typeof response !== 'undefined' ? (
          <WrappedComponent {...newProps} />
        ) : null
      }
    }
  )

export {withDomain, withDomainService, withServiceResponse, withDomainEvent}
