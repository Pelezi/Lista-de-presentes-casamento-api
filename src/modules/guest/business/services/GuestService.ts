import { BaseService } from '../../../base/BaseService';

import { 
    GuestDTO,  
    CreateGuestDTO, 
    UpdateGuestDTO 
} from '../../dtos/GuestDTO';

export interface GuestService 
    extends BaseService<GuestDTO, CreateGuestDTO, UpdateGuestDTO> {
        getByGift(giftId: string): Promise<GuestDTO[]>;
        getAllInfo(guestId: string): Promise<GuestDTO>;
        guestAccess(phone: string, name: string): Promise<GuestDTO>;
    }
