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
    backgroundColor: '#f3f4f6',
    padding: '6 10',
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
    color: '#92400e',
  },
  effectiveDate: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
});

const HIPAANoticePDF = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.practiceName}>Peyton Shaw Counseling, PLLC</Text>
        <Text style={styles.practiceInfo}>123 Main Street, Suite 200, Southlake, TX 76092</Text>
        <Text style={styles.practiceInfo}>Phone: (555) 123-4567 | Email: privacy@peytonshawcounseling.com</Text>
        <Text style={styles.practiceInfo}>Peyton Shaw, LPC | License #XXXXX</Text>
      </View>

      <Text style={styles.title}>NOTICE OF PRIVACY PRACTICES</Text>
      <Text style={styles.effectiveDate}>Effective Date: January 1, 2024</Text>

      <View style={styles.important}>
        <Text style={styles.importantText}>
          THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS 
          TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.
        </Text>
      </View>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          I am required by law to maintain the privacy of your health information and to provide you with this Notice of 
          my legal duties and privacy practices with respect to your health information. I am required to abide by the 
          terms of this Notice currently in effect.
        </Text>
      </View>

      {/* Uses and Disclosures for Treatment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>USES AND DISCLOSURES OF HEALTH INFORMATION</Text>
        
        <View style={styles.subSection}>
          <Text style={styles.subTitle}>Treatment</Text>
          <Text style={styles.paragraph}>
            I may use or disclose your health information to provide you with psychological treatment or services. For 
            example, I may disclose your information to other healthcare providers involved in your care.
          </Text>
        </View>

        <View style={styles.subSection}>
          <Text style={styles.subTitle}>Payment</Text>
          <Text style={styles.paragraph}>
            I may use and disclose your health information to obtain payment for services provided to you. For example, 
            I may disclose information to your insurance company to obtain payment for services.
          </Text>
        </View>

        <View style={styles.subSection}>
          <Text style={styles.subTitle}>Healthcare Operations</Text>
          <Text style={styles.paragraph}>
            I may use or disclose your health information for healthcare operations. For example, I may use your 
            information for quality assessment activities or to evaluate the performance of healthcare professionals.
          </Text>
        </View>
      </View>

      {/* Other Uses and Disclosures */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OTHER USES AND DISCLOSURES PERMITTED OR REQUIRED BY LAW</Text>
        
        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 600 }}>As Required by Law:</Text> I will disclose your health information when 
              required to do so by federal, state, or local law.
            </Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 600 }}>To Avert a Serious Threat to Health or Safety:</Text> I may use and 
              disclose your health information when necessary to prevent a serious threat to your health and safety or 
              the health and safety of the public or another person.
            </Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 600 }}>Abuse or Neglect:</Text> I may disclose your health information to 
              appropriate authorities if I reasonably believe that you are a possible victim of abuse, neglect, or 
              domestic violence.
            </Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 600 }}>Legal Proceedings:</Text> I may disclose your health information in 
              response to a court or administrative order, subpoena, discovery request, or other lawful process.
            </Text>
          </View>
        </View>
      </View>

      {/* Uses Requiring Authorization */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>USES AND DISCLOSURES REQUIRING YOUR AUTHORIZATION</Text>
        <Text style={styles.paragraph}>
          Other uses and disclosures of your health information not covered by this Notice or applicable law will be made 
          only with your written authorization. If you provide authorization, you may revoke it at any time by submitting 
          a written revocation to me.
        </Text>
      </View>

      <Text style={styles.pageNumber}>Page 1 of 2</Text>
    </Page>

    {/* Page 2 */}
    <Page size="LETTER" style={styles.page}>
      {/* Your Rights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>YOUR RIGHTS REGARDING YOUR HEALTH INFORMATION</Text>
        
        <View style={styles.subSection}>
          <Text style={styles.subTitle}>Right to Inspect and Copy</Text>
          <Text style={styles.paragraph}>
            You have the right to inspect and copy your health information that may be used to make decisions about 
            your care. To inspect and copy your health information, submit a written request to me. I may charge a 
            reasonable fee for copying and mailing costs.
          </Text>
        </View>

        <View style={styles.subSection}>
          <Text style={styles.subTitle}>Right to Amend</Text>
          <Text style={styles.paragraph}>
            If you believe your health information is incorrect or incomplete, you may request that I amend the 
            information. You must provide a reason that supports your request. I may deny your request if the 
            information was not created by me or if I determine the information is accurate and complete.
          </Text>
        </View>

        <View style={styles.subSection}>
          <Text style={styles.subTitle}>Right to an Accounting of Disclosures</Text>
          <Text style={styles.paragraph}>
            You have the right to request a list of disclosures I have made of your health information for purposes 
            other than treatment, payment, or healthcare operations. The request must state a time period which may 
            not be longer than six years.
          </Text>
        </View>

        <View style={styles.subSection}>
          <Text style={styles.subTitle}>Right to Request Restrictions</Text>
          <Text style={styles.paragraph}>
            You have the right to request a restriction on the health information I use or disclose about you for 
            treatment, payment, or healthcare operations. I am not required to agree to your request, but if I do 
            agree, I will comply with your request unless the information is needed for emergency treatment.
          </Text>
        </View>

        <View style={styles.subSection}>
          <Text style={styles.subTitle}>Right to Request Confidential Communications</Text>
          <Text style={styles.paragraph}>
            You have the right to request that I communicate with you about your health information in a certain way 
            or at a certain location. For example, you may request that I contact you only at home or only by mail. 
            I will accommodate reasonable requests.
          </Text>
        </View>

        <View style={styles.subSection}>
          <Text style={styles.subTitle}>Right to a Paper Copy of This Notice</Text>
          <Text style={styles.paragraph}>
            You have the right to a paper copy of this Notice at any time. Even if you have agreed to receive this 
            Notice electronically, you are still entitled to a paper copy.
          </Text>
        </View>
      </View>

      {/* Complaints */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COMPLAINTS</Text>
        <Text style={styles.paragraph}>
          If you believe your privacy rights have been violated, you may file a complaint with me or with the Secretary 
          of the Department of Health and Human Services. To file a complaint with me, contact me at the address and 
          phone number at the top of this Notice. You will not be penalized for filing a complaint.
        </Text>
      </View>

      {/* Changes to Notice */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CHANGES TO THIS NOTICE</Text>
        <Text style={styles.paragraph}>
          I reserve the right to change this Notice. I reserve the right to make the revised Notice effective for health 
          information I already have about you as well as any information I receive in the future. I will post a copy of 
          the current Notice in my office with its effective date.
        </Text>
      </View>

      {/* Acknowledgment */}
      <View style={styles.footer}>
        <Text style={[styles.paragraph, { fontWeight: 600, marginBottom: 20 }]}>
          ACKNOWLEDGMENT OF RECEIPT OF NOTICE OF PRIVACY PRACTICES
        </Text>
        
        <Text style={styles.paragraph}>
          I acknowledge that I have received a copy of the Notice of Privacy Practices for Peyton Shaw Counseling, PLLC.
        </Text>

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
      </View>

      <Text style={styles.pageNumber}>Page 2 of 2</Text>
    </Page>
  </Document>
);

export default HIPAANoticePDF;