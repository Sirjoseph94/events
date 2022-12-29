import { Router } from "express";
import * as Controller from "../controllers/userController";
import { CustomError } from "../types/express";
import validate from "../middleware/validation";
import * as Validation from "../utils/validation/UserValidation";

const router = Router();

router.post(
  "/signup",
  validate(Validation.signupValidation),
  async (req, res) => {
    try {
      const payload = req.body;
      console.log(payload);
      const response = await Controller.signUpController(payload);
      return res.status(201).json({ message: "successful", response });
    } catch (error: any) {
      return res.status(error.status).json({status: "failed", reason: error.message });
    }
  }
);

router.post(
  "/signin",
  validate(Validation.signInValidation),
  async (req, res) => {
    try {
      const payload = req.body;
      const response = await Controller.signInController(payload);
      return res.status(201).json({ message: "successful", response });
    } catch (error: CustomError | any) {
      if (!error.status) {
        error.status = 500;
        error.message = "something went wrong";
      }
      console.log(error);
      return res.status(error.status).json({ message: error.message });
    }
  }
);

export default router;
