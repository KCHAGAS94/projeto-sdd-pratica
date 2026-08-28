## Context

Greenfield Next.js App Router project with no existing data layer. Project constitution (`openspec/project.md`) mandates Server Actions for all data mutations, Tailwind for styling, Prisma as ORM, and PostgreSQL via `DATABASE_URL`. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Establish the Prisma + PostgreSQL data layer pattern for the `Task` model.
- Implement list/create/toggle behavior using Server Actions only (no client-side fetch/API routes).

**Non-Goals:**
- Editing or deleting tasks.
- Due dates, priorities, tags, or multi-user ownership.
- Authentication/authorization.

## Decisions

- **Single `Task` model, single table**: `id` (cuid), `title` (String), `completed` (Boolean, default false), `createdAt` (DateTime, default now). No separate list/user model since the app is single-list, single-user for this iteration. Alternative considered: adding a `List` model now — rejected as premature given no requirement for multiple lists.
- **Prisma client singleton**: a shared `lib/prisma.ts` module exporting a single `PrismaClient` instance, guarded against creating multiple instances during Next.js dev hot-reload. Standard Prisma-with-Next.js pattern.
- **Server Actions co-located with the feature**: `app/actions/tasks.ts` exports `createTask` and `toggleTask` as `"use server"` functions, called directly from form `action` props and button handlers, per the project's Server Actions rule. Alternative considered: API routes — rejected, conflicts with project constitution.
- **Revalidation via `revalidatePath`**: after create/toggle, call `revalidatePath` on the task list route so the list re-renders with fresh data without client-side state management.

## Risks / Trade-offs

- [No optimistic UI] Toggling a task will feel slightly slower (server round-trip before UI updates) → Acceptable for this iteration; can add `useOptimistic` later if needed.
- [No pagination] Listing all tasks unbounded could degrade with very large lists → Acceptable at current scale; out of scope for this change.

## Migration Plan

- Add `prisma` and `@prisma/client` as dependencies.
- Run `npx prisma init` equivalent setup (schema file, `.env` with `DATABASE_URL`).
- Run `npx prisma migrate dev` to create the `Task` table against the configured PostgreSQL database.
- No existing data to migrate (new table).
