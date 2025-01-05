import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";

export const handleAddLecture = async (c: Context) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  const courseId = parseInt(c.req.param("id"), 10);
  if (isNaN(courseId)) {
    return c.json({ msg: "Invalid or missing course ID" }, 400);
  }
  try {
    const { title } = await c.req.json();
    if (!title) {
      return c.json({ msg: "No title provided" }, 400);
    }

    const newLecture = await prisma.lecture.create({
      data: {
        courseId: courseId,
        tutorId: user.id,
        title: title,
      },
    });

    if (!newLecture) {
      return c.json({ msg: "Error in creating lecture" }, 500);
    }

    return c.json(
      { msg: "Successfully added a lecture", lecture: newLecture },
      200
    );
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
export const handleRemoveLecture = async (c: Context) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  const lectureId = parseInt(c.req.param("id"), 10);
  if (isNaN(lectureId)) {
    return c.json({ msg: "Invalid or missing course ID" }, 400);
  }
  const body = await c.req.json();
  const tutorId = parseInt(body.tutorId, 10);
  const courseId = parseInt(body.courseId, 10);

  if (isNaN(tutorId) || isNaN(courseId)) {
    return c.json({ msg: "Invalid tutorId or courseId in request body" }, 400);
  }
  try {
    const removedLecture = await prisma.lecture.delete({
      where: { id: lectureId },
    });
    if (!removedLecture) {
      return c.json({ msg: "Lecture not found or already deleted" }, 404);
    }
    await prisma.notifications.create({
      data: {
        fromId: user.id,
        toId: tutorId,
        notification: "delete_lecture",
        courseId: courseId,
      },
    });

    return c.json({ msg: "Removed the lecture" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
