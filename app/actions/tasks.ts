"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createTask(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) {
    return;
  }

  const notes = String(formData.get("notes") ?? "").trim();

  const lastTask = await prisma.task.findFirst({
    orderBy: { position: "desc" },
  });
  const position = lastTask ? lastTask.position + 1 : 0;

  await prisma.task.create({
    data: { title, notes: notes || null, position },
  });

  revalidatePath("/");
}

export async function toggleTask(id: string) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) {
    return;
  }

  await prisma.task.update({
    where: { id },
    data: { completed: !task.completed },
  });

  revalidatePath("/");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({ where: { id } });

  revalidatePath("/");
}

export async function updateTaskTitle(id: string, title: string) {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return;
  }

  await prisma.task.update({
    where: { id },
    data: { title: trimmedTitle },
  });

  revalidatePath("/");
}

export async function updateTaskNotes(id: string, notes: string) {
  const trimmedNotes = notes.trim();

  await prisma.task.update({
    where: { id },
    data: { notes: trimmedNotes || null },
  });

  revalidatePath("/");
}

export async function reorderTasks(orderedIds: string[]) {
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.task.update({
        where: { id },
        data: { position: index },
      }),
    ),
  );

  revalidatePath("/");
}
