import { createTask } from "@/app/actions/tasks";

export function CreateTaskForm() {
  return (
    <form action={createTask} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          required
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-black dark:text-zinc-50"
        />
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-5 py-2 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
        >
          Add
        </button>
      </div>
      <textarea
        name="notes"
        placeholder="Observação (opcional)"
        rows={2}
        className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-black dark:text-zinc-50"
      />
    </form>
  );
}
