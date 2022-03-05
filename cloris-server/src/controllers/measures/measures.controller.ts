import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Measure } from 'src/entities/measure.entity';
import { CustomRequest } from 'src/middlewares/timestamp.middleware';
import { MeasuresService } from 'src/services/measures/measures.service';

@Controller('measures')
export class MeasuresController {

    constructor(private readonly measureService: MeasuresService) {}

    @Get()
    async listMeasures(): Promise<Measure[]> {
        return await this.measureService.list();
    }

    @Get(':id')
    async getMeasure(@Param('id') id: string): Promise<Measure> {
        return await this.measureService.get(id);
    }

    @Post()
    async postMeasure(@Body() measure: Measure, @Req() request: CustomRequest): Promise<Measure> {
        const measureWithTimestamp: Measure = measure;
        measureWithTimestamp.timestamp = request.timestamp;
        return await this.measureService.create(measureWithTimestamp);
    }

    @Delete()
    async deleteMeasures(): Promise<Measure[]> {
        this.measureService.deleteAll();
        return this.measureService.list();
    }
}
