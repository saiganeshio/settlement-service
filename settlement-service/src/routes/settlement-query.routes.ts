import { Router } from 'express';

import { getSettlement } from '../controllers/settlement-query.controller';

const router = Router();

router.get('/:bookingId', getSettlement);

export default router;
