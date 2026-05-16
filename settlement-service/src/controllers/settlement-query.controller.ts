import { Request, Response } from 'express';

import { AppDataSource } from '../config/data-source';

import { Settlement } from '../entities/Settlement';

export const getSettlement = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Settlement);
  const { bookingId } = req.params;

  const settlement = await repository.findOne({
    where: {
      bookingId: bookingId as string,
    },
  });

  if (!settlement) {
    return res.status(404).json({
      message: 'Settlement not found',
    });
  }

  return res.status(200).json(settlement);
};
