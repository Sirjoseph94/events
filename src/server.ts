import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";

import swaggerSpecs from "./config/apispec.json";
import Routes from "./routes";

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Routes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(port || 3000, () => {
  console.log(`App starting in development mode on port ${port}`);
});

app.get("/", (_req, res) => {
  res
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

module.exports = app;
