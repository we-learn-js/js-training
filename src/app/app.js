import React from 'react'
import { Switch, Route, Prompt } from 'react-router-dom'
import Home from "./pages/Home"
import Background from "../components/Background"
import ChaptersList from "./pages/ChaptersList"
import Chapter from "./pages/Chapter"
import CssBaseline from 'material-ui/CssBaseline'

export default () => (
  <React.Fragment>
    <CssBaseline />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/chapters" component={ChaptersList} />
      <Route path="/:chapter" component={Chapter} />
    </Switch>
    <Background />
  </React.Fragment>
)
