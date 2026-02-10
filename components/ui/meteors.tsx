import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export interface MeteorsProps {
  className?: string
  children?: React.ReactNode
  /** Theme: dark = fond noir, light = fond clair */
  variant?: 'dark' | 'light'
  /** Number of meteors */
  count?: number
  /** Meteor angle in degrees (215 = diagonal down-left) */
  angle?: number
  /** Meteor color (override auto theme color) */
  color?: string
  /** Tail gradient color (override auto theme color) */
  tailColor?: string
}

interface MeteorData {
  id: number
  left: number
  delay: number
  duration: number
}

const THEME = {
  dark: {
    bg: 'bg-black',
    meteor: '#ffffff',
    tail: '#ffffff',
    overlay: `
      radial-gradient(ellipse at 50% 0%, rgba(30, 40, 60, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 100%, rgba(20, 20, 40, 0.2) 0%, transparent 50%)
    `,
    vignette:
      'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(10,10,15,0.8) 100%)',
    meteorShadow: '0 0 0 1px rgba(255,255,255,0.1)',
  },
  light: {
    bg: 'bg-neutral-50',
    meteor: '#000000',
    tail: '#000000',
    overlay: `
      radial-gradient(ellipse at 50% 0%, rgba(148, 163, 184, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 100%, rgba(100, 116, 139, 0.1) 0%, transparent 50%)
    `,
    vignette:
      'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(248,250,252,0.6) 100%)',
    meteorShadow: '0 0 0 1px rgba(0,0,0,0.06)',
  },
} as const;

export function Meteors({
  className,
  children,
  variant = 'dark',
  count = 20,
  angle = 215,
  color,
  tailColor,
}: MeteorsProps) {
  const [meteors, setMeteors] = useState<MeteorData[]>([]);
  const theme = THEME[variant];
  const meteorColor = color ?? theme.meteor;
  const meteorTailColor = tailColor ?? theme.tail;

  // Generate meteor data on client only to avoid hydration mismatch
  useEffect(() => {
    setMeteors(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: i * (100 / count), // Evenly distribute across width
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 7,
      })),
    );
  }, [count]);

  return (
    <div
      className={cn(
        'fixed inset-0 overflow-hidden transition-colors duration-300 ease-out',
        theme.bg,
        className,
      )}
    >
      {/* Keyframe animation - uses vmax for viewport scaling */}
      <style>{`
        @keyframes meteor-fall {
          0% {
            transform: rotate(${angle}deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(${angle}deg) translateX(-100vmax);
            opacity: 0;
          }
        }
      `}</style>

      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.overlay }}
      />

      {/* Meteors */}
      {meteors.map(meteor => (
        <span
          key={meteor.id}
          className="absolute h-0.5 w-0.5 rounded-full"
          style={{
            top: '-40px',
            left: `${meteor.left}%`,
            backgroundColor: meteorColor,
            boxShadow: theme.meteorShadow,
            animation: `meteor-fall ${meteor.duration}s linear infinite`,
            animationDelay: `${meteor.delay}s`,
          }}
        >
          {/* Tail */}
          <span
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: '100%',
              width: '50px',
              height: '1px',
              background: `linear-gradient(to right, ${meteorTailColor}, transparent)`,
            }}
          />
        </span>
      ))}

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.vignette }}
      />

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}

export default Meteors;
