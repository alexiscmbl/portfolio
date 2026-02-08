'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { getProjects, type Locale } from '@/lib/data';

export default function ProjectsSection() {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language?.startsWith('fr') ? 'fr' : 'en') as Locale;
  const projects = getProjects();

  return (
    <section className="space-y-8 md:space-y-10">
      <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p, i) => {
          const content = locale === 'fr' ? p.fr : p.en;
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="flex w-full min-w-0 flex-col rounded-xl border border-border/60 bg-card/90 shadow-sm backdrop-blur-sm transition-colors hover:border-border hover:bg-card"
            >
              <div className="flex flex-1 justify-between flex-col p-4 sm:p-5">
                <h3 className="font-semibold text-foreground">{content.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  {content.shortDescription}
                </p>
                {p.tech.length > 0 && (
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                    {p.tech.join(' · ')}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/projects/${p.slug}`}>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-foreground">
                      {t('projects.detail')}
                      <ChevronRight className="size-4" />
                    </Button>
                  </Link>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="size-3.5" />
                      {t('projects.visit')}
                    </a>
                  )}
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      <Github className="size-3.5" />
                      GitHub
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground/80">
                      <Github className="size-3.5" />
                      {t('projects.notAvailable')}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
