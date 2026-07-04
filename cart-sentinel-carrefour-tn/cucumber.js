require('dotenv').config();

module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
    format: [
      'progress-bar',
      'summary',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
    ],
    formatOptions: {
      snippetInterface: 'async-await',
    },
    parallel: Number(process.env.PARALLEL || 1),
    retry: Number(process.env.RETRY || 0),
    timeout: Number(process.env.STEP_TIMEOUT_MS || 45000),
    publishQuiet: true,
  },
};
