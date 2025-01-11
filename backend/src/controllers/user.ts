import { Context } from "hono";
import { loginSchema, signupSchema } from "../utils/zodSchemas";
import { prismaClient } from "../utils/prismaClient";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken";
import { getCookie, setCookie } from "hono/cookie";

export const handleSignup = async (c: Context) => {
  const prisma = prismaClient(c);
  try {
    const data = await c.req.json();
    const validatedData = signupSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }
    const { firstName, lastName, email, password, role } = validatedData.data;
    const isUserExists = await prisma.user.findFirst({
      where: { email: email },
    });
    if (isUserExists) return c.json({ msg: "User already exists" }, 400);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      return c.json({ msg: "Error in creating a user" }, 400);
    }
    return c.json({ msg: "User Created" }, 200);
  } catch (error) {
    console.error({ error, msg: "Got error while signup" });
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
export const handleLogin = async (c: Context) => {
  const prisma = prismaClient(c);
  try {
    const data = await c.req.json();
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }
    const { email, password } = validatedData.data;
    const isUserExists = await prisma.user.findFirst({
      where: { email: email },
    });
    const isMatch = await bcrypt.compare(password, isUserExists.password);

    if (!isUserExists) return c.json({ msg: "User don't exists" }, 400);
    if (!isMatch) return c.json({ msg: "Password is incorrect" }, 400);

    generateTokenAndSetCookie(isUserExists.id, c);

    return c.json(
      {
        id: isUserExists.id,
        firstName: isUserExists.firstName,
        lastName: isUserExists.lastName,
        email: isUserExists.email,
        role: isUserExists.role,
      },
      200
    );
  } catch (error) {
    console.error({ error, msg: "Got error while signup" });
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const handleGetMe = async (c: Context) => {
  try {
    const user = c.get("user");
    return c.json(user, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
export const handleLogout = async (c: Context) => {
  try {
    const token = getCookie(c, "token");
    if (!token) {
      return c.json({ msg: "Unauthorized" }, 401);
    }

    // Clear the token cookie
    setCookie(c, "token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      path: "/",
      sameSite: "Lax",
    });

    return c.json({ msg: "Logout successful." }, 200);
  } catch (error) {
    return c.json({ msg: "Internal server error." }, 500);
  }
};

export const handleGetUser = async (c: Context) => {
  const prisma = prismaClient(c);
  const id = c.req.param("id");

  try {
    if (!id) return c.json({ msg: "No id provided" }, 400);
    const userId = parseInt(id, 10);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return c.json({ msg: "No user found" }, 400);

    return c.json(user, 200);
  } catch (error) {
    return c.json({ msg: "Internal server error." }, 500);
  }
};

export const handleSendRequest = async (c: Context) => {
  const prisma = prismaClient(c);
  const { courseId } = await c.req.json();

  const id = c.req.param("id");
  const user = c.get("user");
  if (!user || !user.id || !courseId) {
    return c.json({ msg: "Unauthorized: User not found in context." }, 401);
  }

  try {
    const parsedCourseId = parseInt(courseId);
    const toId = parseInt(id);
    if (isNaN(toId)) {
      return c.json({ msg: "Invalid user ID." }, 400);
    }
    if (isNaN(parsedCourseId)) {
      return c.json({ msg: "Invalid courseId." }, 400);
    }
    const isUserExists = await prisma.user.findFirst({ where: { id: toId } });
    if (!isUserExists) return c.json({ msg: "No user exists" }, 404);

    const newNotification = await prisma.notifications.create({
      data: {
        fromId: user.id,
        toId: toId,
        notification: "request",
        courseId: parsedCourseId,
      },
    });
    return c.json(newNotification, 200);
  } catch (error) {
    return c.json({ msg: "Internal server error." }, 500);
  }
};

export const handleGetNotifications = async (c: Context) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  try {
    if (!user) {
      return c.json({ msg: "Unauthorized: User not found in context." }, 401);
    }

    const notifications = await prisma.notifications.findMany({
      where: { toId: user.id },
      include: {
        course: true,
        fromUser: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    if (notifications.length === 0) {
      return c.json([], 200);
    }

    return c.json(notifications, 200);
  } catch (error) {
    return c.json({ msg: "Internal server error." }, 500);
  }
};

export const handleAcceptRequest = async (c: Context) => {
  const prisma = prismaClient(c);

  try {
    const { courseId, tutorId, notificationId, senderId } = await c.req.json();

    if (!courseId || !tutorId || !notificationId || !senderId) {
      return c.json({ msg: "Invalid request payload." }, 400);
    }

    const parsedCourseId = parseInt(courseId, 10);
    const parsedTutorId = parseInt(tutorId, 10);
    const parsedNotificationId = parseInt(notificationId, 10);
    const parsedSenderId = parseInt(senderId, 10);

    if (
      isNaN(parsedCourseId) ||
      isNaN(parsedTutorId) ||
      isNaN(parsedNotificationId) ||
      isNaN(parsedSenderId)
    ) {
      return c.json({ msg: "Invalid data types in request payload." }, 400);
    }

    const defaultPermission = "edit";

    // Perform database operations in a transaction
    const result = await prisma.$transaction(async (tx: any) => {
      const newCoTutor = await tx.coTutor.create({
        data: {
          tutorId: parsedTutorId,
          courseId: parsedCourseId,
          permissions: [defaultPermission],
        },
      });

      await tx.notifications.delete({
        where: { id: parsedNotificationId },
      });

      await tx.notifications.create({
        data: {
          fromId: parsedTutorId,
          courseId: parsedCourseId,
          toId: parsedSenderId,
          notification: "accepted",
        },
      });

      return newCoTutor;
    });

    return c.json({ msg: "Accepted the request", coTutor: result }, 200);
  } catch (error) {
    return c.json({ msg: "Internal server error." }, 500);
  }
};
export const handleClearNotifications = async (c: Context) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  try {
    if (!user) {
      return c.json({ msg: "Unauthorized: User not found in context." }, 401);
    }

    const notifications = await prisma.notifications.deleteMany({
      where: { toId: user.id },
    });
    if (notifications.count === 0) {
      return c.json({ msg: "No notifications found to delete." }, 404);
    }
    return c.json({ msg: "Deleted notifications successfully" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal server error." }, 500);
  }
};
