import { Controller, Get } from '@nestjs/common';
import { WateringsService } from 'src/services/waterings/waterings.service';

@Controller('waterings')
export class WateringsController {

    constructor(private readonly wateringService: WateringsService) {}

    @Get()
    async listWaterings() {
        return 'watering'
    }
    /*
    @Get()
    async listMeasures(@Query('from') from: string, @Query('to') to: string): Promise<Measure[]> {
        const fromDate = toMongoDbDate(from);
        const toDate = toMongoDbDate(to);

        if (fromDate != undefined || toDate != undefined) {
            return await this.measureService.listByFilter(fromDate, toDate);
        }

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
        await this.measureService.deleteAll();
        return this.measureService.list();
    }

    @Delete(':id')
    async deleteMeasure(@Param('id') id: string): Promise<Measure[]> {
        await this.measureService.deleteOne(id);
        return this.measureService.list();
    }
    */
}
