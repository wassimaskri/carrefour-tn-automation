import { chromium, firefox, webkit, type Browser, type BrowserContext, type Page } from '@playwright/test';
import { envConfig } from '../config/env.config';

export class BrowserFactory {
  static async launch(): Promise<Browser> {
    const browserType = {
      chromium,
      firefox,
      webkit,
    }[envConfig.browser];

    return browserType.launch({
      headless: envConfig.headless,
      args: ['--disable-dev-shm-usage'],
    });
  }

  static async newContext(browser: Browser): Promise<BrowserContext> {
    return browser.newContext({
      baseURL: envConfig.baseUrl,
      viewport: { width: 1440, height: 900 },
      locale: 'fr-TN',
      timezoneId: 'Africa/Tunis',
      recordVideo: envConfig.video === 'off' ? undefined : { dir: 'videos/' },
    });
  }

  static async newPage(context: BrowserContext): Promise<Page> {
    const page = await context.newPage();
    page.setDefaultTimeout(envConfig.defaultTimeoutMs);
    page.setDefaultNavigationTimeout(envConfig.defaultTimeoutMs);
    return page;
  }
}
