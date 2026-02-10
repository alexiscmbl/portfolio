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
      initial={{ opacity: 0, y: direction === 'up' ? 40 : -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.15 }}
      className={`w-full flex justify-center ${className ?? ''}`}
    >
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={20}
        className="min-w-0 max-w-2xl px-4 py-4 sm:px-6 sm:py-5 md:max-w-2xl md:rounded-2xl md:px-8 md:py-6 lg:max-w-3xl"
        reducedMotion={isMobile}
      >
        {children}
      </GlassSurface>
    </motion.div>
  );
}
