# Kanban Local-First

Kanban-дошка (Trello-подібна) з local-first архітектурою: UI працює з локальною базою даних, миттєво й без мережі. Бекенд з'явиться пізніше як сервіс синхронізації. Проєкт навчальний: головна мета це практика архітектури, доменного моделювання та offline-first підходу.

> Стан: ранній етап розробки. Дорожня карта: [docs/roadmap.md](docs/roadmap.md).

## Стек

Зараз:

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4 + shadcn/ui
- Vitest
- ESLint (з `eslint-plugin-boundaries`), Prettier
- husky, lint-staged, commitlint (Conventional Commits)
- GitHub Actions (CI), CodeRabbit (AI-рев'ю PR)

Заплановано: локальна БД (Dexie або PGlite), TanStack Query, dnd-kit, Zod, `fractional-indexing`; пізніше окремий бекенд із Postgres.

## Запуск

Потрібно: Node.js 22+ і pnpm. Версія pnpm зафіксована в `packageManager`, тож достатньо `corepack enable`.

```bash
pnpm install
pnpm dev
```

Застосунок відкриється на <http://localhost:3000>.

## Скрипти

| Скрипт              | Що робить                         |
| ------------------- | --------------------------------- |
| `pnpm dev`          | Dev-сервер Next.js                |
| `pnpm build`        | Production-збірка                 |
| `pnpm start`        | Запуск збірки                     |
| `pnpm lint`         | ESLint, включно з правилами шарів |
| `pnpm typecheck`    | Перевірка типів (`tsc --noEmit`)  |
| `pnpm format`       | Prettier, форматує файли          |
| `pnpm format:check` | Prettier, лише перевіряє формат   |
| `pnpm test`         | Одноразовий запуск Vitest         |
| `pnpm test:watch`   | Vitest у watch-режимі             |

## Архітектура

- **Feature-based:** код групується за доменом, `src/features/<feature>/{model,components}`.
- **`model/` чисте:** доменна логіка не імпортує React, Next чи UI. Правило перевіряє ESLint (`eslint-plugin-boundaries`) і CI.
- **`src/app/` тонкий:** лише роутинг, який збирає екрани з features.
- **Дані:** UI читає й пише лише в локальну БД через Repository-інтерфейси. Бекенд підключиться збоку як sync-сервіс, без переписування UI.

Деталі та обґрунтування в [docs/adr/](docs/adr/), доменна модель у [docs/domain.md](docs/domain.md).

## Робочий процес

- Гілки `feat/...`, `fix/...`, `docs/...`; прямі коміти в `main` заборонені.
- [Conventional Commits](https://www.conventionalcommits.org/): `feat(board): add card model`.
- Невеликі PR. Перед мерджем CI має бути зеленим, а коментарі CodeRabbit опрацьовані.
- Squash merge.

## Документація

- [docs/roadmap.md](docs/roadmap.md): фази розробки
- [docs/domain.md](docs/domain.md): доменна модель
- [docs/adr/](docs/adr/): Architecture Decision Records
