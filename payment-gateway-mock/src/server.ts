import express from 'express';
import dotenv from 'dotenv';

import { traceMiddleware } from './middleware/trace.middleware';
import paymentRoutes from './routes/payment.routes';
import { CapturePaymentDto } from './dtos/capture-payment.dto';
import { validateDto } from './middleware/validate.middleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(traceMiddleware);
app.use('/payments', paymentRoutes);

app.get('/health', (_req, res) => {
    return res.status(200).json({
        status: 'ok'
    });
});

const PORT = process.env.PORT || 4000;

app.use('/payments', validateDto(CapturePaymentDto),paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});