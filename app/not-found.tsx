'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FuzzyText from '@/components/ui/FuzzyText';
import { useIsMobile } from '@/hooks/useIsMobile';
export default function NotFound() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const fontSize = isMobile ? 64 : 128;

  return (
    <div className="w-full flex flex-col justify-center items-center h-full gap-2">
      <FuzzyText
        fontSize={fontSize}
        color="#000"
        baseIntensity={isMobile ? 0.3 : 0.5}
        hoverIntensity={0.25}
        enableHover
      >
        404
      </FuzzyText>
      <FuzzyText
        fontSize={isMobile ? 13 : 23}
        color="#000"
        baseIntensity={isMobile ? 0.08 : 0.15}
        hoverIntensity={0.08}
        enableHover
      >
        Désolé, la page que vous recherchez n&apos;existe pas.
      </FuzzyText>
      <Button variant="outline" onClick={() => router.push('/')}>
        <FuzzyText
          fontSize={isMobile ? 15 : 18}
          color="#000"
          baseIntensity={0.05}
          hoverIntensity={0}
          enableHover
        >
          Retour à la page d&apos;accueil
        </FuzzyText>
      </Button>
    </div>
  );
}
