import {
  After,
  Before,
  setDefaultTimeout,
  Status,
  type ITestCaseHookParameter,
} from '@cucumber/cucumber';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { envConfig } from '../config/env.config';
import { BrowserFactory } from '../core/browser.factory';
import type { CartSentinelWorld } from './world';

setDefaultTimeout(envConfig.stepTimeoutMs);

const safeFileName = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);

const isDocumentationScenario = (scenario: ITestCaseHookParameter): boolean =>
  scenario.pickle.tags.some((tag) => ['@documentation', '@strategy'].includes(tag.name));

Before(async function (this: CartSentinelWorld, scenario: ITestCaseHookParameter) {
  const featureName = scenario.gherkinDocument.feature?.name || 'Unknown feature';
  const scenarioName = scenario.pickle.name;
  const tags = scenario.pickle.tags.map((tag) => tag.name).join(' ');

  console.log(`\n[FEATURE] ${featureName}`);
  console.log(`[SCENARIO] ${scenarioName}`);
  console.log(`[TAGS] ${tags || 'none'}\n`);

  if (isDocumentationScenario(scenario)) {
    console.log('[DEVICE] not required for documentation evidence\n');
    return;
  }

  console.log(`[DEVICE] ${envConfig.device}\n`);

  this.browser = await BrowserFactory.launch();
  this.context = await BrowserFactory.newContext(this.browser);

  if (envConfig.trace !== 'off') {
    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  }

  this.page = await BrowserFactory.newPage(this.context);
  this.initPages();
});

After(async function (this: CartSentinelWorld, scenario) {
  const hasFailed = scenario.result?.status === Status.FAILED;

  if (hasFailed && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  if (this.context && envConfig.trace !== 'off') {
    if (envConfig.trace === 'on' || hasFailed) {
      await mkdir('traces', { recursive: true });
      const tracePath = join('traces', `${safeFileName(scenario.pickle.name)}.zip`);
      await this.context.tracing.stop({ path: tracePath });
      await this.attach(`Trace: ${tracePath}`, 'text/plain');
    } else {
      await this.context.tracing.stop();
    }
  }

  await this.context?.close();
  await this.browser?.close();
});
