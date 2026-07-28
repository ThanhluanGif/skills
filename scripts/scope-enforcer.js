/**
 * STRICT SCOPE ENFORCER & BOUNDARY GUARD
 * Chức năng:
 * 1. Định nghĩa ranh giới tệp tin (File Boundaries) cho từng Scope.
 * 2. Ngăn chặn AI tự ý sửa các file nằm ngoài Scope được giao -> Tiết kiệm Token & Chống đè code.
 */

const path = require('path');

// Định nghĩa Bảng Quy tắc Phạm vi (Scope Rules Table)
const SCOPE_RULES = {
  SCOPE_DIAGRAM: {
    allowedPaths: ['index.html', 'docs/'],
    allowedCommands: ['node scripts/card-manager.js'],
    description: 'Chỉ được sửa file index.html và sơ đồ đồ thị kiến trúc.'
  },
  SCOPE_CORE_ENGINE: {
    allowedPaths: ['scripts/', 'src/', 'data/'],
    allowedCommands: ['node scripts/card-manager.js', 'npm start'],
    description: 'Chỉ được sửa các script quản lý thẻ và server API core.'
  },
  SCOPE_SECURITY: {
    allowedPaths: ['scripts/', 'src/'],
    allowedCommands: ['npm test'],
    description: 'Chỉ được thao tác kiểm tra bảo mật và SAST Audit.'
  },
  SCOPE_PAYMENT: {
    allowedPaths: ['src/', 'scripts/'],
    allowedCommands: [],
    description: 'Chỉ thao tác nghiệp vụ thanh toán và ngân hàng ting-ting.'
  },
  GLOBAL_SCOPE: {
    allowedPaths: ['*'],
    allowedCommands: ['*'],
    description: 'Phạm vi tổng thể dự án.'
  }
};

class ScopeEnforcer {
  /**
   * Kiểm tra xem 1 file path có nằm trong Scope được phép hay không
   */
  static isFileAllowed(scopeName, targetFilePath) {
    const rule = SCOPE_RULES[scopeName] || SCOPE_RULES.GLOBAL_SCOPE;
    if (rule.allowedPaths.includes('*')) return true;

    const normalizedPath = targetFilePath.replace(/\\/g, '/');

    for (const allowedPath of rule.allowedPaths) {
      if (normalizedPath.includes(allowedPath) || normalizedPath.endsWith(allowedPath)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Khóa hành động nếu vi phạm Scope
   */
  static validateAction(scopeName, targetFilePath) {
    const isAllowed = this.isFileAllowed(scopeName, targetFilePath);
    if (!isAllowed) {
      return {
        allowed: false,
        status: 'SCOPE_VIOLATION_BLOCKED',
        reason: `[BẢO VỆ SCOPE] Hành động bị CHẶN! Thẻ hiện tại có scope là [${scopeName}], không được phép sửa file [${targetFilePath}].`
      };
    }
    return { allowed: true, status: 'SCOPE_PASSED' };
  }
}

if (require.main === module) {
  console.log("=== STRICT SCOPE ENFORCER DEMO ===");
  console.log("1. Kiểm tra sửa index.html với SCOPE_DIAGRAM:", ScopeEnforcer.validateAction('SCOPE_DIAGRAM', 'index.html'));
  console.log("2. Kiểm tra sửa index.html với SCOPE_PAYMENT (Sẽ bị chặn):", ScopeEnforcer.validateAction('SCOPE_PAYMENT', 'index.html'));
}

module.exports = ScopeEnforcer;
