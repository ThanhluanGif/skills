#!/usr/bin/env node
/**
 * CLI BINARY RUNNER FOR thanhluangit-skills
 */

const installSkills = require('../scripts/install-skills');

const args = process.argv.slice(2);

if (args.includes('setup') || args.includes('install')) {
  installSkills();
} else {
  // Mặc định tự động cài đặt skills và khởi chạy HTTP Server & Dashboard
  installSkills();
  require('../src/index.js');
}
