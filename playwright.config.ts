import {defineConfig, devices} from '@playwright/test'

const isCI = !!process.env.CI

export default defineConfig({
  testDir: './e2e/tests',
  retries: isCI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:4321/js-training/',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    // Escape hatch for environments with a preinstalled Chromium
    // (e.g. CHROMIUM_EXECUTABLE_PATH=/opt/pw-browsers/chromium)
    launchOptions: process.env.CHROMIUM_EXECUTABLE_PATH
      ? {executablePath: process.env.CHROMIUM_EXECUTABLE_PATH}
      : {}
  },
  webServer: {
    command: isCI ? 'bun run preview' : 'bun run dev',
    url: 'http://localhost:4321/js-training',
    reuseExistingServer: !isCI,
    timeout: 180_000
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']}
    }
  ],
  reporter: isCI ? [['github'], ['html'], ['list']] : [['html'], ['list']]
})
