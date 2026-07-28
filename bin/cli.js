#!/usr/bin/env node

/**
 * AGY CLI - Master Skill System Terminal Runner
 * Command line binary runner for AGY Skills
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const args = process.argv.slice(2);
const command = args[0] || 'list';

const SKILLS_DIR = path.join(__dirname, '../.gemini/skills');

function printHelp() {
  console.log(`
=====================================================
🚀 AGY VIRTUAL AGENCY - MASTER SKILL SYSTEM (NPM CLI)
=====================================================

Cú pháp: agy-skills [command]

Danh sách các lệnh khả dụng:
  list, /skills       : Liệt kê toàn bộ Core Skills trong hệ thống
  check, breaker      : Chạy kiểm tra Token Guard & Circuit Breaker
  mock                : Khởi chạy Mock Server Engine (Google, Zalo, Payment, SMTP)
  start               : Khởi chạy Core Server Application (/api/health, /api/skills)
  help                : Hiển thị hướng dẫn sử dụng

Ví dụ:
  $ npx agy-skills list
  $ npx agy-skills check
  $ npx agy-skills mock
`);
}

function listSkills() {
  console.log(`\n📋 DANH SÁCH CORE SKILLS HỆ THỐNG AGY CLI:\n`);
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`🔴 Thư mục skills không tồn tại tại ${SKILLS_DIR}`);
    return;
  }

  const skills = fs.readdirSync(SKILLS_DIR).filter(item => {
    return fs.statSync(path.join(SKILLS_DIR, item)).isDirectory();
  });

  skills.forEach((skillName, index) => {
    const skillPath = path.join(SKILLS_DIR, skillName, 'SKILL.md');
    let desc = 'Chưa có mô tả';
    if (fs.existsSync(skillPath)) {
      const content = fs.readFileSync(skillPath, 'utf8');
      const match = content.match(/description:\s*(.+)/);
      if (match) desc = match[1].trim();
    }
    console.log(`  ${index + 1}. \x1b[36m${skillName.padEnd(22)}\x1b[0m : ${desc}`);
  });
  console.log(`\n✨ Kích hoạt skill bằng cách gọi @<skill-name> hoặc /skills trên AGY Terminal.\n`);
}

function runScript(scriptRelativePath) {
  const scriptPath = path.join(__dirname, '..', scriptRelativePath);
  const child = spawn(process.execPath, [scriptPath], { stdio: 'inherit' });
  child.on('exit', (code) => {
    process.exit(code || 0);
  });
}

switch (command.toLowerCase()) {
  case 'list':
  case '/skills':
  case 'skills':
    listSkills();
    break;

  case 'check':
  case 'breaker':
  case 'circuit-breaker':
    runScript('scripts/circuit-breaker.js');
    break;

  case 'mock':
  case 'mock-server':
    runScript('scripts/mock-server.js');
    break;

  case 'start':
  case 'server':
    runScript('src/index.js');
    break;

  case 'help':
  case '--help':
  case '-h':
    printHelp();
    break;

  default:
    console.log(`\x1b[31m🔴 Lệnh không hợp lệ: "${command}"\x1b[0m`);
    printHelp();
    break;
}
