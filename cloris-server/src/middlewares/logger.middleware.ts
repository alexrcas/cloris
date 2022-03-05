import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { time } from "console";
import { NextFunction } from "express";
import { timestamp } from "rxjs";
import { CustomRequest } from "./timestamp.middleware";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(private readonly logger: Logger) {}

  use(req: CustomRequest, res: Response, next: NextFunction) {
      const loggerInfo = {
          method: req.method,
          url: req.url,
          body: {
            ...req.body,
            timestamp: req.timestamp
          }
      }
      this.logger.log(loggerInfo);
    next();
  }
}
