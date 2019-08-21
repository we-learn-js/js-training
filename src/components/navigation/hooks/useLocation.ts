import {useMemo} from 'react'
import {useSubscription} from 'use-subscription'
import {globalHistory} from '@reach/router'

function useLocation() {
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => globalHistory.location,
      subscribe: callback => globalHistory.listen(callback)
    }),
    []
  )

  return useSubscription(subscription)
}

export default useLocation
