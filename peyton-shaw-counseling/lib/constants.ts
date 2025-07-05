import { Service, Testimonial, FAQItem } from './types';

export const SITE_CONFIG = {
  name: 'Peyton Shaw Counseling',
  tagline: 'Professional Therapy Services in Southlake',
  phone: '(XXX) XXX-XXXX',
  email: 'peyton@peytonshawcounseling.com',
  address: 'Southlake, TX',
  calendlyUrl: process.env.CALENDLY_SCHEDULING_URL || '',
  socialLinks: {
    linkedin: '',
    facebook: '',
    instagram: '',
  }
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Individual Therapy',
    slug: 'individual-therapy',
    description: 'One-on-one sessions tailored to your unique needs and goals',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'Individual therapy provides a safe, confidential space to explore your thoughts, feelings, and behaviors. Together, we\'ll work to identify patterns, develop coping strategies, and achieve your personal goals.',
    benefits: [
      'Personalized treatment approach',
      'Confidential and judgment-free environment',
      'Evidence-based therapeutic techniques',
      'Flexible scheduling options'
    ]
  },
  {
    id: '2',
    title: 'Anxiety & Stress Management',
    slug: 'anxiety-stress-management',
    description: 'Learn effective strategies to manage anxiety and reduce stress',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'Anxiety and stress can significantly impact your daily life. Our therapy sessions focus on understanding your triggers, developing coping mechanisms, and building resilience to handle life\'s challenges.',
    benefits: [
      'Identify and understand anxiety triggers',
      'Learn practical coping techniques',
      'Develop mindfulness and relaxation skills',
      'Build long-term stress resilience'
    ]
  },
  {
    id: '3',
    title: 'Depression Treatment',
    slug: 'depression-treatment',
    description: 'Evidence-based approaches to overcome depression and improve mood',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'Depression can feel overwhelming, but you don\'t have to face it alone. Using proven therapeutic approaches, we\'ll work together to address symptoms, rebuild hope, and create positive changes in your life.',
    benefits: [
      'Cognitive-behavioral therapy techniques',
      'Mood tracking and management',
      'Building healthy habits and routines',
      'Developing a support system'
    ]
  },
  {
    id: '4',
    title: 'Life Transitions & Adjustment',
    slug: 'life-transitions',
    description: 'Navigate major life changes with support and guidance',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'Life transitions—whether positive or challenging—can be difficult to navigate. Therapy provides support as you adjust to changes like career shifts, relationship changes, loss, or new life stages.',
    benefits: [
      'Process emotions related to change',
      'Develop adaptation strategies',
      'Find meaning in transitions',
      'Build confidence for the future'
    ]
  },
  {
    id: '5',
    title: 'Relationship Issues',
    slug: 'relationship-issues',
    description: 'Improve communication and resolve relationship challenges',
    duration: '50 minutes',
    price: '$150',
    detailedDescription: 'Healthy relationships are essential to our well-being. In therapy, we\'ll explore relationship patterns, improve communication skills, and work through conflicts to build stronger, more fulfilling connections.',
    benefits: [
      'Improve communication skills',
      'Understand relationship patterns',
      'Set healthy boundaries',
      'Resolve conflicts constructively'
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
    answer: 'Standard therapy sessions are 50 minutes long. This allows enough time to explore issues deeply while maintaining focus and energy throughout the session.',
    category: 'Sessions'
  },
  {
    id: '2',
    question: 'How often should I attend therapy?',
    answer: 'Most clients start with weekly sessions to establish momentum and build a therapeutic relationship. As you progress, we can adjust frequency based on your needs and goals.',
    category: 'Sessions'
  },
  {
    id: '3',
    question: 'Do you accept insurance?',
    answer: 'I am currently an out-of-network provider. I can provide you with a superbill that you can submit to your insurance for potential reimbursement. Please check with your insurance about out-of-network mental health benefits.',
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
    question: 'Do you offer virtual sessions?',
    answer: 'Yes, I offer both in-person and secure video sessions to accommodate your preferences and needs. Virtual sessions are conducted through a HIPAA-compliant platform.',
    category: 'Sessions'
  },
  {
    id: '6',
    question: 'Is everything I share confidential?',
    answer: 'Yes, confidentiality is fundamental to therapy. What you share stays between us, with very limited exceptions required by law (such as immediate danger to yourself or others). I\'ll explain these limits during our first session.',
    category: 'Privacy'
  },
  {
    id: '7',
    question: 'How do I know if therapy is right for me?',
    answer: 'If you\'re experiencing emotional distress, relationship difficulties, life transitions, or simply want to understand yourself better, therapy can be beneficial. The first session is a great opportunity to discuss your concerns and see if we\'re a good fit.',
    category: 'Getting Started'
  },
  {
    id: '8',
    question: 'What should I expect in the first session?',
    answer: 'The first session is about getting to know each other. We\'ll discuss what brings you to therapy, your goals, and any questions you have. It\'s a collaborative process to ensure therapy meets your needs.',
    category: 'Getting Started'
  }
];