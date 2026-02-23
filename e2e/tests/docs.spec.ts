import { test, expect } from '../fixtures'

test.describe('Document page', () => {
  test.beforeEach(async ({ docPage }) => {
    await docPage.goto('operators')
  })

  test('loads and renders markdown content', async ({ docPage }) => {
    await expect(docPage.markdownBody).toBeVisible()
  })

  test('renders headings', async ({ docPage }) => {
    await expect(docPage.headings().first()).toBeVisible()
  })

  test('renders syntax-highlighted code blocks', async ({ docPage }) => {
    await expect(docPage.codeBlocks().first()).toBeVisible()
  })

  test('shows chapter navigation sidebar', async ({ docPage }) => {
    await expect(docPage.sidebarHeading).toBeVisible()
  })

  test('sidebar links navigate to other chapters', async ({ docPage, page }) => {
    await docPage.navigateToChapter('objects')
    await expect(page).toHaveURL(/\/docs\/objects/)
  })
})
