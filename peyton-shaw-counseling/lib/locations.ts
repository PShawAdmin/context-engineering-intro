import { FAQItem } from './types';

export type LocationDetail = {
  slug: string;
  name: string;
  description: string;
  intro: string;
  highlights: string[];
  neighborhoods: string[];
  zipCodes: string[];
  serviceFocus: string[];
  faqs: FAQItem[];
};

export const LOCATIONS: LocationDetail[] = [
  {
    slug: 'southlake',
    name: 'Southlake',
    description: 'Telehealth therapy for teens and adults in Southlake, available across Texas.',
    intro: 'Telehealth-only care for teens and adults in Southlake and across Texas, with support for anxiety, depression, life transitions, and relationship stress.',
    highlights: [
      'Telehealth-only sessions across Texas',
      'Flexible scheduling for school, work, and family routines',
      'Teen and adult-focused care'
    ],
    neighborhoods: ['Town Square', 'Timarron', 'Carillon', 'Westwyck Hills'],
    zipCodes: ['76092'],
    serviceFocus: ['anxiety-stress-management', 'life-transitions', 'relationship-issues'],
    faqs: [
      {
        id: 'southlake-1',
        question: 'Do you offer telehealth therapy in Southlake?',
        answer: 'Yes. We provide telehealth-only sessions for clients across Texas.'
      },
      {
        id: 'southlake-2',
        question: 'Can I meet by telehealth if I live in Southlake?',
        answer: 'Absolutely. Secure telehealth sessions are available across Texas.'
      },
      {
        id: 'southlake-3',
        question: 'Which parts of Southlake do you serve?',
        answer: 'We work with clients across Southlake via telehealth, including Town Square, Timarron, Carillon, Westwyck Hills, and nearby neighborhoods.'
      }
    ]
  },
  {
    slug: 'grapevine',
    name: 'Grapevine',
    description: 'Telehealth therapy for teens and adults in Grapevine, from historic downtown to Lake Grapevine and the DFW Airport area.',
    intro: 'Grapevine clients meet via secure telehealth. We support teens and adults with anxiety, depression, and major life transitions.',
    highlights: [
      'Telehealth-only sessions across Texas',
      'Flexible scheduling to fit school, work, and family life',
      'Teen and adult support'
    ],
    neighborhoods: ['Downtown Historic District', 'Silver Lake', 'Grapevine Mills area', 'Dove Loop'],
    zipCodes: ['76051'],
    serviceFocus: ['individual-therapy', 'anxiety-stress-management', 'depression-treatment'],
    faqs: [
      {
        id: 'grapevine-1',
        question: 'Do you offer telehealth therapy for Grapevine clients?',
        answer: 'Yes. We provide telehealth-only sessions for clients across Texas.'
      },
      {
        id: 'grapevine-2',
        question: 'Is telehealth available for Grapevine residents?',
        answer: 'Yes. We offer secure telehealth sessions throughout Texas.'
      },
      {
        id: 'grapevine-3',
        question: 'What neighborhoods in Grapevine do you serve?',
        answer: 'We serve clients across Grapevine via telehealth, including Downtown, Silver Lake, the Grapevine Mills area, and Dove Loop.'
      }
    ]
  },
  {
    slug: 'colleyville',
    name: 'Colleyville',
    description: 'Telehealth therapy for teens and adults in Colleyville, delivered securely across Texas.',
    intro: 'Colleyville clients often seek support for anxiety, relationship stress, and personal growth. We provide telehealth-only sessions for teens and adults across Texas.',
    highlights: [
      'Telehealth-only sessions across Texas',
      'Flexible scheduling options',
      'Teen and adult-focused care'
    ],
    neighborhoods: ['Montclair Parc', 'The Estates of Colleyville', 'Wellington', 'Bransford'],
    zipCodes: ['76034'],
    serviceFocus: ['individual-therapy', 'relationship-issues', 'self-esteem-personal-growth'],
    faqs: [
      {
        id: 'colleyville-1',
        question: 'Do you offer telehealth therapy for Colleyville?',
        answer: 'Yes. We provide telehealth-only sessions for clients across Texas.'
      },
      {
        id: 'colleyville-2',
        question: 'Do you offer counseling for couples or relationship issues?',
        answer: 'Yes. We help clients improve communication, set healthy boundaries, and work through relationship challenges.'
      },
      {
        id: 'colleyville-3',
        question: 'Is telehealth available for Colleyville?',
        answer: 'Yes. Telehealth sessions are available throughout Texas.'
      }
    ]
  },
  {
    slug: 'keller',
    name: 'Keller',
    description: 'Telehealth therapy for teens and adults in Keller, delivered securely across Texas.',
    intro: 'Keller clients meet via telehealth-only sessions across Texas. We focus on anxiety, depression, and life transitions for teens and adults.',
    highlights: [
      'Telehealth-only sessions across Texas',
      'Evening availability by request',
      'Teen and adult support'
    ],
    neighborhoods: ['Hidden Lakes', 'The Highlands', 'Keller Town Center', 'Bear Creek'],
    zipCodes: ['76248'],
    serviceFocus: ['anxiety-stress-management', 'depression-treatment', 'life-transitions'],
    faqs: [
      {
        id: 'keller-1',
        question: 'Do you offer telehealth therapy for Keller residents?',
        answer: 'Yes. We provide telehealth-only sessions for clients across Texas.'
      },
      {
        id: 'keller-2',
        question: 'What issues do Keller clients commonly seek help for?',
        answer: 'Common concerns include anxiety, depression, stress management, and navigating life changes.'
      },
      {
        id: 'keller-3',
        question: 'Do you offer therapy for teens and adults in Keller?',
        answer: 'Yes. We work with teens and adults and tailor sessions to each client.'
      }
    ]
  },
  {
    slug: 'westlake',
    name: 'Westlake',
    description: 'Telehealth therapy for teens and adults in Westlake near Westlake Academy and the Vaquero area.',
    intro: 'Westlake clients meet through secure telehealth. We provide evidence-based care for anxiety, life transitions, and self-esteem for teens and adults.',
    highlights: [
      'Telehealth-only sessions across Texas',
      'Flexible scheduling for school, work, and family routines',
      'Teen and adult-focused care'
    ],
    neighborhoods: ['Vaquero', 'Glenwyck Farms', 'Stagecoach Hills'],
    zipCodes: ['76262'],
    serviceFocus: ['individual-therapy', 'life-transitions', 'self-esteem-personal-growth'],
    faqs: [
      {
        id: 'westlake-1',
        question: 'Is telehealth therapy available for Westlake residents?',
        answer: 'Yes. We provide telehealth-only sessions for clients across Texas.'
      },
      {
        id: 'westlake-2',
        question: 'Do you provide telehealth for Westlake?',
        answer: 'Yes. Secure telehealth is available across Texas.'
      },
      {
        id: 'westlake-3',
        question: 'What services are most popular with Westlake clients?',
        answer: 'Clients often seek support with anxiety, life transitions, and confidence building.'
      }
    ]
  },
  {
    slug: 'trophy-club',
    name: 'Trophy Club',
    description: 'Telehealth therapy for teens and adults in Trophy Club near the golf and lake communities.',
    intro: 'Trophy Club clients meet via secure telehealth. We support teens and adults with anxiety, relationship concerns, and personal growth goals.',
    highlights: [
      'Telehealth-only sessions across Texas',
      'Flexible scheduling options',
      'Support for teens and adults'
    ],
    neighborhoods: ['The Highlands', "Hogan's Glen", 'Trophy Club Country Club'],
    zipCodes: ['76262'],
    serviceFocus: ['anxiety-stress-management', 'relationship-issues', 'self-esteem-personal-growth'],
    faqs: [
      {
        id: 'trophy-club-1',
        question: 'Do you offer telehealth therapy for Trophy Club clients?',
        answer: 'Yes. We provide telehealth-only sessions for clients across Texas.'
      },
      {
        id: 'trophy-club-2',
        question: 'Can I start therapy via telehealth from Trophy Club?',
        answer: 'Yes. Telehealth sessions are available across Texas.'
      },
      {
        id: 'trophy-club-3',
        question: 'Do you offer help with relationship stress?',
        answer: 'Yes. We work with clients on communication, boundaries, and relationship challenges.'
      }
    ]
  }
];

export function getLocationBySlug(slug: string): LocationDetail | undefined {
  return LOCATIONS.find((location) => location.slug === slug);
}
