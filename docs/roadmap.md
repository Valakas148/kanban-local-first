# Дорожня карта

Фази йдуть по порядку. Кожна закривається, коли виконано її Definition of done.

## Фаза 0. Рішення

- [ ] Доменна модель ([domain.md](domain.md))
- [ ] ADR-0001 (local-first) і ADR-0002 (Next.js)
- [ ] Межі MVP: одна дошка, колонки, картки, drag-and-drop, редагування, видалення. Без auth, sync, тегів і дедлайнів

## Фаза 1. Налаштування середовища

- [x] Репозиторій на GitHub
- [x] Next.js, pnpm
- [x] Строгий TypeScript (`strict`, `noUncheckedIndexedAccess`)
- [x] Prettier, ESLint
- [x] Vitest
- [ ] Структура `features/` і `shared/`
- [ ] Правила `eslint-plugin-boundaries` перевірені навмисним порушенням
- [x] shadcn/ui
- [x] husky, lint-staged, commitlint
- [x] CI (GitHub Actions)
- [ ] CodeRabbit підключений і ревʼює PR
- [x] Захист гілки `main`, шаблон PR
- [ ] README, ADR, roadmap

## Фаза 2. Домен

Чиста логіка у `features/board/model`, кожна функція разом із тестами.

- [ ] Типи, Zod-схеми, branded ID
- [ ] `IdGenerator` і `Clock` як порти
- [ ] Fractional indexing (+ property-based тести)
- [ ] Операції: create / rename / move / delete для карток і колонок
- [ ] `BoardRepository` (інтерфейс і in-memory реалізація)

## Фаза 3. Локальне сховище

- [ ] Прототип на Dexie, за бажанням на PGlite
- [ ] Адаптер `BoardRepository` і контрактні тести
- [ ] ADR вибору БД
- [ ] Реактивні читання, інтеграція з TanStack Query
- [ ] Web Worker (опційно)

## Фаза 4. UI

- [ ] Сторінка дошки (тонкий `app/`, `BoardView` на клієнті)
- [ ] CRUD карток і колонок
- [ ] Drag-and-drop (dnd-kit): миша, touch, клавіатура
- [ ] Стани loading / empty / error
- [ ] Мобільний адаптив
- [ ] Тести: Testing Library і Playwright
- [ ] Продуктивність (5000 карток)
- [ ] ADR вибору стейт-менеджера

## Фаза 4b. i18n та auth-заглушка

- [ ] Власний i18n (EN/UA) на Context API, типізовані ключі, `Intl.PluralRules`
- [ ] ADR: власний i18n чи `next-intl` / `react-i18next`
- [ ] `AuthService` + мок-адаптер, `AuthProvider`

## Фаза 5. Команди, undo/redo, outbox

- [ ] Command pattern з `apply` і `invert`
- [ ] Undo/redo
- [ ] Outbox: локальна черга операцій
- [ ] Статус синхронізації (XState, опційно)

## Фаза 6. Бекенд

**6a. Базовий (cloud-first)**

- [ ] Окремий сервер, Postgres, міграції
- [ ] Auth: реєстрація, логін, сесії
- [ ] Профіль і user settings (звичайний REST CRUD)
- [ ] Заміна мока `AuthService` на HTTP-адаптер

**6b. Sync дошок**

- [ ] Протокол push / pull
- [ ] Idempotency
- [ ] Конфлікти (last-write-wins на рівні полів)
- [ ] Спільний пакет `domain` (workspaces)
- [ ] Playwright: offline-сценарії, два пристрої

## Фаза 7. Бонуси

- [ ] Real-time (WebSocket)
- [ ] Кілька користувачів на дошці
- [ ] PWA
- [ ] CRDT (Yjs) для опису картки
- [ ] Імпорт / експорт
- [ ] Storybook
