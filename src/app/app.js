import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'
import { requiresAuth } from '../components/HoC/Auth'
import { withMatch } from '../components/HoC/Router'
import HeaderBar from '../components/Layout/Header'
import { LinearProgress } from 'material-ui/Progress'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFFF00',
      main: '#FFD700',
      dark: '#FFA500',
      contrastText: '#333'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  },
  status: {
    danger: 'orange'
  }
})

const Layout = ({ children }) => (
  <React.Fragment>
    <HeaderBar />
    {children}
  </React.Fragment>
)

const HomePage = Loadable({
  loader: () => import('./pages/Home'),
  loading: () => <LinearProgress />
})

const ChapterListPage = Loadable({
  loader: () =>
    import('./pages/ChaptersList').then(ChaptersList =>
      withMatch(ChaptersList.default)
    ),
  loading: () => <LinearProgress />
})

const ChapterPage = Loadable({
  loader: () =>
    import('./pages/Chapter').then(Chapter =>
      withMatch(requiresAuth(Chapter.default))
    ),
  loading: () => <LinearProgress />
})

export default () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/chapters"
          children={props => <ChapterListPage match={props.match} />}
        />
        <Route
          exact
          path="/:chapter"
          children={props => <ChapterPage match={props.match} />}
        />
      </Switch>
    </Layout>
  </MuiThemeProvider>
)
