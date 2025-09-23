# Edutech Monorepo

Stack: **Next.js 15 (App Router/RSC)** + **TypeScript**, **Prisma/Neon**, **Turborepo/pnpm**, **Tailwind**.

## 🚀 Visão geral
Plataforma para **gestores** e **professores** planejarem aulas, gerirem turmas, comunicados e avaliações. Monorepo com **apps** e **packages** compartilhando código e design system.

edutech/
apps/
web/ # Next.js 15 (App Router/RSC)
mobile/ # Expo (opcional)
packages/
ui/ # Design System (React)
db/ # Prisma + Client
auth/ # Validações/Auth helpers
utils/ # Utilitários (ex.: currencyBRL)
infra/
github-actions/ # CI pipelines
.github/workflows/ # CI (espelhado)

markdown
Copiar código

## 🧰 Requisitos
- Node **>=18.17** (ou 20 LTS)
- pnpm **>=8**
- Git
- OpenSSL (para gerar segredos)
- Conta no **Neon** (PostgreSQL gerenciado)

## 🔧 Setup rápido (local)
```bash
pnpm install
cp .env.example .env
# edite .env / packages/db/.env com o DATABASE_URL do Neon
pnpm db:generate
pnpm web   # http://localhost:3000
Banco (Neon + Prisma)
No painel do Neon, crie o DB e copie a connection string:

perl
Copiar código
postgresql://USER:PASS@HOST/db?sslmode=require
Depois:

bash
Copiar código
cd packages/db
cat > .env << 'ENV'
DATABASE_URL="postgresql://USER:PASS@HOST/db?sslmode=require"
ENV

pnpm prisma generate
# cria/atualiza o schema no banco
pnpm prisma db push
# ou, se preferir migrações versionadas:
# pnpm prisma migrate dev -n init
📦 Scripts úteis (root)
bash
Copiar código
pnpm build          # turbo build
pnpm dev            # turbo dev
pnpm lint           # turbo lint
pnpm typecheck      # turbo typecheck
pnpm db:generate    # cd packages/db && pnpm prisma generate
pnpm db:push        # cd packages/db && pnpm prisma db push
pnpm web            # cd apps/web && pnpm dev
pnpm mobile         # cd apps/mobile && pnpm start (Expo, opcional)
🎨 Tailwind no Web
Gerado via:

bash
Copiar código
cd apps/web
pnpm add -D tailwindcss postcss autoprefixer
pnpm exec tailwindcss init -p
tailwind.config.js: content inclui ./src/**/*.{ts,tsx} e ../../packages/ui/**/*.{ts,tsx}

CSS global importado em src/app/layout.tsx

🔐 Segurança & boas práticas
Cookies de sessão httpOnly + Secure + SameSite=Lax

CSP explícita; evitar inline scripts

Validação com Zod em toda mutação

Rate limit com Redis (Upstash/Valkey)

Logs + tracing (OpenTelemetry)

☁️ Deploy
Web (Vercel)
Conecte o repositório

Variáveis:

DATABASE_URL (Neon)

NEXTAUTH_SECRET (se usar next-auth)

Build padrão (next build) no app apps/web

Banco (Neon)
Habilitar sslmode=require

Regiões próximas (ex.: us-east)

🧪 Qualidade
Unit tests (vitest) em packages

E2E (playwright) para fluxos críticos

CI (GitHub Actions): lint → typecheck → prisma generate (db) → build

🧭 Troubleshooting
1) ERR_PNPM_ADDING_TO_ROOT
Você instalou dependência na raiz. Entre no pacote certo:

bash
Copiar código
cd apps/web   # ou packages/ui etc.
pnpm add <dep>
2) Command "tailwindcss" not found
Instale no app web e rode local:

bash
Copiar código
cd apps/web
pnpm add -D tailwindcss postcss autoprefixer
pnpm exec tailwindcss init -p
3) 404 @edu/db ao instalar
O pnpm tentou buscar no npm. Nomeie os pacotes e force workspace:

bash
Copiar código
# em packages/db/package.json:  "name": "@edu/db"
cd apps/web
pnpm add '@edu/db@workspace:*' '@edu/ui@workspace:*' '@edu/utils@workspace:*'
4) Prisma P1000 (auth failed)
DATABASE_URL inválida/sem permissão. Corrija .env em packages/db e rode:

bash
Copiar código
cd packages/db
pnpm prisma db push
5) zsh: no matches found: @workspace:*
Use aspas:

bash
Copiar código
pnpm add '@edu/ui@workspace:*'
6) Porta em uso

bash
Copiar código
lsof -i :3000 | awk 'NR>1 {print $2}' | xargs kill -9
📝 Convenções
Commits: Conventional Commits (feat:, fix:, chore:, docs:)

Branches: feat/<nome>, fix/<nome>

Código: ESLint + Prettier + TS strict

📈 Métricas/KPIs (MVP)
LCP (web) ≤ 2.5s

p95 latência API < 300ms (cache quando possível)

Erros 5xx < 0.2%

Adoção semanal professores (ATU) ≥ 60%

Qualquer dúvida/erro durante o setup, abra uma issue ou cole o log aqui para correção direcionada (via cd + cat).
