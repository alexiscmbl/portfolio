import { useEffect, useRef, useState } from 'react';

export function useHideHeaderOnScroll(
  containerRef?: React.RefObject<HTMLElement>,
) {
  const lastScroll = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef?.current || window;

    const getScroll = () =>
      el === window ? window.scrollY : (el as HTMLElement).scrollTop;

    const onScroll = () => {
      const current = getScroll();

      if (current <= 0) {
        setVisible(true);
      } else if (current > lastScroll.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScroll.current = current;
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [containerRef]);

  return visible;
}
