'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { getProjectBySlug, type Locale } from '@/lib/data';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const { i18n } = useTranslation();
  const locale = (i18n.language?.startsWith('fr') ? 'fr' : 'en') as Locale;

  const project = getProjectBySlug(slug);
  const content = project ? (locale === 'fr' ? project.fr : project.en) : null;

  if (!project || !content) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 py-12">
        <h1 className="text-2xl font-semibold">Projet introuvable</h1>
        <Link href="/#projects">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Retour aux projets
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-border/60 bg-card/95 p-6 shadow-sm backdrop-blur-sm sm:p-8"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {locale === 'fr' ? 'Retour aux projets' : 'Back to projects'}
          </Link>
          <div className="flex gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <ExternalLink className="size-4" />
                {locale === 'fr' ? 'Voir le projet' : 'View project'}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-accent/50"
              >
                <Github className="size-4" />
                GitHub
              </a>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {content.title}
        </h1>

        {project.tech.length > 0 && (
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {project.tech.join(' · ')}
          </p>
        )}

        <div className="prose prose-sm mt-6 max-w-none text-muted-foreground prose-p:leading-relaxed sm:prose-base">
          <p className="whitespace-pre-line">{content.detail}</p>
        </div>
      </motion.div>
    </div>
  );
}
