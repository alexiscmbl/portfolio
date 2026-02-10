import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from '@/components/ui/card';

describe('Card', () => {
  it('affiche les enfants', () => {
    render(<Card>Contenu de la carte</Card>);
    expect(screen.getByText('Contenu de la carte')).toBeInTheDocument();
  });

  it('a le data-slot card', () => {
    render(<Card>X</Card>);
    expect(document.querySelector('[data-slot="card"]')).toBeInTheDocument();
  });

  it('accepte des props div (ex: data-testid)', () => {
    render(<Card data-testid="ma-card">OK</Card>);
    expect(screen.getByTestId('ma-card')).toBeInTheDocument();
    expect(screen.getByTestId('ma-card')).toHaveTextContent('OK');
  });
});
