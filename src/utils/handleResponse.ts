import { Response } from "express";
export function success(res: Response, statusCode:number, data: Record<string, any>) {
  return res.status(statusCode).json({
    status: "success",
    message: data,
  });
}

export function failed(res: any, statusCode:number, data: Record<string, any>) {
  return res.status(statusCode).json({
    status: "error",
    message: data,
  });
}
