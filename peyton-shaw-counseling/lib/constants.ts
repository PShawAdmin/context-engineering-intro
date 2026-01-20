import { Service, Testimonial, FAQItem } from './types';

export const SITE_CONFIG = {
  name: 'Peyton Shaw Counseling',
  legalName: 'Peyton Shaw Counseling, PLLC',
  tagline: 'Telehealth therapy focused on teens and adolescents across Texas',
  phone: '(817) 383-8115',
  email: 'peyton@peytonshawcounseling.com',
  address: 'Texas (Telehealth only)',
  serviceArea: 'Texas (Telehealth only)',
  calendlyUrl: process.env.CALENDLY_SCHEDULING_URL || '',
  socialLinks: {
    linkedin: '',
    facebook: '',
    instagram: '',
  }
};

// Comprehensive business information for SEO and schema markup
export const businessInfo = {
  name: 'Peyton Shaw Counseling, PLLC',
  phone: '(817) 383-8115',
  email: 'peyton@peytonshawcounseling.com',
  isTelehealthOnly: true,
  serviceAreaLabel: 'Texas (Telehealth only)',
  primaryServiceArea: 'Texas',
  address: {
    streetAddress: '',
    addressLocality: 'Texas',
    addressRegion: 'TX',
    postalCode: '',
    addressCountry: 'US'
  },
  geo: {
    latitude: 31.0, // Texas centroid (approx.)
    longitude: -99.0
  },
  url: 'https://www.peytonshawcounseling.com',
  logo: '/images/peyton-shaw-professional.jpg', // Using existing headshot as logo
  priceRange: '$$',
  openingHours: [
    'Mo-Fr 09:00-18:00',
    'Sa 09:00-14:00'
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00'
    }
  ],
  areaServed: ['Southlake', 'Grapevine', 'Colleyville', 'Keller', 'Westlake', 'Trophy Club'],
  sameAs: [
    'https://www.psychologytoday.com/us/therapists/peyton-shaw-grapevine-tx/1184171',
    'https://www.facebook.com/peytonshawcounseling', // TODO: Update with actual Facebook URL if available
    'https://www.linkedin.com/in/peytonwoods'
  ],
  // Additional business details for schema
  currenciesAccepted: 'USD',
  paymentAccepted: ['Cash', 'Check', 'Credit Card', 'HSA', 'FSA'],
  // Aggregate rating based on testimonials
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '3' // Based on current testimonials
  }
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Individual Therapy',
    slug: 'individual-therapy',
    description: 'Personalized one-on-one therapy to help you navigate anxiety, depression, stress, and life transitions.',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'Individual therapy offers a confidential, collaborative space to clarify what you want, understand patterns that keep you stuck, and build practical tools you can use between sessions.',
    benefits: [
      'Personalized treatment plan',
      'Practical, evidence-based tools',
      'Collaborative goal setting',
      'Secure telehealth sessions across Texas'
    ]
  },
  {
    id: '2',
    title: 'Anxiety & Stress',
    slug: 'anxiety-stress-management',
    description: 'Evidence-based strategies to reduce anxiety, calm your nervous system, and build steadier coping skills.',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'We identify triggers, practice grounding and cognitive tools, and create a plan that helps you feel more in control when anxiety shows up.',
    benefits: [
      'Target the root of anxiety cycles',
      'Build a personalized coping plan',
      'Learn grounding and relaxation skills',
      'Strengthen long-term resilience'
    ]
  },
  {
    id: '3',
    title: 'Depression Treatment',
    slug: 'depression-treatment',
    description: 'Compassionate, structured support to improve mood, restore energy, and rebuild daily routines.',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'We work together to reduce the weight of depression with practical steps, healthy routines, and tools that support lasting progress.',
    benefits: [
      'Structured, evidence-based approach',
      'Mood and energy support strategies',
      'Sustainable routines and habits',
      'Tools for long-term resilience'
    ]
  },
  {
    id: '4',
    title: 'Life Transitions',
    slug: 'life-transitions',
    description: 'Navigate change with clarity and support, whether it\'s career, relationships, relocation, or new roles.',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'Therapy helps you make sense of change, reduce overwhelm, and move forward with confidence and intention.',
    benefits: [
      'Support for uncertainty and stress',
      'Practical strategies for adjustment',
      'Values-based decision making',
      'Confidence in next steps'
    ]
  },
  {
    id: '5',
    title: 'Relationship Issues',
    slug: 'relationship-issues',
    description: 'Strengthen communication, repair trust, and build healthier boundaries in the relationships that matter most.',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'We focus on patterns, communication, and boundaries so you can build relationships that feel safer and more connected.',
    benefits: [
      'Clearer, calmer communication',
      'Healthy boundaries and expectations',
      'Tools for conflict resolution',
      'Stronger emotional connection'
    ]
  },
  {
    id: '6',
    title: 'Personal Growth',
    slug: 'self-esteem-personal-growth',
    description: 'Build confidence, self-compassion, and clarity so you can live with purpose and direction.',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'We help you identify unhelpful beliefs, strengthen self-worth, and build habits that support lasting growth.',
    benefits: [
      'Healthier self-talk and boundaries',
      'Confidence in decision-making',
      'Values-aligned growth plan',
      'Stronger self-acceptance'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah',
    content: 'Working with Peyton has been life-changing. I\'ve gained tools to manage my anxiety and feel more confident in my daily life.',
    rating: 5,
    date: '2024-10'
  },
  {
    id: '2',
    name: 'Michael',
    content: 'The safe, non-judgmental space created in our sessions allowed me to work through difficult issues I\'d been avoiding for years.',
    rating: 5,
    date: '2024-09'
  },
  {
    id: '3',
    name: 'Jennifer',
    content: 'I appreciate the practical strategies and genuine care. I\'ve seen real improvements in managing stress and my relationships.',
    rating: 5,
    date: '2024-08'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'How long are therapy sessions?',
    answer: 'Standard sessions are 50 minutes. This provides time to go deeper while keeping sessions focused and productive.',
    category: 'Sessions'
  },
  {
    id: '2',
    question: 'How often should I attend therapy?',
    answer: 'Most clients start weekly to build momentum. We can adjust the cadence as you make progress and your needs shift.',
    category: 'Sessions'
  },
  {
    id: '3',
    question: 'Do you accept insurance?',
    answer: 'I am an out-of-network provider. I can provide a superbill for possible reimbursement. Please check your plan for out-of-network mental health benefits.',
    category: 'Payment'
  },
  {
    id: '4',
    question: 'What is your cancellation policy?',
    answer: 'I require 24-hour notice for cancellations or rescheduling. Late cancellations or no-shows may be charged the full session fee.',
    category: 'Policies'
  },
  {
    id: '5',
    question: 'Do you offer telehealth sessions?',
    answer: 'Yes. I am telehealth-only at this time and meet with clients through secure video sessions across Texas.',
    category: 'Sessions'
  },
  {
    id: '6',
    question: 'Is everything I share confidential?',
    answer: 'Yes. Confidentiality is central to therapy, with limited legal exceptions (such as immediate danger to yourself or others). I\'ll review those limits in the first session.',
    category: 'Privacy'
  },
  {
    id: '7',
    question: 'How do I know if therapy is right for me?',
    answer: 'If you or your teen feels stuck, overwhelmed, or wants support navigating emotions, relationships, or life changes, therapy can help. The first session is a good way to see if we are a fit.',
    category: 'Getting Started'
  },
  {
    id: '8',
    question: 'What should I expect in the first session?',
    answer: 'We will talk about what brings you in, what you want to change, and how therapy can help. You will have space to ask questions and set goals together.',
    category: 'Getting Started'
  }
];
