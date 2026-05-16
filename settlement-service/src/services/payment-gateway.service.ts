import axios from 'axios';
import { Logger } from '../utils/logger';

export class PaymentGatewayService {
  static async capturePayment(
    preAuthId: string,
    amountCents: number,
    idempotencyKey: string,
  ) {
    Logger.info('attempting to capture the payment', {
      preAuthId,
      amountCents,
      idempotencyKey,
    });

    const maxRetries = 3;

    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await axios.post(
          `${process.env.PAYMENT_SERVICE_URL}/payments/capture`,
          {
            preAuthId,
            amountCents,
            idempotencyKey,
          },
        );

        return response.data;
      } catch (error) {
        attempt++;

        Logger.error('Payment capture attempt failed', {
          preAuthId,
          amountCents,
          idempotencyKey,
          attempt,
          error: error instanceof Error ? error.message : String(error),
        });

        if (attempt >= maxRetries) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
}
