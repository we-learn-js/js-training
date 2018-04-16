import React, { Fragment, PureComponent } from 'react'
import Reveal from "../../Slideshow/RevealMarkdown"
import { withDomainService } from "../../Hoc/Domain"

export default withDomainService('ChapterViewService')(
  class ChapterPage extends PureComponent {
    constructor(props) {
      super(props)
      this.state = { markdownUrl: null }
    }

    async componentDidMount() {
      const {
        markdownUrl,
        masterMode
      } = await this.props.ChapterViewService.execute({
        url: this.props.match.url
      })
      this.setState({ markdownUrl, masterMode })
    }

    render() {
      const { markdownUrl, masterMode } = this.state
      return markdownUrl ? (
        <Reveal markdownUrl={markdownUrl} masterMode={masterMode} />
      ) : null
    }
  }
)
