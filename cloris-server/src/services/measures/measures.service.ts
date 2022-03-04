import { Injectable } from '@nestjs/common';
import { Measure } from 'src/entities/measure.entity';

@Injectable()
export class MeasuresService {

    async list(): Promise<Measure[]> {
        return new Promise(res => res(
            [new Measure()]
        ));
    }
}
