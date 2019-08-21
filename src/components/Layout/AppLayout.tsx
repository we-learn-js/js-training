import React, {useEffect, useLayoutEffect, useRef} from 'react'
import {
  LayoutManagerWithViewController,
  withNavigationViewController
} from '@atlaskit/navigation-next'
import {css} from 'emotion'
import GlobalNav from './GlobalNav'
import {mainNavigationView} from '../navigation/views'
import useChaptersNavigationView from '../providers/useChaptersNavigationView'

type Props = {
  children: React.ReactNode,
  navigationViewController: any,
  path: string
}

const className = css`
  font-family: 'system-ui';
`
const App = ({children, navigationViewController, path}: Props) => {
  const documentsView = useChaptersNavigationView('document')
  const slideshowsView = useChaptersNavigationView('slideshow')
  const domElement = useRef(null)
  useEffect(() => {
    navigationViewController.addView(mainNavigationView)
    navigationViewController.addView(documentsView)
    navigationViewController.addView(slideshowsView)
  }, [])
  useEffect(
    () => {
      if (path === '/') navigationViewController.setView(mainNavigationView.id)
    },
    [path]
  )
  useLayoutEffect(
    () => {
      domElement.current.firstChild.scrollTop = 0
    },
    [path]
  )

  return (
    <div ref={domElement} className={className}>
      <LayoutManagerWithViewController
        globalNavigation={GlobalNav}
        experimental_flyoutOnHover
        experimental_alternateFlyoutBehaviour
        experimental_fullWidthFlyout
      >
        {children}
      </LayoutManagerWithViewController>
    </div>
  )
}

export default withNavigationViewController(App)
