import { Router, Request, Response } from "express";
import {
  signInController,
  signUpController,
} from "../controllers/userController";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const payload = req.body;
    const response = await signUpController(payload);
    return res.status(201).json({ message: "successful", response });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "failed", error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const payload = req.body;
    const response = await signInController(payload);
    return res.status(201).json({ message: "successful", response });
  } catch (error) {
    console.log(error);
    return res.sendStatus;
  }
});

export default router;
