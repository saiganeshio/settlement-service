import { PaymentService } from "../services/payment.service";
import { Request, Response } from 'express';
import { Logger } from "../utils/logger";

export const capturePayment = async (
    req: Request,
    res: Response
) => {

    const { idempotencyKey } = req.body;

    Logger.info(
        'Received payment capture request',
        {
            traceId: req.headers['x-trace-id'],
            idempotencyKey: idempotencyKey,
        }
    );

    if (!req.body || !req.body.idempotencyKey) {
        return res.status(400).json({ error: 'Missing idempotencyKey in request body' });
    }

    const result =
        await PaymentService.capturePayment(
            req.body.idempotencyKey
        );

    return res.status(Number(result.statusCode))
        .json(result.body);
};