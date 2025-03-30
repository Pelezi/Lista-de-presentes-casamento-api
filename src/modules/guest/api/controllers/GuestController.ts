import { Request, Response } from 'express';
import { BaseController } from '../../../base/BaseController';

export interface GuestController extends BaseController {
    getByGift(req: Request, res: Response): Promise<Response>;
    getAllInfo(req: Request, res: Response): Promise<Response>;
    guestAccess(req: Request, res: Response): Promise<Response>;
}
