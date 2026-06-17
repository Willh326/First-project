import { Router } from 'express';
import { z } from 'zod';
import { generateTasteProfile } from '../services/anthropic.js';
import { selectProducts } from '../services/catalog.js';

export const profileRouter = Router();

const ProfileRequestSchema = z.object({
  answers: z.record(z.string(), z.array(z.string())),
});

profileRouter.post('/', async (req, res) => {
  const parsed = ProfileRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request body', details: parsed.error.flatten() });
    return;
  }

  try {
    const { answers } = parsed.data;
    const profile = await generateTasteProfile(answers);
    const calibrationDeck = selectProducts({
      searchTerms: profile.searchTerms,
      answers,
      count: 18,
    });

    res.json({
      summary: profile.summary,
      searchTerms: profile.searchTerms,
      calibrationDeck,
    });
  } catch (error) {
    console.error('Failed to generate taste profile', error);
    res.status(502).json({ error: 'Failed to generate taste profile' });
  }
});
