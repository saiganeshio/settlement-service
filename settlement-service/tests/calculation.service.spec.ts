import { CalculationService } from '../src/services/calculation.service';

describe('CalculationService', () => {
  it('should calculate final amount correctly', () => {
    const result = CalculationService.calculateFinalAmount({
      event: 'BookingCompleted',

      bookingId: 'bk_1',

      userId: 'user_1',

      scheduledEnd: '2026-04-10T18:00:00Z',

      actualEnd: '2026-04-10T19:30:00Z',

      includedUnits: 200,

      actualUnits: 237,

      baseFareCents: 8500,

      preAuthId: 'auth_1',

      preAuthAmountCents: 50000,
    });

    expect(result).toBe(11675);
  });

  it('should not charge late fee when returned on time', () => {
    const result = CalculationService.calculateFinalAmount({
      event: 'BookingCompleted',

      bookingId: 'bk_2',

      userId: 'user_2',

      scheduledEnd: '2026-04-10T18:00:00Z',

      actualEnd: '2026-04-10T18:00:00Z',

      includedUnits: 200,

      actualUnits: 237,

      baseFareCents: 8500,

      preAuthId: 'auth_2',

      preAuthAmountCents: 50000,
    });

    expect(result).toBe(9425);
  });

  it('should not charge overage fee when within included units', () => {
    const result = CalculationService.calculateFinalAmount({
      event: 'BookingCompleted',

      bookingId: 'bk_3',

      userId: 'user_3',

      scheduledEnd: '2026-04-10T18:00:00Z',

      actualEnd: '2026-04-10T19:00:00Z',

      includedUnits: 200,

      actualUnits: 200,

      baseFareCents: 8500,

      preAuthId: 'auth_3',

      preAuthAmountCents: 50000,
    });

    expect(result).toBe(10000);
  });

  it('should return only base fare when there is no overage and no late fee', () => {
    const result = CalculationService.calculateFinalAmount({
      event: 'BookingCompleted',

      bookingId: 'bk_4',

      userId: 'user_4',

      scheduledEnd: '2026-04-10T18:00:00Z',

      actualEnd: '2026-04-10T18:00:00Z',

      includedUnits: 200,

      actualUnits: 200,

      baseFareCents: 8500,

      preAuthId: 'auth_4',

      preAuthAmountCents: 50000,
    });

    expect(result).toBe(8500);
  });
});
