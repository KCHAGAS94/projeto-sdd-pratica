## 1. Server Actions

- [x] 1.1 Implement `deleteTask(id)` Server Action that removes the task row and revalidates the task list path; verify deleting a task removes its row from the database
- [x] 1.2 Implement `updateTaskTitle(id, title)` Server Action that validates a non-empty title, updates the task's title without touching `completed`, and revalidates the task list path; verify a valid edit persists the new title and an empty title is rejected without changing the stored title

## 2. UI

- [x] 2.1 Add a delete control to the task item bound to `deleteTask`; verify clicking it removes the task from the rendered list
- [x] 2.2 Add an edit control (inline input or similar) to the task item bound to `updateTaskTitle`, styled with Tailwind classes; verify submitting a new title updates the rendered task title and rejecting an empty title leaves the original title displayed

## 3. Verification

- [x] 3.1 Manually verify the end-to-end flow: edit a task's title and see it reflected, then delete a task and confirm it disappears from the list
