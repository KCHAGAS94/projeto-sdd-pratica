"use client";

import { useTransition } from "react";
import { toggleTask } from "@/app/actions/tasks";

type TaskItemProps = {
  id: string;
  title: string;
  completed: boolean;
};

export function TaskItem({ id, title, completed }: TaskItemProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <li className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-black">
      <input
        type="checkbox"
        checked={completed}
        disabled={isPending}
        onChange={() => startTransition(() => toggleTask(id))}
        className="h-5 w-5 shrink-0 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700"
      />
      <span
        className={
          completed
            ? "flex-1 text-zinc-400 line-through dark:text-zinc-600"
            : "flex-1 text-zinc-900 dark:text-zinc-50"
        }
      >
        {title}
      </span>
    </li>
  );
}
