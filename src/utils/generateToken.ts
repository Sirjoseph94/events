import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import prisma from "../config/prismaClient";
// import cls_hooked from "cls-hooked"
import { userRequest } from "../types/express";
// const createNameSpace = cls_hooked.createNamespace

dotenv.config();
const key = process.env.AUTH_SECRET as string;
export function generateAccessToken(id: string) {
  const key = process.env.AUTH_SECRET as string;
  const token = jwt.sign({ user_id: id }, key, {
    expiresIn: "24h",
  });
  return token;
}


