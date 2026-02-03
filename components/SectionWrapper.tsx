'use client';

import { motion } from 'framer-motion';

import { useScrollRef } from '@/context/ScrollContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useScrollDirection } from '@/hooks/useScrollDirection';

import GlassSurface from './ui/GlassSurface';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ children, className }: SectionWrapperProps) {
  const scrollRef = useScrollRef();
  const direction = useScrollDirection({ scrollRef });
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : direction === 'up' ? 40 : -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0 : 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.15 }}
      className={`w-full flex justify-center ${className ?? ''}`}
    >
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={20}
        className="w-full max-w-2xl px-4 py-4 sm:px-6 sm:py-5 md:max-w-4xl md:rounded-2xl md:px-8 md:py-6 lg:max-w-5xl xl:max-w-6xl"
        reducedMotion={isMobile}
      >
        {children}
      </GlassSurface>
    </motion.div>
  );
}
