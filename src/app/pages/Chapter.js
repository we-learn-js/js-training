import React, { Fragment, PureComponent } from 'react'
import Reveal from '../../components/Slideshow/RevealMarkdown'
import { withDomainService } from '../../components/Hoc/Domain'

export default withDomainService('ChapterViewService')(
  class ChapterPage extends PureComponent {
    constructor(props) {
      super(props)
      this.state = { markdownUrl: null }
    }

    async componentDidMount() {
      const { markdownUrl } = await this.props.ChapterViewService.execute({
        url: this.props.match.url
      })
      this.setState({ markdownUrl })
    }

    render() {
      const { markdownUrl } = this.state
      return markdownUrl ? <Reveal markdownUrl={markdownUrl} /> : null
    }
  }
)
