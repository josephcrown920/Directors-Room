# Pull request: scaffold: add initial project scaffold (batch 1)

This PR adds the initial project scaffold for Directors Room (Batch 1).

Included:
- scaffold-batch1.sh — script to create folders and base config files
- package.json — dependencies and scripts
- tsconfig.json — TypeScript configuration
- next.config.mjs — Next.js configuration
- tailwind.config.ts, postcss.config.js — Tailwind setup
- .gitignore, README.md, .env.example

How to use
1. Clone and checkout this branch:
   git fetch origin
   git checkout scaffold/batch1
2. Run the scaffold script (optional PROJECT_ID):
   PROJECT_ID=my-project bash scaffold-batch1.sh
3. Install deps and run dev server:
   npm install
   npm run dev

Notes
- The scaffold script will create directories under app/, components/, lib/, and public/.
- Add required env vars to .env before starting services that depend on Supabase or Replicate.
