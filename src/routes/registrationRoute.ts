import { Router } from "express";
import { auth } from "../middleware/auth";
import * as Controller from "../controllers/registrationController";
import { userRequest } from "../types/express";
import validate from "../middleware/validation";
import {
  registerationValidation,
  searchRegisterationValidation,
} from "../utils/validation/RegistrationValidation";

const router = Router();

router.get("/", auth, async (req: userRequest, res) => {
  try {
    const user_id: string = req.user.user_id;
    const response = await Controller.allRegistered(user_id);
    return res.status(200).json({ status: "successful", response });
  } catch (error: any) {
    console.error(error);
    return res.status(error.status).json(error.message);
  }
});

router.post(
  "/:event_id",
  auth,
  validate(registerationValidation),
  async (req: userRequest, res) => {
    try {
      const event_id = req.params.event_id;
      const user_id: string = req.user.user_id;
      const response = await Controller.registerEvent(event_id, user_id);
      return res.status(201).json({ status: "successful", response });
    } catch (error: any) {
      console.error(error);
      return res.status(error.status).json(error.message);
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
      const user_id: string = req.user.user_id;
      const response = await Controller.searchRegisteredUserByMail(
        email,
        user_id
      );
      return res.status(200).json({ status: "successful", response });
    } catch (error: any) {
      console.error(error);
      return res.status(error.status).json(error.message);
    }
  }
);

export default router;
