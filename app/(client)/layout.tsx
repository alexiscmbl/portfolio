'use client';

import '../../config/i18n';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';

import { ScrollRefContext } from '@/context/ScrollContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';

import { Header } from '../../components/Header';
import { Meteors } from '../../components/ui/meteors';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const meteorsVariant = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <ScrollRefContext.Provider value={scrollRef}>
      <div
        ref={scrollRef}
        className="relative h-screen w-full flex flex-col overflow-y-auto scroll-smooth"
      >
        {/* Fond animé : moins de météores + décalé à gauche sur mobile, même angle */}
        <div
          className={cn(
            'fixed inset-0 -z-20',
            isMobile && 'w-[120%] -translate-x-[10%]',
          )}
        >
          <Meteors
            className="h-full w-full"
            variant={meteorsVariant}
            count={isMobile ? 28 : 75}
            angle={255}
          />
        </div>
        {/* Overlay léger pour renforcer la lisibilité du contenu */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-linear-to-b from-background/30 via-background/15 to-background/40 transition-colors duration-300 ease-out"
          aria-hidden
        />

        <div className="relative z-10 flex flex-col min-h-full w-full">
          {/* Header fixed */}
          <Header />

          {/* Contenu principal avec padding pour le header */}
          <main className="pt-24 flex-1 w-full">{children}</main>

          {/* Footer collé en bas du contenu */}
          <footer className="mt-auto p-4 text-center text-sm text-foreground">
            © {new Date().getFullYear()} Alexis Cesmat-Belliard. Tous droits
            réservés.
          </footer>
        </div>
      </div>
    </ScrollRefContext.Provider>
  );
}
