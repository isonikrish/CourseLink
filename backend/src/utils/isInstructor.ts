import { Context } from "hono";
import { prismaClient } from "./prismaClient";

export const isInstructor = async (c: Context, next: () => Promise<void>) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  const courseId = parseInt(c.req.param("id"));

  try {
    const isTutor = await prisma.course.findFirst({
      where: { id: courseId, tutorId: user.id },
    });

    const isCoTutor = await prisma.coTutor.findFirst({
      where: { courseId: courseId, tutorId: user.id },
    });

    if (isTutor || isCoTutor) {
      return c.json(
        { message: "You are an instructor and cannot purchase this course." },
        403
      );
    }

    await next();
  } catch (error) {
    return c.json(
      { message: "An error occurred while processing your request." },
      500
    );
  }
};
