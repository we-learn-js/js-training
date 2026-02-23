import { Page, Locator } from '@playwright/test'

export class DocPage {
  readonly markdownBody: Locator
  readonly sidebarHeading: Locator

  constructor(readonly page: Page) {
    this.markdownBody = page.locator('.markdown-body')
    this.sidebarHeading = page.getByText('DOCUMENTS')
  }

  async goto(chapter = 'operators') {
    await this.page.goto(`docs/${chapter}`)
  }

  headings(): Locator {
    return this.markdownBody.getByRole('heading')
  }

  codeBlocks(): Locator {
    return this.markdownBody.locator('pre')
  }

  async navigateToChapter(slug: string) {
    await this.page.locator(`a[href*="/docs/${slug}"]`).click()
  }
}
