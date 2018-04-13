import React, { Fragment, Component } from 'react'
import Reveal from '../../components/Slideshow/RevealMarkdown'
import chapters from '../../js-training/config/chapters'

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
