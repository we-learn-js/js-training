import React from 'react'
import Layout from '../layout/AppLayout'
import {
  NavigationProvider,
  ThemeProvider,
  modeGenerator
} from '@atlaskit/navigation-next'

type Props = {
  children: React.ReactNode,
  secondaryNavigation?: React.ReactNode
}

const customMode = modeGenerator({
  product: {
    text: '#fff',
    background: '#DAA520'
  }
})

const Root = ({children}: Props) => {
  return (
    <NavigationProvider>
      <ThemeProvider
        theme={theme => ({...theme, mode: customMode, context: 'product'})}
      >
        {children}
      </ThemeProvider>
    </NavigationProvider>
  )
}

type WrapperProps = {
  element: React.React.Node,
  props: any
}

export const PageWrapper = ({element, props}: WrapperProps) => {
  return <Layout {...props}>{element}</Layout>
}

export const RootWrapper = ({element}: Pick<WrapperProps, 'element'>) => {
  return <Root>{element}</Root>
}

export default Root
