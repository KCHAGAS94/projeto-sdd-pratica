## Context

See proposal.md - Why. The `Task` model (`prisma/schema.prisma`) currently has `id`, `title`, `completed`, `createdAt`. Task creation and editing go through server actions in `app/actions/tasks.ts`, called from `app/components/create-task-form.tsx` (create) and `app/components/task-item.tsx` (inline edit, following a double-click-to-edit / blur-or-Enter-to-save pattern).

## Goals / Non-Goals

**Goals:**
- Persist an optional notes value per task.
- Let users add/edit notes both at creation and afterward, using the existing inline-edit interaction pattern.

**Non-Goals:**
- Rich text/markdown formatting for notes (plain text only).
- Notes history/versioning.
- Searching or filtering tasks by notes content.

## Decisions

- **Schema**: add `notes String?` (nullable, no default) to `Task`, via a new Prisma migration. Nullable rather than empty-string-default so "no notes" is unambiguous at the data level; server actions normalize blank/whitespace input to `null` before writing.
- **Create form**: add a `<textarea name="notes">` to `CreateTaskForm`, labeled "Observação", submitted through the same `createTask` server action (extend it to read `notes` from `FormData` alongside `title`).
- **Edit**: extend `updateTaskTitle`-style flow with a new `updateTaskNotes(id, notes)` action, mirroring the existing title-edit pattern in `TaskItem` (double-click or an explicit affordance to edit notes, save on blur/Enter, cancel on Escape). Kept as a separate action from `updateTaskTitle` rather than a combined "updateTask" to keep each action's input/validation narrow and match the existing one-field-per-action style already used for title.
- **Display**: render notes under the title in `TaskItem` only when present; render nothing (no empty placeholder) when absent, per the spec's "no notes value displayed" scenario.

## Risks / Trade-offs

- [Adding a required migration step] → `prisma migrate dev` must be run before the app works against the new column; document this in tasks.md.
- [Textarea vs single-line input for notes] → textarea chosen since "observações" implies potentially multi-line content; low risk, purely additive UI.
