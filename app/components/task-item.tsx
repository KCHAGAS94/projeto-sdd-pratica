"use client";

import { useState, useTransition } from "react";
import { deleteTask, toggleTask, updateTaskTitle } from "@/app/actions/tasks";

type TaskItemProps = {
  id: string;
  title: string;
  completed: boolean;
};

export function TaskItem({ id, title, completed }: TaskItemProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);

  function submitEdit() {
    const trimmed = draftTitle.trim();
    if (!trimmed) {
      setDraftTitle(title);
      setIsEditing(false);
      return;
    }

    startTransition(() => updateTaskTitle(id, trimmed));
    setIsEditing(false);
  }

  return (
    <li className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-black">
      <input
        type="checkbox"
        checked={completed}
        disabled={isPending}
        onChange={() => startTransition(() => toggleTask(id))}
        className="h-5 w-5 shrink-0 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700"
      />

      {isEditing ? (
        <input
          type="text"
          value={draftTitle}
          autoFocus
          onChange={(e) => setDraftTitle(e.target.value)}
          onBlur={submitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitEdit();
            } else if (e.key === "Escape") {
              setDraftTitle(title);
              setIsEditing(false);
            }
          }}
          className="flex-1 rounded border border-zinc-300 px-2 py-1 text-zinc-900 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-black dark:text-zinc-50"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={
            completed
              ? "flex-1 text-zinc-400 line-through dark:text-zinc-600"
              : "flex-1 text-zinc-900 dark:text-zinc-50"
          }
        >
          {title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Edit
        </button>
      )}

      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => deleteTask(id))}
        className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        Delete
      </button>
    </li>
  );
}
