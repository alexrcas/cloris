import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasuresController } from './controllers/measures/measures.controller';
import { MeasuresService } from './services/measures/measures.service';
import { DatabaseModule } from './modules/database/database.module';
import { TimestampMiddleware } from './middlewares/timestamp.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, MeasuresController],
  providers: [AppService, MeasuresService],
})
export class AppModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TimestampMiddleware)
      .forRoutes('measures');
  }
}
