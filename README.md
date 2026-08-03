# FIPHO Platform

FIPHO is being expanded from a public Next.js website into a platform with a Django registration backend, staff admin APIs, protected uploads, exports, news, and media management.

## Apps

- `/` - current FIPHO public Next.js website.
- `registration-backend/` - Django REST API for registration, admin workflows, protected uploads, exports, news, and media.

- `registration-frontend/` - Next.js registration and admin interface for the FIPHO registration backend.

## Frontend

```bash
npm install
npm run dev
npm run build
```

## Backend

```bash
cd registration-backend
python3 -m pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py seed
python3 manage.py createsuperuser
python3 manage.py runserver 8000
```

Local defaults use SQLite. Production can use PostgreSQL through `.env` values based on `registration-backend/.env.example`.

## Backend Checks

```bash
cd registration-backend
python3 manage.py check
python3 manage.py test
```

## Docker

Local compose runs the existing FIPHO public frontend, registration frontend/admin, registration backend, and PostgreSQL:

```bash
docker compose build
docker compose up -d
```

Local ports:

- landing: `http://127.0.0.1:3022`
- registration frontend/admin: `http://127.0.0.1:3023`
- registration backend API: `http://127.0.0.1:8025`
- Postgres: `127.0.0.1:5456`

Staging override:

```bash
docker compose -f docker-compose.yml -f docker-compose.staging.yml build
docker compose -f docker-compose.yml -f docker-compose.staging.yml up -d
```

Staging ports:

- landing: `http://127.0.0.1:3032`
- registration frontend/admin: `http://127.0.0.1:3033`
- registration backend API: `http://127.0.0.1:8035`
- Postgres: `127.0.0.1:5466`

Current backend defaults:

- default subject: `Physics`
- max students: `5`
- max team leaders: `2`

These are configurable with `FIPHO_DEFAULT_SUBJECT`, `FIPHO_MAX_STUDENTS`, and `FIPHO_MAX_TEAM_LEADERS`.

## Detailed registration rules

- Render each delegation's one or two leaders followed by its zero to five students before the next delegation.
- Contestants must be under 20 on May 1, 2026 and not enrolled in higher education.
- Dates of birth must be strictly after May 1, 2006.
