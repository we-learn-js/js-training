import React from 'react'
import { Switch, Route, Prompt } from 'react-router-dom'
import Home from './pages/Home'
import Background from '../components/3dScene/ImageConstruction'
import ChaptersList from './pages/ChaptersList'
import Chapter from './pages/Chapter'
import CssBaseline from 'material-ui/CssBaseline'
import { requiresAuth } from '../components/HoC/Auth'

export default () => (
  <React.Fragment>
    <CssBaseline />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/chapters" component={requiresAuth(ChaptersList)} />
      <Route path="/:chapter" component={requiresAuth(Chapter)} />
    </Switch>
    <Background />
  </React.Fragment>
)
