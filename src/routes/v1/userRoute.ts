import { Router } from "express";
import * as Controller from "../../controllers/userController";
import validate from "../../middleware/validation";
import { failed, success } from "../../utils/handleResponse";
import * as Validation from "../../utils/validation/UserValidation";

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
      const data = await Controller.signInController(payload);
      return success(res, data.statusCode, data.message);
    } catch (error: any) {
      console.error(error);
      return failed(res, error.statusCode, error.message);
    }
  }
);

export default router;
