import { Injectable } from '@nestjs/common';
import { WateringInfoDTO } from 'src/dto/wateringInfo.dto';
import { Watering } from 'src/entities/watering.entity';
import { WateringRepository } from 'src/repositories/watering.repository';
import { DeleteResult } from 'typeorm';

import * as moment from 'moment';

@Injectable()
export class WateringsService {

    constructor(private readonly wateringRepository: WateringRepository) {}

    async list(): Promise<Watering[]> {
        return await this.wateringRepository.find({order: {timestamp: 'DESC'}});
    }

    async listByFilter(fromDate: Date, toDate: Date): Promise<Watering[]> {
        let timeStampQueryObject = {};

        if (fromDate != undefined) {
            timeStampQueryObject['$gte'] = fromDate;
        }

        if (toDate != undefined) {
            timeStampQueryObject['$lte'] = toDate;
        }
        
        return await this.wateringRepository.find({

            where: {
                timestamp: { ...timeStampQueryObject }
            },
            order: {timestamp: 'DESC'},
        });
    }

    async get(id: string): Promise<Watering> {
        return await this.wateringRepository.findOne(id);
    }

    async getLast(): Promise<Watering> {
        return await this.wateringRepository.findOne({ order: {timestamp: 'DESC'} });
    }

    async getSummary(): Promise<WateringInfoDTO> {

        //Litros del último riego
        const lastLiters: number = await (await this.getLast()).litersUsed;

        // Litros de hoy
        let today: Date = new Date()
        today.setUTCHours(0, 0, 0, 0);

        let todayLimit: Date = new Date();
        todayLimit.setUTCHours(23, 59, 59, 59);

        const todayWaterings: Watering[] = await this.listByFilter(today, todayLimit);
        const todayLiters: number = todayWaterings
            .map(watering => watering.litersUsed)
            .reduce((acc, value) => acc + value );


        // Litros de esta semana
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();
        console.log(startOfWeek, endOfWeek)
        const weekWaterings: Watering[] = await this.listByFilter(startOfWeek, endOfWeek);
        const weekLiters: number = weekWaterings
            .map(watering => watering.litersUsed)
            .reduce((acc, value) => acc + value );

        // Litros de este mes
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();
        const monthWaterings: Watering[] = await this.listByFilter(startOfMonth, endOfMonth);
        const monthLiters: number = monthWaterings
            .map(watering => watering.litersUsed)
            .reduce((acc, value) => acc + value );

        return new WateringInfoDTO(lastLiters, todayLiters, weekLiters, monthLiters);
    }


    async create(watering: Watering): Promise<Watering> {
        return await this.wateringRepository.save(watering);
    }


    async deleteAll(): Promise<DeleteResult> {
        return await this.wateringRepository.delete({});
    }

    async deleteOne(id: string): Promise<Watering> {
        const measure: Watering = await this.wateringRepository.findOne(id);
        return await this.wateringRepository.remove(measure);
    }
}
