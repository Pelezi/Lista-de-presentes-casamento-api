import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';

import { BaseControllerImpl } from '../../../../base/BaseControllerImpl';
import { GiftService } from '../../../business/services/GiftService';

import {
    CreateGiftDTO,
    UpdateGiftDTO,
    GiftDTO
} from '../../../dtos/GiftDTO';

@injectable()
export class GiftControllerImpl
    extends BaseControllerImpl<GiftDTO, CreateGiftDTO, UpdateGiftDTO> {

    constructor(
        @inject('GiftService')
        private giftService: GiftService
    ) {
        super(giftService);
    }
    
    public async getAllInfo(req: Request, res: Response): Promise<Response> {
        const { giftId } = req.params;
        const gift = await this.giftService.getAllInfo(giftId);
        return res.json(gift);
    }

    public async createItem(req: Request, res: Response): Promise<Response> {
        const { guestId } = req.query;
        const createGiftDTO: CreateGiftDTO = { ...req.body, guestId: guestId as string };
        const photo = req.file;
        const gift = await this.giftService.createItem(createGiftDTO, photo);
        return res.json(gift);
    }

    public async updateItem(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { guestId } = req.query;
        const updateGiftDTO: UpdateGiftDTO = { ...req.body, guestId: guestId as string };
        const photo = req.file;
        const gift = await this.giftService.updateItem(Number(id), updateGiftDTO, photo);
        return res.json(gift);
    }

    public async deleteItem(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await this.giftService.deleteItem(Number(id));
        return res.status(204).send();
    }

    public async telegramMessage(req: Request, res: Response): Promise<Response> {
        const { type, guest } = req.query;
        await this.giftService.telegramMessage(type as string, guest as string);
        return res.status(204).send();
    }

}
