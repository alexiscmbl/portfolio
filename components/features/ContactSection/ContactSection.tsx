'use client';

import { Mail, Linkedin, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { RevealBlock } from '@/components/ui/reveal-block';
import { SectionTitle } from '@/components/ui/section-title';

const links = [
  { icon: Mail, href: 'mailto:contact@example.com', labelKey: 'contact.email' },
  { icon: Linkedin, href: 'https://linkedin.com', labelKey: 'contact.linkedin' },
  { icon: MapPin, href: '#', labelKey: 'contact.location' },
];

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className="space-y-8 md:space-y-10">
      <SectionTitle title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
        {links.map((item, i) => {
          const Icon = item.icon;
          return (
            <RevealBlock key={item.labelKey} direction="up" delay={i * 0.1}>
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-3 rounded-xl border-border/80 bg-card/80 sm:w-auto"
                asChild
              >
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer noopener">
                  <Icon className="size-5" />
                  {t(item.labelKey)}
                </a>
              </Button>
            </RevealBlock>
          );
        })}
      </div>
      <RevealBlock direction="up" delay={0.2}>
        <p className="text-center text-sm text-muted-foreground">
          {t('contact.cta')}
        </p>
      </RevealBlock>
    </section>
  );
}
