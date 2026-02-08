import { describe, expect, it } from 'vitest';

import {
  getEducation,
  getExperience,
  getProjectBySlug,
  getProjects,
} from '@/lib/data';

describe('getProjects', () => {
  it('retourne un tableau de projets', () => {
    const projects = getProjects();
    expect(Array.isArray(projects)).toBe(true);
  });

  it('chaque projet a un slug et des champs fr/en', () => {
    const projects = getProjects();
    for (const p of projects) {
      expect(p).toHaveProperty('slug');
      expect(p).toHaveProperty('fr');
      expect(p).toHaveProperty('en');
      expect(p.fr).toHaveProperty('title');
      expect(p.en).toHaveProperty('title');
    }
  });
});

describe('getProjectBySlug', () => {
  it('retourne le projet dont le slug correspond', () => {
    const projects = getProjects();
    const firstSlug = projects[0]?.slug;
    expect(firstSlug).toBeDefined();
    const found = getProjectBySlug(firstSlug!);
    expect(found).toBeDefined();
    expect(found?.slug).toBe(firstSlug);
  });

  it('retourne undefined pour un slug inexistant', () => {
    expect(getProjectBySlug('slug-qui-nexiste-pas')).toBeUndefined();
  });
});

describe('getExperience', () => {
  it('retourne un tableau d\'entrées expérience', () => {
    const experience = getExperience();
    expect(Array.isArray(experience)).toBe(true);
  });

  it('chaque entrée a des champs fr/en avec date, title, subtitle', () => {
    const experience = getExperience();
    for (const e of experience) {
      expect(e.fr).toHaveProperty('date');
      expect(e.fr).toHaveProperty('title');
      expect(e.fr).toHaveProperty('subtitle');
      expect(e.en).toHaveProperty('date');
      expect(e.en).toHaveProperty('title');
      expect(e.en).toHaveProperty('subtitle');
    }
  });
});

describe('getEducation', () => {
  it('retourne un tableau d\'entrées formation', () => {
    const education = getEducation();
    expect(Array.isArray(education)).toBe(true);
  });

  it('chaque entrée a des champs fr/en', () => {
    const education = getEducation();
    for (const e of education) {
      expect(e.fr).toHaveProperty('title');
      expect(e.en).toHaveProperty('title');
    }
  });
});
