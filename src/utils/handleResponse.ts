import { Response } from "express";
export function success(
  res: Response,
  statusCode: number,
  data?: Record<string, any> | string
) {
  return res.status(statusCode || 304).json({
    success: true,
    data: data,
  });
}

export function failed(
  res: any,
  statusCode: number,
  data: Record<string, any>
) {
  return res.status(statusCode).json({
    success: false,
    reason: data,
  });
}
