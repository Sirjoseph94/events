import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const valid = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      if (!valid.success) throw valid.error;
      req.body = valid.data.body;
      return next();
    } catch (error: any) {
      console.error(error);
      const msg = error.issues.map((e: { message: string }) => e.message);
      return res.status(400).json(msg);
    }
  };

export default validate;
