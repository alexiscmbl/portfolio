import { expect, it } from 'vitest';

import { cn } from '@/lib/utils';

it('cn fusionne des classes et gère les conflits Tailwind', () => {
  expect(cn('px-2', 'px-4')).toBe('px-4');
  expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
});

it('cn ignore les valeurs falsy', () => {
  expect(cn('a', undefined, null, false, 'b')).toBe('a b');
});
