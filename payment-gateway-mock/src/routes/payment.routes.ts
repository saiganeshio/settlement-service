import { Router } from 'express';

import { capturePayment } from '../controllers/payment.controller';

const router = Router();

router.post('/capture', capturePayment);

export default router;