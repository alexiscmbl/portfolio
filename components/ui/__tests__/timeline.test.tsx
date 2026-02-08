import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Timeline, TimelineItem } from '@/components/ui/timeline';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: () => false,
}));

describe('Timeline', () => {
  it('rend une liste avec role list', () => {
    render(
      <Timeline>
        <TimelineItem date="2024" title="Événement" />
      </Timeline>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('affiche date et titre d’un TimelineItem', () => {
    render(
      <Timeline>
        <TimelineItem date="Janvier 2024" title="Mon poste" subtitle="Entreprise XYZ" />
      </Timeline>
    );
    expect(screen.getByText('Janvier 2024')).toBeInTheDocument();
    expect(screen.getByText('Mon poste')).toBeInTheDocument();
    expect(screen.getByText('Entreprise XYZ')).toBeInTheDocument();
  });

  it('rend le lien subtitle quand subtitleHref est fourni', () => {
    render(
      <Timeline>
        <TimelineItem
          date="2024"
          title="Titre"
          subtitle="Site"
          subtitleHref="https://example.com"
        />
      </Timeline>
    );
    const link = screen.getByRole('link', { name: 'Site' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('affiche le bouton description quand description est fournie', () => {
    render(
      <Timeline>
        <TimelineItem
          date="2024"
          title="Titre"
          description="Texte de description détaillé"
        />
      </Timeline>
    );
    const btn = screen.getByRole('button', { name: 'timeline.showDescription' });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.getByText('Texte de description détaillé')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'timeline.hide' })).toBeInTheDocument();
  });
});
