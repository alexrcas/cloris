import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { MeasuresController } from './controllers/measures.controller';
import { MeasuresService } from './services/measures.service';
import { DatabaseModule } from './modules/database/database.module';
import { TimestampMiddleware } from './middlewares/timestamp.middleware';
import { WateringsController } from './controllers/waterings.controller';
import { WateringsService } from './services/waterings.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ValidatorMiddleware } from './middlewares/validator.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [MeasuresController, WateringsController],
  providers: [MeasuresService, WateringsService, Logger],
})
export class AppModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidatorMiddleware)
      .forRoutes('measures', 'waterings')
      .apply(TimestampMiddleware)
      .forRoutes('measures', 'waterings')
      .apply(LoggerMiddleware)
      .forRoutes('/')
  }

}
