import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Hook pour détecter si l'utilisateur est sur mobile (largeur < 768px).
 * Par défaut true pour éviter de charger du contenu lourd (ex: WebGL) avant le premier paint sur mobile.
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
};
