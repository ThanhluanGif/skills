---
name: master-app-builder
description: MASTER SKILL DỰNG ỨNG DỤNG MÌ ĂN LIỀN (ONE-PROMPT INSTANT BUILDER). Người dùng chỉ cần đưa Ý tưởng (VD: Website Bán Tennis), Skill này tự phân hóa toàn bộ nghiệp vụ, thiết kế UI/UX Anti-AI-look, gọi generate_image sinh asset thật, tự chọn Model phù hợp, cấu hình DB & Bảo mật OWASP, và tự động test ra THÀNH PHẨM HOÀN CHỈNH.
---

# ONE-PROMPT MASTER APP BUILDER SKILL

> **Triết lý "Mì Ăn Liền - Một Lệnh Ra Thành Phẩm"**: Người dùng KHÔNG CẦN quan tâm bên dưới có 10 hay 100 sub-skills nhỏ. Người dùng chỉ đưa Ý TƯỞNG -> Master Skill tự động đảm nhận tất cả.

## 🚀 QUY TRÌNH TỰ ĐỘNG PHÂN HÓA (AUTO-ORCHESTRATION PIPELINE)

Khi nhận được Ý tưởng từ Người dùng (Ví dụ: *"Tạo website bán đồ Tennis"*):

### 1. Tự Động Phân Tích & Chọn Model (Auto-Model Selection)
- Tự động chọn Model Tier 1 (`Flash`) cho xử lý log, Tier 2 (`Pro`) cho lập trình UI & Logic, Tier 3 (`Reasoning`) cho bảo mật.
- Người dùng không cần tự chọn model thủ công.

### 2. Tự Động Phân Hóa Nhiệm Vụ Nghiệp Vụ (Auto Domain Breakdown)
- Tự định hình danh mục sản phẩm (Vợt, Giày, Bóng, Phụ kiện Tennis).
- Tự thiết kế Database Schema (Users, Products, Orders, Leads).
- Tự cấu hình Giỏ hàng (Shopping Cart), Đặt hàng (Checkout Form), Tìm kiếm & Lọc.

### 3. Tự Động Tạo Giao Diện Anti-AI-Look & Asset Thật (Auto UI/UX & Real Assets)
- Gọi tool `generate_image` tạo banner/hero image tennis chất lượng cao lưu vào `public/assets/images/`.
- Áp dụng Google Fonts (`Plus Jakarta Sans`, `Outfit`), HSL Slate Dark Palette, hiệu ứng Glassmorphism.
- Responsive 100% trên Mobile & Desktop.

### 4. Tự Động Tích Hợp Bảo Mật & Self-Testing (Auto Security & Self-Correction)
- Bảo mật Password Hashing, Input Sanitization, Rate Limiting.
- Tự động kiểm thử runtime -> PASS 100% mới bàn giao cho Người dùng.
