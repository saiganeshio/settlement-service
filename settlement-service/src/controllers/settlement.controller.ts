import { Request, Response } from 'express';

import { BookingCompletedDto } from '../dtos/booking-completed.dto';

import { SettlementService } from '../services/settlement.service';

export const handleBookingCompleted = async (req: Request, res: Response) => {
  try {
    const event: BookingCompletedDto = req.body;

    const traceId = req.headers['x-trace-id'] as string;

    const settlement = await SettlementService.processSettlement(
      event,
      traceId,
    );

    return res.status(200).json(settlement);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
