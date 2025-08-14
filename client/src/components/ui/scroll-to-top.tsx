import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
    }`}>
      <Button
        onClick={scrollToTop}
        className="w-14 h-14 bg-gradient-to-r from-electric to-cyber rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transform transition-all duration-300 glow-effect"
        data-testid="button-scroll-to-top"
      >
        <i className="fas fa-chevron-up text-lg"></i>
      </Button>
    </div>
  );
}