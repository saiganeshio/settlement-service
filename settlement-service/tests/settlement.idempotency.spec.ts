import { AppDataSource } from '../src/config/data-source';

import { Settlement } from '../src/entities/Settlement';

import { SettlementService } from '../src/services/settlement.service';

describe('Settlement Idempotency', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should create only one settlement for duplicate booking events', async () => {
    const event = {
      event: 'BookingCompleted',

      bookingId: 'bk_idempotent_1',

      userId: 'user_1',

      scheduledEnd: '2026-04-10T18:00:00Z',

      actualEnd: '2026-04-10T19:00:00Z',

      includedUnits: 200,

      actualUnits: 220,

      baseFareCents: 8500,

      preAuthId: 'auth_1',

      preAuthAmountCents: 50000,
    };

    await SettlementService.processSettlement(event, 'trace-1');

    await SettlementService.processSettlement(event, 'trace-2');

    await SettlementService.processSettlement(event, 'trace-3');

    const settlementRepository = AppDataSource.getRepository(Settlement);

    const settlements = await settlementRepository.find({
      where: {
        bookingId: event.bookingId,
      },
    });

    expect(settlements.length).toBe(1);
  });
});
