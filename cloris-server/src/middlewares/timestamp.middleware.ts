import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

export interface CustomRequest extends Request {
    timestamp: Date;
}

@Injectable()
export class TimestampMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
      req.timestamp = new Date();
    next();
  }
}
