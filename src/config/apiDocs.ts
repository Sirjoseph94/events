import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Events API",
      version: "1.0.0",
      description: "API Documentation for Events app!",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:7000/api/v1",
        description: "Development server",
      },
      {
        url: "https://events-be.onrender.com/api/v1",
        description: "Live server",
      },
    ],
  },

  apis: [path.join(__dirname, "../routes/*.js")],
};
const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs;
