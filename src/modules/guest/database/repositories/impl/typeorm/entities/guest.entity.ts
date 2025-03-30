import { Gift, GiftGuest } from "../../../../../../gift/database/repositories/impl/typeorm/entities/gift.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class Guest {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @OneToMany(() => GiftGuest, giftGuest => giftGuest.guest)
    gifts: Gift[];

}
