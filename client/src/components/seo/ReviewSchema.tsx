import { useEffect } from 'react';

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
  itemName: string;
  itemDescription?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export default function ReviewSchema({ 
  reviews, 
  itemName, 
  itemDescription,
  aggregateRating 
}: ReviewSchemaProps) {
  useEffect(() => {
    if (reviews.length === 0) return;

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": itemName,
      "description": itemDescription || `${itemName} - Professional clipboard management software`,
      "review": reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": "5"
        },
        "reviewBody": review.reviewBody,
        "datePublished": review.datePublished
      })),
      ...(aggregateRating && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": aggregateRating.ratingValue,
          "reviewCount": aggregateRating.reviewCount
        }
      })
    };

    // Remove existing review schema if it exists
    const existingScript = document.querySelector('script[data-review-schema="true"]');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Add new review schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-review-schema', 'true');
    script.textContent = JSON.stringify(reviewSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-review-schema="true"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [reviews, itemName, itemDescription, aggregateRating]);

  return null; // This component doesn't render anything
}