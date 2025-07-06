// Extend window type to include gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      ...args: any[]
    ) => void;
  }
}

export function sendToGoogleAnalytics(metric: any) {
  const { id, name, value, label } = metric;
  
  // Ensure gtag is available
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Send to Google Analytics
  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    event_label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    non_interaction: true,
  });
}