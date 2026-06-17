import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { profileRouter } from './routes/profile.js';
import { feedRouter } from './routes/feed.js';
import { swipeSessionRouter } from './routes/swipeSession.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/profile', profileRouter);
app.use('/api/feed', feedRouter);
app.use('/api/swipe-session', swipeSessionRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
