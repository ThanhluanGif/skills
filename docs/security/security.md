# 17. Security Architecture Documentation

---

## 🛡 17.1 Security Enforcement Architecture Diagram

```mermaid
graph TD
    UserAction["User / AI Agent Action"] --> ScopeGuard["scripts/scope-enforcer.js (Scope Guard)"]
    
    ScopeGuard -->|Check 1| ScopeCheck{"Target File in Allowed Scope Paths?"}
    ScopeCheck -->|No| Block1["SCOPE_VIOLATION_BLOCKED (Action Prevented ⛔)"]
    
    ScopeCheck -->|Yes| SanitizationCheck{"Input Sanitized?"}
    SanitizationCheck -->|Yes| PassAction["Action Allowed (SCOPE_PASSED ✅)"]

    subgraph Defense_in_Depth ["Defense-In-Depth Security Layer"]
        DirectoryTraversalGuard["Path Traversal Prevention (src/index.js)"]
        TokenBudgetGuard["Token Budget Guard (Max 2 Retries Limit)"]
    end

    PassAction --> Defense_in_Depth
```

---

## 📋 17.2 Security Implementation Checklist

| Category | Status in Codebase | Implementation Details |
| :--- | :--- | :--- |
| **Scope Boundary Guard** | **IMPLEMENTED** | `scripts/scope-enforcer.js` blocks unauthorized file edits outside active card scope (`SCOPE_DIAGRAM`, `SCOPE_CORE_ENGINE`, etc.). |
| **Directory Traversal Defense** | **IMPLEMENTED** | `src/index.js` verifies `filePath.startsWith(PUBLIC_DIR)` before serving static files. |
| **Token Budget Protection** | **IMPLEMENTED** | `scripts/card-manager.js` limits max 2 retries per bug to prevent token exhaustion loops. |
| **CORS Restriction** | **IMPLEMENTED** | Headers set in `src/index.js`. |
| **OAuth / JWT / Password Hashing** | *Not Implemented* | Proposed in `docs/api/authentication-flow.md` for production deployment. |
