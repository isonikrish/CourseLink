import { Context } from "hono";
import { prismaClient } from "./prismaClient";

export const courseLimitCheck = async (c: Context, next: any) => {
  const user = c.get("user");
  const prisma = prismaClient(c);

  if (!user) {
    return c.json({ msg: "Unauthorized: User not found in context." }, 401);
  }
  const mainUser = await prisma.user.findUnique(
    { where: { id: user?.id } },
    { include: { subscription: true } }
  );

  if (mainUser.subscription === "FREE") {
    const courseCount = await prisma.course.count({
      where: { tutorId: mainUser.id },
    });
    if (courseCount >= 2) {
      return c.json(
        { msg: "Free users can only create up to 2 courses." },
        400
      );
    }
  }

  return next();
};

export const addlectureLimitCheck = async (c: Context, next:any) => {
  const prisma = prismaClient(c);

  const user = c.get("user");
  const courseId = parseInt(c.req.param("id"));

  if (!user) {
    return c.json({ msg: "Unauthorized: User not found in context." }, 401);
  }

  const mainUser = await prisma.user.findUnique(
    { where: { id: user?.id } },
    { include: { subscription: true } }
  );

 
  if (mainUser.subscription === "FREE") {

    const lectureCount = await prisma.Lecture.count({
      where: { courseId: courseId },
    });

    if (lectureCount >= 2) {
      return c.json({ msg: "Free users can only add up to 2 lectures per course." }, 400);
    }
  }

  return next();
};
