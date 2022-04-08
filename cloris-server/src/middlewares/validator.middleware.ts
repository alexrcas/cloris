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
      this.logger.error('Error en los datos enviados desde los sensores: ', req.body)
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
    const temperature = this.request.body.temperature;
    const airHumidity = this.request.body.airHumidity;
    const terrainHumidity = this.request.body.terrainHumidity;

    if (!Number.isFinite(temperature))
      return false;
    if (!Number.isFinite(airHumidity))
      return false;
    if (!Number.isFinite(terrainHumidity))
      return false;

    return true;
  }

}

class WateringStrategy extends Strategy {

  constructor(request: Request) {
    super(request);
  }

  public isValidData(): boolean {
    const litersUsed = this.request.body.litersUsed;
    return Number.isFinite(litersUsed);
  }

}
