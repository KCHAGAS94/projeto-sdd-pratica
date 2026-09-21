## Context

See proposal.md - Why. `app/page.tsx` currently loads tasks with `prisma.task.findMany({ orderBy: { createdAt: "asc" } })` and renders a plain `<ul>` of `TaskItem`. There is no client-side list/drag library in the project yet. Server actions live in `app/actions/tasks.ts`, one action per concern (`createTask`, `toggleTask`, `deleteTask`, `updateTaskTitle`, `updateTaskNotes`).

## Goals / Non-Goals

**Goals:**
- Let users reorder tasks by dragging, with the new order persisted server-side.
- Keep the list rendering server-driven (order comes from the DB), consistent with the rest of the app.

**Non-Goals:**
- Multi-list / grouping / drag between separate lists.
- Touch-specific drag gestures beyond what the chosen approach provides out of the box.
- Reordering completed vs. incomplete tasks separately (single flat order for all tasks).

## Decisions

- **Ordering field**: add `position Int` to `Task` (not `@unique`, no default expression - assigned in application code). On migration, backfill existing rows with a position derived from current `createdAt` order (0, 1, 2, ...). `page.tsx` orders by `position asc` instead of `createdAt asc`.
- **Assigning positions**: `createTask` computes `max(position) + 1` (or `0` if no tasks exist) and assigns it to the new row, so new tasks always land at the end - matches the "new task appended to end" scenario.
- **Persisting a reorder**: add a single `reorderTasks(orderedIds: string[])` action that receives the full list of task ids in their new order and writes back sequential `position` values (0..n-1) in one `$transaction`. A whole-list rewrite is simpler and less error-prone than computing fractional positions for a single move, and the list size here is small (personal todo list), so cost is negligible.
- **Drag-and-drop UI**: use `@dnd-kit/core` + `@dnd-kit/sortable` (new dependency) for accessible, well-maintained pointer/keyboard drag support in React, rather than hand-rolling HTML5 drag events (which have poor touch/accessibility support). The task list becomes a client component wrapping `TaskItem`s in a `DndContext`/`SortableContext`; on `onDragEnd`, compute the new id order and call `reorderTasks`.
- **Optimistic update**: reorder the local list state immediately on drop (before the server action resolves) so dragging feels instant, then let `revalidatePath` reconcile with the server truth. Reason: server actions round-trip, and drag interactions feel broken without immediate visual feedback.

## Risks / Trade-offs

- [New client-side dependency (`@dnd-kit`)] → Mitigation: widely used, actively maintained, tree-shakeable; only pulled into the client bundle for the task list.
- [Whole-list rewrite on every reorder] → Mitigation: acceptable given expected list sizes for a personal task list; revisit with per-item position patching if lists grow large.
- [Migration must backfill `position` for existing rows] → Mitigation: backfill in the same migration using existing `createdAt` order so no manual data fix-up is needed.
