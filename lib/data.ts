import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';

export type Locale = 'fr' | 'en';

export interface ProjectItem {
  id: string;
  slug: string;
  link: string;
  github: string;
  tech: string[];
  fr: { title: string; shortDescription: string; detail: string };
  en: { title: string; shortDescription: string; detail: string };
}

export interface ExperienceEntry {
  fr: { date: string; title: string; subtitle: string; points: string[] };
  en: { date: string; title: string; subtitle: string; points: string[] };
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
