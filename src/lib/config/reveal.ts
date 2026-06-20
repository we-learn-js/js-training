import slideshowBackground from '../../components/revealjs/RevealSlideshow/images/slideshow-background.png'

const revealConfig = {
  controls: false,
  progress: true,
  slideNumber: true,
  hideAddressBar: true,
  transition: 'slide' as const,
  parallaxBackgroundImage: slideshowBackground,
  parallaxBackgroundSize: '',
  parallaxBackgroundHorizontal: 100,
  parallaxBackgroundVertical: 100,
  margin: 0.1,
  history: true,
  previewLinks: false,
}

export default revealConfig
