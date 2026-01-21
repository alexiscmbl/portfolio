'use client';

import { motion } from 'framer-motion';
import GlassSurface from './ui/GlassSurface';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useScrollRef } from '@/context/ScrollContext';

interface SectionWrapperProps {
  children: React.ReactNode;
}

export default function SectionWrapper({ children }: SectionWrapperProps) {
  const scrollRef = useScrollRef();
  const direction = useScrollDirection({ scrollRef });

  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'up' ? 80 : -80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
      className="w-full flex justify-center"
    >
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={24}
        className="p-1"
      >
        {children}
      </GlassSurface>
    </motion.div>
  );
}
