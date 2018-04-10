import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Chapter from './pages/Chapter'
import Background from './components/Background'

export default () => (
  <React.Fragment>
    <Background />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:chapter" component={Chapter} />
    </Switch>
  </React.Fragment>
)
