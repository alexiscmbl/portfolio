'use client';

import { FileDown, Github, Linkedin, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { RevealBlock } from '@/components/ui/reveal-block';
import { SectionTitle } from '@/components/ui/section-title';

import { ContactDialog } from './ContactDialog';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const links = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/alexis-cesmat-belliard-aa776329a/', labelKey: 'contact.linkedin' as const },
  { icon: Github, href: 'https://github.com/alexiscmbl', labelKey: 'contact.github' as const },
  { icon: FileDown, href: '/CV.pdf', labelKey: 'contact.cv' as const },
  { icon: MapPin, href: '#', labelKey: 'contact.location' as const },
];

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className="space-y-8 md:space-y-10">
      <SectionTitle title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <div
        className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-6
          [&>*:last-child:nth-child(2n+1)]:col-span-2 [&>*:last-child:nth-child(2n+1)]:flex [&>*:last-child:nth-child(2n+1)]:justify-center [&>*:last-child:nth-child(2n+1)>*]:w-auto"
      >
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
        {FORMSPREE_ID && (
          <RevealBlock direction="up" delay={links.length * 0.1}>
            <ContactDialog
              formspreeId={FORMSPREE_ID}
              triggerClassName="w-full gap-3 rounded-xl border-border/80 bg-card/80 sm:w-auto"
            />
          </RevealBlock>
        )}
      </div>

      <RevealBlock direction="up" delay={0.2}>
        <p className="text-center text-sm text-muted-foreground">
          {t('contact.cta')}
        </p>
      </RevealBlock>
    </section>
  );
}
