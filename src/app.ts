import express from "express";
import logger from "morgan";
import helmet from "helmet";

import userRouter from "./routes/userRoute";
import eventRouter from "./routes/eventRoute";

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/events", eventRouter);

module.exports = app;
