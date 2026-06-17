import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod';
import { Product, QuizAnswers, TasteProfile } from '../types.js';
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

const FeedReasonsSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().describe('Must exactly match one of the candidate product ids given.'),
      reason: z
        .string()
        .describe('One short, specific sentence on why this product fits the shopper, referencing their taste profile.'),
    }),
  ),
});

function describeProduct(product: Product): string {
  return `${product.id}: "${product.title}" - ${product.category}/${product.subcategory}, $${product.price} (${product.priceTier}), ${product.aesthetic} aesthetic, ${product.colorTag}, tags: ${product.tags.join(', ')}`;
}

export async function generateFeedReasons(
  profileSummary: string,
  products: Product[],
): Promise<Record<string, string>> {
  if (products.length === 0) return {};

  const response = await client.messages.parse({
    model: 'claude-opus-4-8',
    max_tokens: 4000,
    thinking: { type: 'adaptive' },
    output_config: {
      effort: 'low',
      format: zodOutputFormat(FeedReasonsSchema),
    },
    system:
      'You are a personal shopping stylist writing short "why we picked this" captions for a curated feed. ' +
      'For every candidate product listed, write exactly one item with its productId and a single friendly ' +
      "sentence tying the product back to the shopper's taste profile.",
    messages: [
      {
        role: 'user',
        content:
          `Shopper's taste profile: ${profileSummary}\n\nCandidate products:\n` +
          products.map(describeProduct).join('\n'),
      },
    ],
  });

  if (!response.parsed_output) {
    throw new Error('Claude did not return parseable feed reasons.');
  }

  const reasons: Record<string, string> = {};
  for (const item of response.parsed_output.items) {
    reasons[item.productId] = item.reason;
  }
  return reasons;
}
