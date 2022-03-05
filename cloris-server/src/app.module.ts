import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { MeasuresController } from './controllers/measures/measures.controller';
import { MeasuresService } from './services/measures/measures.service';
import { DatabaseModule } from './modules/database/database.module';
import { TimestampMiddleware } from './middlewares/timestamp.middleware';
import { WateringsController } from './controllers/waterings/waterings.controller';
import { WateringsService } from './services/waterings/waterings.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [MeasuresController, WateringsController],
  providers: [MeasuresService, WateringsService, Logger],
})
export class AppModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TimestampMiddleware)
      .forRoutes('measures', 'waterings')
      .apply(LoggerMiddleware)
      .forRoutes('/')
  }

}
