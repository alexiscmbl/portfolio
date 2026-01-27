'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import BlurText from '../../ui/BlurText';

export default function HomeSection() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <BlurText
        key={t('welcome')}
        text={t('welcome')}
        delay={150}
        animateBy="words"
        direction="top"
        className="text-2xl"
      />
      <BlurText
        key={t('description')}
        text={t('description')}
        delay={100}
        animateBy="words"
        direction="bottom"
        className="mt-4 text-center max-w-xl"
      />
    </div>
  );
}
