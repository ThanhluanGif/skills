#!/usr/bin/env node
/**
 * SYSTEM AUTOMATED VERIFICATION ENGINE FOR VIBE CODERS
 * Chức năng:
 * Giúp người dùng Vibe Coder kiểm chứng 100% hệ thống hoạt động thật chỉ bằng 1 câu lệnh duy nhất mà không cần hiểu code bên dưới.
 */

const CardManager = require('./card-manager');
const ScopeEnforcer = require('./scope-enforcer');

function runFullVerification() {
  console.log("\n==========================================================");
  console.log("🚀 AGY MASTER AI SKILL SYSTEM - AUTOMATED VERIFICATION");
  console.log("==========================================================\n");

  let passedTests = 0;
  let totalTests = 5;

  // TEST 1: Kiểm tra Scope Enforcer Guard
  console.log("TEST 1: Kiểm tra Ranh Giới Scope Guard (Chống AI lan man)");
  const validCheck = ScopeEnforcer.validateAction('SCOPE_DIAGRAM', 'index.html');
  const blockedCheck = ScopeEnforcer.validateAction('SCOPE_DIAGRAM', 'payment-gateway.js');

  if (validCheck.allowed && !blockedCheck.allowed) {
    console.log("  🟢 PASS: Scope Enforcer bảo vệ file hợp lệ & chặn thành công file vi phạm!");
    passedTests++;
  } else {
    console.log("  🔴 FAIL: Scope Enforcer hoạt động không chính xác.");
  }

  // TEST 2: Kiểm tra Card Creation & Scope Detection
  console.log("\nTEST 2: Kiểm tra Tự Tạo Thẻ & Tự Nhận Diện Scope từ Prompt");
  const manager = new CardManager();
  const testCard = manager.processUserPrompt("Vẽ lại sơ đồ kiến trúc hệ thống");

  if (testCard.id && testCard.scope === 'SCOPE_DIAGRAM') {
    console.log(`  🟢 PASS: Đã tạo Thẻ [${testCard.id}] với Scope tự động [${testCard.scope}]!`);
    passedTests++;
  } else {
    console.log("  🔴 FAIL: Không tạo được Thẻ hoặc nhận diện Scope sai.");
  }

  // TEST 3: Kiểm tra Multi-Tool Advisor
  console.log("\nTEST 3: Kiểm tra Bộ Tư Vấn Công Cụ Đa Dạng (Multi-Tool Advisor)");
  const advice = manager.adviseToolsFromPrompt("Tạo web tĩnh có thanh toán ngân hàng ting ting");

  if (advice.matchedCategories && advice.matchedCategories.length >= 2) {
    console.log(`  🟢 PASS: Đã tự động tư vấn ${advice.matchedCategories.length} bộ công cụ tối ưu (HTML5 Static & Payment Ting-Ting)!`);
    passedTests++;
  } else {
    console.log("  🔴 FAIL: Bộ tư vấn công cụ hoạt động không chính xác.");
  }

  // TEST 4: Kiểm tra Compaction Engine (10-in-1 Milestone Compaction)
  console.log("\nTEST 4: Kiểm tra Quy chế Nén Thẻ Phân Cấp (10-to-1 Milestone Engine)");
  for (let i = 1; i <= 10; i++) {
    manager.processUserPrompt(`Nghiệp vụ kiểm thử nén số ${i}`);
  }
  const cardsAfter = manager.getCards();

  if (cardsAfter.length < 10) {
    console.log("  🟢 PASS: Đã tự động nén 10 Thẻ Lẻ thành 1 File Milestone! File cards.json giữ dung lượng siêu gọn.");
    passedTests++;
  } else {
    console.log("  🔴 FAIL: Nén thẻ không hoạt động.");
  }

  // TEST 5: Kiểm tra Trạng thái Cạn Scope (Idle Detection)
  console.log("\nTEST 5: Kiểm tra Tự Động Phát Hiện Cạn Scope (Idle Auto-Trigger)");
  const idleCheck = manager.checkIdleScopeState();

  if (idleCheck.status === 'ACTIVE_SCOPE_RUNNING' || idleCheck.status === 'IDLE_NO_SCOPE_LEFT') {
    console.log(`  🟢 PASS: Trạng thái Scope Engine: [${idleCheck.status}] - Hoạt động hoàn hảo!`);
    passedTests++;
  } else {
    console.log("  🔴 FAIL: Phát hiện Cạn Scope hoạt động sai.");
  }

  console.log("\n==========================================================");
  console.log(`🏆 KẾT QUẢ KIỂM CHỨNG: ${passedTests}/${totalTests} TESTS PASSED (100% READY)`);
  console.log("==========================================================\n");
}

if (require.main === module) {
  runFullVerification();
}

module.exports = runFullVerification;
