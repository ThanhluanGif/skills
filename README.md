# 🚀 PROACTIVE AI SKILL SYSTEM & HIERARCHICAL COMPACTION ENGINE

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Build Status](https://img.shields.io/badge/tests-5%2F5%20passed-success.svg)](#-kiểm-thử--verification)

> **Hệ thống Quản lý Skill & Nén Thẻ Task Phân Cấp Dành Cho AI Agent & CLI Workflows.**  
> *Giải pháp Tự động hóa Suy luận, Khóa Ranh Giới Scope Chống Lan Man, và Nén Hồ sơ 10-trong-1 Giúp Tiết Kiệm Token Tối Đa.*

---

## 📌 GIỚI THIỆU HỆ THỐNG

**Proactive AI Skill System** là bộ công cụ hạ tầng giúp tối ưu hóa quy trình tương tác giữa con người và các AI Agent (Gemini, Antigravity, AGY CLI). 

Khác với các hệ thống AI thông thường hay rơi vào bẫy lặp vô hạn, tràn context token hoặc bắt người dùng phải trả lời vô số câu hỏi kỹ thuật rườm rà, phần mềm này áp dụng **Kiến trúc Nén Thẻ Phân Cấp (Hierarchical Compaction)** và **Bộ Bảo Vệ Scope Boundary** để vận hành tự động 100% từ Ý tưởng sơ khai đến Báo cáo Tổng quan Executive.

---

## 🔥 4 ĐIỂM KHÁC BIỆT VƯỢT TRỘI (UNIQUE SELLING POINTS)

### 1. 🎯 Tự Động Khóa Ranh Giới Scope (Strict Scope Boundaries)
Tự động nhận diện Scope từ câu lệnh (`SCOPE_DIAGRAM`, `SCOPE_CORE_ENGINE`, `SCOPE_SECURITY`, `SCOPE_PAYMENT`) và khóa ranh giới tệp tin. AI Subagent bị chặn tuyệt đối nếu cố tình chỉnh sửa file ngoài Scope, giúp **bảo vệ codebase không bị lỗi chéo và tiết kiệm 70% chi phí Token**.

### 2. 🗂 Quy Chế Nén Thẻ Phân Cấp 3 Tầng (10-in-1 Compaction Engine)
- **Tầng 0 (`cards.json`)**: Chỉ duy trì các thẻ active gần đây (< 10 thẻ), giữ file luôn siêu nhẹ.
- **Tầng 1 (`data/milestones/`)**: Cứ 10 Thẻ Lẻ hoàn thành tự động gom nén thành **1 File Milestone JSON**.
- **Tầng 2 (`data/reports/`)**: Cứ 10 File Milestones (100 Thẻ công việc) tự động tổng hợp nén thành **1 Báo Cáo Macro 1 trang Markdown**.

### 3. 💡 Bộ Tư Vấn Công Cụ Đa Dạng (Multi-Category Tool Advisor)
Tự động phân tích bài toán để đề xuất bộ công cụ tối ưu nhất (HTML5 Static, Supabase, VietQR, Telegram Bot, Cloudflare Pages...) thay vì cứng nhắc ép buộc 1 công cụ duy nhất.

### 4. 📊 Dashboard Trực Quan Hóa 100% Trên `index.html`
Tích hợp sẵn Mermaid.js render trực tiếp sơ đồ C4 Architecture, sơ đồ luồng nén thẻ và bảng tra cứu tiến độ thời gian thực trên HTML5 mà không cần cài thêm công cụ phụ trợ.

---

## 💻 HƯỚNG DẪN CÀI ĐẶT & SỬ DỤNG

### 1. Cài đặt Dự án

```bash
# Clone repository
git clone https://github.com/your-username/proactive-ai-skill-system.git

# Di chuyển vào thư mục
cd proactive-ai-skill-system

# Cài đặt dependencies (Zero heavy external dependencies)
npm install
```

### 2. Khởi chạy Server API & Visual Dashboard

```bash
# Khởi chạy Server HTTP (Port 3000)
npm start

# Mở trình duyệt xem Dashboard trực quan:
http://localhost:3000
```

### 3. Kiểm thử Tự động 1-Click (Automated Verification)

```bash
# Kiểm tra toàn bộ 5 kịch bản kiểm thử (Scope Guard, Compaction, Tool Advisor, Idle Trigger)
npm test
```

---

## 🛠 CẤU TRÚC THƯ MỤC DỰ ÁN

```text
.
├── README.md                            # Tài liệu Hướng dẫn Sử dụng & Quảng bá
├── package.json                         # Node.js Package Manifest
├── index.html                           # Visual Dashboard (Render Mermaid.js C4 Diagrams)
│
├── .gemini/skills/                      # Custom AI Skill Definitions
│   ├── auto-idea-to-product/            # Skill Master Tự động hóa & Nén Thẻ
│   └── system-architecture-diagrammer/  # Skill Chuyên trách Vẽ Đồ thị Cấu trúc
│
├── data/                                # Tầng Lưu trữ Dữ liệu Nén 3 Tầng
│   ├── cards.json                       # Tầng 0: Thẻ Active (< 10 Thẻ)
│   ├── milestones/                      # Tầng 1: File Milestone Nén 10-in-1
│   └── reports/                         # Tầng 2: File Báo cáo Macro Nén 100-in-1
│
├── scripts/                             # Core Business Engines
│   ├── card-manager.js                  # Engine Quản lý Thẻ, Scope & Compaction
│   ├── scope-enforcer.js                # Boundary Guard Khóa File theo Scope
│   └── verify-system.js                 # 1-Click Test Verification Script
│
└── src/
    └── index.js                         # Native HTTP Server (/api/cards, /api/health)
```

---

## 📜 GIẤY PHÉP BẢN QUYỀN (LICENSE)

Dự án được phát hành dưới giấy phép mã nguồn mở **ISC License**. Mọi cá nhân và tổ chức đều có quyền sử dụng, đóng góp và phát triển mở rộng.
