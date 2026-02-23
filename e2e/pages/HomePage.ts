import { Page, Locator } from '@playwright/test'

export class HomePage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto('/')
  }

  card(label: string): Locator {
    return this.page.getByRole('article').filter({ hasText: label })
  }

  async clickCard(label: string) {
    await this.card(label).getByRole('link').click()
  }
}
