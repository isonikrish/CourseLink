import { PrismaClient } from "@prisma/client/edge.js";
import { withAccelerate } from "@prisma/extension-accelerate";
let prisma:any = null;
export function prismaClient(c: any) {
  
  if (!prisma) {
    prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  }
  return prisma;
}
