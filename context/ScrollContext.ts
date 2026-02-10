'use client';
import { createContext, useContext } from 'react';

export const ScrollRefContext =
  createContext<React.RefObject<HTMLDivElement> | null>(null);

export function useScrollRef() {
  const context = useContext(ScrollRefContext);
  if (!context) throw new Error('useScrollRef must be used within a Layout');
  return context;
}
