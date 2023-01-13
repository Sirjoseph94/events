import express from "express";
import logger from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import userRouter from "./routes/userRoute";
import eventRouter from "./routes/eventRoute";
import swaggerSpecs from "./config/apiDocs";

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = app;
