import { Router } from 'express';

import giftRouter from '../../../modules/gift/api/routes/gift.routes';
import guestRouter from '../../../modules/guest/api/routes/guest.routes';

const router = Router();

router.use('/gifts', giftRouter);
router.use('/guests', guestRouter);

export default router;
