import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod';
import { QuizAnswers, TasteProfile } from '../types.js';
import { quizQuestions } from '../data/quizQuestions.js';

const client = new Anthropic();

const TasteProfileSchema = z.object({
  summary: z.string().describe('A short, friendly 2-3 sentence taste profile written for the shopper.'),
  searchTerms: z
    .array(z.string())
    .min(5)
    .max(12)
    .describe('Specific product search terms/keywords matching this taste, e.g. "minimalist ceramic lamp".'),
});

function formatAnswers(answers: QuizAnswers): string {
  return quizQuestions
    .map((question) => {
      const selectedIds = answers[question.id] ?? [];
      const labels = question.options
        .filter((option) => selectedIds.includes(option.id))
        .map((option) => option.label);
      return `${question.question}\n${labels.length > 0 ? labels.join(', ') : '(no answer)'}`;
    })
    .join('\n\n');
}

export async function generateTasteProfile(answers: QuizAnswers): Promise<TasteProfile> {
  const response = await client.messages.parse({
    model: 'claude-opus-4-8',
    max_tokens: 4000,
    thinking: { type: 'adaptive' },
    output_config: {
      effort: 'low',
      format: zodOutputFormat(TasteProfileSchema),
    },
    system:
      'You are a personal shopping stylist. Given a customer\'s quiz answers, write a short taste profile ' +
      'and a list of specific product search terms that a product catalog could be matched against.',
    messages: [
      {
        role: 'user',
        content: `Here are the customer's quiz answers:\n\n${formatAnswers(answers)}`,
      },
    ],
  });

  if (!response.parsed_output) {
    throw new Error('Claude did not return a parseable taste profile.');
  }

  return response.parsed_output;
}
