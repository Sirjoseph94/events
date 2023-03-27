import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Error-->", JSON.parse(err));
  res
    .status(err.statusCode || 500)
    .json({ Error: err.type || "Internal Server Error" });
}

export default errorHandler;
