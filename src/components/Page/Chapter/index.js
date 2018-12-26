import React, {PureComponent} from 'react'
import RevealPresentation from '../../Slideshow/Reveal'
import RevealMarkdown from '../../Slideshow/RevealMarkownSlides'
import Confirm from '../../../components/Notification/Confirm'
import {withDomainService} from '../../Hoc/Domain'

export default withDomainService('ChapterSlidesService', 'SlideViewService')(
  class ChapterPage extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {slides: null}
    }

    handleSlideChange = async ({slideId}) => {
      const {
        confirmMessage,
        confirmButton
      } = await this.props.SlideViewService.execute({slideId})
      this.setState({
        confirmMessage,
        confirmButton
      })
    }

    async componentDidMount() {
      const {
        slides,
        masterMode
      } = await this.props.ChapterSlidesService.execute({
        url: this.props.match.url
      })
      this.setState({slides, masterMode})
    }

    render() {
      const {slides, masterMode, confirmMessage, confirmButton} = this.state
      return (
        <React.Fragment>
          {slides ? (
            <RevealPresentation
              masterMode={masterMode}
              onSlideChange={this.handleSlideChange}
            >
              <RevealMarkdown slides={slides} />
            </RevealPresentation>
          ) : null}
          {confirmMessage && (
            <Confirm message={confirmMessage} buttonText={confirmButton} />
          )}
        </React.Fragment>
      )
    }
  }
)
