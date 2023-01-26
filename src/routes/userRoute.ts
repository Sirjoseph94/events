import { Router } from "express";
import * as Controller from "../controllers/userController";
import validate from "../middleware/validation";
import * as Validation from "../utils/validation/UserValidation";
import { failed, success } from "../utils/handleResponse";

const router = Router();

router.post(
  "/signup",
  validate(Validation.signupValidation),
  async (req, res) => {
    try {
      const payload = req.body;
      const data = await Controller.signUpController(payload);
      return success(res, data.statusCode, data.message);
    } catch (error: any) {
      return failed(res, error.statusCode, error.message);
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
      return res.status(200).json({ message: "successful", response });
    } catch (error: any) {
      console.error(error);
      return res
        .status(error.status)
        .json({ status: "failed", reason: error.message });
    }
  }
);

export default router;
