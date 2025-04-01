import { Request, Response } from 'express';
import { BaseController } from '../../../base/BaseController';

export interface GiftController extends BaseController {
    getAllInfo(req: Request, res: Response): Promise<Response>;
    telegramMessage(req: Request, res: Response): Promise<Response>;
}
