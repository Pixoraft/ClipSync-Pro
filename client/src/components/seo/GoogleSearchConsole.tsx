import { useEffect } from 'react';

interface GoogleSearchConsoleProps {
  verificationCode?: string;
}

export default function GoogleSearchConsole({ verificationCode }: GoogleSearchConsoleProps) {
  useEffect(() => {
    if (!verificationCode) {
      console.warn('Google Search Console: No verification code provided');
      return;
    }

    // Add Google Search Console verification meta tag
    const metaTag = document.createElement('meta');
    metaTag.name = 'google-site-verification';
    metaTag.content = verificationCode;
    document.head.appendChild(metaTag);

    return () => {
      // Cleanup meta tag when component unmounts
      const existingMeta = document.querySelector('meta[name="google-site-verification"]');
      if (existingMeta) {
        document.head.removeChild(existingMeta);
      }
    };
  }, [verificationCode]);

  return null; // This component doesn't render anything
}