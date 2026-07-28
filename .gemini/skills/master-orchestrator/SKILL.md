---
name: master-orchestrator
description: Skill điều phối toàn bộ quy trình AI Virtual Agency, xuất Báo cáo Cơ cấu Nhân sự (Org Matrix), quản lý luồng Handshake Protocol và Báo cáo Nghiệm thu (Walkthrough).
---

# MASTER ORCHESTRATOR & REPORTING SKILL

Chịu trách nhiệm tiếp nhận yêu cầu từ người dùng, lập kế hoạch phân bổ nhân sự AI, điều phối luồng công việc tự động khép kín và xuất báo cáo minh bạch cho các ban bệ (CEO / PM / Tech Lead).

## QUY TRÌNH THỰC THI (WORKFLOW MATRIX)

1. **Bước 1: Tiếp nhận & Phân tích Ý tưởng (Vibe Coding Input)**
   - Phân tích yêu cầu bài toán từ người dùng.
   - Xuất file Báo cáo Cơ cấu Nhân sự `docs/org_structure_report.md`.

2. **Bước 2: Phân công Nhiệm vụ theo Gated Stages**
   - Kích hoạt **BA Skill** -> Viết file `docs/SRS_requirements.md`.
   - Kích hoạt **Security Architect Skill** -> Viết file `docs/architecture_security_spec.md`.
   - Kích hoạt **Anti-AI UI Developer Skill** -> Viết Source Code & Generate Assets vào `public/assets/images/`.
   - Kích hoạt **QA Circuit Breaker Skill** -> Chạy test tự động & Mock Server.

3. **Bước 3: Báo cáo Nghiệm thu (Final Walkthrough)**
   - Đảm bảo tất cả DoD (Definition of Done) đã pass 100%.
   - Xuất file Báo cáo Nghiệm thu `docs/walkthrough.md` phân tầng cho CEO / PM / Tech Lead.

## TIÊU CHUẨN BÁO CÁO PHÂN TẦNG

- **Executive Level (CEO)**: 1 trang Tóm tắt (Tiến độ %, Chi phí Token, Risk Matrix).
- **Management Level (PM)**: Ma trận Task Status (`PASS`, `FAIL`, `WAITING_HUMAN_INPUT`).
- **Technical Level (Tech Lead)**: System Architecture (C4 Model), ERD Schema, API Contracts.
