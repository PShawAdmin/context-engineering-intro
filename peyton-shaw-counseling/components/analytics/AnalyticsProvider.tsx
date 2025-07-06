'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { sendToGoogleAnalytics } from '@/lib/analytics/web-vitals';
import GoogleAnalytics from './GoogleAnalytics';

export default function AnalyticsProvider() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'production') {
      sendToGoogleAnalytics(metric);
    } else {
      console.log('Web Vital:', metric);
    }
  });
  
  return <GoogleAnalytics />;
}