import express from 'express';
import dotenv from 'dotenv';

import { AppDataSource } from './config/data-source';
import settlementRoutes from './routes/settlement.routes';
import { traceMiddleware } from './middleware/trace.middleware';
import settlementQueryRoutes from './routes/settlement-query.routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(traceMiddleware);
app.use('/events', settlementRoutes);

app.use('/settlements', settlementQueryRoutes);

app.get('/health', (_req, res) => {
  return res.status(200).json({
    status: 'ok',
  });
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
  });
