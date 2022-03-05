import { Injectable } from '@nestjs/common';
import { Measure } from 'src/entities/measure.entity';
import { MeasureRepository } from 'src/repositories/measure.repository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class MeasuresService {

    constructor(private readonly measureRepository: MeasureRepository) {}

    async list(): Promise<Measure[]> {
        return await this.measureRepository.find({})
    }

    async get(id: string): Promise<Measure> {
        return await this.measureRepository.findOne(id);
    }

    async create(measure: Measure): Promise<Measure> {
        return await this.measureRepository.save(measure);
    }

    async deleteAll(): Promise<DeleteResult> {
        return await this.measureRepository.delete({});
    }
}
