import { Controller, Get } from '@nestjs/common';
import { Measure } from 'src/entities/measure.entity';
import { MeasuresService } from 'src/services/measures/measures.service';

@Controller('measures')
export class MeasuresController {

    constructor(private readonly measureService: MeasuresService) {}

    @Get()
    async getMeasures(): Promise<Measure[]> {
        return await this.measureService.list();
    }
}
