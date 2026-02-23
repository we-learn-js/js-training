import { test, expect } from '../fixtures'

test.describe('Slideshow page', () => {
  test.beforeEach(async ({ slideshowPage }) => {
    await slideshowPage.goto()
    await slideshowPage.waitForReady()
  })

  test('loads and initializes Reveal.js', async ({ slideshowPage }) => {
    await expect(slideshowPage.revealContainer).toBeAttached()
  })

  test('first slide is visible with content', async ({ slideshowPage }) => {
    await expect(slideshowPage.currentSlide).toBeVisible()
    await expect(slideshowPage.currentSlide).not.toBeEmpty()
  })

  test('ArrowRight navigates to the next slide', async ({ slideshowPage }) => {
    const firstSlideId = await slideshowPage.currentSlideId()
    await slideshowPage.navigateNext()
    await slideshowPage.waitForSlideChange(firstSlideId!)
  })

  test('ArrowLeft navigates back to the previous slide', async ({ slideshowPage }) => {
    const firstSlideId = await slideshowPage.currentSlideId()
    await slideshowPage.navigateNext()
    await slideshowPage.waitForSlideChange(firstSlideId!)

    await slideshowPage.navigatePrev()
    await slideshowPage.page
      .locator(`section[data-slide-id="${firstSlideId}"].present`)
      .waitFor({ timeout: 5_000 })
  })
})
