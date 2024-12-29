import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { prismaClient } from "./prismaClient";
import { verify } from "hono/jwt";

export const protectRoute = async (c: Context, next: any) => {
  try {
    const prisma = prismaClient(c);

    const token = getCookie(c, "token");

    if (!token) {
      return c.json({ error: "Unauthorized: No token provided" }, 401);
    }

    const payload = await verify(token, c.env.JWT_SECRET);

    const { id, firstName, lastName, email, role } =
      await prisma.user.findFirst({ where: { id: payload.id } });

    c.set("user", { id, firstName, lastName, email, role });

    return next();
  } catch (err) {
    return c.json({ error: "Unauthorized: Invalid token" }, 401);
  }
};
