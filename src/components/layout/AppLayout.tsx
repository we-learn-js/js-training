import React, {useEffect, useLayoutEffect, useRef} from 'react'
import {
  LayoutManagerWithViewController,
  withNavigationViewController,
  withNavigationUIController
} from '@atlaskit/navigation-next'
import GlobalNav from './GlobalNav'
import {mainNavigationView} from '../navigation/views'
import useChaptersNavigationView from '../providers/useChaptersNavigationView'
import './index.scss'

type Props = {
  children: React.ReactNode,
  navigationViewController: any,
  navigationUIController: any,
  path: string
}

const App = ({
  children,
  navigationViewController: viewCtrl,
  navigationUIController: uiCtrl,
  path
}: Props) => {
  const documentsView = useChaptersNavigationView('document')
  const slideshowsView = useChaptersNavigationView('slideshow')
  const domElement = useRef(null)
  const isHome = path === '/'

  useEffect(() => {
    viewCtrl.addView(mainNavigationView)
    viewCtrl.addView(documentsView)
    viewCtrl.addView(slideshowsView)
  }, [])
  useEffect(
    () => {
      if (isHome) {
        viewCtrl.setView(mainNavigationView.id)
        uiCtrl.disableResize()
        uiCtrl.expand()
      } else {
        uiCtrl.enableResize()
      }
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
    <div ref={domElement}>
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

export default withNavigationUIController(withNavigationViewController(App))
