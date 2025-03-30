import { Request, Response } from 'express';
import { BaseController } from '../../../base/BaseController';

export interface GiftController extends BaseController {
    getByGuest(req: Request, res: Response): Promise<Response>;
    getAllInfo(req: Request, res: Response): Promise<Response>;
    addGiftToGuest(req: Request, res: Response): Promise<Response>;
    removeGiftFromGuest(req: Request, res: Response): Promise<Response>;
    telegramMessage(req: Request, res: Response): Promise<Response>;
}
