import { Context } from "hono";
import { prismaClient } from "./prismaClient";

export const isEnrolled = async (c: Context, next: () => Promise<void>) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  const courseId = parseInt(c.req.param("id"));

  try {
    const isEnrolled = await prisma.enrollment.findFirst({
      where: {
        courseId: courseId,
        userId: user.id,
      },
    });

    if (!isEnrolled) {
      return c.json(
        { msg: "You are not enrolled to access this resource" },
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
