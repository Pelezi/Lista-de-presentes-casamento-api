import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';

import { BaseControllerImpl } from '../../../../base/BaseControllerImpl';
import { GuestService } from '../../../business/services/GuestService';

import {
    CreateGuestDTO,
    UpdateGuestDTO,
    GuestDTO
} from '../../../dtos/GuestDTO';


@injectable()
export class GuestControllerImpl
    extends BaseControllerImpl<GuestDTO, CreateGuestDTO, UpdateGuestDTO> {

    constructor(
        @inject('GuestService')
        private guestService: GuestService
    ) {
        super(guestService);
    }

    public async getByGift(req: Request, res: Response): Promise<Response> {
        const { giftId } = req.params;
        const guests = await this.guestService.getByGift(giftId);
        return res.json(guests);
    }

    public async getAllInfo(req: Request, res: Response): Promise<Response> {
        const { guestId } = req.params;
        const guest = await this.guestService.getAllInfo(guestId);
        return res.json(guest);
    }

    public async guestAccess(req: Request, res: Response): Promise<Response> {
        const { phone, name } = req.params;
        const guest = await this.guestService.guestAccess(phone, name);
        return res.json(guest);
    }

}
