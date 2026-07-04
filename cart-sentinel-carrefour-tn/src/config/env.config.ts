import dotenv from 'dotenv';

dotenv.config();

type BrowserName = 'chromium' | 'firefox' | 'webkit';
type VideoMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
type ScreenshotMode = 'off' | 'on' | 'only-on-failure';

const toBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
};

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const envConfig = {
  baseUrl: process.env.BASE_URL || 'https://www.carrefour.tn',
  browser: (process.env.BROWSER || 'chromium') as BrowserName,
  headless: toBoolean(process.env.HEADLESS, true),
  defaultTimeoutMs: toNumber(process.env.DEFAULT_TIMEOUT_MS, 15000),
  stepTimeoutMs: toNumber(process.env.STEP_TIMEOUT_MS, 45000),
  video: (process.env.VIDEO || 'retain-on-failure') as VideoMode,
  screenshot: (process.env.SCREENSHOT || 'only-on-failure') as ScreenshotMode,
};
