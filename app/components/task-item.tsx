"use client";

import { useState, useTransition } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  deleteTask,
  toggleTask,
  updateTaskNotes,
  updateTaskTitle,
} from "@/app/actions/tasks";

type TaskItemProps = {
  id: string;
  title: string;
  notes: string | null;
  completed: boolean;
};

export function TaskItem({ id, title, notes, completed }: TaskItemProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [draftNotes, setDraftNotes] = useState(notes ?? "");
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

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

  function submitNotesEdit() {
    startTransition(() => updateTaskNotes(id, draftNotes));
    setIsEditingNotes(false);
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-black"
    >
      <button
        type="button"
        aria-label="Arrastar para reordenar"
        {...attributes}
        {...listeners}
        className="mt-1 shrink-0 cursor-grab touch-none text-zinc-400 hover:text-zinc-600 active:cursor-grabbing dark:text-zinc-600 dark:hover:text-zinc-400"
      >
        ⠿
      </button>

      <input
        type="checkbox"
        checked={completed}
        disabled={isPending}
        onChange={() => startTransition(() => toggleTask(id))}
        className="mt-1 h-5 w-5 shrink-0 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700"
      />

      <div className="flex flex-1 flex-col gap-1">
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
            className="rounded border border-zinc-300 px-2 py-1 text-zinc-900 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-black dark:text-zinc-50"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={
              completed
                ? "text-zinc-400 line-through dark:text-zinc-600"
                : "text-zinc-900 dark:text-zinc-50"
            }
          >
            {title}
          </span>
        )}

        {isEditingNotes ? (
          <textarea
            value={draftNotes}
            autoFocus
            rows={2}
            onChange={(e) => setDraftNotes(e.target.value)}
            onBlur={submitNotesEdit}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setDraftNotes(notes ?? "");
                setIsEditingNotes(false);
              }
            }}
            className="rounded border border-zinc-300 px-2 py-1 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-black dark:text-zinc-50"
          />
        ) : notes ? (
          <span
            onDoubleClick={() => setIsEditingNotes(true)}
            className="text-sm text-zinc-500 dark:text-zinc-400"
          >
            {notes}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditingNotes(true)}
            className="self-start text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
          >
            Adicionar observação
          </button>
        )}
      </div>

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
