import { Router } from 'express';
import { z } from 'zod';
import { selectProducts } from '../services/catalog.js';

export const swipeSessionRouter = Router();

const SwipeSessionRequestSchema = z.object({
  searchTerms: z.array(z.string()),
  answers: z.record(z.string(), z.array(z.string())),
  excludeIds: z.array(z.string()).optional().default([]),
  count: z.number().int().min(1).max(50).optional().default(12),
});

swipeSessionRouter.post('/', (req, res) => {
  const parsed = SwipeSessionRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request body', details: parsed.error.flatten() });
    return;
  }

  try {
    const { searchTerms, answers, excludeIds, count } = parsed.data;
    const deck = selectProducts({ searchTerms, answers, count, excludeIds });
    res.json({ deck });
  } catch (error) {
    console.error('Failed to build swipe session', error);
    res.status(502).json({ error: 'Failed to build swipe session' });
  }
});
