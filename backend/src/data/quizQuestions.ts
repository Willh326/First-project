export type QuizQuestionType = 'single' | 'multi';

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizQuestionType;
  options: QuizOption[];
}

// Kept in sync with mobile/src/data/quizQuestions.ts — the backend needs the
// question/option labels to turn answer ids into readable text for Claude.
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'styleAesthetic',
    question: 'Which look feels most like you?',
    type: 'single',
    options: [
      { id: 'minimalist', label: 'Minimalist & clean' },
      { id: 'maximalist', label: 'Cozy & maximalist' },
      { id: 'classic', label: 'Classic & timeless' },
      { id: 'streetwear', label: 'Bold & streetwear' },
      { id: 'eclectic', label: 'Eclectic & eccentric' },
    ],
  },
  {
    id: 'colorPalette',
    question: 'What colors do you gravitate toward?',
    type: 'single',
    options: [
      { id: 'neutral', label: 'Neutral & muted' },
      { id: 'bold', label: 'Bold & saturated' },
      { id: 'pastel', label: 'Soft pastels' },
      { id: 'monochrome', label: 'Black, white & monochrome' },
    ],
  },
  {
    id: 'everydayBudget',
    question: "What's your comfort zone for everyday purchases?",
    type: 'single',
    options: [
      { id: 'budget', label: 'Budget-friendly ($)' },
      { id: 'midRange', label: 'Mid-range ($$)' },
      { id: 'premium', label: 'Premium ($$$)' },
      { id: 'luxury', label: 'Luxury ($$$$)' },
    ],
  },
  {
    id: 'splurgeFrequency',
    question: 'How often do you splurge on something special?',
    type: 'single',
    options: [
      { id: 'rarely', label: 'Rarely - I stick to my budget' },
      { id: 'fewTimesYear', label: 'A few times a year' },
      { id: 'monthly', label: 'Monthly' },
      { id: 'whenever', label: 'Whenever something catches my eye' },
    ],
  },
  {
    id: 'categories',
    question: 'Which categories are you most interested in?',
    type: 'multi',
    options: [
      { id: 'home', label: 'Home & decor' },
      { id: 'fashion', label: 'Fashion & apparel' },
      { id: 'tech', label: 'Tech & gadgets' },
      { id: 'fitness', label: 'Fitness & outdoors' },
      { id: 'beauty', label: 'Beauty & wellness' },
    ],
  },
  {
    id: 'shoppingMotivation',
    question: 'What matters most when you buy something new?',
    type: 'single',
    options: [
      { id: 'functional', label: "It's functional and solves a problem" },
      { id: 'trendy', label: "It's on-trend right now" },
      { id: 'durable', label: "It's built to last" },
      { id: 'unique', label: "It's unique - nobody else has it" },
    ],
  },
  {
    id: 'brandPreference',
    question: 'Brands or boutiques?',
    type: 'single',
    options: [
      { id: 'wellKnown', label: 'Well-known brands I trust' },
      { id: 'indie', label: 'Indie & boutique finds' },
      { id: 'mix', label: 'A mix of both' },
      { id: 'noPreference', label: "I don't care about the brand" },
    ],
  },
  {
    id: 'sustainability',
    question: 'How much does sustainability or ethical sourcing factor in?',
    type: 'single',
    options: [
      { id: 'veryImportant', label: 'Very important' },
      { id: 'somewhatImportant', label: 'Somewhat important' },
      { id: 'notMajor', label: 'Not a major factor' },
    ],
  },
  {
    id: 'shoppingFrequency',
    question: 'How often do you shop for non-essentials?',
    type: 'single',
    options: [
      { id: 'weekly', label: 'Weekly' },
      { id: 'fewTimesMonth', label: 'A few times a month' },
      { id: 'monthlyFreq', label: 'Monthly' },
      { id: 'fewTimesYearFreq', label: 'A few times a year' },
    ],
  },
];
