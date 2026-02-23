import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env.CI

export default defineConfig({
  testDir: './e2e/tests',
  retries: isCI ? 2 : 0,
  use: {
    baseURL: isCI ? 'http://localhost:9000/js-training' : 'http://localhost:8000',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: isCI ? 'npx gatsby serve --prefix-paths' : 'npm run develop',
    url: isCI ? 'http://localhost:9000/js-training' : 'http://localhost:8000',
    reuseExistingServer: !isCI,
    timeout: 180_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: isCI ? [['github'], ['html'], ['list']] : [['html'], ['list']],
})
