'use client';

import { Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { SectionTitle } from '@/components/ui/section-title';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { getExperience, type Locale } from '@/lib/data';

export default function ExperienceSection() {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language?.startsWith('fr') ? 'fr' : 'en') as Locale;
  const experience = getExperience();

  return (
    <section className="space-y-8 md:space-y-10">
      <SectionTitle title={t('experience.title')} subtitle={t('experience.subtitle')} />
      <div className="mx-auto max-w-2xl">
        <Timeline>
          {experience.map((entry, i) => {
            const content = locale === 'fr' ? entry.fr : entry.en;
            return (
              <TimelineItem
                key={`exp-${i}`}
                date={content.date}
                title={content.title}
                subtitle={content.subtitle}
                subtitleHref={entry.subtitleHref}
                mention={content.mention}
                description={content.description}
                icon={<Briefcase className="size-4" />}
              >
                {content.points.length > 0 && (
                  <ul>
                    {content.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                )}
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </section>
  );
}
