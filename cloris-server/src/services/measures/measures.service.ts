import { Injectable } from '@nestjs/common';
import { Measure } from 'src/entities/measure.entity';
import { MeasureRepository } from 'src/repositories/measure.repository';

@Injectable()
export class MeasuresService {

    constructor(private readonly measureRepository: MeasureRepository) {

    }

    async list(): Promise<Measure[]> {
        return await this.measureRepository.find({})
    }

    async create(measure: Measure): Promise<Measure> {
        return await this.measureRepository.save(measure);
    }
}
