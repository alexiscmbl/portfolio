'use client';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Dock from './ui/Dock';
import { Briefcase, Home, Phone, Terminal, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const { t } = useTranslation();
  const router = useRouter();

  const items = [
    {
      icon: <Home size={18} />,
      onClick: () => {
        router.push('/');
      },
      label: t('navigation.home'),
    },
    {
      icon: <Terminal size={18} />,
      onClick: () => {
        router.push('/projects');
      },
      label: t('navigation.projects'),
    },
    {
      icon: <Briefcase size={18} />,
      onClick: () => {
        router.push('/experience');
      },
      label: t('navigation.experience'),
    },
    {
      icon: <User size={18} />,
      onClick: () => {
        router.push('/profile');
      },
      label: t('navigation.profile'),
    },
    {
      icon: <Phone size={18} />,
      onClick: () => {
        router.push('/contact');
      },
      label: t('navigation.contact'),
    },
  ];

  return <Dock items={items} />;
}
