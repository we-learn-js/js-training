import React, { Fragment, Component } from 'react'
import Reveal from "../../components/RevealMarkownSlides"
import chapters from "../../domain/config/chapters"

export default class ChapterPage extends Component {
  static getDerivedStateFromProps(nextProps) {
    return { chapter: nextProps.match.params.chapter }
  }

  constructor(props) {
    super(props)
    this.state = { markdownUrl: null }
  }

  render() {
    const { chapter } = this.state
    return <Reveal markdownUrl={chapters[chapter]} />
  }
}
