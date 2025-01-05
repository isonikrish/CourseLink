import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

export const generateTokenAndSetCookie = async (payload: any, c: Context) => {
  const isProduction = false;
  try {
    const jwt = await sign(
      {
        id: payload,
      },
      c.env.JWT_SECRET
    );
    setCookie(c, "token", jwt, {
      httpOnly: true,
      secure: true, 
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: isProduction ? "None" : "Lax", 
    });

  } catch (error) {
    console.error(error);
  }
};
