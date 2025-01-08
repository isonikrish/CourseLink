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
    const body = await c.req.parseBody();
    const title = body["title"];
    const file = body["video"];
    if (!title || !(file instanceof File)) {
      return c.json({ msg: "Title or file is missing" }, 400);
    }
    const bucket = c.env.HONO_R2_UPLOAD;
    const fileKey = `lectures/${courseId}-${Date.now()}-${file.name}`;
    const uploadResult = await bucket.put(fileKey, file);
    if (!uploadResult) {
      return c.json({ msg: "Failed to upload file to R2" }, 500);
    }

    const fileUrl = `${c.env.bucket_url}/${fileKey}`;

    const newLecture = await prisma.lecture.create({
      data: {
        courseId: courseId,
        tutorId: user.id,
        title: title,
        video: fileUrl,
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
    const lecture = await prisma.lecture.findUnique({
      where: { id: lectureId },
    });
    const bucket = c.env.HONO_R2_UPLOAD;
    const fileUrl = lecture.video;
    const bucketUrl = c.env.bucket_url;

    if (fileUrl.startsWith(bucketUrl)) {
      const fileKey = fileUrl.replace(`${bucketUrl}/`, "");
      const deleteResult = await bucket.delete(fileKey);
    }
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

export const handleGetLectures = async (c: Context) => {
  const prisma = prismaClient(c);
  const courseId = parseInt(c.req.param("id"));
  try {
    const lectures = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        Lecture: {
          select: {
            tutorId: true,
            courseId: true,
            title: true,
            id: true,
          },
        },
      },
    });

    if (lectures.length === 0) {
      return c.json({ msg: "No lectures found for this course" }, 400);
    }

    return c.json(lectures, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
export const handleGetLecture = async (c: Context) => {
  const prisma = prismaClient(c);
  const courseId = parseInt(c.req.param("id"));
  const lectureId = parseInt(c.req.param("lectureId"));
  try {
    const lecture = await prisma.lecture.findUnique({
      where: { id: lectureId, courseId: courseId },
    });


    if (!lecture) {
      return c.json({ msg: "No lecture found" }, 400);
    }

    return c.json(lecture, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
