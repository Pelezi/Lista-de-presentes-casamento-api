import { Router } from 'express';
import { container } from 'tsyringe';

import { GiftController } from '../controllers/GiftController'

import baseRoutes from '../../../base/base.routes';


import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const giftRouter = Router();

const giftController: GiftController = container.resolve('GiftController');


giftRouter.post('/', upload.single('photo'), (req, res) => giftController.createItem(req, res));
giftRouter.get('/info/:giftId', (req, res) => giftController.getAllInfo(req, res));
giftRouter.post('/telegram', (req, res) => giftController.telegramMessage(req, res));
giftRouter.use('/', baseRoutes(giftController));

export default giftRouter;
