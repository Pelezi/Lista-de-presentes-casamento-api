import { Router } from 'express';
import { container } from 'tsyringe';

import { GuestController } from '../controllers/GuestController'

import baseRoutes from '../../../base/base.routes';

const guestRouter = Router();

const guestController: GuestController = container.resolve('GuestController');


guestRouter.get('/info/:guestId', (req, res) => guestController.getAllInfo(req, res));
guestRouter.get('/gift/:giftId', (req, res) => guestController.getByGift(req, res));
guestRouter.post('/phone/:phone/name/:name', (req, res) => guestController.guestAccess(req, res));
guestRouter.use('/', baseRoutes(guestController));

export default guestRouter;
