/**
 * AGY Virtual Agency - Token Guard & Circuit Breaker Engine
 * Enforces:
 * 1. Environment variables audit (.env check) -> PAUSE & WAITING_HUMAN_INPUT on failure.
 * 2. Model Tier Allocation:
 *    - Tier 1: Flash (QA log processing, light checks)
 *    - Tier 2: Pro (Code refactoring & feature building)
 *    - Tier 3: Reasoning (Security design & architecture)
 * 3. Max Retries Guard (Max 2 retries per bug to protect Token Budget).
 */

const fs = require('fs');
const path = require('path');

const MAX_RETRIES = 2;

// Required environment keys for Skill system execution
const REQUIRED_ENV_KEYS = [
  'PORT',
  'DATABASE_URL'
];

class CircuitBreaker {
  constructor(projectDir = process.cwd()) {
    this.projectDir = projectDir;
    this.retryMap = new Map();
  }

  /**
   * 1. Audit Environment Variables
   */
  checkEnvironment() {
    const envPath = path.join(this.projectDir, '.env');
    const missingKeys = [];

    if (!fs.existsSync(envPath)) {
      return {
        status: 'PAUSE',
        actionRequired: 'WAITING_HUMAN_INPUT',
        reason: 'File `.env` không tồn tại trong thư mục gốc dự án.',
        missingKeys: REQUIRED_ENV_KEYS
      };
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const key of REQUIRED_ENV_KEYS) {
      if (!envContent.includes(`${key}=`) || envContent.includes(`${key}=your_`) || envContent.includes(`${key}=CHANGE_ME`)) {
        missingKeys.push(key);
      }
    }

    if (missingKeys.length > 0) {
      return {
        status: 'PAUSE',
        actionRequired: 'WAITING_HUMAN_INPUT',
        reason: `Thiếu hoặc chưa cấu hình các biến môi trường quan trọng: ${missingKeys.join(', ')}`,
        missingKeys
      };
    }

    return { status: 'OK', message: 'Environment verification passed.' };
  }

  /**
   * 2. Select Model Tier based on task complexity
   */
  resolveModelTier(taskType) {
    switch (taskType.toLowerCase()) {
      case 'qa':
      case 'log_check':
      case 'syntax_audit':
        return {
          tier: 'Tier 1',
          model: 'Flash',
          description: 'Sử dụng Model Flash nhẹ & nhanh để xử lý log và QA'
        };

      case 'refactor':
      case 'feature_build':
      case 'component_dev':
        return {
          tier: 'Tier 2',
          model: 'Pro',
          description: 'Sử dụng Model Pro đủ khả năng viết code & refactor phức tạp'
        };

      case 'security':
      case 'architecture':
      case 'erd_design':
        return {
          tier: 'Tier 3',
          model: 'Reasoning',
          description: 'Sử dụng Model Reasoning suy luận sâu cho thiết kế kiến trúc và bảo mật'
        };

      default:
        return {
          tier: 'Tier 2',
          model: 'Pro',
          description: 'Model mặc định cho công việc tổng hợp'
        };
    }
  }

  /**
   * 3. Track Retries and Circuit Breaker Trigger
   */
  recordRetry(bugId) {
    const current = this.retryMap.get(bugId) || 0;
    const next = current + 1;
    this.retryMap.set(bugId, next);

    if (next > MAX_RETRIES) {
      return {
        tripped: true,
        status: 'PAUSE',
        actionRequired: 'WAITING_HUMAN_INPUT',
        message: `Circuit Breaker KÍCH HOẠT! Bug [${bugId}] đã đạt giới hạn tối đa ${MAX_RETRIES} lần retries. Dừng để bảo vệ Token Budget.`
      };
    }

    return {
      tripped: false,
      status: 'RETRYING',
      attempts: next,
      remaining: MAX_RETRIES - next
    };
  }
}

// Interactive execution when run from command line
if (require.main === module) {
  const breaker = new CircuitBreaker();
  console.log('=== AGY CIRCUIT BREAKER & TOKEN GUARD AUDIT ===');
  
  const envResult = breaker.checkEnvironment();
  if (envResult.status === 'PAUSE') {
    console.error('\n🔴 Status: [PAUSE]');
    console.error(`🔴 State : [${envResult.actionRequired}]`);
    console.error(`🔴 Lý do : ${envResult.reason}`);
    console.error('👉 Vui lòng tạo/cập nhật file .env với các giá trị hợp lệ rồi chạy lại.');
  } else {
    console.log('🟢 Environment Check: PASSED');
  }

  console.log('\n--- BẢNG PHÂN BỔ MODEL TIER ---');
  console.log('- QA / Logs   :', JSON.stringify(breaker.resolveModelTier('qa')));
  console.log('- Refactor    :', JSON.stringify(breaker.resolveModelTier('refactor')));
  console.log('- Security    :', JSON.stringify(breaker.resolveModelTier('security')));
}

module.exports = CircuitBreaker;
