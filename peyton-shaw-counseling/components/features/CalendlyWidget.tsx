'use client'

import { useEffect } from 'react';
import { InlineWidget, PopupButton, PopupWidget } from 'react-calendly';
import {Card} from '@heroui/card';

interface CalendlyWidgetProps {
  url: string;
  type?: 'inline' | 'popup-button' | 'popup-widget';
  buttonText?: string;
  buttonClassName?: string;
}

export default function CalendlyWidget({ 
  url, 
  type = 'inline',
  buttonText = 'Schedule a Consultation',
  buttonClassName = ''
}: CalendlyWidgetProps) {
  useEffect(() => {
    // Optional: Add any Calendly-specific scripts or analytics here
    // This runs only on the client side
  }, []);

  if (!url) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">
          Scheduling is temporarily unavailable. Please call us at (XXX) XXX-XXXX to book an appointment.
        </p>
      </Card>
    );
  }

  // Inline widget (most common for embedding on pages)
  if (type === 'inline') {
    return (
      <div className="calendly-inline-widget">
        <InlineWidget
          url={url}
          styles={{
            height: '650px',
            minWidth: '320px',
          }}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: '0ea5e9', // primary-500 color
            textColor: '111827', // gray-900
          }}
          utm={{
            utmCampaign: 'website',
            utmSource: 'peytonshawcounseling',
            utmMedium: 'web',
          }}
        />
      </div>
    );
  }

  // Popup button (opens Calendly in a modal)
  if (type === 'popup-button') {
    return (
      <PopupButton
        url={url}
        text={buttonText}
        className={buttonClassName || 'inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors'}
        rootElement={document.getElementById('__next') as HTMLElement}
        pageSettings={{
          backgroundColor: 'ffffff',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '0ea5e9',
          textColor: '111827',
        }}
        utm={{
          utmCampaign: 'website',
          utmSource: 'peytonshawcounseling',
          utmMedium: 'web',
        }}
      />
    );
  }

  // Popup widget (floating button)
  if (type === 'popup-widget') {
    return (
      <PopupWidget
        url={url}
        color="#0ea5e9"
        text={buttonText}
        textColor="#ffffff"
        branding={false}
        rootElement={document.getElementById('__next') as HTMLElement}
        pageSettings={{
          backgroundColor: 'ffffff',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '0ea5e9',
          textColor: '111827',
        }}
        utm={{
          utmCampaign: 'website',
          utmSource: 'peytonshawcounseling',
          utmMedium: 'web',
        }}
      />
    );
  }

  return null;
}

// Loading skeleton for Suspense boundary
export function CalendlyWidgetSkeleton() {
  return (
    <Card className="p-8 animate-pulse">
      <div className="h-96 bg-gray-200 rounded-lg"></div>
    </Card>
  );
}