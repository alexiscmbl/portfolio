'use client';

import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ProfilePhotoProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  size?: string;
}

export function ProfilePhoto({
  src,
  alt,
  fallback = '?',
  className,
  size = 'min-h-[200px] min-w-[200px] h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80',
}: ProfilePhotoProps) {
  const [error, setError] = React.useState(false);

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full ring-2 ring-border/60 ring-offset-2 ring-offset-background bg-muted [&>img]:object-cover',
        size,
        className
      )}
    >
      {error ? (
        <span
          className="flex size-full items-center justify-center text-4xl font-semibold text-muted-foreground sm:text-5xl md:text-6xl"
          aria-hidden
        >
          {fallback}
        </span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
          className="object-cover"
          onError={() => setError(true)}
          priority
        />
      )}
    </div>
  );
}
