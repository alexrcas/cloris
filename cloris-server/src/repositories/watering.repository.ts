import { Measure } from "src/entities/measure.entity";
import { Watering } from "src/entities/watering.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Watering)
export class WateringRepository extends Repository<Watering> {

}