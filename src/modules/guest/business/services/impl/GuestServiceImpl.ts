import { injectable, inject } from 'tsyringe';

import { BaseServiceImpl } from '../../../../base/BaseServiceImpl';

import {
    GuestDTO,
    CreateGuestDTO,
    UpdateGuestDTO
} from '../../../dtos/GuestDTO';

import { GuestRepository } from '../../../database/repositories/GuestRepository';
import { GuestService } from '../GuestService';


@injectable()
export class GuestServiceImpl
    extends BaseServiceImpl<GuestDTO, CreateGuestDTO, UpdateGuestDTO> 
    implements GuestService{
        
        constructor(
            @inject('GuestRepository')
            private guestRepository: GuestRepository
            ) {
                super(guestRepository);
            }

    async getByGift(giftId: string): Promise<GuestDTO[]> {
        return this.guestRepository.getByGift(giftId);
    }


    async getAllInfo(guestId: string): Promise<GuestDTO> {
        return this.guestRepository.getAllInfo(guestId);
    }

    async guestAccess(phone: string, name: string): Promise<GuestDTO> {
        return this.guestRepository.guestAccess(phone, name);
    }
}
