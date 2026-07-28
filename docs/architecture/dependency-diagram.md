# 6. Dependency Diagram Documentation

---

## 🔗 6.1 Complete Call Chain & Dependency Flow

```mermaid
graph TD
    UserClient["HTTP Client / Terminal"] -->|HTTP GET / POST| IndexJS["src/index.js (Server Controller)"]
    
    subgraph Internal_Engine ["Internal Engine Scope"]
        IndexJS -->|Imports & Calls| CardManager["scripts/card-manager.js (Business Engine)"]
        CardManager -->|Validates Action| ScopeEnforcer["scripts/scope-enforcer.js (Security Guard)"]
    end

    subgraph Data_Persistence ["Data Persistence Layer"]
        CardManager -->|Reads/Writes Active Cards| CardsJSON["data/cards.json"]
        CardManager -->|Writes Compacted Milestones| MilestonesDir["data/milestones/MILESTONE-xxx.json"]
        CardManager -->|Writes Macro Reports| ReportsDir["data/reports/MASTER_REPORT_xxx.md"]
    end

    subgraph Visual_Output ["Visual Output Layer"]
        IndexJS -->|Serves Static File| IndexHTML["index.html"]
        IndexHTML -->|CDN Fetch| MermaidCDN["Mermaid.js CDN (mermaid.min.js)"]
    end
```

---

## 🔍 6.2 Full Dependency Matrix

1. `src/index.js` ➔ `scripts/card-manager.js` (Required)
2. `scripts/card-manager.js` ➔ `scripts/scope-enforcer.js` (Required)
3. `scripts/card-manager.js` ➔ `data/cards.json` (Required, Auto-creates if missing)
4. `scripts/card-manager.js` ➔ `data/milestones/` (Required, Auto-creates if missing)
5. `scripts/card-manager.js` ➔ `data/reports/` (Required, Auto-creates if missing)
6. `index.html` ➔ `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js` (External CDN for rendering graphs)
