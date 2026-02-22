import {useSyncExternalStore} from 'react'
import {globalHistory} from '@reach/router'

function useLocation() {
  return useSyncExternalStore(
    cb => globalHistory.listen(cb),
    () => globalHistory.location
  )
}

export default useLocation
