import { Router } from "express";
import * as Controller from "../controllers/userController";
import { CustomError } from "../types/express";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const payload = req.body;
    const response = await Controller.signUpController(payload);
    return res.status(201).json({ message: "successful", response });
  } catch (error: CustomError | any) {
    if(!error.status){
       error.status = 500
       error.message = "something went wrong";
    }
    console.log(error);
    return res.status(error.status).json({message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const payload = req.body;
    const response = await Controller.signInController(payload);
    return res.status(201).json({ message: "successful", response });
  } catch (error) {
    console.log(error);
    return res.sendStatus;
  }
});

export default router;
