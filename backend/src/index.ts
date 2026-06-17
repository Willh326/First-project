import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { profileRouter } from './routes/profile.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/profile', profileRouter);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
