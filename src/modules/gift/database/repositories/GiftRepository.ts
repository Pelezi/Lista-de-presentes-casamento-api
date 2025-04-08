import { 
    GiftDTO, 
    CreateGiftDTO, 
    UpdateGiftDTO 
} from '../../dtos/GiftDTO';

import { BaseRepository } from '../../../base/BaseRepository';

export interface GiftRepository 
    extends BaseRepository<GiftDTO, CreateGiftDTO, UpdateGiftDTO> {
        createItem(createGiftDTO: CreateGiftDTO, photo?: Express.Multer.File, guestId?: string): Promise<GiftDTO>;
        updateItem(id: number, updateGiftDTO: UpdateGiftDTO, photo?: Express.Multer.File, guestId?: string): Promise<GiftDTO>;
        getAllInfo(giftId: string): Promise<GiftDTO>;
        telegramMessage(type:string, guest: string, gift?: string, message?: string): Promise<void>;
    }
