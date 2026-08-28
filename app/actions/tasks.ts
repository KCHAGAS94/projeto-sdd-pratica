"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createTask(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) {
    return;
  }

  await prisma.task.create({
    data: { title },
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
