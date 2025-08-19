import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView, trackEvent } from '../components/seo/GoogleAnalytics';

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);
  
  useEffect(() => {
    if (location !== prevLocationRef.current) {
      // Track page view when route changes
      trackPageView(location);
      prevLocationRef.current = location;
    }
  }, [location]);

  // Return tracking functions for manual use
  return {
    trackPageView,
    trackEvent,
    trackDownload: (fileName: string) => {
      trackEvent('download', 'software', fileName);
    },
    trackContactForm: (method: string) => {
      trackEvent('contact', 'form', method);
    },
    trackBlogRead: (postTitle: string) => {
      trackEvent('blog_read', 'engagement', postTitle);
    },
    trackFeatureClick: (feature: string) => {
      trackEvent('feature_click', 'interaction', feature);
    }
  };
};