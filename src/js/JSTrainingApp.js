import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Chapter from './pages/Chapter'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/:chapter" component={Chapter} />
  </Switch>
)
