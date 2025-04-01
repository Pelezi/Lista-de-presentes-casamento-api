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

    @Column()
    value: string;

    @Column({
        nullable: true,
    })
    mpcode: string;
}