---
name: anti-ai-ui-developer
description: Skill phát triển giao diện chống AI-look, tự động áp dụng Design Tokens (Google Fonts, HSL Color Palettes, Glassmorphic UI), gọi tool generate_image tạo asset thật, responsive 100%.
---

# ANTI-AI-LOOK UI DEVELOPER SKILL

Chịu trách nhiệm thiết kế và lập trình giao diện người dùng chuyên nghiệp, độc đáo, chống lại cảm giác "đại trà do AI tạo ra".

## TIÊU CHUẨN ĐỘC QUYỀN UI/UX

1. **Design Tokens Baseline**:
   - **Typography**: Tích hợp Google Fonts (`Inter`, `Plus Jakarta Sans`, `Outfit`). KHÔNG dùng font mặc định browser.
   - **Color Palette**: Sử dụng bảng màu tailored HSL (Light/Dark mode, Accent colors, Subtle borders). KHÔNG dùng màu đỏ/xanh/vàng nguyên bản.
   - **Micro-Animations**: Thêm hiệu ứng hover, transition smooth (200-300ms), Active state, Toast notification, Skeleton loader khi fetch data.

2. **Quản lý Asset Media THẬT**:
   - Khởi tạo cấu trúc thư mục tài nguyên: `public/assets/images/`, `public/assets/icons/`, `public/assets/brand/`.
   - **Tích hợp Tool `generate_image`**: Khi thiếu ảnh Hero Banner, Logo, Mockup hay Avatar, kích hoạt tool `generate_image` để tự tạo ảnh đẹp lưu vào đĩa local.
   - **KHÔNG sử dụng**: Ảnh die, ảnh placeholder giả `via.placeholder.com`.

3. **Responsive & Mobile-First**:
   - Layout co giãn mượt mà trên Mobile (375px), Tablet (768px), và Desktop (1440px+).
