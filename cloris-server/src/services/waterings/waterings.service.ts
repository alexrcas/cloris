import { Injectable } from '@nestjs/common';
import { Watering } from 'src/entities/watering.entity';
import { WateringRepository } from 'src/repositories/watering.repository';
import { DeleteResult } from 'typeorm';

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
