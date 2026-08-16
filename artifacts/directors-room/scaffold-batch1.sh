#!/usr/bin/env bash
# Directors Room — Batch 1: Project Scaffold
# Usage: PROJECT_ID=your-id bash scaffold-batch1.sh
# Or: bash scaffold-batch1.sh your-id
set -euo pipefail

# Allow PROJECT_ID from env or first arg, default to "projectId"
PROJECT_ID="${1:-${PROJECT_ID:-projectId}}"

echo "🎬 Scaffolding Directors Room — Batch 1 (PROJECT_ID=${PROJECT_ID})..."

# ---------- Folder structure ----------
mkdir -p app/studio "app/studio/${PROJECT_ID}"
mkdir -p app/layers
mkdir -p app/generate/image app/generate/video
mkdir -p "app/preview/${PROJECT_ID}"
mkdir -p app/api/image app/api/video app/api/video/status app/api/layers
mkdir -p components/storyboard components/timeline components/layers components/generation components/preview components/ui
mkdir -p lib/providers lib/layers lib/db
mkdir -p public/demo

# ---------- package.json ----------
cat > package.json <<'EOF'
{
  "name": "directors-room",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@fal-ai/client": "^1.2.0",
    "@supabase/supabase-js": "^2.45.0",
    "framer-motion": "^11.3.0",
    "konva": "^9.3.0",
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-konva": "^18.2.10",
    "replicate": "^0.32.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.4.0"
  }
}
EOF

# ---------- tsconfig.json ----------
cat > tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# ---------- next.config.mjs ----------
cat > next.config.mjs <<'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: { bodySizeLimit: "20mb" } },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};
export default nextConfig;
EOF

# ---------- tailwind + postcss ----------
cat > tailwind.config.ts <<'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08090b",
        panel: "#111318",
        line: "#22262e",
        accent: "#7c5cff",
        gold: "#f0b429",
        mute: "#9CA3AF"
      }
    }
  },
  plugins: []
};

export default config;
EOF

cat > postcss.config.js <<'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

echo "✅ Scaffold files written."
echo "Run 'npm install' then 'npm run dev' to start the dev server."
