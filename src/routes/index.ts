import v1 from "./v1";

export default (app: any) => {
  app.use("/api/v1", v1);
};
