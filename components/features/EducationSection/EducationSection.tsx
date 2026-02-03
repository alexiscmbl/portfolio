'use client';

import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { SectionTitle } from '@/components/ui/section-title';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { getEducation, type Locale } from '@/lib/data';

export default function EducationSection() {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language?.startsWith('fr') ? 'fr' : 'en') as Locale;
  const education = getEducation();

  return (
    <section className="space-y-8 md:space-y-10">
      <SectionTitle title={t('education.title')} subtitle={t('education.subtitle')} />
      <div className="mx-auto max-w-2xl">
        <Timeline>
          {education.map((entry, i) => {
            const content = locale === 'fr' ? entry.fr : entry.en;
            return (
              <TimelineItem
                key={`edu-${i}`}
                date={content.date}
                title={content.title}
                subtitle={content.subtitle}
                icon={<GraduationCap className="size-4" />}
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
