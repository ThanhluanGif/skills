# 3. System Architecture Documentation

**Architecture Pattern:** Event-Driven Proactive Skill Engine with Hierarchical File Compaction.

---

## 🏗 3.1 Overall System Architecture Diagram

```mermaid
graph TD
    User["👤 User / Terminal / Gemini Prompt"] -->|CLI Prompt / HTTP| Frontend["Frontend / Dashboard (index.html)"]
    Frontend -->|HTTP API / REST| APIServer["API Server (src/index.js)"]
    
    subgraph Core_Skill_System ["Core Skill System"]
        APIServer --> CardManager["Card Manager Engine (scripts/card-manager.js)"]
        CardManager --> ScopeGuard["Scope Enforcer Guard (scripts/scope-enforcer.js)"]
        
        subgraph Storage_Tier ["Storage Tier (File Persistence)"]
            CardManager --> CardsJSON["Level 0: data/cards.json (< 10 Active Cards)"]
            CardsJSON -->|Compaction Engine (10-in-1)| Milestones["Level 1: data/milestones/MILESTONE-001.json"]
            Milestones -->|Macro Summarizer (100-in-1)| MasterReport["Level 2: data/reports/MASTER_REPORT_001.md"]
        end

        subgraph Proactive_System ["Proactive AI Engine"]
            CardManager --> IdleDetector["Idle Scope Trigger (checkIdleScopeState)"]
            CardManager --> ToolAdvisor["Multi-Category Tool Advisor"]
        end
    end

    ExternalServices["External 3rd-Party Services (Not Implemented / Proposed)"]
    Proactive_System -->|Proposed Integration| ExternalServices
```

---

## 📊 3.2 System Component Status

- **Frontend / Dashboard**: Implemented (`index.html` with Mermaid.js visual rendering).
- **API Server**: Implemented (`src/index.js` port 3000 native HTTP server).
- **Core Engine & Scope Guard**: Implemented (`scripts/card-manager.js`, `scripts/scope-enforcer.js`).
- **File Persistence Storage**: Implemented (`data/cards.json`, `data/milestones/`, `data/reports/`).
- **Redis / Distributed Queue / DB Cluster**: *Not Implemented* (Dự án sử dụng File-based Persistence phẳng cực nhẹ).
