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
├── .nvmrc
├── docker-compose.yml
├── fullstack-quality-gate-template.sln
├── global.json
├── README.md
├── Taskfile.yml
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

## Quickstart

### Prerequisites

| Tool | Verify | Required for |
| ---- | ------ | ------------ |
| [.NET 8 SDK (global.json pins exact SDK version 8.0.404; install that version or update global.json)](https://dotnet.microsoft.com/download/dotnet/8.0) | `dotnet --version` | API (manual path) |
| [Node.js 20 (see .nvmrc)](https://nodejs.org/) | `node --version` | Frontend (manual path) |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | `docker --version` | Fast path |
| [Task](https://taskfile.dev/installation/) (go-task) | `task --version` | Task commands *(optional)* |

---

### Fast path — Docker Compose *(recommended)*

Spins up both services with a single command. No SDK or Node installation required.

```bash
git clone https://github.com/catperkins-labs/fullstack-quality-gate-template.git
cd fullstack-quality-gate-template
docker compose up --build
```

| Service | URL | Expected response |
| ------- | --- | ----------------- |
| API | http://localhost:5000/health | `{"status":"healthy"}` |
| Web | http://localhost:3000 | React app |

---

### Task commands *(optional)*

If you have [Task](https://taskfile.dev/installation/) installed, you can run everything from the repo root:

| Command | Description |
| ------- | ----------- |
| `task dev` | Start API + frontend dev servers in parallel |
| `task build` | Build API + frontend |
| `task test` | Run all tests |
| `task lint` | Lint frontend |
| `task ci` | Full pipeline: lint → build → test |
| `task docker` | `docker compose up --build` |

---

### Manual path — per service

#### API

```bash
cd api
dotnet run --project Api
# → http://localhost:5000/health
```

Run tests with coverage:

```bash
cd api/Api.Tests
dotnet test
```

#### Frontend

Install dependencies and start the dev server:

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

---

## CI

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and pull request to `main`:

| Job | Steps                                     |
| --- | ----------------------------------------- |
| api | `dotnet restore` → `build` → `test` (coverage collected via `coverlet`) |
| web | `npm ci` → `lint` → `build` → `test:coverage` |

Coverage reports are uploaded as workflow artifacts after each run.
