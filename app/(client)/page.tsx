'use client';

import BlurText from '@/components/ui/BlurText';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-full w-full">
      <BlurText
        key={t('welcome')}
        text={t('welcome')}
        delay={150}
        animateBy="words"
        direction="top"
        className="text-2xl"
      />
    </div>
  );
}
