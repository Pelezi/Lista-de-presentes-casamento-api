import { injectable, inject } from 'tsyringe';

import { BaseServiceImpl } from '../../../../base/BaseServiceImpl';

import {
    GiftDTO,
    CreateGiftDTO,
    UpdateGiftDTO
} from '../../../dtos/GiftDTO';

import { GiftRepository } from '../../../database/repositories/GiftRepository';
import { GiftService } from '../GiftService';


@injectable()
export class GiftServiceImpl
    extends BaseServiceImpl<GiftDTO, CreateGiftDTO, UpdateGiftDTO> 
    implements GiftService{
        
        constructor(
            @inject('GiftRepository')
            private giftRepository: GiftRepository
            ) {
                super(giftRepository);
            }

    async getByGuest(guestId: string): Promise<GiftDTO[]> {
        return this.giftRepository.getByGuest(guestId);
    }


    async getAllInfo(giftId: string): Promise<GiftDTO> {
        return this.giftRepository.getAllInfo(giftId);
    }

    async addGiftToGuest(giftId: string, guestId: string): Promise<GiftDTO> {
        return this.giftRepository.addGiftToGuest(giftId, guestId);
    }

    async removeGiftFromGuest(giftId: string, guestId: string): Promise<void> {
        await this.giftRepository.removeGiftFromGuest(giftId, guestId);
    }

    async telegramMessage(type: string, guest: string): Promise<void> {
        await this.giftRepository.telegramMessage(type, guest);
    }

}
