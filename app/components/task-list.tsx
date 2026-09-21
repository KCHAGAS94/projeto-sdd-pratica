"use client";

import { useState, useTransition } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { reorderTasks } from "@/app/actions/tasks";
import { TaskItem } from "@/app/components/task-item";

type Task = {
  id: string;
  title: string;
  notes: string | null;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks: initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [, startTransition] = useTransition();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reordered = arrayMove(tasks, oldIndex, newIndex);
    setTasks(reordered);
    startTransition(() => reorderTasks(reordered.map((task) => task.id)));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              notes={task.notes}
              completed={task.completed}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
