/**
 * QA CIRCUIT BREAKER GUARD (MAX 2 RETRIES TO PROTECT TOKEN BUDGET)
 */

class CircuitBreaker {
  constructor(maxRetries = 2) {
    this.maxRetries = maxRetries;
    this.retryMap = new Map();
  }

  recordAttempt(bugId) {
    const current = this.retryMap.get(bugId) || 0;
    const next = current + 1;
    this.retryMap.set(bugId, next);

    if (next > this.maxRetries) {
      return {
        status: "WAITING_HUMAN_INPUT",
        allowed: false,
        message: `🚨 [CIRCUIT BREAKER TRIGGERED] Bug [${bugId}] đã thử sửa ${next - 1} lần không thành công. Dừng vòng lặp để bảo vệ Token Budget!`
      };
    }

    return {
      status: "RETRY_ALLOWED",
      allowed: true,
      attemptsLeft: this.maxRetries - next
    };
  }
}

module.exports = CircuitBreaker;
