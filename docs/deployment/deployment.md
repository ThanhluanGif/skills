# 12. Deployment Documentation

**Deployment Status:** Native Node.js Zero-Dependency Deployment (Docker & SQL were explicitly removed per user decision to ensure 100% lightweight skill execution).

---

## 🚀 12.1 Native Node.js Deployment Flow

```mermaid
graph TD
    Developer["Developer / Agent Environment"] -->|1. Push to Repository| GitRepo["Git Repository"]
    GitRepo -->|2. Pull Latest Code| Server["Target Host / Local Server"]
    Server -->|3. Run Startup Script| StartCmd["npm start (node src/index.js)"]
    StartCmd -->|4. Port 3000 Listening| LiveServer["HTTP API Server Live (http://localhost:3000)"]
    LiveServer -->|5. Serves Static UI| Dashboard["Visual Dashboard (http://localhost:3000/index.html)"]
```

---

## 📦 12.2 Deployment Checklist

- [x] Node.js >= v18 installed on host.
- [x] Dependencies installed (`npm install`).
- [x] Data directories exist (`data/`, `data/milestones/`, `data/reports/`).
- [x] HTTP Server port 3000 open.
- [ ] *Docker Containerization*: **Not Implemented** (Removed per user decision).
