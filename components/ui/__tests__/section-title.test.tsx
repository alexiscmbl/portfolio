import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SectionTitle } from '@/components/ui/section-title';

describe('SectionTitle', () => {
  it('affiche le titre', () => {
    render(<SectionTitle title="Ma section" />);
    expect(screen.getByRole('heading', { name: 'Ma section' })).toBeInTheDocument();
  });

  it('utilise h2 par défaut', () => {
    render(<SectionTitle title="Titre" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Titre');
  });

  it('utilise h3 quand as="h3"', () => {
    render(<SectionTitle title="Sous-titre" as="h3" />);
    expect(screen.getByRole('heading', { level: 3, name: 'Sous-titre' })).toBeInTheDocument();
  });

  it('affiche le sous-titre quand fourni', () => {
    render(<SectionTitle title="Titre" subtitle="Description optionnelle" />);
    expect(screen.getByText('Description optionnelle')).toBeInTheDocument();
  });
});
