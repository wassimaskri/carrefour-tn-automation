const { existsSync } = require('node:fs');
const { delimiter, join } = require('node:path');
const { spawnSync } = require('node:child_process');

const env = { ...process.env };
const javaCandidates = [
  {
    home: '/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home',
    bin: '/opt/homebrew/opt/openjdk@17/bin',
  },
  {
    home: '/usr/lib/jvm/java-17-openjdk-amd64',
    bin: '/usr/lib/jvm/java-17-openjdk-amd64/bin',
  },
];

const javaCandidate = javaCandidates.find((candidate) => existsSync(join(candidate.bin, 'java')));

if (javaCandidate) {
  env.JAVA_HOME = javaCandidate.home;

  if (!env.PATH.includes(javaCandidate.bin)) {
    env.PATH = `${javaCandidate.bin}${delimiter}${env.PATH}`;
  }
}

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(command, ['allure', 'open', 'reports/allure-report'], {
  env,
  stdio: 'inherit',
});

process.exit(result.status || 0);
