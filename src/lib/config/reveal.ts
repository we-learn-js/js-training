const getRevealConfig = (
  parallaxBackgroundImage: string
): Record<string, unknown> => ({
  controls: false,
  progress: true,
  slideNumber: true,
  transition: 'slide',
  parallaxBackgroundImage,
  parallaxBackgroundSize: '',
  parallaxBackgroundHorizontal: 100,
  parallaxBackgroundVertical: 100,
  margin: 0.1,
  hash: true,
  previewLinks: false
})

export default getRevealConfig
