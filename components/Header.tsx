'use client';

import {
  Briefcase,
  GraduationCap,
  Home,
  Menu,
  Moon,
  Phone,
  Sun,
  Terminal,
  User,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useScrollRef } from '@/context/ScrollContext';
import { useHideHeaderOnScroll } from '@/hooks/useHideHeaderOnScroll';

import { Button } from './ui/button';
import GlassSurface from './ui/GlassSurface';
import { NavigationMenu, NavigationMenuLink } from './ui/navigation-menu';
import { navigationMenuTriggerStyle } from './ui/navigation-menu';

export function Header() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const scrollRef = useScrollRef();
  const visible = useHideHeaderOnScroll(scrollRef);
  const [openMenu, setOpenMenu] = useState(false);
  const isDark = resolvedTheme === 'dark';

  const items = [
    { icon: <Home size={20} />, href: '/#home', label: t('navigation.home') },
    { icon: <Terminal size={20} />, href: '/#projects', label: t('navigation.projects') },
    { icon: <Briefcase size={20} />, href: '/#experience', label: t('navigation.experience') },
    { icon: <GraduationCap size={20} />, href: '/#education', label: t('navigation.education') },
    { icon: <User size={20} />, href: '/#profile', label: t('navigation.profile') },
    { icon: <Phone size={20} />, href: '/#contact', label: t('navigation.contact') },
  ];

  const currentLanguage = i18n.language;
  const buttonLabel = currentLanguage === 'fr' ? 'FR' : 'EN';
  const changeLanguage = (lang: 'fr' | 'en') => i18n.changeLanguage(lang);

  return (
    <div
      className={`fixed top-4 left-0 right-0 w-full z-50
    transition-transform duration-400 ease-out
    ${!visible ? '-translate-y-full blur-sm' : 'translate-y-0 blur-0'}`}
    >
      {/* Wrapper header */}
      <div className="relative flex items-center justify-center w-full gap-4">
        {/* Desktop Menu */}
        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={24}
          className="hidden md:flex p-1"
        >
          <NavigationMenu className="hidden md:flex justify-center gap-4">
            {items.map((item) => (
              <NavigationMenuLink key={item.href} asChild>
                <Link
                  href={item.href}
                  className={
                    navigationMenuTriggerStyle() +
                    ' transition-all duration-200 ease-out p-6 rounded-xl hover:-translate-y-1'
                  }
                >
                  <div className="flex flex-col items-center gap-1 p-2">
                    <div className="text-gray-800/60 dark:text-gray-100">
                      {item.icon}
                    </div>
                    <span className="text-xs text-black dark:text-gray-100 group-hover:text-black font-medium">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenu>
        </GlassSurface>

        {/* Mobile Menu + boutons thème/langue visibles */}
        <div className="flex md:hidden w-full items-center justify-between px-4">
          <Popover open={openMenu} onOpenChange={setOpenMenu}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="p-2" aria-label="Menu">
                <Menu size={24} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              sideOffset={8}
              className="w-screen flex items-center justify-center px-0"
            >
              <NavigationMenu className="grid grid-flow-row grid-cols-3 gap-2">
                {items.map((item) => (
                  <NavigationMenuLink key={item.href} asChild>
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(false)}
                      className={
                        navigationMenuTriggerStyle() +
                        ' transition-all duration-200 ease-out p-6 rounded-xl hover:-translate-y-1'
                      }
                    >
                      <div className="flex flex-col items-center gap-1 p-2">
                        <div className="text-gray-800/60 dark:text-gray-100">
                          {item.icon}
                        </div>
                        <span className="text-xs text-black group-hover:text-black font-medium">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Thème + langue sur mobile (à droite) */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="size-10 rounded-xl p-0 md:size-9"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex h-10 min-w-10 items-center gap-1.5 rounded-xl px-3 text-xs font-medium md:h-9 md:min-w-0"
              onClick={() => changeLanguage(currentLanguage === 'fr' ? 'en' : 'fr')}
              aria-label={currentLanguage === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              <Globe size={18} />
              {buttonLabel}
            </Button>
          </div>
        </div>

        {/* Bouton thème + langue (desktop uniquement, position absolue) */}
        <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-2 md:flex md:right-6">
          <Button
            variant="outline"
            size="sm"
            className="size-9 rounded-xl p-0"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-xl px-3 text-xs font-medium"
            onClick={() => changeLanguage(currentLanguage === 'fr' ? 'en' : 'fr')}
            aria-label={currentLanguage === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <Globe size={16} />
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
