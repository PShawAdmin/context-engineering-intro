import React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import ClientIntakeFormPDF from '@/lib/pdf/ClientIntakeFormPDF';
import InformedConsentPDF from '@/lib/pdf/InformedConsentPDF';
import HIPAANoticePDF from '@/lib/pdf/HIPAANoticePDF';
import { PRACTICE_FORMS } from '@/lib/forms-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { formId: string } }
) {
  const { formId } = params;

  // Find the form data
  const form = PRACTICE_FORMS.find(f => f.id === formId);
  
  if (!form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 });
  }

  try {
    let pdfBuffer: Buffer;
    
    // Generate appropriate PDF based on form ID
    switch (formId) {
      case 'client-intake':
        pdfBuffer = await renderToBuffer(<ClientIntakeFormPDF />);
        break;
        
      case 'informed-consent':
        pdfBuffer = await renderToBuffer(<InformedConsentPDF />);
        break;
        
      case 'hipaa-notice':
        pdfBuffer = await renderToBuffer(<HIPAANoticePDF />);
        break;
        
      // TODO: Add other form generators here
      case 'financial-agreement':
      case 'practice-policies':
      case 'client-rights':
      case 'telehealth-consent':
      case 'release-information':
      case 'credit-card-auth':
      case 'good-faith-estimate':
        // For now, return a placeholder message
        return NextResponse.json({ 
          message: `PDF generation for ${form.title} is coming soon`,
          formId,
          fileName: form.fileName 
        }, { status: 501 });
        
      default:
        return NextResponse.json({ error: 'Invalid form ID' }, { status: 400 });
    }

    // Return the PDF as a response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${form.fileName}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ 
      error: 'Failed to generate PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}