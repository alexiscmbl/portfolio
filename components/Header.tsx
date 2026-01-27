'use client';

import {
  Briefcase,
  Home,
  Phone,
  Terminal,
  User,
  Menu,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
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
  const scrollRef = useScrollRef();
  const visible = useHideHeaderOnScroll(scrollRef);

  const items = [
    { icon: <Home size={20} />, href: '#home', label: t('navigation.home') },
    {
      icon: <Terminal size={20} />,
      href: '#projects',
      label: t('navigation.projects'),
    },
    {
      icon: <Briefcase size={20} />,
      href: '#experience',
      label: t('navigation.experience'),
    },
    {
      icon: <User size={20} />,
      href: '#profile',
      label: t('navigation.profile'),
    },
    {
      icon: <Phone size={20} />,
      href: '#contact',
      label: t('navigation.contact'),
    },
  ];

  const currentLanguage = i18n.language;
  const buttonLabel = currentLanguage === 'fr' ? 'Français' : 'English';
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
                    <span className="text-xs text-black group-hover:text-black font-medium">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenu>
        </GlassSurface>

        {/* Mobile Menu */}
        <div className="flex md:hidden justify-between w-full px-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="p-2">
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
        </div>

        {/* Bouton langue unique visible sur toutes tailles */}
        <div className="absolute top-0 right-4">
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
    </div>
  );
}
