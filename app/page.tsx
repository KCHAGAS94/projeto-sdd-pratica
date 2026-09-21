import { prisma } from "@/lib/prisma";
import { CreateTaskForm } from "@/app/components/create-task-form";
import { TaskList } from "@/app/components/task-list";

export default async function Home() {
  const tasks = await prisma.task.findMany({
    orderBy: { position: "asc" },
  });

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Tasks
        </h1>

        <CreateTaskForm />

        {tasks.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">
            No tasks yet. Add one above to get started.
          </p>
        ) : (
          <TaskList
            tasks={tasks.map((task) => ({
              id: task.id,
              title: task.title,
              notes: task.notes,
              completed: task.completed,
            }))}
          />
        )}
      </main>
    </div>
  );
}
