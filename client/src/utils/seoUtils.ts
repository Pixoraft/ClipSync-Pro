// SEO Utility Functions for ClipSync Pro

interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: any;
}

// Default SEO configuration
export const defaultSeo: SeoConfig = {
  title: 'ClipSync Pro - Best Free Clipboard Manager for Windows & Linux',
  description: 'Professional clipboard manager with AI-powered search, secure local storage, and cross-platform support. Free forever with all premium features. Download ClipSync Pro today.',
  keywords: 'clipboard manager, copy paste app, ClipSync Pro, clipboard sync, Windows clipboard, Linux clipboard, best clipboard software, productivity tools, clipboard history, free clipboard manager, cross-platform clipboard, AI clipboard search',
  ogImage: 'https://clipsync-pro.replit.app/og-image.svg'
};

// Generate page-specific SEO configuration
export function generatePageSeo(pageType: string, customData?: Partial<SeoConfig>): SeoConfig {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://clipsync-pro.replit.app';
  
  const seoConfigs: Record<string, SeoConfig> = {
    home: {
      title: 'ClipSync Pro - Best Free Clipboard Manager for Windows & Linux',
      description: 'Professional clipboard manager with AI-powered search, secure local storage, and cross-platform support. Free forever with all premium features. Download ClipSync Pro today.',
      keywords: 'clipboard manager, copy paste app, ClipSync Pro, clipboard sync, Windows clipboard, Linux clipboard, best clipboard software, productivity tools, clipboard history, free clipboard manager',
      canonical: `${baseUrl}/`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ClipSync Pro",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": ["Linux", "Windows"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    about: {
      title: 'About ClipSync Pro - Our Mission & Vision for Productivity Innovation',
      description: 'Learn about ClipSync Pro\'s mission to revolutionize clipboard management through intelligent tools and seamless productivity solutions for professionals and creators.',
      keywords: 'about ClipSync Pro, clipboard management company, productivity software mission, clipboard innovation, professional tools, workflow optimization',
      canonical: `${baseUrl}/about`
    },
    pricing: {
      title: 'ClipSync Pro Pricing - 100% Free Forever | No Subscriptions',
      description: 'ClipSync Pro is completely free forever with all premium features included. No subscriptions, no hidden costs, no limitations. Download and enjoy professional clipboard management today.',
      keywords: 'ClipSync Pro pricing, free clipboard manager, no subscription software, free productivity tools, premium features free',
      canonical: `${baseUrl}/pricing`
    },
    downloads: {
      title: 'Download ClipSync Pro - Free Clipboard Manager for Windows & Linux',
      description: 'Download the world\'s most advanced clipboard manager. Free forever with full features for Linux and Windows. Easy installation and immediate productivity boost.',
      keywords: 'download ClipSync Pro, clipboard manager download, Windows clipboard software, Linux clipboard app, free download, productivity software',
      canonical: `${baseUrl}/downloads`
    },
    contact: {
      title: 'Contact ClipSync Pro - Get Support & Share Feedback',
      description: 'Get support, provide feedback, or ask questions about ClipSync Pro clipboard manager. We\'re here to help improve your productivity experience.',
      keywords: 'ClipSync Pro contact, clipboard manager support, customer service, feedback, help, technical support',
      canonical: `${baseUrl}/contact`
    },
    blog: {
      title: 'ClipSync Pro Blog - Productivity Tips, Tutorials & Clipboard Management',
      description: 'Discover the latest productivity tips, clipboard management tutorials, and workflow optimization strategies. Learn from experts and maximize your efficiency.',
      keywords: 'clipboard manager blog, productivity tips, workflow optimization, tutorials, clipboard management, efficiency tips, power user guides',
      canonical: `${baseUrl}/blog`
    }
  };

  const config = seoConfigs[pageType] || defaultSeo;
  
  // Merge with custom data if provided
  return {
    ...config,
    ...customData,
    ogImage: customData?.ogImage || config.ogImage || defaultSeo.ogImage
  };
}

// Generate blog post SEO
export function generateBlogPostSeo(post: {
  title: string;
  metaDescription?: string;
  slug: string;
  category: string;
  keywords?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  ogImage?: string;
}): SeoConfig {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://clipsync-pro.replit.app';
  
  return {
    title: `${post.title} | ClipSync Pro Blog`,
    description: post.metaDescription || `Read ${post.title} on ClipSync Pro blog. Discover productivity tips and clipboard management insights.`,
    keywords: post.keywords || `${post.title}, clipboard manager, productivity, ${post.category}`,
    canonical: `${baseUrl}/blog/${post.slug}`,
    ogImage: post.ogImage ? `${baseUrl}${post.ogImage}` : `${baseUrl}/og-image.svg`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "url": `${baseUrl}/blog/${post.slug}`,
      "datePublished": post.publishedAt,
      "dateModified": post.updatedAt,
      "author": {
        "@type": "Organization",
        "name": post.author || "ClipSync Pro Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ClipSync Pro",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/og-image.svg`
        }
      }
    }
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: Array<{question: string; answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate Organization structured data
export function generateOrganizationStructuredData() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://clipsync-pro.replit.app';
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ClipSync Pro",
    "description": "Professional clipboard management software for Windows and Linux",
    "url": baseUrl,
    "logo": `${baseUrl}/og-image.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "vivekrvt84@gmail.com",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://twitter.com/ClipSyncPro"
    ],
    "foundingDate": "2024",
    "slogan": "Professional clipboard management made simple"
  };
}

// Clean and optimize meta descriptions
export function optimizeMetaDescription(description: string, maxLength: number = 155): string {
  if (description.length <= maxLength) return description;
  
  // Find the last complete sentence within the limit
  const truncated = description.substring(0, maxLength);
  const lastSentenceEnd = truncated.lastIndexOf('.');
  
  if (lastSentenceEnd > 0 && lastSentenceEnd > maxLength * 0.7) {
    return description.substring(0, lastSentenceEnd + 1);
  }
  
  // If no good sentence break, find last space
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? description.substring(0, lastSpace) + '...' : truncated + '...';
}

// Generate keywords from content
export function generateKeywords(content: string, baseKeywords: string[] = []): string {
  // This is a simplified keyword extraction
  // In a real application, you might use a more sophisticated NLP library
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);
    
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  const topKeywords = Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
    
  const allKeywords = [...baseKeywords, ...topKeywords];
  return Array.from(new Set(allKeywords)).join(', ');
}