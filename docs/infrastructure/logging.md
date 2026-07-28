# 15. Logging Architecture Documentation

---

## 🪵 15.1 Logging Architecture Diagram

```mermaid
graph TD
    Engine["card-manager.js / scope-enforcer.js"] -->|Console Log / Error| Console["Standard Console Output (stdout/stderr)"]
    Console -->|Audit Log Entries| AuditJSON["data/milestones/ & cards.json Log Entries"]
    
    subgraph Proposed_Enterprise_Logging ["Proposed Enterprise Logging Stack (Not Implemented)"]
        Console -->|Winston / Pino Logger| LogShipper["FluentBit Log Shipper"]
        LogShipper --> ELK["Elasticsearch / Kibana Dashboard"]
    end
```

---

## 📋 15.2 Current Log Event Types

1. `[COMPACTION ENGINE] ⚡ Đã nén 10 Thẻ Lẻ thành Milestone File: MILESTONE-xxx.json`
2. `[BẢO VỆ SCOPE] Hành động bị CHẶN! Thẻ hiện tại có scope là [SCOPE_X], không được phép sửa file [FILE_Y].`
3. `[AGY Server] Listening on http://localhost:3000`
