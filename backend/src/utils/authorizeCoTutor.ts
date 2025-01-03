import { Context } from "hono";
import { prismaClient } from "./prismaClient";

export const editAuthorize = async (
  c: Context,
  next: () => Promise<void>
) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  const courseId = parseInt(c.req.param("id"));

  try {
    const isTutor = await prisma.course.findFirst({
      where: { id: courseId, tutorId: user.id },
    });

    // Check if the user is a co-tutor with edit permissions
    const isCoTutorWithEdit = await prisma.coTutor.findFirst({
      where: { tutorId: user.id, courseId, permissions: { has: "edit" } },
    });
    if (!isTutor && !isCoTutorWithEdit) {
      return c.json({ msg: "Unauthorized" }, 403);
    }

    console.log("User is authorized to edit the course.");
    await next();
  } catch (error) {
    console.error("Authorization error:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const addAuthorize = async (
  c: Context,
  next: () => Promise<void>
) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  const courseId = parseInt(c.req.param("id"));

  try {
    const isTutor = await prisma.course.findFirst({
      where: { id: courseId, tutorId: user.id },
    });

    // Check if the user is a co-tutor with edit permissions
    const isCoTutorWithEdit = await prisma.coTutor.findFirst({
      where: { tutorId: user.id, courseId, permissions: { has: "add" } },
    });
    if (!isTutor && !isCoTutorWithEdit) {
      return c.json({ msg: "Unauthorized" }, 403);
    }

    console.log("User is authorized to edit the course.");
    await next();
  } catch (error) {
    console.error("Authorization error:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const statusAuthorize = async (
  c: Context,
  next: () => Promise<void>
) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  const courseId = parseInt(c.req.param("id"));

  try {
    const isTutor = await prisma.course.findFirst({
      where: { id: courseId, tutorId: user.id },
    });

    // Check if the user is a co-tutor with edit permissions
    const isCoTutorWithEdit = await prisma.coTutor.findFirst({
      where: { tutorId: user.id, courseId, permissions: { has: "status" } },
    });
    if (!isTutor && !isCoTutorWithEdit) {
      return c.json({ msg: "Unauthorized" }, 403);
    }

    console.log("User is authorized to edit the course.");
    await next();
  } catch (error) {
    console.error("Authorization error:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
