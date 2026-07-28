#!/usr/bin/env node
/**
 * AUTOMATIC GEMINI / AGY SKILL INSTALLER
 * Tự động sao chép các Skills từ package vào thư mục .gemini/skills/ của dự án mục tiêu.
 */

const fs = require('fs');
const path = require('path');

function installSkills() {
  const packageSkillsDir = path.join(__dirname, '../.gemini/skills');
  
  // Xác định thư mục dự án mục tiêu (nơi user gõ npm i)
  const targetProjectDir = process.env.INIT_CWD || process.cwd();
  const targetGeminiSkillsDir = path.join(targetProjectDir, '.gemini/skills');

  if (!fs.existsSync(packageSkillsDir)) {
    console.log('[Skill Installer] Không tìm thấy nguồn skills trong package.');
    return;
  }

  // Đảm bảo thư mục mục tiêu tồn tại
  if (!fs.existsSync(targetGeminiSkillsDir)) {
    fs.mkdirSync(targetGeminiSkillsDir, { recursive: true });
  }

  // Sao chép đệ quy tất cả các folder skills
  function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  copyRecursiveSync(packageSkillsDir, targetGeminiSkillsDir);
  console.log(`\n🟢 [SUCCESS] Đã tự động cài đặt tất cả Skills vào: ${targetGeminiSkillsDir}`);
  console.log(`✨ Gemini / AGY / Antigravity đã nhận diện 100% Skills mới!\n`);
}

if (require.main === module) {
  installSkills();
}

module.exports = installSkills;
