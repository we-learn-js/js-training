import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import ChaptersList from './pages/ChaptersList'
import Chapter from './pages/Chapter'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'
import { requiresAuth } from '../components/HoC/Auth'
import { withMatch } from '../components/HoC/Router'
import HeaderBar from '../components/Header/Bar'

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

const ChapterPage = withMatch(requiresAuth(Chapter))
const ChapterListPage = withMatch(ChaptersList)

export default () => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <HeaderBar />
      <Switch>
        <Route exact path="/" component={Home} />
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
    </MuiThemeProvider>
  </React.Fragment>
)
