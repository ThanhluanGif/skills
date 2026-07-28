# 16. Monitoring & Health Architecture Documentation

---

## 📈 16.1 Health & Monitoring Flow

```mermaid
graph TD
    Monitor["Monitoring Probe / UptimeRobot"] -->|HTTP GET /api/health| Server["src/index.js"]
    Server -->>Monitor: 200 OK { status: "UP", timestamp: "..." }

    subgraph Proposed_Prometheus_Grafana ["Proposed Production Monitoring (Not Implemented)"]
        Server -->|Prometheus Metrics Middleware| PromExporter["/metrics Endpoint"]
        PromExporter --> Prometheus["Prometheus Server"]
        Prometheus --> Grafana["Grafana Visual Dashboard"]
        Prometheus --> AlertManager["AlertManager (Telegram / Email Alerts)"]
    end
```
