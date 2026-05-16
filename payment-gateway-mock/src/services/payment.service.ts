import processedPayments from "../store/payment.store";

export class PaymentService {

    static async capturePayment(
        idempotencyKey: string
    ) {

        const existingTransaction =
            processedPayments.get(idempotencyKey);

        if (existingTransaction) {

            return {
                statusCode: 200,
                body: {
                    success: true,
                    transactionId: existingTransaction,
                },
            };
        }

        const randomFailure =
            Math.random() < 0.15;

        if (randomFailure) {

            return {
                statusCode: 500,
                body: {
                    success: false,
                    message: 'Mock payment gateway failure',
                },
            };
        }

        const transactionId =
            crypto.randomUUID();

        processedPayments.set(
            idempotencyKey,
            transactionId
        );

        return {
            statusCode: 200,
            body: {
                success: true,
                transactionId,
            },
        };
    }
}