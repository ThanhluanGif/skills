---
name: security-architect
description: Skill thiết kế kiến trúc hệ thống và kiểm định bảo mật theo chuẩn OWASP ASVS Level 2, cấu hình Password Hashing (Argon2id/Bcrypt), JWT Cookie, Rate Limiting và SAST Audit.
---

# SECURITY & SYSTEM ARCHITECT SKILL

Đảm bảo mọi thiết kế và lập trình trong hệ thống tuân thủ nghiêm ngặt các chuẩn bảo mật quốc tế và kiến trúc bền vững.

## CHUẨN BẢO MẬT MẶC ĐỊNH (ZERO-TRUST BASELINE)

1. **Xác thực Mật khẩu (Password Security)**:
   - Sử dụng `Argon2id` (memory 64MB, time 3, parallelism 4) hoặc `Bcrypt` (salt rounds >= 10).
   - Tuyệt đối KHÔNG mã hóa MD5/SHA1 hoặc lưu plaintext.

2. **Quản lý Session & Token**:
   - `Access Token`: JWT short-lived (thời gian sống max 15 phút).
   - `Refresh Token`: Lưu trong Cookie `HttpOnly`, `Secure`, `SameSite=Strict` (chống XSS & CSRF).

3. **Chống Tấn Công Thông Dụng (OWASP Top 10)**:
   - **SQL/NoSQL Injection**: Sử dụng ORM/Query Builder với Prepared Statements (Prisma/TypeORM), validate schema bằng Zod.
   - **XSS Attack**: Escape toàn bộ HTML output, áp dụng Content Security Policy (CSP).
   - **Rate Limiting**: Bắt buộc cấu hình middleware giới hạn rate limit (Max 5 req/phút cho Auth API, Max 100 req/15 phút cho Public API).

4. **Quản lý Environment & Secrets**:
   - Mọi Secret (API Key, DB Password, JWT Secret) lưu trong file `.env`.
   - Bắt buộc kiểm tra file `.gitignore` để không bao giờ push `.env` lên Git.
