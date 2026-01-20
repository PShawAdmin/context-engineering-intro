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
    description: 'Our Southlake office serves the community with convenient access from Highway 114 and FM 1709.',
    intro: 'Choose in-person sessions in Southlake or secure telehealth across Texas. Care is tailored for anxiety, depression, life transitions, and relationship stress.',
    highlights: [
      'Southlake office with flexible scheduling',
      'Easy access from Highway 114 and FM 1709',
      'Secure telehealth across Texas'
    ],
    neighborhoods: ['Town Square', 'Timarron', 'Carillon', 'Westwyck Hills'],
    zipCodes: ['76092', '76126'],
    serviceFocus: ['anxiety-stress-management', 'life-transitions', 'relationship-issues'],
    faqs: [
      {
        id: 'southlake-1',
        question: 'Do you offer in-person therapy in Southlake?',
        answer: 'Yes. We offer in-person sessions at our Southlake office by appointment.'
      },
      {
        id: 'southlake-2',
        question: 'Can I meet by telehealth if I live in Southlake?',
        answer: 'Absolutely. Secure telehealth sessions are available across Texas.'
      },
      {
        id: 'southlake-3',
        question: 'Which parts of Southlake do you serve?',
        answer: 'We work with clients across Southlake, including Town Square, Timarron, Carillon, Westwyck Hills, and nearby neighborhoods.'
      }
    ]
  },
  {
    slug: 'grapevine',
    name: 'Grapevine',
    description: 'Serving Grapevine residents from historic downtown to Lake Grapevine and the DFW Airport area.',
    intro: 'Grapevine clients can meet in person in Southlake or via secure telehealth. We support teens and adults with anxiety, depression, and major life transitions.',
    highlights: [
      'Convenient for SH-121 and DFW Airport',
      'Quiet, private office setting',
      'Telehealth available'
    ],
    neighborhoods: ['Downtown Historic District', 'Silver Lake', 'Grapevine Mills area', 'Dove Loop'],
    zipCodes: ['76051', '76099'],
    serviceFocus: ['individual-therapy', 'anxiety-stress-management', 'depression-treatment'],
    faqs: [
      {
        id: 'grapevine-1',
        question: 'Do you see clients from Grapevine in person?',
        answer: 'Yes. Many Grapevine clients meet in person at our Southlake office, just a short drive away.'
      },
      {
        id: 'grapevine-2',
        question: 'Is telehealth available for Grapevine residents?',
        answer: 'Yes. We offer secure telehealth sessions throughout Texas.'
      },
      {
        id: 'grapevine-3',
        question: 'What neighborhoods in Grapevine do you serve?',
        answer: 'We serve clients across Grapevine, including Downtown, Silver Lake, the Grapevine Mills area, and Dove Loop.'
      }
    ]
  },
  {
    slug: 'colleyville',
    name: 'Colleyville',
    description: 'Providing therapy for Colleyville families with convenient access from Colleyville Boulevard.',
    intro: 'Colleyville clients often seek support for anxiety, relationship stress, and personal growth. We offer in-person sessions in Southlake and telehealth across Texas.',
    highlights: [
      'Close to Colleyville Boulevard',
      'Flexible scheduling options',
      'Secure telehealth across Texas'
    ],
    neighborhoods: ['Montclair Parc', 'The Estates of Colleyville', 'Wellington', 'Bransford'],
    zipCodes: ['76034'],
    serviceFocus: ['individual-therapy', 'relationship-issues', 'self-esteem-personal-growth'],
    faqs: [
      {
        id: 'colleyville-1',
        question: 'How far is your office from Colleyville?',
        answer: 'Our Southlake office is a short drive from central Colleyville, making in-person sessions convenient.'
      },
      {
        id: 'colleyville-2',
        question: 'Do you offer counseling for couples or relationship issues?',
        answer: 'Yes. We help clients improve communication, set healthy boundaries, and work through relationship challenges.'
      },
      {
        id: 'colleyville-3',
        question: 'Can I meet by telehealth instead of in person?',
        answer: 'Yes. Telehealth sessions are available throughout Texas.'
      }
    ]
  },
  {
    slug: 'keller',
    name: 'Keller',
    description: 'Supporting Keller families with accessible therapy services near Highway 377.',
    intro: 'Keller clients can choose in-person sessions in Southlake or telehealth across Texas. We focus on anxiety, depression, and life transitions.',
    highlights: [
      'Accessible from Highway 377',
      'Evening availability by request',
      'Telehealth across Texas'
    ],
    neighborhoods: ['Hidden Lakes', 'The Highlands', 'Keller Town Center', 'Bear Creek'],
    zipCodes: ['76244', '76248'],
    serviceFocus: ['anxiety-stress-management', 'depression-treatment', 'life-transitions'],
    faqs: [
      {
        id: 'keller-1',
        question: 'Do you serve Keller residents in person?',
        answer: 'Yes. Keller clients can meet in person at our Southlake office or choose telehealth.'
      },
      {
        id: 'keller-2',
        question: 'What issues do Keller clients commonly seek help for?',
        answer: 'Common concerns include anxiety, depression, stress management, and navigating life changes.'
      },
      {
        id: 'keller-3',
        question: 'Do you offer teen therapy for Keller families?',
        answer: 'Yes. We work with teens and adults and tailor sessions to each client.'
      }
    ]
  },
  {
    slug: 'westlake',
    name: 'Westlake',
    description: 'Offering therapy services for Westlake residents near Westlake Academy and the Vaquero area.',
    intro: 'Westlake clients can meet in person in Southlake or through secure telehealth. We provide evidence-based care for anxiety, life transitions, and self-esteem.',
    highlights: [
      'Convenient for Westlake Academy',
      'Private and discreet office setting',
      'Secure telehealth available'
    ],
    neighborhoods: ['Vaquero', 'Glenwyck Farms', 'Stagecoach Hills'],
    zipCodes: ['76262', '76092'],
    serviceFocus: ['individual-therapy', 'life-transitions', 'self-esteem-personal-growth'],
    faqs: [
      {
        id: 'westlake-1',
        question: 'Is in-person therapy available for Westlake residents?',
        answer: 'Yes. Our Southlake office is nearby and offers in-person sessions by appointment.'
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
    description: 'Extending therapy services to Trophy Club residents near the golf and lake communities.',
    intro: 'Trophy Club clients can meet in person at our Southlake office or via secure telehealth. We support teens and adults with anxiety, relationship concerns, and personal growth goals.',
    highlights: [
      'Convenient access from Trophy Club Parkway',
      'In-person or telehealth options',
      'Support for teens and adults'
    ],
    neighborhoods: ['The Highlands', "Hogan's Glen", 'Trophy Club Country Club'],
    zipCodes: ['76262'],
    serviceFocus: ['anxiety-stress-management', 'relationship-issues', 'self-esteem-personal-growth'],
    faqs: [
      {
        id: 'trophy-club-1',
        question: 'Do you see Trophy Club clients in person?',
        answer: 'Yes. We offer in-person sessions in Southlake, which is a short drive from Trophy Club.'
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
