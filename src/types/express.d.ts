import { Request } from "express";
export interface userRequest extends Request {
  user?: string | JwtPayload;
}

// export interface customError {
//   status?: number,
//   error: Error
// }

export class CustomError extends Error {
    constructor(msg: string, status?) {
        super(msg);
        this.status = status
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
