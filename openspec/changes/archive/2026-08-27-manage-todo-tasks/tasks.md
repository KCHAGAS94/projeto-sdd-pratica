## 1. Data Layer Setup

- [x] 1.1 Add `prisma` and `@prisma/client` to package.json and verify `npm install` succeeds
- [x] 1.2 Initialize Prisma (`prisma/schema.prisma`) with the PostgreSQL datasource reading `DATABASE_URL` from `.env`, and verify the file is present with `provider = "postgresql"`
- [x] 1.3 Define the `Task` model (`id`, `title`, `completed`, `createdAt`) in `prisma/schema.prisma` and verify `npx prisma validate` passes
- [x] 1.4 Create the initial migration and verify `npx prisma migrate dev` creates the `Task` table in the configured database
- [x] 1.5 Add a Prisma client singleton (e.g. `lib/prisma.ts`) and verify it can be imported without creating duplicate clients on hot reload

## 2. Server Actions

- [x] 2.1 Implement `createTask(formData)` Server Action that validates a non-empty title, creates a `Task`, and revalidates the task list path; verify creating a task via the action results in a new row with `completed: false`
- [x] 2.2 Implement `toggleTask(id)` Server Action that flips a task's `completed` value and revalidates the task list path; verify toggling flips the stored value both ways

## 3. UI

- [x] 3.1 Build the task list page (Server Component) that fetches all tasks ordered by `createdAt` and renders title + completion state with Tailwind classes; verify the empty state renders when no tasks exist
- [x] 3.2 Build the create-task form bound to the `createTask` Server Action with Tailwind styling; verify submitting a title adds the task to the rendered list
- [x] 3.3 Build the completion toggle control (e.g. checkbox/button) bound to the `toggleTask` Server Action; verify clicking it updates the task's rendered state

## 4. Verification

- [x] 4.1 Manually verify the end-to-end flow: create a task, see it listed incomplete, mark it complete, see it reflected, mark it incomplete again
- [x] 4.2 Verify `.env.example` (or README) documents the required `DATABASE_URL` variable
