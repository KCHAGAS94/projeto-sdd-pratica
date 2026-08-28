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
