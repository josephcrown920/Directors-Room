# Directors Room

Directors Room is a cinematic AI filmmaking workspace for storyboarding shots, generating footage, and compositing visual layers.

## Run & Operate

- `pnpm --filter @workspace/directors-room run dev` — run the Directors Room Next.js app
- `pnpm --filter @workspace/api-server run dev` — run the shared API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Next.js 14 + React 18 + TypeScript
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/directors-room/app/` — imported Next.js routes and API handlers
- `artifacts/directors-room/components/` — landing page, generation, preview, and layer UI
- `artifacts/directors-room/lib/` — shared types, provider adapters, project data, and Supabase helpers
- `artifacts/directors-room/.env.example` — optional Supabase and AI provider configuration
- `artifacts/directors-room/.replit-artifact/artifact.toml` — managed preview and production service configuration

## Architecture decisions

- The imported Next.js application remains the source of truth for the frontend rather than being rewritten into the original Vite scaffold.
- Demo media paths degrade to in-product visual placeholders when the optional repository assets are absent.
- Supabase is optional at startup so the public landing page and local preview work before external credentials are connected.

## Product

- Cinematic AI studio landing page
- Studio hub for opening visual layers and generation tools
- Layer composition controls with transform previews
- Image and video generation routes ready for provider credentials
- Demo preview route with a local sample project

## User preferences

No additional preferences recorded.

## Gotchas

- Add the variables in `artifacts/directors-room/.env.example` before using Supabase auth or AI generation routes.
- The repository's optional `public/demo` media is not included, so the UI intentionally shows designed fallbacks until those assets are added.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
