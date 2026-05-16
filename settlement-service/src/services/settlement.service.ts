import { AppDataSource } from '../config/data-source';

import { Settlement } from '../entities/Settlement';

import { BookingCompletedDto } from '../dtos/booking-completed.dto';

import { CalculationService } from './calculation.service';

import { PaymentGatewayService } from './payment-gateway.service';
import { SettlementStatus } from '../enums/settlement-status.enum';
import { Logger } from '../utils/logger';

export class SettlementService {
  static async processSettlement(event: BookingCompletedDto, traceId: string) {
    Logger.info('Processing settlement', {
      traceId,
      bookingId: event.bookingId,
    });

    const settlementRepository = AppDataSource.getRepository(Settlement);

    const existingSettlement = await settlementRepository.findOne({
      where: {
        bookingId: event.bookingId,
      },
    });

    if (existingSettlement) {
      return existingSettlement;
    }

    const finalAmountCents = CalculationService.calculateFinalAmount(event);

    let paymentResponse;

    try {
      paymentResponse = await PaymentGatewayService.capturePayment(
        event.preAuthId,
        finalAmountCents,
        event.bookingId,
      );
    } catch (error) {
      Logger.error('Payment capture failed', {
        traceId,
        bookingId: event.bookingId,
        error,
      });

      paymentResponse = {
        success: false,
      };
    }

    const settlement = settlementRepository.create({
      bookingId: event.bookingId,
      userId: event.userId,
      finalAmountCents,
      status: paymentResponse.success
        ? SettlementStatus.SUCCESS
        : SettlementStatus.FAILED,
      traceId,
    });

    return settlementRepository.save(settlement);
  }
}
