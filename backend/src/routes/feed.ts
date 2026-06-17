import { Router } from 'express';
import { z } from 'zod';
import { generateFeedReasons } from '../services/anthropic.js';
import { selectProducts } from '../services/catalog.js';

export const feedRouter = Router();

const FeedRequestSchema = z.object({
  summary: z.string(),
  searchTerms: z.array(z.string()),
  answers: z.record(z.string(), z.array(z.string())),
  excludeIds: z.array(z.string()).optional().default([]),
  count: z.number().int().min(1).max(50).optional().default(10),
});

feedRouter.post('/', async (req, res) => {
  const parsed = FeedRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request body', details: parsed.error.flatten() });
    return;
  }

  try {
    const { summary, searchTerms, answers, excludeIds, count } = parsed.data;
    const products = selectProducts({ searchTerms, answers, count, excludeIds });
    const reasons = await generateFeedReasons(summary, products);

    const items = products.map((product) => ({
      product,
      reason: reasons[product.id] ?? 'Picked to match your taste profile.',
    }));

    res.json({ items });
  } catch (error) {
    console.error('Failed to generate feed', error);
    res.status(502).json({ error: 'Failed to generate feed' });
  }
});
