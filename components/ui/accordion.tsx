'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface AccordionContextValue {
  openIndex: number | null;
  setOpenIndex: (_value: number | null) => void;
  type: 'single' | 'multiple';
  openIndexes: number[];
  toggle: (_index: number) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used inside Accordion');
  return ctx;
}

const containerVariants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
      opacity: { delay: 0.05, duration: 0.25 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.3 }, opacity: { duration: 0.15 } },
  },
};

export interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: number | number[] | null;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  type = 'single',
  defaultValue = null,
  children,
  className,
}: AccordionProps) {
  const initial =
    Array.isArray(defaultValue) ? defaultValue : defaultValue === null ? [] : [defaultValue];
  const [openIndexes, setOpenIndexes] = React.useState<number[]>(initial);
  const openIndex = type === 'single' ? (openIndexes[0] ?? null) : null;

  const toggle = React.useCallback(
    (index: number) => {
      setOpenIndexes((prev) => {
        if (type === 'single') {
          return prev.includes(index) ? [] : [index];
        }
        return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
      });
    },
    [type]
  );

  const value: AccordionContextValue = {
    openIndex,
    setOpenIndex: (i) => setOpenIndexes(i === null ? [] : [i]),
    type,
    openIndexes,
    toggle,
  };

  return (
    <AccordionContext.Provider value={value}>
      <div className={cn('flex w-full min-w-0 flex-col gap-2', className)} data-slot="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  index: number;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export function AccordionItem({
  index,
  trigger,
  children,
  className,
  triggerClassName,
  contentClassName,
}: AccordionItemProps) {
  const { openIndexes, toggle } = useAccordion();
  const isOpen = openIndexes.includes(index);

  return (
    <div
      data-slot="accordion-item"
      className={cn(
        'w-full min-w-0 overflow-hidden rounded-xl border border-border/60 bg-card/80 transition-colors hover:border-border',
        isOpen && 'border-border bg-card/95',
        className
      )}
    >
      <button
        type="button"
        onClick={() => toggle(index)}
        className={cn(
          'flex w-full min-w-0 items-center justify-between gap-3 px-4 py-3.5 text-left font-medium transition-colors hover:bg-accent/30 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring sm:px-5 sm:py-4',
          triggerClassName
        )}
        aria-expanded={isOpen}
      >
        <span className="min-w-0 flex-1 truncate text-left">{trigger}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="w-full overflow-hidden"
          >
            <div
              className={cn(
                'w-full border-t border-border/60 px-4 pb-3 pt-1 sm:px-5 sm:pb-4 sm:pt-2',
                contentClassName
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
