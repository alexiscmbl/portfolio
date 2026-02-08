import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('affiche le texte passé en enfants', () => {
    render(<Button>Cliquez ici</Button>);
    expect(screen.getByRole('button', { name: /cliquez ici/i })).toBeInTheDocument();
  });

  it('appelle onClick au clic', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>OK</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applique des variants via data-attributs', () => {
    render(<Button variant="destructive" size="lg">Supprimer</Button>);
    const btn = screen.getByRole('button', { name: 'Supprimer' });
    expect(btn).toHaveAttribute('data-variant', 'destructive');
    expect(btn).toHaveAttribute('data-size', 'lg');
  });
});
