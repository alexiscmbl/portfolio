import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';

export type Locale = 'fr' | 'en';

export interface ProjectItem {
  id: string;
  slug: string;
  link: string;
  github: string;
  tech: string[];
  /** URL d'une image / capture d'écran pour la page détail (optionnel) */
  image?: string;
  fr: {
    title: string;
    status: string;
    shortDescription: string;
    detail: string;
    date?: string;
    role?: string;
    points?: string[];
  };
  en: {
    title: string;
    status: string;
    shortDescription: string;
    detail: string;
    date?: string;
    role?: string;
    points?: string[];
  };
}

export interface ExperienceEntry {
  /** URL optionnelle pour le sous-titre (site entreprise / école) */
  subtitleHref?: string;
  fr: {
    date: string;
    title: string;
    subtitle: string;
    mention?: string;
    description?: string;
    points: string[];
  };
  en: {
    date: string;
    title: string;
    subtitle: string;
    mention?: string;
    description?: string;
    points: string[];
  };
}

export function getProjects(): ProjectItem[] {
  return (projectsData as { projects: ProjectItem[] }).projects;
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getExperience(): ExperienceEntry[] {
  const data = experienceData as { experience: ExperienceEntry[] };
  return data.experience ?? [];
}

export function getEducation(): ExperienceEntry[] {
  const data = experienceData as { education: ExperienceEntry[] };
  return data.education ?? [];
}
