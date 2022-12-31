import { Router } from "express";
import * as Controller from "../controllers/eventController";
import * as Validator from "../utils/validation/EventValidation";
import { auth } from "../middleware/auth";
import validate from "../middleware/validation";
import { userRequest } from "../types/express";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const response = await Controller.allEvents();
    res.status(200).json({ status: "successful", response });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post(
  "/",
  auth,
  validate(Validator.createEventValidation),
  async (req: userRequest, res) => {
    try {
      const payload = req.body;
      const id: string = req.user.user_id;
      const response = await Controller.createEvent(payload, id);
      return res.status(201).json({ status: "successful", response });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "failed", error });
    }
  }
);

export default router;
