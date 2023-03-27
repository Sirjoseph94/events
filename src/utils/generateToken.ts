import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateAccessToken(id: string, isAdmin: boolean) {
  const key = process.env.AUTH_SECRET as string;
  const token = jwt.sign({ userId: id, isAdmin }, key, {
    expiresIn: "24h",
  });
  return token;
}
