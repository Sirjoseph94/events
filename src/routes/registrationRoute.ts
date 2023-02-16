import { Router } from "express";
import { auth } from "../middleware/auth";
import * as Controller from "../controllers/registrationController";
import { userRequest } from "../types/express";
import validate from "../middleware/validation";
import {
  registerationValidation,
  searchRegisterationValidation,
} from "../utils/validation/RegistrationValidation";
import { success,failed } from "../utils/handleResponse";

const router = Router();

router.get("/", auth, async (req: userRequest, res) => {
  try {
    const userId: string = req.user.userId;
    const data = await Controller.allRegistered(userId);
   return success(res, data.statusCode, data.message);
  } catch (error:any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
});

router.post(
  "/:eventId",
  auth,
  validate(registerationValidation),
  async (req: userRequest, res) => {
    try {
      const eventId = req.params.eventId;
      const userId: string = req.user.userId;
      const data = await Controller.registerEvent(eventId, userId);
      return success(res, data.statusCode, data.message);
    } catch (error: any) {
      console.error(error);
      return failed(res, error.statusCode, error.message);
    }
  }
);

router.get(
  "/search",
  auth,
  validate(searchRegisterationValidation),
  async (req: userRequest, res) => {
    try {
      const email = req.query.email as string;
      const userId: string = req.user.userId;
      const data = await Controller.searchRegisteredUserByMail(
        email,
        userId
      );
      return success(res, data.statusCode, data.message);
    } catch (error: any) {
      console.error(error);
      return failed(res, error.statusCode, error.message);
    }
  }
);

export default router;
