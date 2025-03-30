import { 
    GuestDTO, 
    CreateGuestDTO, 
    UpdateGuestDTO 
} from '../../dtos/GuestDTO';

import { BaseRepository } from '../../../base/BaseRepository';

export interface GuestRepository 
    extends BaseRepository<GuestDTO, CreateGuestDTO, UpdateGuestDTO> {
        getByGift(giftId: string): Promise<GuestDTO[]>;
        getAllInfo(guestId: string): Promise<GuestDTO>;
        guestAccess(phone: string, name: string): Promise<GuestDTO>;
    }
