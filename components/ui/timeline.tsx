'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';

export interface TimelineItemProps {
  date: string;
  title: string;
  subtitle?: string;
  subtitleHref?: string;
  mention?: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
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
  subtitleHref,
  mention,
  description,
  children,
  icon,
  isLast = false,
  _index = 0,
}: TimelineItemProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const hasDescription = Boolean(description?.trim());

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
        {subtitle &&
          (subtitleHref ? (
            <a
              href={subtitleHref}
              target="_blank"
              rel="noreferrer noopener"
              className={`mt-0.5 inline-block text-sm font-normal text-foreground/90 not-italic underline-offset-2 transition-colors hover:text-primary hover:underline ${isMobile ? 'underline' : ''}`}
            >
              {subtitle}
            </a>
          ) : (
            <p className="mt-0.5 text-sm font-normal text-foreground/90 not-italic">{subtitle}</p>
          ))}
        {mention && (
          <p className="mt-0.5 text-sm font-medium text-primary/90 italic">{mention}</p>
        )}
        {children && (
          <div className="mt-2 text-sm text-muted-foreground italic [&>ul]:list-disc [&>ul]:space-y-0.5 [&>ul]:pl-5">
            {children}
          </div>
        )}
        {hasDescription && (
          <div className="mt-3 overflow-hidden rounded-md border-2 border-primary/50 bg-background/50">
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              className="flex w-full cursor-pointer items-center gap-2 py-2.5 pl-3 pr-3 text-left text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              aria-expanded={isOpen}
            >
              <ChevronDown
                className={cn('size-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
              />
              <span>{isOpen ? t('timeline.hide') : t('timeline.showDescription')}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="whitespace-pre-line border-t border-border/50 px-3 py-2.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
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
