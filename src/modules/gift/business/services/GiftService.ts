import { BaseService } from '../../../base/BaseService';

import { 
    GiftDTO,  
    CreateGiftDTO, 
    UpdateGiftDTO 
} from '../../dtos/GiftDTO';

export interface GiftService 
    extends BaseService<GiftDTO, CreateGiftDTO, UpdateGiftDTO> {
        createItem(createGiftDTO: CreateGiftDTO, photo?: Express.Multer.File, guestId?: string): Promise<GiftDTO>;
        updateItem(id: number, updateGiftDTO: UpdateGiftDTO, photo?: Express.Multer.File, guestId?: string): Promise<GiftDTO>;
        getAllInfo(giftId: string): Promise<GiftDTO>;
        telegramMessage(type:string, guest: string, gift?: string, message?: string): Promise<void>;
    }
