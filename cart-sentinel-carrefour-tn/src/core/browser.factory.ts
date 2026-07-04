import {
  chromium,
  devices,
  firefox,
  webkit,
  type Browser,
  type BrowserContext,
  type BrowserContextOptions,
  type Page,
} from '@playwright/test';
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
    const contextOptions: BrowserContextOptions = {
      baseURL: envConfig.baseUrl,
      locale: 'fr-TN',
      timezoneId: 'Africa/Tunis',
      recordVideo: envConfig.video === 'off' ? undefined : { dir: 'videos/' },
      ...(envConfig.device === 'mobile'
        ? devices['Pixel 5']
        : { viewport: { width: 1440, height: 900 } }),
    };

    return browser.newContext(contextOptions);
  }

  static async newPage(context: BrowserContext): Promise<Page> {
    const page = await context.newPage();
    page.setDefaultTimeout(envConfig.defaultTimeoutMs);
    page.setDefaultNavigationTimeout(envConfig.defaultTimeoutMs);
    return page;
  }
}
