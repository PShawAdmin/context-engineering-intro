import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.6,
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
  title: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 20,
    color: '#111827',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
    color: '#111827',
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
    color: '#374151',
  },
  bulletList: {
    marginLeft: 20,
    marginBottom: 10,
  },
  bulletItem: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  bullet: {
    marginRight: 8,
    color: '#6b7280',
  },
  bulletText: {
    flex: 1,
    color: '#374151',
  },
  subSection: {
    marginBottom: 15,
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 5,
    color: '#374151',
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
  signatureRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 40,
  },
  signatureField: {
    flex: 1,
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
  important: {
    backgroundColor: '#fef3c7',
    padding: 10,
    marginBottom: 15,
    borderLeft: '3 solid #f59e0b',
  },
  importantText: {
    fontSize: 10,
    fontWeight: 600,
    color: '#92400e',
  },
});

const InformedConsentPDF = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.practiceName}>Peyton Shaw Counseling, PLLC</Text>
        <Text style={styles.practiceInfo}>123 Main Street, Suite 200, Southlake, TX 76092</Text>
        <Text style={styles.practiceInfo}>Phone: (555) 123-4567 | Email: contact@peytonshawcounseling.com</Text>
        <Text style={styles.practiceInfo}>Peyton Shaw, LPC | License #XXXXX</Text>
      </View>

      <Text style={styles.title}>INFORMED CONSENT FOR PSYCHOTHERAPY</Text>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Welcome to Peyton Shaw Counseling, PLLC. This document contains important information about our professional 
          services and business policies. Please read it carefully and ask any questions you might have. When you sign 
          this document, it will represent an agreement between us.
        </Text>
      </View>

      {/* Therapy Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>THERAPY SERVICES</Text>
        <Text style={styles.paragraph}>
          Psychotherapy is not easily described in general statements. It varies depending on the personalities of the 
          therapist and client, and the particular problems you bring forward. Therapy is not like a medical doctor visit. 
          Instead, it calls for a very active effort on your part. In order for therapy to be most successful, you will 
          have to work on things we talk about both during our sessions and at home.
        </Text>
        <Text style={styles.paragraph}>
          Psychotherapy can have benefits and risks. Since therapy often involves discussing unpleasant aspects of your 
          life, you may experience uncomfortable feelings like sadness, guilt, anger, frustration, loneliness, and 
          helplessness. On the other hand, psychotherapy has also been shown to have benefits. Therapy often leads to 
          better relationships, solutions to specific problems, and significant reductions in feelings of distress. 
          But there are no guarantees of what you will experience.
        </Text>
      </View>

      {/* Sessions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SESSIONS</Text>
        <Text style={styles.paragraph}>
          Our first few sessions will involve an evaluation of your needs. By the end of the evaluation, I will be able 
          to offer you some first impressions of what our work will include and a treatment plan to follow, if you decide 
          to continue with therapy. You should evaluate this information along with your own opinions of whether you feel 
          comfortable working with me.
        </Text>
        <Text style={styles.paragraph}>
          Individual therapy sessions are typically 50 minutes in length. We will typically meet weekly or biweekly, 
          depending on your specific needs and treatment goals. The frequency of sessions may be adjusted as therapy 
          progresses.
        </Text>
      </View>

      {/* Confidentiality */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONFIDENTIALITY</Text>
        <Text style={styles.paragraph}>
          In general, the privacy of all communications between a client and a therapist is protected by law, and I can 
          only release information about our work to others with your written permission. But there are a few exceptions:
        </Text>
        
        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              If I believe that a child, elderly person, or disabled person is being abused or neglected, I must report 
              this to the appropriate state agency.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              If I believe that a client is threatening serious bodily harm to another, I am required to take protective 
              actions, which may include notifying the potential victim, contacting the police, or seeking hospitalization.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              If a client threatens to harm himself/herself, I may be obligated to seek hospitalization or contact family 
              members or others who can help provide protection.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              If a judge orders my testimony or if you are involved in certain types of legal proceedings, I may be 
              required to provide information.
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 1 of 3</Text>
    </Page>

    {/* Page 2 */}
    <Page size="LETTER" style={styles.page}>
      {/* Professional Records */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFESSIONAL RECORDS</Text>
        <Text style={styles.paragraph}>
          The laws and standards of my profession require that I keep treatment records. You are entitled to receive a 
          copy of your records, or I can prepare a summary for you instead. Because these are professional records, they 
          can be misinterpreted and/or upsetting to untrained readers. If you wish to see your records, I recommend that 
          you review them in my presence so that we can discuss the contents.
        </Text>
      </View>

      {/* Client Rights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CLIENT RIGHTS</Text>
        <Text style={styles.paragraph}>
          You have the right to:
        </Text>
        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Request and receive information about my qualifications and experience</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Discuss your treatment goals and develop a treatment plan</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>End therapy at any time without any moral, legal, or financial obligations</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Ask questions about any procedures used during therapy</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Refuse audio or video recording</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              File a complaint with the Texas State Board of Examiners of Professional Counselors if you feel your rights 
              have been violated
            </Text>
          </View>
        </View>
      </View>

      {/* Therapist Availability */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>THERAPIST AVAILABILITY & EMERGENCIES</Text>
        <Text style={styles.paragraph}>
          I am often not immediately available by telephone. I do not answer my phone when I am with clients or otherwise 
          unavailable. At these times, you may leave a message on my confidential voice mail and your call will be 
          returned as soon as possible, but it may take a day or two for non-urgent matters.
        </Text>
        
        <View style={styles.important}>
          <Text style={styles.importantText}>
            If you feel that you cannot wait for me to return your call or if you feel unable to keep yourself safe:
          </Text>
        </View>
        
        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.bulletText}>Call 911 or go to your nearest emergency room</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.bulletText}>Call the National Suicide Prevention Lifeline at 988</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>3.</Text>
            <Text style={styles.bulletText}>Text HOME to 741741 to reach the Crisis Text Line</Text>
          </View>
        </View>
      </View>

      {/* Cancellation Policy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CANCELLATION POLICY</Text>
        <Text style={styles.paragraph}>
          If you need to cancel or reschedule an appointment, please provide at least 24 hours advance notice. Sessions 
          cancelled with less than 24 hours notice, except in cases of genuine emergency, will be charged the full session 
          fee. Please note that insurance companies do not reimburse for cancelled sessions.
        </Text>
      </View>

      {/* Social Media & Electronic Communication */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SOCIAL MEDIA & ELECTRONIC COMMUNICATION</Text>
        <Text style={styles.paragraph}>
          To maintain your confidentiality and preserve the professional relationship, I do not accept friend requests 
          from current or former clients on social networking sites. I do not communicate with clients through text 
          messaging or email for therapeutic purposes. These forms of communication are not secure and may compromise 
          your confidentiality.
        </Text>
      </View>

      <Text style={styles.pageNumber}>Page 2 of 3</Text>
    </Page>

    {/* Page 3 - Signature Page */}
    <Page size="LETTER" style={styles.page}>
      {/* Termination */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TERMINATION OF THERAPY</Text>
        <Text style={styles.paragraph}>
          Ending relationships can be difficult. Therefore, it is important to have a termination process in order to 
          achieve some closure. The appropriate length of the termination depends on the length and intensity of the 
          treatment. I may terminate treatment after appropriate discussion with you and a termination process if I 
          determine that the psychotherapy is not being effectively used or if you are in default on payment. I will 
          not terminate the therapeutic relationship without first discussing and exploring the reasons and purpose of 
          terminating. If therapy is terminated for any reason or you request another therapist, I will provide you 
          with a list of qualified psychotherapists. You may also choose someone on your own or from another referral 
          source.
        </Text>
      </View>

      {/* Consent Statement */}
      <View style={[styles.section, { marginTop: 40 }]}>
        <Text style={styles.sectionTitle}>CONSENT TO PSYCHOTHERAPY</Text>
        <Text style={styles.paragraph}>
          Your signature below indicates that you have read this agreement and agree to its terms. It also serves as an 
          acknowledgment that you have received the HIPAA Notice of Privacy Practices described in a separate document.
        </Text>
      </View>

      {/* Signature Section */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <View style={styles.signatureField}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Client Signature</Text>
          </View>
          <View style={[styles.signatureField, { maxWidth: 150 }]}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Date</Text>
          </View>
        </View>

        <View style={styles.signatureRow}>
          <View style={styles.signatureField}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Client Printed Name</Text>
          </View>
        </View>

        <View style={[styles.signatureRow, { marginTop: 30 }]}>
          <View style={styles.signatureField}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Parent/Guardian Signature (if client is under 18)</Text>
          </View>
          <View style={[styles.signatureField, { maxWidth: 150 }]}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Date</Text>
          </View>
        </View>

        <View style={styles.signatureRow}>
          <View style={styles.signatureField}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Parent/Guardian Printed Name</Text>
          </View>
          <View style={[styles.signatureField, { maxWidth: 200 }]}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Relationship to Client</Text>
          </View>
        </View>

        <View style={[styles.signatureRow, { marginTop: 40, paddingTop: 20, borderTop: '1 solid #e5e7eb' }]}>
          <View style={styles.signatureField}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Therapist Signature</Text>
          </View>
          <View style={[styles.signatureField, { maxWidth: 150 }]}>
            <View style={styles.signature}></View>
            <Text style={styles.signatureLabel}>Date</Text>
          </View>
        </View>

        <View style={styles.signatureRow}>
          <View style={styles.signatureField}>
            <Text style={[styles.signatureLabel, { marginTop: 5 }]}>Peyton Shaw, LPC | License #XXXXX</Text>
          </View>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 3 of 3</Text>
    </Page>
  </Document>
);

export default InformedConsentPDF;