import { Page, Locator } from '@playwright/test'

export class SlideshowPage {
  constructor(readonly page: Page) {}

  async goto(chapter = 'presentation') {
    await this.page.goto(`slides/${chapter}`)
  }

  async waitForReady() {
    await this.page
      .locator('section[data-slide-id].present')
      .waitFor({ timeout: 10_000 })
  }

  get revealContainer(): Locator {
    return this.page.locator('.reveal')
  }

  get currentSlide(): Locator {
    return this.page.locator('section[data-slide-id].present')
  }

  async currentSlideId(): Promise<string | null> {
    return this.currentSlide.getAttribute('data-slide-id')
  }

  async navigateNext() {
    await this.page.keyboard.press('ArrowRight')
  }

  async navigatePrev() {
    await this.page.keyboard.press('ArrowLeft')
  }

  async waitForSlideChange(fromSlideId: string) {
    await this.page
      .locator(`section[data-slide-id]:not([data-slide-id="${fromSlideId}"]).present`)
      .waitFor({ timeout: 5_000 })
  }
}
