import { Guest } from "../entities/guest.entity";

import { sendTelegramMessage } from "../../../../../../../config/telegram-bot-api";

import {
    GuestDTO,
    CreateGuestDTO,
    UpdateGuestDTO
} from "../../../../../dtos/GuestDTO";

import { BaseRepositoryImpl } from '../../../../../../base/BaseRepositoryImpl';
import { FindOptionsWhere } from "typeorm";

export class GuestRepositoryImpl
    extends BaseRepositoryImpl<GuestDTO, CreateGuestDTO, UpdateGuestDTO> {

    constructor() {
        super('id', Guest);
    }

    async getByGift(giftId: string): Promise<GuestDTO[]> {
        const guests = await this.typeormRepository.createQueryBuilder('guest')
            .leftJoin('guest.gifts', 'gifts')
            .leftJoin('gifts.gift', 'gift')
            .select([
                'guest.id',
                'guest.name',
                'guest.phone',
                'gifts.count',
            ])
            .where('gift.id = :giftId', { giftId })
            .getMany();

        if (!guests) {
            throw new Error(`Registro não encontrado!`);
        }

        return guests;
    }

    async getAllInfo(guestId: string): Promise<GuestDTO> {
        const guest = await this.typeormRepository.createQueryBuilder('guest')
            .leftJoin('guest.gifts', 'gifts')
            .leftJoin('gifts.gift', 'gift')
            .select([
                'guest.id',
                'guest.name',
                'guest.phone',
                'gifts.count',
                'gift.id',
                'gift.name',
                'gift.photoUrl',
                'gift.quantity',
                'gift.description',
            ])
            .where('guest.id = :guestId', { guestId })
            .getOne();

        if (!guest) {
            throw new Error(`Registro não encontrado!`);
        }

        return guest;
    }

    async guestAccess(phone: string, name: string): Promise<GuestDTO> {
        const guest = await this.typeormRepository.findOne({
            where: { phone, name }
        });

        if (!guest) {
            const existingGuest = await this.findOne({ phone } as FindOptionsWhere<GuestDTO>);
            if (existingGuest) {
                throw new Error(`Convidada com o número de celular ${phone} já existe!`);
            } else {
                const newGuest = await super.createItem({ phone, name });
                sendTelegramMessage('newGuest', name, null);
                return newGuest;
            }
        }

        return guest;
    }

}