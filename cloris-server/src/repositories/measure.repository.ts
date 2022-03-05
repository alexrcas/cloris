import { Measure } from "src/entities/measure.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Measure)
export class MeasureRepository extends Repository<Measure> {

}