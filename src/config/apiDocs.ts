import swaggerJsdoc from "swagger-jsdoc";
import path from "node:path";

const options = {
  swaggerDefinition: {
    info: {
      title: "Events API",
      version: "1.0.0",
      description: "My API for Events sapp!",
    },
  },
  
  apis: [path.join(__dirname, "../routes/*.ts")],
};
const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs;
