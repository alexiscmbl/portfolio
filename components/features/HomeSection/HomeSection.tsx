'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import BlurText from '../../ui/BlurText';

export default function HomeSection() {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center px-2 py-4 sm:py-6 md:py-8">
      <BlurText
        key={t('welcome')}
        text={t('welcome')}
        delay={150}
        animateBy="words"
        direction="top"
        className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl lg:text-3xl text-foreground"
      />
      <BlurText
        key={t('description')}
        text={t('description')}
        delay={100}
        animateBy="words"
        direction="bottom"
        className="mt-3 text-center text-sm text-muted-foreground sm:mt-4 sm:text-base md:max-w-xl md:text-lg"
      />
    </div>
  );
}
