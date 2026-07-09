import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

type StrategyEvidence = {
  decisions: string;
  strategy: string;
  testPlan: string;
};

const readMarkdown = async (filePath: string): Promise<string> =>
  (await readFile(filePath, 'utf8')).toLowerCase();

const loadStrategyEvidence = async (): Promise<StrategyEvidence> => ({
  decisions: await readMarkdown(join(process.cwd(), 'QA_DECISIONS.md')),
  strategy: await readMarkdown(join(process.cwd(), 'docs', 'wassim-test-strategy.md')),
  testPlan: await readMarkdown(join(process.cwd(), 'docs', 'test-plan-wassim.md')),
});

Given('the QA strategy evidence is available', async function () {
  this.strategyEvidence = await loadStrategyEvidence();
});

Then('the strategy should explain business-critical flows', function () {
  const evidence = this.strategyEvidence as StrategyEvidence;

  expect(evidence.strategy).toContain('critical business flow');
  expect(evidence.strategy).toContain('search');
  expect(evidence.strategy).toContain('cart');
  expect(evidence.testPlan).toContain('business risks');
});

Then('the strategy should connect manual review to automation', function () {
  const evidence = this.strategyEvidence as StrategyEvidence;

  expect(evidence.strategy).toContain('reconnaissance');
  expect(evidence.strategy).toContain('manual');
  expect(evidence.strategy).toContain('automation');
  expect(evidence.decisions).toContain('before automation');
});

Then('the strategy should document excluded unsafe flows', function () {
  const evidence = this.strategyEvidence as StrategyEvidence;

  expect(evidence.strategy).toContain('payment');
  expect(evidence.strategy).toContain('private account data');
  expect(evidence.strategy).toContain('destructive customer action');
});

Then('the strategy should map risks to automated checks', function () {
  const evidence = this.strategyEvidence as StrategyEvidence;

  expect(evidence.strategy).toContain('risk-based');
  expect(evidence.strategy).toContain('smoke');
  expect(evidence.strategy).toContain('mobile');
  expect(evidence.strategy).toContain('negative');
});

Then('the strategy should describe failure evidence collection', function () {
  const evidence = this.strategyEvidence as StrategyEvidence;

  expect(evidence.strategy).toContain('screenshots on failure');
  expect(evidence.strategy).toContain('playwright traces');
  expect(evidence.strategy).toContain('allure report');
});
