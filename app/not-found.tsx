'use client';

import { useRouter } from 'next/navigation';

import { Button } from '../components/ui/button';
import FuzzyText from '../components/ui/FuzzyText';
import { useIsMobile } from '../hooks/useIsMobile';
export default function NotFound() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const fontSize = isMobile ? 64 : 128;

  return (
    <div className="w-full flex flex-col justify-center items-center h-full gap-5">
      <FuzzyText
        fontSize={fontSize}
        color="#000"
        baseIntensity={isMobile ? 0.3 : 0.5}
        hoverIntensity={0.25}
        enableHover
      >
        404
      </FuzzyText>
      <p className="text-center font-bold text-lg">
        Désolé, la page que vous recherchez n&apos;existe pas.
      </p>
      <Button size="sm" variant="outline" onClick={() => router.push('/')}>
        Retour à la page d&apos;accueil
      </Button>
    </div>
  );
}
