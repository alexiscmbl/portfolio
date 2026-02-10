import { useEffect, useRef, useState } from 'react';

interface ScrollDirectionProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function useScrollDirection({ scrollRef }: ScrollDirectionProps) {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const scrollElement = scrollRef?.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const currentScrollTop = scrollElement.scrollTop;
      if (currentScrollTop > lastScrollTopRef.current) {
        setScrollDirection('down');
      } else if (currentScrollTop < lastScrollTopRef.current) {
        setScrollDirection('up');
      }
      lastScrollTopRef.current = currentScrollTop;
    };

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);
  return scrollDirection;
}
