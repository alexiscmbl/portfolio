'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  as?: 'h2' | 'h3';
}

const titleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function SectionTitle({ title, subtitle, className, as: Tag = 'h2' }: SectionTitleProps) {
  return (
    <motion.div
      className={cn('text-center', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={titleVariants}
    >
      <Tag className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {title}
      </Tag>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base md:mt-3">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
