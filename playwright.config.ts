import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Where the spec files live.
  testDir: './tests',

  // Fail the build if someone commits a test.only.
  forbidOnly: !!process.env.CI,

  // The generator is a public site we don't control, so one retry on CI
  // absorbs network flakiness without hiding real failures locally.
  retries: process.env.CI ? 1 : 0,

  // Full parallelism across files; each test gets its own browser context.
  fullyParallel: true,

  // On CI, the github reporter shows failures inline on the run and the PR,
  // so nobody has to download the report to see what broke.
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'https://rahuldkjain.github.io/gh-profile-readme-generator/',

    // Diagnostics: keep the artifacts that explain a failure, drop the rest.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
