import { useEffect } from 'react';

export default function PWAOptimizer() {
  useEffect(() => {
    // Add PWA manifest link
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    // Add Apple-specific meta tags
    const appleMetaTags = [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: 'ClipSync Pro' },
      { name: 'apple-touch-fullscreen', content: 'yes' }
    ];

    appleMetaTags.forEach(tag => {
      if (!document.querySelector(`meta[name="${tag.name}"]`)) {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Add Apple touch icons
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = '/favicon.svg';
    document.head.appendChild(appleTouchIcon);

    // Add Microsoft tile config
    const msMetaTags = [
      { name: 'msapplication-TileColor', content: '#0066ff' },
      { name: 'msapplication-TileImage', content: '/favicon.svg' },
      { name: 'msapplication-config', content: '/browserconfig.xml' }
    ];

    msMetaTags.forEach(tag => {
      if (!document.querySelector(`meta[name="${tag.name}"]`)) {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    return () => {
      // Cleanup on unmount
      const manifestToRemove = document.querySelector('link[rel="manifest"]');
      const appleIconToRemove = document.querySelector('link[rel="apple-touch-icon"]');
      
      if (manifestToRemove) document.head.removeChild(manifestToRemove);
      if (appleIconToRemove) document.head.removeChild(appleIconToRemove);
    };
  }, []);

  return null; // This component doesn't render anything
}