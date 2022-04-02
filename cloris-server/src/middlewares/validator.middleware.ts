import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { ServerResponse } from "http";


@Injectable()
export class ValidatorMiddleware implements NestMiddleware {

  constructor(private readonly logger: Logger) {}

  use(req: Request, res: ServerResponse, next: NextFunction) {

    const factory: ValidationStrategyFactory = new ValidationStrategyFactory(req);
    const strategy: Strategy = factory.getStrategy();

    if(!strategy.isValidData()) {
      res.end('Validator Middleware refused data');
      return;
    }

    next();
  }
}


class ValidationStrategyFactory {

  constructor(private readonly request: Request) {
    this.request = request;
  }

  public getStrategy(): Strategy {
    if (this.request.baseUrl === '/measures') {
      return new MeasureStrategy(this.request);
    }

    if (this.request.baseUrl === '/waterings') {
      return new WateringStrategy(this.request);
    }
  }
}



abstract class Strategy {

  constructor(public readonly request: Request) {
    this.request = request;
  }

  public abstract isValidData(): boolean;
}


class MeasureStrategy extends Strategy {

  constructor(request: Request) {
    super(request);
  }

  public isValidData(): boolean {
    return true;
  }

}

class WateringStrategy extends Strategy {

  constructor(request: Request) {
    super(request);
  }

  public isValidData(): boolean {
    return true;
  }

}