import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  articleAuthor?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  structuredData?: object;
}

export default function SEOHead({
  title,
  description,
  keywords,
  ogType = "website",
  ogImage,
  ogUrl,
  twitterCard = "summary_large_image",
  canonicalUrl,
  articleAuthor,
  articlePublishedTime,
  articleModifiedTime,
  structuredData,
}: SEOHeadProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to update meta tags
    const updateMeta = (property: string, content: string, useProperty = false) => {
      const attribute = useProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);

    // Open Graph tags
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:url', ogUrl || window.location.href, true);
    
    if (ogImage) {
      const imageUrl = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
      updateMeta('og:image', imageUrl, true);
      updateMeta('og:image:width', '1200', true);
      updateMeta('og:image:height', '630', true);
    }

    // Twitter Card tags
    updateMeta('twitter:card', twitterCard);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    if (ogImage) {
      const imageUrl = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
      updateMeta('twitter:image', imageUrl);
    }

    // Article-specific meta tags
    if (articleAuthor) updateMeta('article:author', articleAuthor, true);
    if (articlePublishedTime) updateMeta('article:published_time', articlePublishedTime, true);
    if (articleModifiedTime) updateMeta('article:modified_time', articleModifiedTime, true);

    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl || window.location.href);

    // Structured data
    if (structuredData) {
      let scriptElement = document.querySelector('#structured-data');
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = 'structured-data';
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function to remove old structured data if component unmounts
    return () => {
      if (structuredData) {
        const scriptElement = document.querySelector('#structured-data');
        if (scriptElement) {
          scriptElement.remove();
        }
      }
    };
  }, [
    title,
    description,
    keywords,
    ogType,
    ogImage,
    ogUrl,
    twitterCard,
    canonicalUrl,
    articleAuthor,
    articlePublishedTime,
    articleModifiedTime,
    structuredData,
  ]);

  return null; // This component doesn't render anything visible
}