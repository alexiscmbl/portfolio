'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '../components/ui/button';
import FuzzyText from '../components/ui/FuzzyText';

export default function NotFound() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const fuzzyColor = isDark ? 'oklch(0.985 0 0)' : 'oklch(0.145 0 0)';

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6 px-4 py-8 bg-background text-foreground">
      <div className="flex flex-col items-center gap-5 max-w-md w-full">
        <div className="w-full flex justify-center overflow-hidden">
          <FuzzyText
            fontSize="clamp(3rem, 20vw, 8rem)"
            color={mounted ? fuzzyColor : 'oklch(0.145 0 0)'}
            baseIntensity={0.4}
            hoverIntensity={0.25}
            enableHover
          >
            404
          </FuzzyText>
        </div>
        <p className="text-center font-bold text-base sm:text-lg text-foreground">
          Désolé, la page que vous recherchez n&apos;existe pas.
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push('/')}
          className="w-full sm:w-auto"
        >
          Retour à la page d&apos;accueil
        </Button>
      </div>
    </div>
  );
}
