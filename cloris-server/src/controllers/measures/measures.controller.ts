import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Measure } from 'src/entities/measure.entity';
import { CustomRequest } from 'src/middlewares/timestamp.middleware';
import { MeasuresService } from 'src/services/measures/measures.service';

@Controller('measures')
export class MeasuresController {

    constructor(private readonly measureService: MeasuresService) {}

    @Get()
    async getMeasures(): Promise<Measure[]> {
        return await this.measureService.list();
    }

    @Post()
    async postMeasure(@Body() measure: Measure, @Req() request: CustomRequest): Promise<Measure> {
        const measureWithTimestamp: Measure = measure;
        measureWithTimestamp.timestamp = request.timestamp;
        return await this.measureService.create(measureWithTimestamp);
    }
}
