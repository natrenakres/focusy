# Architecture Overview

Frontend:
- Vue.js
- TypeScript
- shadcn-vue for UI

Backend:
- Fastify
- REST API

Authentication:
- [BetterAuth](https://www.better-auth.com/)

Database:
- Origin Private File System (OPFS) for local first
- PostgreSQL for backend server

Constraints:
- Local first development
- No microservices
- No event sourcing
- Single backend service