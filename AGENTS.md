# Project Instructions

Conditional implementation, verification, and live-system procedures use the global `$verify-project-change` and `$operate-live-system` skills.

- FIPHO contains a public Next.js site, `registration-backend/` Django API, and `registration-frontend/` Next.js registration/admin UI.
- Read `README.md` and the relevant app configuration before changes; keep public-site, registration, and admin ownership separate.
- Registration records and uploads are sensitive. Enforce authorization in the backend and keep exports scoped and free of unnecessary personal data.
- Local SQLite is not production evidence.
- Staging and production Compose files, DNS, media, and server state are live concerns. Inspect them fresh and require explicit deployment authorization.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
