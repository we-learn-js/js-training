import { test, expect } from '../fixtures'

test.describe('Home page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
  })

  test('loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('JS Training')
  })

  test('shows three navigation cards', async ({ homePage }) => {
    await expect(homePage.card('Documents')).toBeVisible()
    await expect(homePage.card('Slideshows')).toBeVisible()
    await expect(homePage.card('Markdowns')).toBeVisible()
  })

  test('clicking Documents card navigates to a doc page', async ({ homePage, page }) => {
    await homePage.clickCard('Documents')
    await expect(page).toHaveURL(/\/docs\//)
  })
})
