import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

export const useScrollAnimations = (count: number, options: UseScrollAnimationOptions = {}) => {
  const [visibleItems, setVisibleItems] = useState(new Set<number>());
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            if (entry.isIntersecting) {
              setVisibleItems(prev => new Set([...Array.from(prev), index]));
            } else if (!options.triggerOnce) {
              setVisibleItems(prev => {
                const newSet = new Set(Array.from(prev));
                newSet.delete(index);
                return newSet;
              });
            }
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [count, options.threshold, options.rootMargin, options.triggerOnce]);

  const setRef = (index: number) => (element: HTMLElement | null) => {
    refs.current[index] = element;
  };

  const isVisible = (index: number) => visibleItems.has(index);

  return { setRef, isVisible };
};