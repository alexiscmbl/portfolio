'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink, Github, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getProjectBySlug, type Locale } from '@/lib/data';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const { t, i18n } = useTranslation();
  const locale = (i18n.language?.startsWith('fr') ? 'fr' : 'en') as Locale;

  const project = getProjectBySlug(slug);
  const content = project ? (locale === 'fr' ? project.fr : project.en) : null;

  if (!project || !content) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 py-12">
        <h1 className="text-2xl font-semibold text-foreground">{t('projects.projectNotFound')}</h1>
        <Link href="/#projects">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            {t('projects.backToProjects')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 sm:space-y-8"
      >
        {/* Header: back + actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t('projects.backToProjects')}
          </Link>
          <div className="flex flex-wrap gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ExternalLink className="size-4" />
                {t('projects.visit')}
              </a>
            )}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Github className="size-4" />
                GitHub
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/50 px-3 py-2 text-sm font-medium text-muted-foreground">
                <Github className="size-4" />
                {t('projects.notAvailable')}
              </span>
            )}
          </div>
        </div>

        {/* Title + meta */}
        <div className="rounded-2xl border border-border/60 bg-card/95 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {content.title}
            </h1>
            <div className="mt-2">
              {content.status === 'Développement en cours' || content.status === 'In development' ? (
                <span className="inline-flex rounded-md border border-amber-500/60 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                  {t('projects.statusInDevelopment')}
                </span>
              ) : (
                <span className="inline-flex rounded-md border border-green-500/50 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                  {t('projects.statusCompleted')}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {content.date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 shrink-0" />
                {content.date}
              </span>
            )}
            {content.role && (
              <span className="inline-flex items-center gap-1.5">
                <User className="size-4 shrink-0" />
                {content.role}
              </span>
            )}
          </div>

          {/* Tech stack badges */}
          {project.tech.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/90">
                {t('projects.techStack')} —
              </span>
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="cursor-pointer rounded-lg border border-border/80 bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Image */}
        {project.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30">
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        {/* Description */}
        <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/95 shadow-sm backdrop-blur-sm">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold text-foreground">{t('projects.descriptionTitle')}</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
              {content.detail}
            </p>
          </CardContent>
        </Card>

        {/* Key points */}
        {content.points && content.points.length > 0 && (
          <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/95 shadow-sm backdrop-blur-sm">
            <CardHeader className="pb-2">
              <h2 className="text-lg font-semibold text-foreground">{t('projects.keyPointsTitle')}</h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-6 marker:text-primary">
                {content.points.map((point, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed pl-1">
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </motion.article>
    </div>
  );
}
