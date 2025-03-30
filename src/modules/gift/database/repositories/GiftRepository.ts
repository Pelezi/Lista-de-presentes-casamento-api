import { 
    GiftDTO, 
    CreateGiftDTO, 
    UpdateGiftDTO 
} from '../../dtos/GiftDTO';

import { BaseRepository } from '../../../base/BaseRepository';

export interface GiftRepository 
    extends BaseRepository<GiftDTO, CreateGiftDTO, UpdateGiftDTO> {
        getByGuest(guestId: string): Promise<GiftDTO[]>;
        getAllInfo(giftId: string): Promise<GiftDTO>;
        addGiftToGuest(giftId: string, guestId: string): Promise<GiftDTO>;
        removeGiftFromGuest(giftId: string, guestId: string): Promise<void>;
        telegramMessage(type:string, guest: string): Promise<void>;
    }
