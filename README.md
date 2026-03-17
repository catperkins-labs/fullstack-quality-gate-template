# fullstack-quality-gate-template

[![CI](https://github.com/catperkins-labs/fullstack-quality-gate-template/actions/workflows/ci.yml/badge.svg)](https://github.com/catperkins-labs/fullstack-quality-gate-template/actions/workflows/ci.yml)

A scaffolded fullstack project demonstrating engineering maturity: .NET 8 Minimal API + React/TypeScript frontend, with CI lint/build/test gates and coverage thresholds.

---

## Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Backend  | .NET 8 Minimal Web API + xUnit tests            |
| Frontend | React 18 + TypeScript (Vite) + Vitest tests     |
| CI/CD    | GitHub Actions (lint · build · test · coverage) |
| Docker   | Dockerfile per service + docker-compose         |

---

## Project Structure

```
fullstack-quality-gate-template/
├── .editorconfig
├── .gitignore
├── docker-compose.yml
├── README.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── api/
│   ├── Api.sln
│   ├── Dockerfile
│   ├── Api/
│   │   ├── Api.csproj
│   │   └── Program.cs          ← GET /health endpoint
│   └── Api.Tests/
│       ├── Api.Tests.csproj
│       └── HealthEndpointTests.cs
└── web/
    ├── Dockerfile
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── setupTests.ts
        └── components/
            ├── Hello.tsx
            └── Hello.test.tsx
```

---

## Local Development

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) *(optional)*

### API

```bash
cd api
dotnet run --project Api
# → http://localhost:5000/health
```

Run tests:

```bash
cd api
dotnet test
```

### Frontend

```bash
cd web
npm install
npm run dev
# → http://localhost:5173
```

Run tests:

```bash
npm run test
```

Lint:

```bash
npm run lint
```

### Docker Compose (all-in-one)

```bash
docker-compose up --build
# API  → http://localhost:5000/health
# Web  → http://localhost:3000
```

---

## CI

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and pull request to `main`:

| Job | Steps                                     |
| --- | ----------------------------------------- |
| api | `dotnet restore` → `build` → `test` (coverage collected via `coverlet`) |
| web | `npm ci` → `lint` → `build` → `test:coverage` |

Coverage reports are uploaded as workflow artifacts after each run.
