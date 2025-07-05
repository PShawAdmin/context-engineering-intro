import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #e5e7eb',
    paddingBottom: 20,
  },
  practiceName: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 5,
    color: '#374151',
  },
  practiceInfo: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 10,
    color: '#111827',
    backgroundColor: '#f3f4f6',
    padding: '6 10',
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 20,
  },
  field: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: 500,
    marginBottom: 3,
    color: '#374151',
  },
  input: {
    borderBottom: '1 solid #d1d5db',
    paddingBottom: 2,
    minHeight: 18,
  },
  textArea: {
    border: '1 solid #d1d5db',
    padding: 8,
    minHeight: 60,
    backgroundColor: '#f9fafb',
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 5,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 12,
    height: 12,
    border: '1 solid #9ca3af',
    marginRight: 5,
  },
  checkboxLabel: {
    fontSize: 10,
    color: '#4b5563',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1 solid #e5e7eb',
  },
  signature: {
    marginTop: 10,
    borderBottom: '1 solid #9ca3af',
    height: 30,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 9,
    color: '#6b7280',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    fontSize: 9,
    color: '#9ca3af',
  },
  required: {
    color: '#dc2626',
    fontSize: 10,
  },
});

const ClientIntakeFormPDF = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.practiceName}>Peyton Shaw Counseling, PLLC</Text>
        <Text style={styles.practiceInfo}>123 Main Street, Suite 200, Southlake, TX 76092</Text>
        <Text style={styles.practiceInfo}>Phone: (555) 123-4567 | Email: intake@peytonshawcounseling.com</Text>
        <Text style={styles.practiceInfo}>Peyton Shaw, LPC | License #XXXXX</Text>
      </View>

      {/* Client Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Client Information</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Legal Name <Text style={styles.required}>*</Text></Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Preferred Name</Text>
            <View style={styles.input}></View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Date of Birth <Text style={styles.required}>*</Text></Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Age</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Pronouns</Text>
            <View style={styles.input}></View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Gender Identity</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Sexual Orientation</Text>
            <View style={styles.input}></View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Relationship Status</Text>
            <View style={styles.checkboxGroup}>
              {['Single', 'Married', 'Partnered', 'Divorced', 'Widowed', 'Other'].map((status) => (
                <View key={status} style={styles.checkboxItem}>
                  <View style={styles.checkbox}></View>
                  <Text style={styles.checkboxLabel}>{status}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Occupation</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Employer</Text>
            <View style={styles.input}></View>
          </View>
        </View>
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Street Address <Text style={styles.required}>*</Text></Text>
          <View style={styles.input}></View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>City <Text style={styles.required}>*</Text></Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>State <Text style={styles.required}>*</Text></Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>ZIP Code <Text style={styles.required}>*</Text></Text>
            <View style={styles.input}></View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Cell Phone <Text style={styles.required}>*</Text></Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Home Phone</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Work Phone</Text>
            <View style={styles.input}></View>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email Address <Text style={styles.required}>*</Text></Text>
          <View style={styles.input}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Preferred Contact Method</Text>
          <View style={styles.checkboxGroup}>
            {['Call', 'Text', 'Email'].map((method) => (
              <View key={method} style={styles.checkboxItem}>
                <View style={styles.checkbox}></View>
                <Text style={styles.checkboxLabel}>{method}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>May we leave voicemails?</Text>
          <View style={styles.checkboxGroup}>
            {['Yes', 'No'].map((option) => (
              <View key={option} style={styles.checkboxItem}>
                <View style={styles.checkbox}></View>
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 1 of 4</Text>
    </Page>

    {/* Page 2 */}
    <Page size="LETTER" style={styles.page}>
      {/* Emergency Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Relationship <Text style={styles.required}>*</Text></Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Phone Number <Text style={styles.required}>*</Text></Text>
            <View style={styles.input}></View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Secondary Contact Name</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Secondary Contact Phone</Text>
            <View style={styles.input}></View>
          </View>
        </View>
      </View>

      {/* Insurance Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insurance Information</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Insurance Company</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Policy Number</Text>
            <View style={styles.input}></View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Group Number</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Policy Holder Name</Text>
            <View style={styles.input}></View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Policy Holder DOB</Text>
            <View style={styles.input}></View>
          </View>
          <View style={[styles.field, { flex: 2 }]}>
            <Text style={styles.label}>Will you be using insurance?</Text>
            <View style={styles.checkboxGroup}>
              {['Yes', 'No', 'Self-Pay'].map((option) => (
                <View key={option} style={styles.checkboxItem}>
                  <View style={styles.checkbox}></View>
                  <Text style={styles.checkboxLabel}>{option}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Medical Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Information</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Primary Care Physician</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Physician Phone</Text>
            <View style={styles.input}></View>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Current Medications (Please list all medications and dosages)</Text>
          <View style={styles.textArea}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Allergies</Text>
          <View style={styles.textArea}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Medical Conditions (Please list any current or past medical conditions)</Text>
          <View style={styles.textArea}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Previous Hospitalizations</Text>
          <View style={styles.textArea}></View>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 2 of 4</Text>
    </Page>

    {/* Page 3 */}
    <Page size="LETTER" style={styles.page}>
      {/* Mental Health History Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mental Health History</Text>
        
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Previous Therapy/Counseling</Text>
          <View style={styles.checkboxGroup}>
            {['Yes', 'No'].map((option) => (
              <View key={option} style={styles.checkboxItem}>
                <View style={styles.checkbox}></View>
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>If yes, when and with whom?</Text>
          <View style={styles.textArea}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Previous Psychiatric Treatment</Text>
          <View style={styles.checkboxGroup}>
            {['Yes', 'No'].map((option) => (
              <View key={option} style={styles.checkboxItem}>
                <View style={styles.checkbox}></View>
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>If yes, please describe</Text>
          <View style={styles.textArea}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Family Mental Health History</Text>
          <View style={styles.textArea}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Substance Use History</Text>
          <View style={styles.textArea}></View>
        </View>
      </View>

      {/* Current Concerns Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Concerns</Text>
        
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>What brings you to therapy at this time? <Text style={styles.required}>*</Text></Text>
          <View style={[styles.textArea, { minHeight: 80 }]}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>When did these concerns begin?</Text>
          <View style={styles.input}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>What are your goals for therapy?</Text>
          <View style={[styles.textArea, { minHeight: 80 }]}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Please check any that apply to your current situation:</Text>
          <View style={[styles.checkboxGroup, { marginTop: 10 }]}>
            {[
              'Anxiety', 'Depression', 'Relationship Issues', 'Grief/Loss',
              'Trauma', 'Stress', 'Life Transitions', 'Self-Esteem',
              'Anger Management', 'Family Conflicts', 'Work/Career Issues',
              'Sleep Problems', 'Eating Concerns', 'Substance Use', 'Other'
            ].map((concern) => (
              <View key={concern} style={[styles.checkboxItem, { width: '45%' }]}>
                <View style={styles.checkbox}></View>
                <Text style={styles.checkboxLabel}>{concern}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 3 of 4</Text>
    </Page>

    {/* Page 4 */}
    <Page size="LETTER" style={styles.page}>
      {/* Additional Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>How did you hear about our practice?</Text>
          <View style={styles.input}></View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Preferred therapist gender</Text>
          <View style={styles.checkboxGroup}>
            {['No preference', 'Female', 'Male', 'Non-binary'].map((option) => (
              <View key={option} style={styles.checkboxItem}>
                <View style={styles.checkbox}></View>
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Preferred session times</Text>
          <View style={styles.checkboxGroup}>
            {['Morning', 'Afternoon', 'Evening', 'Weekend'].map((time) => (
              <View key={time} style={styles.checkboxItem}>
                <View style={styles.checkbox}></View>
                <Text style={styles.checkboxLabel}>{time}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Anything else you would like us to know?</Text>
          <View style={[styles.textArea, { minHeight: 100 }]}></View>
        </View>
      </View>

      {/* Signature Section */}
      <View style={styles.footer}>
        <Text style={[styles.label, { marginBottom: 20 }]}>
          I certify that the information provided above is true and accurate to the best of my knowledge.
        </Text>

        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Client Signature <Text style={styles.required}>*</Text></Text>
          </View>
          <View style={[styles.field, { maxWidth: 150 }]}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Date <Text style={styles.required}>*</Text></Text>
          </View>
        </View>

        <View style={[styles.fieldRow, { marginTop: 20 }]}>
          <View style={styles.field}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Parent/Guardian Signature (if under 18)</Text>
          </View>
          <View style={[styles.field, { maxWidth: 150 }]}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Date</Text>
          </View>
        </View>
      </View>

      {/* Office Use Only */}
      <View style={[styles.section, { marginTop: 30, backgroundColor: '#f9fafb', padding: 15 }]}>
        <Text style={[styles.sectionTitle, { backgroundColor: 'transparent', padding: 0 }]}>For Office Use Only</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.field}>
            <Text style={styles.label}>Date Received</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Reviewed By</Text>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Client ID</Text>
            <View style={styles.input}></View>
          </View>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 4 of 4</Text>
    </Page>
  </Document>
);

export default ClientIntakeFormPDF;