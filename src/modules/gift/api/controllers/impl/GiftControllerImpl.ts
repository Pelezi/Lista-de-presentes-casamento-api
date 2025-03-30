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

    public async getByGuest(req: Request, res: Response): Promise<Response> {
        const { guestId } = req.params;
        const gifts = await this.giftService.getByGuest(guestId);
        return res.json(gifts);
    }

    public async getAllInfo(req: Request, res: Response): Promise<Response> {
        const { giftId } = req.params;
        const gift = await this.giftService.getAllInfo(giftId);
        return res.json(gift);
    }

    public async addGiftToGuest(req: Request, res: Response): Promise<Response> {
        const { giftId, guestId } = req.params;
        const gift = await this.giftService.addGiftToGuest(giftId, guestId);
        return res.json(gift);
    }

    public async removeGiftFromGuest(req: Request, res: Response): Promise<Response> {
        const { giftId, guestId } = req.params;
        await this.giftService.removeGiftFromGuest(giftId, guestId);
        return res.status(204).send();
    }

    public async createItem(req: Request, res: Response): Promise<Response> {
        const { guestId } = req.query;
        const createGiftDTO: CreateGiftDTO = { ...req.body, guestId: guestId as string };
        const gift = await this.giftService.createItem(createGiftDTO);
        return res.json(gift);
    }

    public async updateItemByUuid(req: Request, res: Response): Promise<Response> {
        const { uuid } = req.params;
        const { guestId } = req.query;
        const updateGiftDTO: UpdateGiftDTO = { ...req.body, guestId: guestId as string };
        const gift = await this.giftService.updateItemByUuid(uuid, updateGiftDTO);
        return res.json(gift);
    }

    public async deleteItemByUuid(req: Request, res: Response): Promise<Response> {
        const { uuid } = req.params;
        const { guestId } = req.query;
        await this.giftService.deleteItemByUuid(uuid, guestId as string);
        return res.status(204).send();
    }

    public async telegramMessage(req: Request, res: Response): Promise<Response> {
        const { type, guest } = req.query;
        await this.giftService.telegramMessage(type as string, guest as string);
        return res.status(204).send();
    }

}
