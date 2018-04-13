import React, { Fragment, Component } from 'react'
import Reveal from '../../components/Slideshow/RevealMarkdown'
import chapters from '../../js-training/config/chapters'
import { withDomainService } from '../../components/Hoc/Domain'

export default withDomainService('ChapterViewService')(
  class ChapterPage extends Component {
    constructor(props) {
      super(props)
      this.state = { markdownUrl: null }
    }

    async componentDidMount() {
      const { markdownUrl } = await this.props.ChapterViewService.execute({
        url: this.props.location.pathname
      })
      this.setState({ markdownUrl })
    }

    render() {
      const { markdownUrl } = this.state
      return markdownUrl ? <Reveal markdownUrl={markdownUrl} /> : null
    }
  }
)
