## 1. Data model

- [x] 1.1 Add `position Int` field to the `Task` model in `prisma/schema.prisma`
- [x] 1.2 Generate a migration that adds the column and backfills existing rows' `position` from current `createdAt` order; verify all existing tasks get sequential positions matching their prior creation order
- [x] 1.3 Regenerate the Prisma client and verify `npx tsc --noEmit` passes

## 2. Server actions

- [x] 2.1 Update `createTask` in `app/actions/tasks.ts` to assign the new task `position = max(existing position) + 1` (or `0` if no tasks exist); verify a newly created task appears at the end of the list
- [x] 2.2 Add a `reorderTasks(orderedIds: string[])` action that writes sequential `position` values for the given id order in a single transaction; verify it updates all rows' positions correctly and revalidates the page

## 3. List ordering

- [x] 3.1 Update `app/page.tsx` to load tasks ordered by `position asc` instead of `createdAt asc`; verify the list renders in position order

## 4. Drag-and-drop UI

- [x] 4.1 Add `@dnd-kit/core` and `@dnd-kit/sortable` as dependencies
- [x] 4.2 Create a client-side task list wrapper component using `DndContext` + `SortableContext` around the existing `TaskItem`s, with a drag handle per item
- [x] 4.3 On drag end, optimistically reorder the local list and call `reorderTasks` with the new id order; verify dragging a task to a new position updates the displayed order immediately
- [x] 4.4 Verify the manually set order persists after a page reload (calls through to the server and back)
