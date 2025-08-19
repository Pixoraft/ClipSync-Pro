import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id: string;
}

export default function WebVitalsTracker() {
  useEffect(() => {
    // Track Core Web Vitals for better SEO performance
    const trackWebVitals = async () => {
      try {
        const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');
        
        const sendToAnalytics = (metric: any) => {
          // Send to Google Analytics if available
          if (window.gtag && import.meta.env.VITE_GA_MEASUREMENT_ID) {
            window.gtag('event', metric.name, {
              event_category: 'Web Vitals',
              event_label: metric.id,
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              non_interaction: true,
              custom_map: {
                metric_rating: metric.rating
              }
            });
          }
          
          // Log to console for development
          if (import.meta.env.DEV) {
            console.log('Web Vital:', metric.name, metric.value, metric.rating);
          }
        };

        // Track all Core Web Vitals
        onCLS(sendToAnalytics);
        onFID(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
        
      } catch (error) {
        console.warn('Web Vitals tracking not available:', error);
      }
    };

    // Initialize tracking after page load
    if (document.readyState === 'complete') {
      trackWebVitals();
    } else {
      window.addEventListener('load', trackWebVitals);
    }

    return () => {
      window.removeEventListener('load', trackWebVitals);
    };
  }, []);

  return null; // This component doesn't render anything
}