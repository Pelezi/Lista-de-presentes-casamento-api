import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Guest {

    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

}
