import { Router } from "express";
import * as Controller from "../controllers/userController";
import { CustomError } from "../types/express";
import validate from "../middleware/validation";
import * as Validation from "../utils/validation/UserValidation";

const router = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - name
 *        properties:
 *          id:
 *            type: string
 *            description: auto generated uuid
 *          name:
 *            type: string
 *            description: user name
 *          email:
 *            type: string
 *            description: user email address
 *          password:
 *            type: string
 *            description: user password
 *        example:
 *          name: John Doe
 *          email: john@mail.com
 *          password: pass123
 *
 */

/**
 * @swagger
 *
 * /user/signup/:
 *   post:
 *     tags:
 *      - user
 *     summary: create new user
 *     description: generate JWT Token for valid user
 *
 *     produces:
 *       - application/json
 *     requestBody:
 *        description: User email and password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *     responses:
 *       201:
 *          description: create new user successful
 *
 */
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
      return res
        .status(error.status)
        .json({ status: "failed", reason: error.message });
    }
  }
);
/**
 * @swagger
 *
 * /user/signin/:
 *   post:
 *     tags:
 *      - user
 *     summary: sign in user
 *     description: generate JWT Token for valid user
 *
 *     produces:
 *       - application/json
 *     requestBody:
 *        description: User email and password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: user email
 *                password:
 *                  type: string
 *                  description: user password
 *              default:
 *                  email: name@mail.com
 *                  password: pass123
 *     responses:
 *       200:
 *          description: Login in successful
 *       404:
 *          description: User not found
 *
 */
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
