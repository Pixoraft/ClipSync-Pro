import { useEffect } from 'react';

interface LocalBusinessSchemaProps {
  businessName?: string;
  description?: string;
  address?: {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  hours?: {
    day: string;
    opens: string;
    closes: string;
  }[];
}

export default function LocalBusinessSchema({
  businessName = "ClipSync Pro",
  description = "Professional clipboard management software development",
  address,
  phone,
  email = "vivekrvt84@gmail.com",
  website,
  hours = []
}: LocalBusinessSchemaProps) {
  useEffect(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://clipsync-pro.replit.app';
    
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": businessName,
      "description": description,
      "url": website || baseUrl,
      "email": email,
      ...(phone && { "telephone": phone }),
      ...(address && {
        "address": {
          "@type": "PostalAddress",
          "streetAddress": address.streetAddress,
          "addressLocality": address.city,
          "addressRegion": address.state,
          "postalCode": address.postalCode,
          "addressCountry": address.country
        }
      }),
      ...(hours.length > 0 && {
        "openingHoursSpecification": hours.map(hour => ({
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": hour.day,
          "opens": hour.opens,
          "closes": hour.closes
        }))
      }),
      "sameAs": [
        "https://twitter.com/ClipSyncPro"
      ],
      "founder": {
        "@type": "Organization",
        "name": "ClipSync Pro Team"
      },
      "numberOfEmployees": "1-10",
      "foundingDate": "2024",
      "slogan": "Professional clipboard management made simple",
      "keywords": "clipboard manager, productivity software, Windows software, Linux software, copy paste tools"
    };

    // Remove existing local business schema if it exists
    const existingScript = document.querySelector('script[data-local-business-schema="true"]');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Add new local business schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-local-business-schema', 'true');
    script.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-local-business-schema="true"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [businessName, description, address, phone, email, website, hours]);

  return null; // This component doesn't render anything
}