// src/index.ts
import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users';
import metricsRouter from './routes/metrics';
import prescRouter from './routes/prescriptions';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/prescriptions', prescRouter);

// global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

import './cron/emailReminderJob';
