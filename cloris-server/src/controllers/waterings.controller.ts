import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { WateringInfoDTO } from 'src/dto/wateringInfo.dto';
import { Watering } from 'src/entities/watering.entity';
import { toMongoDbDate } from 'src/helpers/dateparser.helper';
import { CustomRequest } from 'src/middlewares/timestamp.middleware';
import { WateringsService } from 'src/services/waterings.service';

@Controller('waterings')
export class WateringsController {

    constructor(private readonly wateringService: WateringsService) {}

    @Get()
    async listWaterings(@Query('from') from: string, @Query('to') to: string): Promise<Watering[]> {
        const fromDate = toMongoDbDate(from);
        const toDate = toMongoDbDate(to);

        if (fromDate != undefined || toDate != undefined) {
            return await this.wateringService.listByFilter(fromDate, toDate);
        }
        return await this.wateringService.list();
    }


    @Get('/last')
    async getLastMeasure(): Promise<Watering> {
        return await this.wateringService.getLast();
    }

    @Get('/summary')
    async getSummary(): Promise<WateringInfoDTO> {
        return await this.wateringService.getSummary();
    }

    @Get(':id')
    async getWatering(@Param('id') id: string): Promise<Watering> {
        return await this.wateringService.get(id)
    }

    @Post()
    async createWatering(@Body() watering: Watering, @Req() request: CustomRequest): Promise<Watering> {
        const wateringWithTimestamp = watering;
        wateringWithTimestamp.timestamp = request.timestamp;
        return await this.wateringService.create(watering)
    }

    @Delete()
    async deleteWaterings(): Promise<Watering[]> {
        await this.wateringService.deleteAll();
        return this.wateringService.list();
    }

    @Delete(':id')
    async deleteWatering(@Param('id') id: string): Promise<Watering[]> {
        await this.wateringService.deleteOne(id);
        return this.wateringService.list();
    }

}
