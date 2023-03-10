import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import prisma from "../config/prismaClient";
import { userRequest } from "../types/express";

dotenv.config();
const key = process.env.AUTH_SECRET as string;
export async function auth(
  req: userRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).json({ error: "Access Denied, no token Provided" });
  try {
    const token = authorization.slice(7, authorization.length);
    const decoded = jwt.verify(token, key);
    if (!decoded) {
      return res.status(401).send("Unauthorized");
    }

    const { userId } = decoded as { [key: string]: string };
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).send("please register to access our service");
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error)
    res.status(400).json(error);
  }
}
