import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Accordion, AccordionItem } from '@/components/ui/accordion';

describe('Accordion', () => {
  it('rend le conteneur avec data-slot accordion', () => {
    render(
      <Accordion>
        <AccordionItem index={0} trigger="Titre">Contenu</AccordionItem>
      </Accordion>
    );
    expect(document.querySelector('[data-slot="accordion"]')).toBeInTheDocument();
  });

  it('affiche le trigger et le contenu de l’item', () => {
    render(
      <Accordion>
        <AccordionItem index={0} trigger="Mon titre">Contenu caché</AccordionItem>
      </Accordion>
    );
    expect(screen.getByRole('button', { name: /mon titre/i })).toBeInTheDocument();
    expect(screen.getByText('Contenu caché')).toBeInTheDocument();
  });

  it('ouvre et ferme l’item au clic (single)', () => {
    render(
      <Accordion type="single">
        <AccordionItem index={0} trigger="Ouvrir">Contenu</AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole('button', { name: /ouvrir/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('en mode single, ouvrir un item ferme l’autre', () => {
    render(
      <Accordion type="single" defaultValue={0}>
        <AccordionItem index={0} trigger="Premier">Contenu 1</AccordionItem>
        <AccordionItem index={1} trigger="Deuxième">Contenu 2</AccordionItem>
      </Accordion>
    );
    const first = screen.getByRole('button', { name: /premier/i });
    const second = screen.getByRole('button', { name: /deuxième/i });
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(second);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('en mode multiple, plusieurs items peuvent être ouverts', () => {
    render(
      <Accordion type="multiple">
        <AccordionItem index={0} trigger="Un">A</AccordionItem>
        <AccordionItem index={1} trigger="Deux">B</AccordionItem>
      </Accordion>
    );
    fireEvent.click(screen.getByRole('button', { name: /^un$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^deux$/i }));
    expect(screen.getByRole('button', { name: /^un$/i })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /^deux$/i })).toHaveAttribute('aria-expanded', 'true');
  });
});
