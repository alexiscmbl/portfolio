import { useEffect, useState } from 'react';

interface ScrollDirectionProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function useScrollDirection({ scrollRef }: ScrollDirectionProps) {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = scrollRef?.current;
      if (!scrollElement) return;

      const currentScrollTop = scrollElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else if (currentScrollTop < lastScrollTop) {
        setScrollDirection('up');
      }
      setLastScrollTop(currentScrollTop);
    };
    const scrollElement = scrollRef?.current || window;
    scrollElement.addEventListener('scroll', handleScroll);
  }, [lastScrollTop, scrollRef]);
  return scrollDirection;
}
