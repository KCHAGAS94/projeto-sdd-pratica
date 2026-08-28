## Why

The task list currently only supports create, list, and toggle-complete. Users cannot fix a typo in a task title or remove a task they no longer need, both of which are baseline expectations for a todo list.

## What Changes

- Add a Server Action and UI control to delete an existing task.
- Add a Server Action and UI control to edit an existing task's title.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `todo-tasks`: adds "Delete task" and "Edit task title" requirements to the existing capability.

## Impact

- New Server Actions in `app/actions/tasks.ts`: `deleteTask`, `updateTaskTitle`.
- UI changes in `app/components/task-item.tsx` (or a new component) to add delete and edit controls.
- No schema changes required (`Task` model already has `title`; delete is a row removal).
