import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  articleAuthor?: string;
  articlePublishedTime?: string;
  structuredData?: Record<string, any>;
}

export default function SEOHead({
  title,
  description,
  keywords = "clipboard manager, productivity tool, linux clipboard, windows clipboard, free software, copy paste manager, text management, developer tools",
  canonical,
  ogImage = "/og-image.png",
  ogType = "website",
  articleAuthor,
  articlePublishedTime,
  structuredData
}: SEOHeadProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMeta = (property: string, content: string, useProperty = false) => {
      const selector = useProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (useProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Helper function to update or create link tags
    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('robots', 'index, follow');
    updateMeta('viewport', 'width=device-width, initial-scale=1.0');
    updateMeta('theme-color', '#0080FF');

    // Open Graph meta tags
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:image', `${window.location.origin}${ogImage}`, true);
    updateMeta('og:url', window.location.href, true);
    updateMeta('og:site_name', 'ClipFlow Pro', true);

    // Twitter Card meta tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', `${window.location.origin}${ogImage}`);

    // Article meta tags (for blog posts, etc.)
    if (articleAuthor) {
      updateMeta('article:author', articleAuthor, true);
    }
    if (articlePublishedTime) {
      updateMeta('article:published_time', articlePublishedTime, true);
    }

    // Canonical URL
    if (canonical) {
      updateLink('canonical', canonical);
    } else {
      updateLink('canonical', window.location.href);
    }

    // Structured data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Favicon links
    updateLink('icon', '/favicon.ico');
    updateLink('icon', '/favicon.svg');
    updateLink('apple-touch-icon', '/favicon.svg');

  }, [title, description, keywords, canonical, ogImage, ogType, articleAuthor, articlePublishedTime, structuredData]);

  return null;
}