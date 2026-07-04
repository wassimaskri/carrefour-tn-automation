import {
  After,
  Before,
  setDefaultTimeout,
  Status,
  type ITestCaseHookParameter,
} from '@cucumber/cucumber';
import { envConfig } from '../config/env.config';
import { BrowserFactory } from '../core/browser.factory';
import type { CartSentinelWorld } from './world';

setDefaultTimeout(envConfig.stepTimeoutMs);

Before(async function (this: CartSentinelWorld, scenario: ITestCaseHookParameter) {
  const featureName = scenario.gherkinDocument.feature?.name || 'Unknown feature';
  const scenarioName = scenario.pickle.name;
  const tags = scenario.pickle.tags.map((tag) => tag.name).join(' ');

  console.log(`\n[FEATURE] ${featureName}`);
  console.log(`[SCENARIO] ${scenarioName}`);
  console.log(`[TAGS] ${tags || 'none'}\n`);
  console.log(`[DEVICE] ${envConfig.device}\n`);

  this.browser = await BrowserFactory.launch();
  this.context = await BrowserFactory.newContext(this.browser);
  this.page = await BrowserFactory.newPage(this.context);
  this.initPages();
});

After(async function (this: CartSentinelWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  await this.context?.close();
  await this.browser?.close();
});
