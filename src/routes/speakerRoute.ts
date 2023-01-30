import Router, { Request, Response } from "express";
import { createSpeaker } from "../controllers/speakerController";
import { userRequest } from "../types/express";
import { failed, success } from "../utils/handleResponse";
import validate from "../middleware/validation";
import { speakerValidation } from "../utils/validation/SpeakerValidation";

const route = Router();

route.post("/", validate(speakerValidation), async (req: userRequest, res) => {
  try {
    const payload = req.body;
    const user_id = req.user.user_id;
    const data = await createSpeaker(payload, user_id);
    return success(res, data.statusCode, data.message);
  } catch (error: any) {
    return failed(res, error.statusCode, error.message);
  }
});

export default route;
