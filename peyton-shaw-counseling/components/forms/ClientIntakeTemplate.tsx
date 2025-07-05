// This is a template showing the structure of the Client Intake Form
// In production, this would be converted to a fillable PDF

export const ClientIntakeFormTemplate = {
  header: {
    practiceName: 'Peyton Shaw Counseling, PLLC',
    address: '123 Main Street, Suite 200, Southlake, TX 76092',
    phone: '(555) 123-4567',
    email: 'intake@peytonshawcounseling.com',
    licenseInfo: 'Peyton Shaw, LPC | License #XXXXX'
  },
  
  sections: [
    {
      title: 'Client Information',
      fields: [
        { label: 'Legal Name', type: 'text', required: true },
        { label: 'Preferred Name', type: 'text' },
        { label: 'Pronouns', type: 'text', placeholder: 'e.g., she/her, he/him, they/them' },
        { label: 'Date of Birth', type: 'date', required: true },
        { label: 'Age', type: 'number' },
        { label: 'Gender Identity', type: 'text' },
        { label: 'Sexual Orientation', type: 'text' },
        { label: 'Relationship Status', type: 'select', options: ['Single', 'Married', 'Partnered', 'Divorced', 'Widowed', 'Other'] },
        { label: 'Occupation', type: 'text' },
        { label: 'Employer', type: 'text' },
      ]
    },
    
    {
      title: 'Contact Information',
      fields: [
        { label: 'Street Address', type: 'text', required: true },
        { label: 'City, State, ZIP', type: 'text', required: true },
        { label: 'Home Phone', type: 'tel' },
        { label: 'Cell Phone', type: 'tel', required: true },
        { label: 'Work Phone', type: 'tel' },
        { label: 'Email Address', type: 'email', required: true },
        { label: 'Preferred Contact Method', type: 'checkbox', options: ['Call', 'Text', 'Email'] },
        { label: 'May we leave voicemails?', type: 'radio', options: ['Yes', 'No'] },
      ]
    },
    
    {
      title: 'Emergency Contact',
      fields: [
        { label: 'Name', type: 'text', required: true },
        { label: 'Relationship', type: 'text', required: true },
        { label: 'Phone Number', type: 'tel', required: true },
        { label: 'Secondary Contact Name', type: 'text' },
        { label: 'Secondary Contact Phone', type: 'tel' },
      ]
    },
    
    {
      title: 'Insurance Information',
      fields: [
        { label: 'Insurance Company', type: 'text' },
        { label: 'Policy Number', type: 'text' },
        { label: 'Group Number', type: 'text' },
        { label: 'Policy Holder Name', type: 'text' },
        { label: 'Policy Holder DOB', type: 'date' },
        { label: 'Will you be using insurance?', type: 'radio', options: ['Yes', 'No', 'Self-Pay'] },
      ]
    },
    
    {
      title: 'Medical Information',
      fields: [
        { label: 'Primary Care Physician', type: 'text' },
        { label: 'Physician Phone', type: 'tel' },
        { label: 'Current Medications', type: 'textarea', placeholder: 'Please list all current medications and dosages' },
        { label: 'Allergies', type: 'textarea' },
        { label: 'Medical Conditions', type: 'textarea', placeholder: 'Please list any current or past medical conditions' },
        { label: 'Previous Hospitalizations', type: 'textarea' },
      ]
    },
    
    {
      title: 'Mental Health History',
      fields: [
        { label: 'Previous Therapy/Counseling', type: 'radio', options: ['Yes', 'No'] },
        { label: 'If yes, when and with whom?', type: 'textarea' },
        { label: 'Previous Psychiatric Treatment', type: 'radio', options: ['Yes', 'No'] },
        { label: 'If yes, please describe', type: 'textarea' },
        { label: 'Family Mental Health History', type: 'textarea' },
        { label: 'Substance Use History', type: 'textarea' },
      ]
    },
    
    {
      title: 'Current Concerns',
      fields: [
        { label: 'What brings you to therapy at this time?', type: 'textarea', required: true },
        { label: 'When did these concerns begin?', type: 'text' },
        { label: 'What are your goals for therapy?', type: 'textarea' },
        { 
          label: 'Please check any that apply', 
          type: 'checkbox', 
          options: [
            'Anxiety', 'Depression', 'Relationship Issues', 'Grief/Loss', 
            'Trauma', 'Stress', 'Life Transitions', 'Self-Esteem',
            'Anger Management', 'Family Conflicts', 'Work/Career Issues',
            'Sleep Problems', 'Eating Concerns', 'Substance Use', 'Other'
          ]
        },
      ]
    },
    
    {
      title: 'Additional Information',
      fields: [
        { label: 'How did you hear about our practice?', type: 'text' },
        { label: 'Preferred therapist gender', type: 'select', options: ['No preference', 'Female', 'Male', 'Non-binary'] },
        { label: 'Preferred session times', type: 'checkbox', options: ['Morning', 'Afternoon', 'Evening', 'Weekend'] },
        { label: 'Anything else you would like us to know?', type: 'textarea' },
      ]
    }
  ],
  
  footer: {
    signatureSection: {
      text: 'I certify that the information provided above is true and accurate to the best of my knowledge.',
      fields: [
        { label: 'Client Signature', type: 'signature', required: true },
        { label: 'Date', type: 'date', required: true },
        { label: 'Parent/Guardian Signature (if under 18)', type: 'signature' },
        { label: 'Date', type: 'date' },
      ]
    },
    
    officeUse: {
      title: 'For Office Use Only',
      fields: [
        { label: 'Date Received', type: 'date' },
        { label: 'Reviewed By', type: 'text' },
        { label: 'Client ID', type: 'text' },
      ]
    }
  }
};