import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Measure extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    temperature: number;

    @Column()
    airHumidity: number;

    @Column()
    terrainHumidity: number;
}