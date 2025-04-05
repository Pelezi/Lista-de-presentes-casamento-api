import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gift {

    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true,
    })
    fileName: string;

    @Column("decimal", {
        precision: 10, 
        scale: 2,     
    })
    value: number;

    @Column({
        nullable: true,
    })
    mpcode: string;
}