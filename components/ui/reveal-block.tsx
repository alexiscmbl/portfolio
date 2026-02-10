'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right';

interface RevealBlockProps {
  children: React.ReactNode;
  className?: string;
  /** Direction d'entrée */
  direction?: Direction;
  /** Délai en secondes */
  delay?: number;
  /** Réduire la distance de l'animation */
  amount?: number;
  /** Désactiver l'animation (pour prefers-reduced-motion) */
  disabled?: boolean;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export function RevealBlock({
  children,
  className,
  direction = 'up',
  delay = 0,
  amount = 20,
  disabled = false,
}: RevealBlockProps) {
  const { x, y } = offsets[direction];

  if (disabled) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x: x * (amount / 20), y: y * (amount / 20) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
