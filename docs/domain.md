# Доменна модель Kanban (Domain Model)

## 1. Сутності (Entities)

### Board (Дошка)

- `id`: `BoardId` (Branded String)
- `title`: `string`
- `createdAt`: `ISO8601 String`
- `updatedAt`: `ISO8601 String`
- `deletedAt`: `ISO8601 String | null` (soft delete, `null` = не видалено)

### Column (Колонка)

- `id`: `ColumnId` (Branded String)
- `boardId`: `BoardId`
- `title`: `string`
- `position`: `string` (Fractional Indexing)
- `createdAt`: `ISO8601 String`
- `updatedAt`: `ISO8601 String`
- `deletedAt`: `ISO8601 String | null` (soft delete, `null` = не видалено)

### Card (Картка)

- `id`: `CardId` (Branded String)
- `columnId`: `ColumnId`
- `title`: `string`
- `description`: `string` (optional)
- `position`: `string` (Fractional Indexing)
- `createdAt`: `ISO8601 String`
- `updatedAt`: `ISO8601 String`
- `deletedAt`: `ISO8601 String | null` (soft delete, `null` = не видалено)

## 2. Доменні правила та Edge Cases

1. **Fractional Indexing:** Порядок колонок та карток розраховується за допомогою дробової індексації (наприклад, `fractional-indexing` / Lexorank). Це дозволяє змінювати порядок елементів за $O(1)$ операцій без масового оновлення позицій сусідніх елементів.
2. **Ізоляція типів ID:** `BoardId`, `ColumnId` та `CardId` є Branded Types для запобігання помилкам передачі ID іншого типу на рівні компіляції TypeScript.
3. **Soft Delete / Cascade:** При видаленні колонки її картки вважаються видаленими або переміщуються у кастомний стан відповідно до бізнес-правил.
