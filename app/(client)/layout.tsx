'use client';

import '@/config/i18n';
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/NavigationMenu';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { Plasma } from '@/components/ui/Plasma';
import { usePathname } from 'next/navigation';
import GlassSurface from '@/components/ui/GlassSurface';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { i18n } = useTranslation();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (lang: 'en' | 'fr') => i18n.changeLanguage(lang);

  const currentLanguage = i18n.language;
  const buttonLabel = currentLanguage === 'fr' ? 'Français' : 'English';

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col">
      {mounted && pathname === '/' && (
        <div className="absolute inset-0 -z-10">
          <Plasma
            color="#4a4a4a"
            speed={0.6}
            direction="forward"
            scale={1.1}
            opacity={0.8}
            mouseInteractive={false}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center h-full w-full p-4">
        {/* Bouton langue en haut à droite sur desktop */}
        <div className="absolute top-4 right-4 hidden md:flex">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              changeLanguage(currentLanguage === 'fr' ? 'en' : 'fr')
            }
          >
            <Globe />
            {buttonLabel}
          </Button>
        </div>

        {/* Header centré */}
        <div className="flex flex-wrap gap-4 items-center justify-center w-full border">
          {mounted ? (
            <GlassSurface
              width="auto"
              height="auto"
              borderRadius={24}
              className="p-1"
            >
              <Header />
            </GlassSurface>
          ) : (
            <Header />
          )}

          {/* Bouton visible uniquement sur mobile */}
          <div className="flex justify-end gap-2 md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                changeLanguage(currentLanguage === 'fr' ? 'en' : 'fr')
              }
            >
              <Globe />
              {buttonLabel}
            </Button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          {pathname === '/' ? (
            <GlassSurface
              width="auto"
              height="auto"
              borderRadius={24}
              className="p-1"
            >
              {children}
            </GlassSurface>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        <footer className="p-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Alexis Cesmat-Belliard. Tous droits
          réservés.
        </footer>
      </div>
    </div>
  );
}
