import { Router } from 'express';
import { handleBookingCompleted } from '../controllers/settlement.controller';
import { BookingCompletedDto } from '../dtos/booking-completed.dto';
import { validateDto } from '../middleware/validate.middleware';

const router = Router();

router.post(
  '/booking-completed',
  validateDto(BookingCompletedDto),
  handleBookingCompleted,
);

export default router;
