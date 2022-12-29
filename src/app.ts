import express from "express";
import logger from "morgan";

import indexRouter from "./routes/index";
import userRouter from "./routes/userRoute";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/", indexRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;
