export interface FormDocument {
  id: string;
  title: string;
  description: string;
  category: 'new-client' | 'consent' | 'administrative' | 'financial';
  fileName: string;
  required: boolean;
  lastUpdated: string;
  pages?: number;
}

export const PRACTICE_FORMS: FormDocument[] = [
  // New Client Forms
  {
    id: 'client-intake',
    title: 'Client Information & Intake Form',
    description: 'Basic information about you, your health history, and reasons for seeking therapy',
    category: 'new-client',
    fileName: 'PSC-Client-Intake-Form.pdf',
    required: true,
    lastUpdated: '2024-01-01',
    pages: 4
  },
  {
    id: 'informed-consent',
    title: 'Informed Consent for Psychotherapy',
    description: 'Important information about therapy services, confidentiality, and your rights',
    category: 'new-client',
    fileName: 'PSC-Informed-Consent.pdf',
    required: true,
    lastUpdated: '2024-01-01',
    pages: 3
  },
  {
    id: 'hipaa-notice',
    title: 'Notice of Privacy Practices (HIPAA)',
    description: 'How your health information is protected and may be used',
    category: 'new-client',
    fileName: 'PSC-HIPAA-Privacy-Notice.pdf',
    required: true,
    lastUpdated: '2024-01-01',
    pages: 2
  },
  {
    id: 'financial-agreement',
    title: 'Financial Agreement & Fee Schedule',
    description: 'Payment policies, fees, and insurance information',
    category: 'financial',
    fileName: 'PSC-Financial-Agreement.pdf',
    required: true,
    lastUpdated: '2024-01-01',
    pages: 2
  },
  {
    id: 'practice-policies',
    title: 'Practice Policies & Procedures',
    description: 'Office policies including appointments, cancellations, and communications',
    category: 'new-client',
    fileName: 'PSC-Practice-Policies.pdf',
    required: true,
    lastUpdated: '2024-01-01',
    pages: 2
  },
  {
    id: 'client-rights',
    title: 'Client Rights & Responsibilities',
    description: 'Your rights as a client and what we expect from our therapeutic relationship',
    category: 'new-client',
    fileName: 'PSC-Client-Rights.pdf',
    required: false,
    lastUpdated: '2024-01-01',
    pages: 1
  },
  // Consent Forms
  {
    id: 'telehealth-consent',
    title: 'Telehealth Informed Consent',
    description: 'Agreement for receiving therapy services via video sessions',
    category: 'consent',
    fileName: 'PSC-Telehealth-Consent.pdf',
    required: false,
    lastUpdated: '2024-01-01',
    pages: 2
  },
  {
    id: 'release-information',
    title: 'Authorization to Release Information',
    description: 'Permission to share information with other healthcare providers or designated parties',
    category: 'consent',
    fileName: 'PSC-Release-Information.pdf',
    required: false,
    lastUpdated: '2024-01-01',
    pages: 1
  },
  // Administrative Forms
  {
    id: 'credit-card-auth',
    title: 'Credit Card Authorization',
    description: 'Secure authorization for credit card payments',
    category: 'administrative',
    fileName: 'PSC-Credit-Card-Authorization.pdf',
    required: false,
    lastUpdated: '2024-01-01',
    pages: 1
  },
  {
    id: 'good-faith-estimate',
    title: 'Good Faith Estimate',
    description: 'Estimate of therapy costs for uninsured or self-pay clients (No Surprises Act)',
    category: 'financial',
    fileName: 'PSC-Good-Faith-Estimate.pdf',
    required: false,
    lastUpdated: '2024-01-01',
    pages: 2
  }
];

export const NEW_CLIENT_PACKET = PRACTICE_FORMS.filter(
  form => form.category === 'new-client' || form.required
);

export const FORM_CATEGORIES = [
  {
    id: 'new-client',
    title: 'New Client Forms',
    description: 'Essential forms for new clients to complete before the first session',
    icon: 'clipboard-list'
  },
  {
    id: 'consent',
    title: 'Consent Forms',
    description: 'Additional consent forms for specific services or situations',
    icon: 'check-circle'
  },
  {
    id: 'financial',
    title: 'Financial Forms',
    description: 'Payment agreements and financial documentation',
    icon: 'credit-card'
  },
  {
    id: 'administrative',
    title: 'Administrative Forms',
    description: 'Other administrative and procedural forms',
    icon: 'folder-open'
  }
];