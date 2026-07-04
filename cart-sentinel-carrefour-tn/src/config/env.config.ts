import dotenv from 'dotenv';

dotenv.config();

type BrowserName = 'chromium' | 'firefox' | 'webkit';
type DeviceProfile = 'desktop' | 'mobile';
type VideoMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
type ScreenshotMode = 'off' | 'on' | 'only-on-failure';
type TraceMode = 'off' | 'on' | 'retain-on-failure';

const toBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
};

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const oneOf = <T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T => {
  if (allowed.includes(value as T)) {
    return value as T;
  }

  return fallback;
};

export const envConfig = {
  baseUrl: process.env.BASE_URL || 'https://www.carrefour.tn',
  browser: oneOf<BrowserName>(process.env.BROWSER, ['chromium', 'firefox', 'webkit'], 'chromium'),
  device: oneOf<DeviceProfile>(process.env.DEVICE, ['desktop', 'mobile'], 'desktop'),
  headless: toBoolean(process.env.HEADLESS, true),
  defaultTimeoutMs: toNumber(process.env.DEFAULT_TIMEOUT_MS, 15000),
  stepTimeoutMs: toNumber(process.env.STEP_TIMEOUT_MS, 45000),
  video: oneOf<VideoMode>(process.env.VIDEO, ['off', 'on', 'retain-on-failure', 'on-first-retry'], 'retain-on-failure'),
  screenshot: oneOf<ScreenshotMode>(process.env.SCREENSHOT, ['off', 'on', 'only-on-failure'], 'only-on-failure'),
  trace: oneOf<TraceMode>(process.env.TRACE, ['off', 'on', 'retain-on-failure'], 'retain-on-failure'),
};
