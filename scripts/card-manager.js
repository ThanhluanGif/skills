/**
 * PROACTIVE AI CARD ENGINE WITH SCOPE ENFORCER, HIERARCHICAL COMPACTION & MULTI-TOOL ADVISOR
 */

const fs = require('fs');
const path = require('path');
const ScopeEnforcer = require('./scope-enforcer');

const DATA_DIR = path.join(__dirname, '../data');
const CARDS_FILE = path.join(DATA_DIR, 'cards.json');
const MILESTONES_DIR = path.join(DATA_DIR, 'milestones');
const REPORTS_DIR = path.join(DATA_DIR, 'reports');

const TOOL_CATALOG = {
  STATIC_WEB: {
    category: "Trang Web Tĩnh / Landing Page",
    stack: "HTML5 + Vanilla CSS + Cloudflare Pages / Vercel",
    reason: "Cực nhẹ, tốc độ tải 0ms, miễn phí hosting 100%, bảo mật tuyệt đối không lo bị hack DB."
  },
  CLOUD_BACKEND: {
    category: "Database & Auth Cloud",
    stack: "Supabase (PostgreSQL) HOẶC Firebase (NoSQL)",
    reason: "Tích hợp sẵn Đăng ký/Đăng nhập, Realtime sync và Storage miễn phí."
  },
  PAYMENT_AUTOMATION: {
    category: "Thanh toán & Ting-Ting Tự động",
    stack: "VietQR / PayOS / Casso Webhook / Stripe",
    reason: "Tạo mã QR chuyển khoản ngân hàng Việt Nam tự động, nhận notification ting-ting tức thì."
  },
  MESSAGING_NOTIFY: {
    category: "Thông báo & Chatbot",
    stack: "Telegram Bot Webhook / Zalo ZNS / Resend Email",
    reason: "Bắn thông báo đơn hàng hoặc mã OTP trực tiếp vào điện thoại người dùng miễn phí."
  }
};

class CardManager {
  constructor() {
    this.ensureDirs();
  }

  ensureDirs() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(MILESTONES_DIR)) fs.mkdirSync(MILESTONES_DIR, { recursive: true });
    if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });
    if (!fs.existsSync(CARDS_FILE)) fs.writeFileSync(CARDS_FILE, JSON.stringify([], null, 2), 'utf8');
  }

  getCards() {
    try {
      return JSON.parse(fs.readFileSync(CARDS_FILE, 'utf8'));
    } catch (e) {
      return [];
    }
  }

  saveCards(cards) {
    fs.writeFileSync(CARDS_FILE, JSON.stringify(cards, null, 2), 'utf8');
  }

  detectScopeFromPrompt(promptText) {
    const text = promptText.toLowerCase();
    if (text.includes('sơ đồ') || text.includes('đồ thị') || text.includes('index.html')) return 'SCOPE_DIAGRAM';
    if (text.includes('ngân hàng') || text.includes('thanh toán') || text.includes('ting ting')) return 'SCOPE_PAYMENT';
    if (text.includes('bảo mật') || text.includes('audit')) return 'SCOPE_SECURITY';
    return 'SCOPE_CORE_ENGINE';
  }

  processUserPrompt(promptText, customScope = null, category = "Nghiệp vụ mới") {
    const cards = this.getCards();

    cards.forEach(card => {
      if (card.status === "IN_PROGRESS") {
        card.status = "DONE";
        card.completedAt = new Date().toISOString();
      }
    });

    const assignedScope = customScope || this.detectScopeFromPrompt(promptText);
    const cardId = `CARD-${String(cards.length + 1).padStart(3, '0')}`;

    const newCard = {
      id: cardId,
      prompt: promptText,
      title: `Task: ${promptText.slice(0, 45)}...`,
      scope: assignedScope,
      category: category,
      status: "IN_PROGRESS",
      createdAt: new Date().toISOString()
    };

    cards.push(newCard);
    this.saveCards(cards);
    this.compactCardsIfNeeded();

    return newCard;
  }

  checkIdleScopeState() {
    const cards = this.getCards();
    const activeCards = cards.filter(c => c.status === "IN_PROGRESS");

    if (activeCards.length === 0) {
      return {
        status: "IDLE_NO_SCOPE_LEFT",
        proposedCard: {
          id: `CARD-${String(cards.length + 1).padStart(3, '0')}`,
          prompt: "[AI AUTO-PROPOSED] Tích hợp Ngân Hàng Ting-Ting & Webhook VietQR",
          title: "Tích hợp Ngân Hàng Ting-Ting & Webhook VietQR",
          scope: "SCOPE_PAYMENT_PROPOSED",
          status: "WAITING_USER_APPROVAL"
        },
        userQueryPrompt: `🔔 [CẠN SCOPE] Tất cả công việc hiện tại đã hoàn thành 100%! AI đề xuất Scope tiếp theo: [SCOPE_PAYMENT_PROPOSED]. Bạn có muốn AI tự động chạy không?`
      };
    }

    return { status: "ACTIVE_SCOPE_RUNNING", activeCount: activeCards.length };
  }

  adviseToolsFromPrompt(promptText) {
    const text = promptText.toLowerCase();
    let advice = [];

    if (text.includes('web') || text.includes('trang') || text.includes('giao diện')) advice.push(TOOL_CATALOG.STATIC_WEB);
    if (text.includes('database') || text.includes('lưu') || text.includes('đăng nhập')) advice.push(TOOL_CATALOG.CLOUD_BACKEND);
    if (text.includes('thanh toán') || text.includes('ngân hàng') || text.includes('ting ting')) advice.push(TOOL_CATALOG.PAYMENT_AUTOMATION);
    if (text.includes('thông báo') || text.includes('mail') || text.includes('tin nhắn')) advice.push(TOOL_CATALOG.MESSAGING_NOTIFY);

    if (advice.length === 0) advice = [TOOL_CATALOG.STATIC_WEB, TOOL_CATALOG.CLOUD_BACKEND];

    return { matchedCategories: advice };
  }

  compactCardsIfNeeded() {
    const cards = this.getCards();
    const completedCards = cards.filter(c => c.status === "DONE");

    if (completedCards.length >= 10) {
      const milestoneCount = fs.readdirSync(MILESTONES_DIR).filter(f => f.endsWith('.json')).length + 1;
      const milestoneId = `MILESTONE-${String(milestoneCount).padStart(3, '0')}`;
      const milestoneFile = path.join(MILESTONES_DIR, `${milestoneId}.json`);

      const batchToCompact = completedCards.slice(0, 10);
      const milestoneData = {
        milestoneId: milestoneId,
        compactedAt: new Date().toISOString(),
        totalCardsCompacted: batchToCompact.length,
        scopesIncluded: [...new Set(batchToCompact.map(c => c.scope))],
        summary: `Hồ sơ nén 10 thẻ công việc từ ${batchToCompact[0].id} đến ${batchToCompact[batchToCompact.length - 1].id}`,
        cards: batchToCompact
      };

      fs.writeFileSync(milestoneFile, JSON.stringify(milestoneData, null, 2), 'utf8');

      const remainingCards = cards.filter(c => !batchToCompact.includes(c));
      this.saveCards(remainingCards);
      console.log(`[COMPACTION ENGINE] ⚡ Đã nén 10 Thẻ Lẻ thành Milestone File: ${milestoneId}.json`);
    }
  }
}

module.exports = CardManager;
