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

    async createItem(createGiftDTO: CreateGiftDTO, photo?: Express.Multer.File, guestId?: string): Promise<GiftDTO> {
        return this.giftRepository.createItem(createGiftDTO, photo, guestId);
    }

    async updateItem(id: number, updateGiftDTO: UpdateGiftDTO, photo?: Express.Multer.File, guestId?: string): Promise<GiftDTO> {
        return this.giftRepository.updateItem(id, updateGiftDTO, photo, guestId);
    }
    
    async getAllInfo(giftId: string): Promise<GiftDTO> {
        return this.giftRepository.getAllInfo(giftId);
    }

    async telegramMessage(type: string, guest: string, gift?: string, message?: string): Promise<void> {
        await this.giftRepository.telegramMessage(type, guest, gift, message);
    }

}
