/**
 * SEO Keywords Management
 * Organized taxonomy of keywords for local therapy practice SEO
 */

export const targetKeywords = {
  // Primary keywords - highest priority
  primary: {
    location: ['Texas', 'Southlake', 'Grapevine', 'Southlake TX', 'Grapevine TX'],
    service: ['therapist', 'counseling', 'therapy', 'counselor', 'mental health', 'telehealth therapy', 'online counseling', 'virtual therapy'],
    combined: [
      'therapist in Southlake',
      'Southlake therapist',
      'Grapevine counseling',
      'therapy Southlake TX',
      'counselor Grapevine TX',
      'mental health therapist Southlake',
      'telehealth therapist Texas',
      'online therapy Texas'
    ]
  },
  
  // Secondary keywords - demographics and specialties
  secondary: {
    demographics: ['teen', 'teenager', 'adolescent', 'young adult', 'adult', 'adult therapy', 'parent'],
    specialties: [
      'anxiety',
      'depression',
      'stress management',
      'OCD',
      'life transitions',
      'relationship issues',
      'self-esteem',
      'personal growth'
    ],
    modifiers: ['licensed', 'professional', 'experienced', 'certified', 'telehealth']
  },
  
  // Long-tail keywords - specific search queries
  longTail: [
    'teen anxiety therapist Southlake',
    'depression counseling Grapevine TX',
    'licensed therapist near me',
    'anxiety treatment Southlake Texas',
    'teen counseling services Grapevine',
    'adult anxiety therapist Southlake',
    'adult counseling Grapevine',
    'adult therapy Southlake TX',
    'professional therapy Southlake Grapevine',
    'mental health counselor near Southlake',
    'stress management therapy Grapevine',
    'relationship counseling Southlake TX',
    'life transition therapist near me',
    'adolescent therapy services Southlake',
    'adolescent counseling Texas',
    'telehealth therapy for teens Texas',
    'online counseling for adolescents Texas',
    'telehealth therapy for adults Texas',
    'online counseling for adults Texas'
  ],
  
  // Location-specific variations
  locationVariations: {
    primary: ['Texas', 'Southlake', 'Grapevine'],
    secondary: ['Colleyville', 'Keller', 'Westlake', 'Trophy Club'],
    regions: ['DFW', 'Dallas Fort Worth', 'North Texas', 'Tarrant County'],
    nearbyPhrases: [
      'near Southlake',
      'serving Grapevine',
      'Southlake area',
      'Grapevine and surrounding areas'
    ]
  },
  
  // Service-specific keywords for individual pages
  serviceKeywords: {
    'individual-therapy': [
      'one-on-one therapy',
      'individual counseling',
      'personal therapy sessions',
      'private therapy'
    ],
    'anxiety-stress-management': [
      'anxiety treatment',
      'stress relief therapy',
      'panic attack help',
      'anxiety management techniques'
    ],
    'depression-treatment': [
      'depression therapy',
      'mood disorder treatment',
      'clinical depression help',
      'depression counseling'
    ],
    'life-transitions': [
      'life changes counseling',
      'transition therapy',
      'adjustment counseling',
      'major life events therapy'
    ],
    'relationship-issues': [
      'relationship counseling',
      'communication therapy',
      'relationship problems help',
      'interpersonal therapy'
    ],
    'self-esteem-personal-growth': [
      'self-esteem counseling',
      'confidence building therapy',
      'personal development counseling',
      'self-worth therapy'
    ]
  } as Record<string, string[]>,
  
  // Competitor and brand keywords
  brand: {
    name: ['Peyton Shaw', 'Peyton Shaw Counseling', 'Peyton Shaw Counseling PLLC'],
    competitive: [
      'best therapist Southlake',
      'top counselor Grapevine',
      'recommended therapy Southlake',
      'trusted counseling Grapevine'
    ]
  },
  
  // Question-based keywords (for FAQ and content)
  questions: [
    'how to find therapist Southlake',
    'what to expect therapy session',
    'when to see counselor',
    'why therapy helps anxiety',
    'cost of therapy Southlake',
    'do I need therapy',
    'therapist vs counselor difference'
  ]
};

/**
 * Helper function to get keywords for a specific service
 */
export function getServiceKeywords(serviceSlug: string): string[] {
  const serviceSpecific = targetKeywords.serviceKeywords[serviceSlug] || [];
  const primaryCombined = targetKeywords.primary.combined;
  const specialties = targetKeywords.secondary.specialties;
  
  return Array.from(new Set([...serviceSpecific, ...primaryCombined, ...specialties]));
}

/**
 * Helper function to create location-aware keywords
 */
export function createLocationKeywords(baseKeyword: string, includeSecondary = false): string[] {
  const locations = includeSecondary 
    ? [...targetKeywords.locationVariations.primary, ...targetKeywords.locationVariations.secondary]
    : targetKeywords.locationVariations.primary;
    
  return locations.flatMap(location => [
    `${baseKeyword} ${location}`,
    `${baseKeyword} in ${location}`,
    `${baseKeyword} near ${location}`,
    `${location} ${baseKeyword}`
  ]);
}

/**
 * Get all keywords for a page (limited to avoid keyword stuffing)
 */
export function getPageKeywords(
  pageType: 'home' | 'service' | 'about' | 'contact' | 'blog',
  serviceSlug?: string,
  limit = 10
): string[] {
  let keywords: string[] = [];
  
  switch (pageType) {
    case 'home':
      keywords = [
        ...targetKeywords.primary.combined,
        ...targetKeywords.brand.name,
        ...targetKeywords.secondary.modifiers.slice(0, 2)
      ];
      break;
      
    case 'service':
      if (serviceSlug) {
        keywords = getServiceKeywords(serviceSlug);
      }
      break;
      
    case 'about':
      keywords = [
        ...targetKeywords.brand.name,
        ...targetKeywords.primary.location,
        'licensed therapist',
        'professional counselor',
        'mental health professional'
      ];
      break;
      
    case 'contact':
      keywords = [
        ...targetKeywords.primary.location,
        'contact therapist',
        'schedule appointment',
        'book therapy session'
      ];
      break;
      
    case 'blog':
      keywords = [
        ...targetKeywords.questions.slice(0, 5),
        'therapy blog',
        'mental health resources'
      ];
      break;
  }
  
  // Remove duplicates and limit
  return Array.from(new Set(keywords)).slice(0, limit);
}
