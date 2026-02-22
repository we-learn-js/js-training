/**
 * SSR-safe mock for @atlaskit/navigation-next.
 * Used during gatsby build-html stage via webpack alias in gatsby-node.ts.
 * All browser-only APIs (localStorage etc.) are avoided.
 */
const React = require('react')

// Passthrough providers
const NavigationProvider = ({children}) => children
const ThemeProvider = ({children}) => children
const modeGenerator = () => ({})

// Passthrough layout — renders children without the sidebar shell
const LayoutManagerWithViewController = ({children}) =>
  React.createElement('div', null, children)

// HOC mocks — provide no-op controller objects so components don't crash
const withNavigationViewController = Component => {
  const Wrapped = props =>
    React.createElement(Component, {
      ...props,
      navigationViewController: {
        setView: () => {},
        addView: () => {},
        removeView: () => {}
      }
    })
  Wrapped.displayName = `withNavigationViewController(${Component.displayName || Component.name})`
  return Wrapped
}

const withNavigationUIController = Component => {
  const Wrapped = props =>
    React.createElement(Component, {
      ...props,
      navigationUIController: {
        expand: () => {},
        collapse: () => {},
        disableResize: () => {},
        enableResize: () => {}
      }
    })
  Wrapped.displayName = `withNavigationUIController(${Component.displayName || Component.name})`
  return Wrapped
}

// Primitive navigation items — render as plain elements for SSR
const Item = ({text, href}) =>
  React.createElement('a', {href: href || '#'}, text)

const HeaderSection = ({children}) => React.createElement('div', null, children)
const MenuSection = ({children}) => React.createElement('div', null, children)

module.exports = {
  NavigationProvider,
  ThemeProvider,
  modeGenerator,
  LayoutManagerWithViewController,
  withNavigationViewController,
  withNavigationUIController,
  Item,
  HeaderSection,
  MenuSection
}
