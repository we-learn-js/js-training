import { test as base } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { DocPage } from './pages/DocPage'
import { SlideshowPage } from './pages/SlideshowPage'

type Fixtures = {
  homePage: HomePage
  docPage: DocPage
  slideshowPage: SlideshowPage
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  docPage: async ({ page }, use) => {
    await use(new DocPage(page))
  },
  slideshowPage: async ({ page }, use) => {
    await use(new SlideshowPage(page))
  },
})

export { expect } from '@playwright/test'
