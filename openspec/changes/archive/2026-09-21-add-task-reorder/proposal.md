## Why

Tasks are currently always listed in creation order, with no way to prioritize one task over another. Users need to reorder their list manually (e.g. move task #2 above task #1) to reflect what matters most right now.

## What Changes

- Add manual drag-and-drop reordering to the task list: the user can drag a task and drop it at another position in the list.
- The list's manual order is persisted and used for display, replacing plain creation-date ordering. **BREAKING**: `todo-tasks`'s "List tasks" requirement changes from always ordering by creation date to ordering by the persisted manual order (initialized from creation order for existing/new tasks).
- Newly created tasks are appended to the end of the current manual order.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `todo-tasks`: task listing order becomes user-controlled (persisted manual order) instead of fixed by creation date; adds a requirement for reordering tasks via drag-and-drop.

## Impact

- `prisma/schema.prisma`: new ordering field on `Task` (e.g. a `position`/`order` column) + migration; existing rows backfilled from current `createdAt` order.
- `app/actions/tasks.ts`: `createTask` assigns the next position; new action to persist a reordering (e.g. `reorderTasks(orderedIds: string[])`).
- `app/page.tsx`: list tasks ordered by the new position field instead of `createdAt`.
- `app/components/task-item.tsx` / task list: add drag-and-drop interaction (drag handles, drop targets) and call the reorder action on drop.
