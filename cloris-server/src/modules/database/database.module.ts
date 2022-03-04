import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureRepository } from 'src/repositories/measure.repository';
import { databaseProviders } from '../database.service';

@Module({
    imports: [
        ...databaseProviders,
        TypeOrmModule.forFeature([MeasureRepository])
    ],
    exports: [...databaseProviders]
})
export class DatabaseModule {
}
