import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 1025;

/**
 * Hook pour détecter si l'utilisateur est sur mobile ou tablette (largeur < 1024px).
 * Par défaut true pour éviter de charger du contenu lourd (ex: WebGL) avant le premier paint.
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
