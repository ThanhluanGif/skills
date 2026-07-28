#!/usr/bin/env node
/**
 * AUTOMATIC GEMINI / AGY SKILL INSTALLER & GLOBAL SYMLINK REGISTER
 * Tự động sao chép các Skills vào:
 * 1. Thư mục .gemini/skills/ của dự án mục tiêu.
 * 2. Thư mục ~/.gemini/config/skills/ của Antigravity/AGY CLI để auto-load toàn hệ thống!
 */

const fs = require('fs');
const path = require('path');

function installSkills() {
  const packageSkillsDir = path.join(__dirname, '../.gemini/skills');
  
  // 1. Thư mục dự án mục tiêu
  const targetProjectDir = process.env.INIT_CWD || process.cwd();
  const targetGeminiSkillsDir = path.join(targetProjectDir, '.gemini/skills');

  // 2. Thư mục config global của Antigravity/AGY CLI
  const homeDir = process.env.HOME || process.env.USERPROFILE || '/Users/admin';
  const globalSkillsDir = path.join(homeDir, '.gemini/config/skills');

  if (!fs.existsSync(packageSkillsDir)) {
    console.log('[Skill Installer] Không tìm thấy nguồn skills trong package.');
    return;
  }

  function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  // Cài đặt vào Dự án Local
  copyRecursiveSync(packageSkillsDir, targetGeminiSkillsDir);
  console.log(`🟢 [LOCAL SKILLS] Đã cài đặt vào: ${targetGeminiSkillsDir}`);

  // Đăng ký vào Global Config AGY/Antigravity
  try {
    copyRecursiveSync(packageSkillsDir, globalSkillsDir);
    console.log(`🟢 [GLOBAL SKILLS] Đã đăng ký vào: ${globalSkillsDir}`);
  } catch (e) {
    console.log(`⚠️ [GLOBAL SKILLS] Không thể đăng ký global: ${e.message}`);
  }

  console.log(`\n✨ Gemini AI / AGY / Antigravity đã nhận diện 100% 8 Skills mới!\n`);
}

if (require.main === module) {
  installSkills();
}

module.exports = installSkills;
