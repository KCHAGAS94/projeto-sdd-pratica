## 1. Data model

- [x] 1.1 Add optional `notes String?` field to the `Task` model in `prisma/schema.prisma`
- [x] 1.2 Generate and apply the Prisma migration (`prisma migrate dev`) and verify the `notes` column exists on the `Task` table

## 2. Server actions

- [x] 2.1 Update `createTask` in `app/actions/tasks.ts` to read `notes` from `FormData`, trim it, and store `null` when blank; verify creating a task with and without notes persists the expected value
- [x] 2.2 Add `updateTaskNotes(id, notes)` action in `app/actions/tasks.ts`, trimming input and storing `null` when blank; verify it updates, adds, and clears notes on an existing task

## 3. UI - create form

- [x] 3.1 Add a "Observação" textarea (`name="notes"`) to `CreateTaskForm`, submitted via the existing `createTask` action; verify submitting the form with notes creates a task with that value

## 4. UI - task list and edit

- [x] 4.1 Pass `notes` through from `app/page.tsx` to `TaskItem` when loading tasks from the database
- [x] 4.2 Render a task's notes in `TaskItem` when present, and render nothing when absent; verify both cases visually
- [x] 4.3 Add inline editing of notes in `TaskItem` (edit affordance, save on blur/Enter via `updateTaskNotes`, cancel on Escape), mirroring the existing title-edit pattern; verify adding, changing, and clearing notes through the UI persists correctly
