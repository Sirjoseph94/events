import express from "express";
import logger from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import dotenv from "dotenv"

import userRouter from "./routes/userRoute";
import eventRouter from "./routes/eventRoute";
import registrationRouter from "./routes/registrationRoute";
import speakerRouter from "./routes/speakerRoute"
import swaggerSpecs from "./config/apispec.json";

dotenv.config()

const PORT = Number(process.env.PORT) || 3001
const app = express();

app.use(cors())
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/speakers", speakerRouter);
app.use("/api/v1/registrations", registrationRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (_req, res) => {
  return res
    .status(200)
    .send(
      "<h1>Events App</h1><p><a href='/api-docs'>Click here</a> for the API documentation.</p>"
    );
});

app.use((_req, res) =>
  res
    .status(404)
    .json({ status: "Not Found", message: "This route does not exist" })
);

app.listen(PORT,()=>{
  console.log(`Server running at Port: ${PORT} `)
} )

module.exports = app;
