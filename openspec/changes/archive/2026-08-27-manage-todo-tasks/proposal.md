## Why

The application currently has no way for a user to track work items. A basic Todo List (create, list, complete) is the foundational feature needed to make the app useful, and establishes the Server Actions + Prisma + PostgreSQL pattern that later features will follow.

## What Changes

- Add a `Task` data model (Prisma schema + migration) backed by PostgreSQL, with fields for title, completion status, and timestamps.
- Add a task list page that displays all tasks, ordered by creation date.
- Add a form (Server Action) to create a new task with a title.
- Add a control (Server Action) to toggle a task's completed state.
- Style all new UI with Tailwind CSS utility classes, per project conventions.

## Capabilities

### New Capabilities
- `todo-tasks`: Create, list, and mark tasks as completed/incomplete.

### Modified Capabilities
(none — this is a greenfield capability)

## Impact

- New Prisma schema/model and migration; requires `DATABASE_URL` in `.env`.
- New Prisma client setup (`lib/prisma.ts` or similar singleton).
- New route/page under `app/` for the task list UI.
- New Server Actions for creating a task and toggling completion.
- New dependency: `@prisma/client` and `prisma` (dev dependency).
