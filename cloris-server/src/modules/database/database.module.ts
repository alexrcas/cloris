import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureRepository } from 'src/repositories/measure.repository';
import { WateringRepository } from 'src/repositories/watering.repository';
import { databaseProviders } from '../../services/database.service';

@Module({
    imports: [
        ...databaseProviders,
        TypeOrmModule.forFeature([MeasureRepository, WateringRepository])
    ],
    exports: [...databaseProviders]
})
export class DatabaseModule {
}
