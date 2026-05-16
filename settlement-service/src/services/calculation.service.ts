import { BookingCompletedDto } from '../dtos/booking-completed.dto';

export class CalculationService {
  static calculateFinalAmount(event: BookingCompletedDto): number {
    const overageUnits = Math.max(0, event.actualUnits - event.includedUnits);

    const overageCharge = overageUnits * 25;

    const scheduledEnd = new Date(event.scheduledEnd);

    const actualEnd = new Date(event.actualEnd);

    const lateMilliseconds = actualEnd.getTime() - scheduledEnd.getTime();

    const lateHours = Math.max(0, lateMilliseconds / (1000 * 60 * 60));

    const lateFee = lateHours * 1500;

    return Math.round(event.baseFareCents + overageCharge + lateFee);
  }
}
