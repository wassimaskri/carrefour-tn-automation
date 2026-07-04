const fs = require('node:fs');
const path = require('node:path');

const reportPath = path.join(process.cwd(), 'reports', 'cucumber-report.html');
const jsonPath = path.join(process.cwd(), 'reports', 'cucumber-report.json');

if (!fs.existsSync(reportPath)) {
  console.log('No HTML report found yet. Run npm run test first.');
  process.exit(0);
}

console.log(`HTML report: ${reportPath}`);

if (fs.existsSync(jsonPath)) {
  const raw = fs.readFileSync(jsonPath, 'utf8');
  const features = JSON.parse(raw);
  const scenarios = features.flatMap((feature) => feature.elements || []);
  const failed = scenarios.filter((scenario) =>
    scenario.steps?.some((step) => step.result?.status === 'failed'),
  );

  console.log(`Features: ${features.length}`);
  console.log(`Scenarios: ${scenarios.length}`);
  console.log(`Failed scenarios: ${failed.length}`);
}
