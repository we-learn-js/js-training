import React, { Fragment, PureComponent } from 'react'
import RevealPresentation from '../../Slideshow/Reveal'
import RevealMarkdown from '../../Slideshow/RevealMarkownSlides'
import { withDomainService } from '../../Hoc/Domain'

export default withDomainService('ChapterSlidesService')(
  class ChapterPage extends PureComponent {
    constructor(props) {
      super(props)
      this.state = { slides: null }
    }

    async componentDidMount() {
      const {
        slides,
        masterMode
      } = await this.props.ChapterSlidesService.execute({
        url: this.props.match.url
      })
      this.setState({ slides, masterMode })
    }

    render() {
      const { slides, masterMode } = this.state
      return slides ? (
        <RevealPresentation masterMode={masterMode}>
          <RevealMarkdown slides={slides} />
        </RevealPresentation>
      ) : null
    }
  }
)
