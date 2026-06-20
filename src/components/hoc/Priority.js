import React, {useState, useEffect} from 'react'

const withLowPriority = Component => {
  const WithLowPriority = props => {
    const [shouldRender, setShouldRender] = useState(false)
    useEffect(() => {
      const id = window.requestIdleCallback(() => setShouldRender(true))
      return () => window.cancelIdleCallback(id)
    }, [])
    return shouldRender ? <Component {...props} /> : null
  }
  return WithLowPriority
}

export {withLowPriority}
