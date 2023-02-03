import express from "express";
import eventRouter from "./eventRoute";
import registrationRouter from "./registrationRoute";
import userRouter from "./userRoute";

const router = express.Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/events", eventRouter);
router.use("/api/v1/registrations", registrationRouter);

export default router;
