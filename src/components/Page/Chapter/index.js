import React, { Fragment, PureComponent } from 'react'
import RevealMarkdown from '../../Slideshow/RevealMarkdown'
import { withDomainService } from '../../Hoc/Domain'

export default withDomainService('ChapterViewService')(
  class ChapterPage extends PureComponent {
    constructor(props) {
      super(props)
      this.state = { slides: null }
    }

    async componentDidMount() {
      const {
        slides,
        masterMode
      } = await this.props.ChapterViewService.execute({
        url: this.props.match.url
      })
      this.setState({ slides, masterMode })
    }

    render() {
      const { slides, masterMode } = this.state
      return slides ? (
        <RevealMarkdown slides={slides} masterMode={masterMode} />
      ) : null
    }
  }
)
