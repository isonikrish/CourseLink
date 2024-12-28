import { Context } from "hono";
import { loginSchema, signupSchema } from "../utils/zodSchemas";
import { prismaClient } from "../utils/prismaClient";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken";

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