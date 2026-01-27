'use client';

import '../../config/i18n';
import React, { useEffect, useRef, useState } from 'react';

import { ScrollRefContext } from '@/context/ScrollContext';

import { Header } from '../../components/Header';
import { Plasma } from '../../components/ui/Plasma';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ScrollRefContext.Provider value={scrollRef}>
      <div
        ref={scrollRef}
        className="relative h-screen w-full flex flex-col overflow-y-auto scroll-smooth"
      >
        {/* Plasma en arrière-plan */}
        <div className="fixed inset-0 -z-10">
          <Plasma
            color="#C4C4C4"
            speed={0.6}
            direction="forward"
            scale={1.1}
            opacity={0.8}
            mouseInteractive={false}
          />
        </div>

        <div className="relative z-10 flex flex-col min-h-full w-full">
          {/* Header fixed */}
          <Header />

          {/* Contenu principal avec padding pour le header */}
          <main className="pt-24 flex-1 w-full">{children}</main>

          {/* Footer collé en bas du contenu */}
          <footer className="mt-auto p-4 text-center text-sm text-black">
            © {new Date().getFullYear()} Alexis Cesmat-Belliard. Tous droits
            réservés.
          </footer>
        </div>
      </div>
    </ScrollRefContext.Provider>
  );
}
