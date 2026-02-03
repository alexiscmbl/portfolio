'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TimelineItemProps {
  /** Date ou période (ex. "2023 – Aujourd'hui") */
  date: string;
  /** Titre du poste ou de l’événement */
  title: string;
  /** Sous-titre (entreprise, lieu) */
  subtitle?: string;
  /** Description ou liste de points */
  children?: React.ReactNode;
  /** Icône optionnelle (composant React) */
  icon?: React.ReactNode;
  /** Dernier item : ne pas afficher la ligne en dessous */
  isLast?: boolean;
  _index?: number;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  } as const),
};

export function TimelineItem({
  date,
  title,
  subtitle,
  children,
  icon,
  isLast = false,
  _index = 0,
}: TimelineItemProps) {
  return (
    <motion.li
      className="relative flex gap-4 pb-8 last:pb-0 sm:gap-6"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      custom={_index}
    >
      {/* Ligne verticale */}
      {!isLast && (
        <span
          className="absolute left-[11px] top-8 bottom-0 w-px bg-linear-to-b from-primary/50 to-transparent sm:left-[15px]"
          aria-hidden
        />
      )}
      {/* Point / icône */}
      <span
        className={cn(
          'relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm sm:size-8',
          icon && 'bg-primary/10'
        )}
      >
        {icon ? (
          <span className="text-primary [&>svg]:size-3.5 sm:[&>svg]:size-4">{icon}</span>
        ) : (
          <span className="size-2 rounded-full bg-primary" />
        )}
      </span>
      {/* Contenu */}
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">{date}</p>
        <h3 className="mt-1 font-semibold text-foreground sm:text-lg">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
        {children && <div className="mt-2 text-sm text-muted-foreground [&>ul]:list-disc [&>ul]:pl-5">{children}</div>}
      </div>
    </motion.li>
  );
}

export interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  const items = React.Children.toArray(children);
  return (
    <ul className={cn('relative list-none pl-0', className)} role="list">
      {React.Children.map(items, (child, index) => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          return React.cloneElement(child as React.ReactElement<TimelineItemProps>, {
            isLast: index === items.length - 1,
            _index: index,
          });
        }
        return child;
      })}
    </ul>
  );
}
