# Contributing to UnicornTail 🦄

First off — thank you for taking the time to contribute! UnicornTail is a
visual page builder that exports **real, production-ready Next.js code**. This
guide gets your **entire local ecosystem** (Frontend + Backend + Database)
running with a **single command**, even if this is your first open-source PR.

---

## 🧱 Tech Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Frontend   | Next.js (App Router), Tailwind CSS          |
| Backend    | NestJS (TypeScript, Clean Architecture)     |
| Database   | PostgreSQL 16 (`JSONB` page storage)        |
| Monorepo   | npm workspaces (`apps/*`)                   |
| Local Dev  | Docker + Docker Compose                     |

Repository layout:

```
unicorntail/
├── apps/
│   ├── backend/        # NestJS API      → http://localhost:3001
│   │   └── Dockerfile.dev
│   └── frontend/       # Next.js app     → http://localhost:3000
│       └── Dockerfile.dev
├── docker-compose.yml  # db + backend + frontend
├── .env.example
└── package.json        # npm workspaces root
```

---

## 📐 Code Standards (read before coding)

To keep the bundle lean and the UI consistent, our stack is **locked**. Full
details live in the pinned **"Architecture & Standards Guide"** issue; the
essentials:

- **Client state:** **Zustand** only — not React Context or Redux for dynamic
  workspace UI.
- **UI primitives:** **Radix UI** (`@radix-ui/*`) for accessible modals,
  dropdowns, popovers.
- **Animation:** **Framer Motion** (`framer-motion`).
- **Variant styling:** **class-variance-authority**.
- **Icons:** **Material Symbols only**, via the `<Icon>` wrapper in
  `apps/frontend/src/components/Icon.tsx`. Do **not** install `lucide-react` or
  any other icon library. Size icons with the numeric `size` prop or a `text-*`
  class (they are an icon *font*, so `w-/h-` won't resize them):

  ```tsx
  import { Icon } from '@/components/Icon';

  <Icon name="bolt" size={20} className="text-primary-fixed-dim" />
  ```

> ⚠️ **Before adding any dependency**, run `npm view <package> version` and
> confirm Next.js 15 (App Router) compatibility, or check with a maintainer.
> Unapproved packages will be requested for removal in review.

---

## ✅ Prerequisites

You only need **two** things installed:

1. [**Docker Desktop**](https://www.docker.com/products/docker-desktop/) (includes Docker Compose v2)
2. [**Git**](https://git-scm.com/)

> You do **not** need to install Node.js, NestJS, or PostgreSQL locally —
> everything runs inside Docker containers. (Node 22 is only needed if you
> prefer running an app outside Docker; see the optional section below.)

---

## 🚀 Quick Start (one command)

```bash
# 1. Clone the repo
git clone https://github.com/nordam312/unicorntail.git
cd unicorntail

# 2. Create your local environment file
cp .env.example .env      # Windows PowerShell: copy .env.example .env

# 3. Spin up the WHOLE stack (DB + backend + frontend)
npm run docker:up
```

That's it. `npm run docker:up` is an alias for `docker compose up --build`.
On first run Docker will build the images and install dependencies (this can
take a few minutes — grab a coffee ☕). Once you see the servers start, open:

| Service        | URL                          |
| -------------- | ---------------------------- |
| 🖥️  Frontend   | http://localhost:3000        |
| ⚙️  Backend API | http://localhost:3001        |
| ❤️  Health check | http://localhost:3001/health |
| 🩺  DB health   | http://localhost:3001/health/db |
| 🐘  PostgreSQL | `localhost:5432`             |

**Hot reload is enabled** — edit any file in `apps/frontend` or `apps/backend`
and the change is picked up automatically inside the container.

---

## 🛠️ Handy Commands

All commands run from the repo root:

| Command                  | What it does                                              |
| ------------------------ | -------------------------------------------------------- |
| `npm run docker:up`      | Build + start the full stack (foreground, live logs)     |
| `npm run docker:up:d`    | Same, but **detached** (runs in the background)          |
| `npm run docker:logs`    | Tail logs from all services                              |
| `npm run docker:down`    | Stop and remove the containers                           |
| `npm run docker:clean`   | Stop **and wipe the database volume** (fresh start)      |

> Using an older Docker? Replace `docker compose` with `docker-compose`.

---

## 🧑‍💻 Optional: run an app outside Docker

If you'd rather run just one app on your host (e.g. for faster IDE feedback),
install Node.js 22+ and:

```bash
npm install                 # installs all workspaces from the root

npm run dev:backend         # NestJS on :3001
# or
npm run dev:frontend        # Next.js on :3000
```

You can keep the database in Docker with `docker compose up db`.

---

## 🗄️ Database & Migrations (Prisma 7)

The backend uses **Prisma 7** with the PostgreSQL **driver adapter**
(`@prisma/adapter-pg`) — there is no Rust query-engine binary in the image.

- The schema lives in `apps/backend/prisma/schema.prisma`.
- The connection URL is configured in `apps/backend/prisma.config.ts`
  (read from `DATABASE_URL`).
- Committed migrations are **applied automatically** on container boot
  (`prisma migrate deploy` runs before the dev server starts).

When you change the schema, create a migration **inside the container** so it
uses the Dockerized database:

```bash
# stack must be running (npm run docker:up)
npm run db:migrate                 # prompts for a migration name
# or directly:
docker compose exec backend npx prisma migrate dev --name your_change
```

> The generated Prisma client (`apps/backend/src/generated/`) is **git-ignored**
> and regenerated on install/build/boot — never commit it.

---

## 🌿 Branch & Commit Conventions

- Create a feature branch: `git checkout -b feat/short-description`
- We follow [**Conventional Commits**](https://www.conventionalcommits.org/):
  - `feat: ...` a new feature
  - `fix: ...` a bug fix
  - `chore: ...` tooling / maintenance
  - `docs: ...` documentation only
  - `refactor: ...` code change that neither fixes a bug nor adds a feature

Example:

```bash
git commit -m "feat(backend): add page publishing endpoint"
```

---

## 🔀 Opening a Pull Request

1. Fork the repo and push your branch.
2. Make sure the stack still boots: `npm run docker:up`.
3. Open a PR against `main` with a clear description of **what** and **why**.
4. Be kind and patient in review — we're all here to learn. 💛

Happy building!
