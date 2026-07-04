import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './src/config/env.config';

export default defineConfig({
  testDir: './features',
  timeout: envConfig.stepTimeoutMs,
  expect: {
    timeout: envConfig.defaultTimeoutMs,
  },
  use: {
    baseURL: envConfig.baseUrl,
    headless: envConfig.headless,
    screenshot: envConfig.screenshot,
    video: envConfig.video,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
