import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
      const loggerInfo = {
          method: req.method,
          url: req.url,
          body: req.body
      }
      this.logger.log(loggerInfo);
    next();
  }
}
