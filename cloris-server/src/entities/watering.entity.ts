import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Watering extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    litersUsed: number;

    @Column()
    timestamp: Date;
}