import express, { Request, Response } from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (_req: Request, res: Response) {
  res.status(200).json({ title: "working" });
});

export default router;
