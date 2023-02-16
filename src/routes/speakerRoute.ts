import Router, { Request, Response } from "express";
import { createSpeaker, getSpeakers } from "../controllers/speakerController";
import { userRequest } from "../types/express";
import { failed, success } from "../utils/handleResponse";
import validate from "../middleware/validation";
import { speakerValidation } from "../utils/validation/SpeakerValidation";
import { auth } from "../middleware/auth";

const route = Router();

route.post(
  "/",
  auth,
  validate(speakerValidation),
  async (req: userRequest, res) => {
    try {
      const payload = req.body;
      const userId = req.user.userId;
      const data = await createSpeaker(payload, userId);
      return success(res, data.statusCode, data.message);
    } catch (error: any) {
      return failed(res, error.statusCode, error.message);
    }
  }
);

route.get("/", async (_req, res) => {
  try {
    const data = await getSpeakers();
    return success(res, data.statusCode, data.message);
  } catch (error: any) {
    return failed(res, error.statusCode, error.message);
  }
});

export default route;
