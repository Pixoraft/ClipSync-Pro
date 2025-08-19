import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  alternateLocales?: string[];
}

export default function SEOHead({
  title,
  description,
  keywords = "clipboard manager, copy paste app, ClipSync Pro, clipboard sync, Windows clipboard, Linux clipboard, best clipboard software, productivity tools, clipboard history",
  canonical,
  ogImage = "https://clipsync-pro.replit.app/og-image.svg",
  ogType = "website",
  structuredData,
  noIndex = false,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  locale = "en_US",
  alternateLocales = []
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };
    
    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('author', 'ClipSync Pro Team');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('bingbot', 'index, follow');
    updateMetaTag('slurp', 'index, follow');
    
    // Additional SEO meta tags
    updateMetaTag('theme-color', '#0066ff');
    updateMetaTag('msapplication-TileColor', '#0066ff');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    updateMetaTag('application-name', 'ClipSync Pro');
    updateMetaTag('apple-mobile-web-app-title', 'ClipSync Pro');
    updateMetaTag('format-detection', 'telephone=no');
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('msapplication-tap-highlight', 'no');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', title, true);
    updateMetaTag('og:site_name', 'ClipSync Pro - Best Clipboard Manager', true);
    updateMetaTag('og:locale', locale, true);
    
    // Additional Open Graph tags for articles
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true);
    }
    if (section) {
      updateMetaTag('article:section', section, true);
    }
    if (tags.length > 0) {
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.content = tag;
        document.head.appendChild(meta);
      });
    }
    
    // Alternate locales
    alternateLocales.forEach(altLocale => {
      updateMetaTag(`og:locale:alternate`, altLocale, true);
    });
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', title);
    updateMetaTag('twitter:creator', '@ClipSyncPro');
    updateMetaTag('twitter:site', '@ClipSyncPro');
    updateMetaTag('twitter:domain', window.location.hostname);
    
    // LinkedIn specific tags
    updateMetaTag('linkedin:owner', 'ClipSync Pro', true);
    
    // Pinterest specific tags
    updateMetaTag('pinterest-rich-pin', 'true');
    
    // Facebook specific tags
    updateMetaTag('fb:app_id', '1234567890', true); // Replace with actual Facebook App ID if available
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      if (canonicalLink) {
        canonicalLink.href = canonical;
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = canonical;
        document.head.appendChild(canonicalLink);
      }
    }
    
    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (script) {
        script.textContent = JSON.stringify(structuredData);
      } else {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    }
    
  }, [title, description, keywords, canonical, ogImage, ogType, structuredData, noIndex]);
  
  return null; // This component doesn't render anything
}