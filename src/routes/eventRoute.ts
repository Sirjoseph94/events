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
    return res.status(200).json({ status: "successful", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
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

router
  .route("/:id")
  .get(validate(Validator.id), async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Controller.viewSingleEvent(id);
      return res.status(200).json({ status: "successful", response });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  })
  // still having bugs
  .patch(
    auth,
    validate(Validator.updateEventValidation),
    async (req: userRequest, res) => {
      try {
        const { id } = req.params;
        const { user_id } = req.user;
        const payload = req.body;
        const response = await Controller.updateEventByID(id, user_id, payload);
        return res.status(200).json({ status: "successful", response });
      } catch (error) {
        console.error(error);
        return res.status(500).json(error);
      }
    }
  )
  .delete(auth, validate(Validator.id), async (req: userRequest, res) => {
    try {
      const { user_id } = req.user;
      const event_id = req.params.id;
      const response = await Controller.removeEvent(event_id, user_id);
      return res.status(204).json({ status: "successful", response });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  });
export default router;
