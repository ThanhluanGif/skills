# 11. Authentication & Security Flow Documentation

**Status in Current Source Code:** Local & CLI Direct Execution Mode (Authentication Middleware is *Not Implemented* for local CLI mode, but proposed below for Production Deployment).

---

## 🔒 11.1 Proposed Enterprise Security & Auth Architecture

```mermaid
graph TD
    Client["Client App / Browser"] -->|1. POST /api/auth/login| AuthEP["Auth Controller"]
    AuthEP -->|2. Verify Credentials| UserDB["User Account Store (Bcrypt Hash)"]
    AuthEP -->|3. Issue JWT Token| TokenSigner["JWT Signer"]
    
    TokenSigner -->|4. Return Short-Lived Access Token| Client
    TokenSigner -->|5. Set HTTP-Only Cookie| RefreshCookie["Refresh Token Cookie (HttpOnly, Secure)"]

    Client -->|6. API Request + Bearer Token| APIGateway["API Gateway / Scope Middleware"]
    APIGateway -->|7. Verify Token & RBAC Permissions| ScopeGuard["Scope Enforcer"]
    ScopeGuard -->|8. Scope Passed| InternalEngine["Card Manager Engine"]
```

---

## 🛡 11.2 Scope & Permission RBAC Table (Proposed Blueprint)

| Role | Permitted Scopes | Allowed Operations |
| :--- | :--- | :--- |
| **USER / DEVELOPER** | `SCOPE_DIAGRAM`, `SCOPE_PAYMENT`, `SCOPE_CORE_ENGINE` | Tạo thẻ mới, đọc thẻ active, xem sơ đồ `index.html`. |
| **ADMIN / ARCHITECT** | `GLOBAL_SCOPE` | Nén thẻ thủ công, dọn dẹp Milestones, sửa file hệ thống core. |
| **GUEST** | `SCOPE_READONLY` | Chỉ được phép xem `index.html` và `GET /api/cards`. |
