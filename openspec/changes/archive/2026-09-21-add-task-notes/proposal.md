## Why

Tasks currently only carry a title. Users have no place to jot down extra context, reminders, or details about a task without cramming them into the title itself. Adding a free-text "notes" field lets users annotate tasks with observations as they work.

## What Changes

- Add an optional `notes` field to the `Task` model (Prisma schema + migration).
- Add a "Observação" (observation) textarea input to the create-task form, alongside the existing title input.
- Allow submitting notes when creating a task (stored alongside the title).
- Display each task's notes in the task list when present.
- Allow editing a task's notes from the task item (same inline-edit pattern used for the title).
- Notes are optional: a task may be created or saved with an empty/blank notes value.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `todo-tasks`: adds an optional notes field to tasks, capturable at creation time and editable afterward; task listing must also surface notes when present.

## Impact

- `prisma/schema.prisma`: new `notes` column on `Task` (nullable/optional string) + new migration.
- `app/actions/tasks.ts`: `createTask` reads notes from form data; new/extended action to update a task's notes.
- `app/components/create-task-form.tsx`: new observation textarea input.
- `app/components/task-item.tsx`: display notes and support inline editing of notes.
- `app/page.tsx`: pass `notes` through to `TaskItem` when reading tasks from the database.
