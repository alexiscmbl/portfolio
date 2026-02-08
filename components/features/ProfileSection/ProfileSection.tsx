'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { SectionTitle } from '@/components/ui/section-title';


export default function ProfileSection() {
  const { t } = useTranslation();

  return (
    <section className="space-y-8 md:space-y-10">
      <SectionTitle title={t('profile.title')} subtitle={t('profile.subtitle')} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full min-w-0"
      >
        <Accordion type="single" defaultValue={0}>
          <AccordionItem
            index={0}
            trigger={t('profile.aboutTitle')}
            contentClassName="text-muted-foreground"
          >
            <p className="text-sm leading-relaxed">{t('profile.aboutText')}</p>
          </AccordionItem>
          <AccordionItem
            index={1}
            trigger={t('profile.skillsTitle')}
            contentClassName="text-muted-foreground"
          >
            <ul className="space-y-4 text-sm leading-relaxed">
              {(
                [
                  { labelKey: 'profile.skillsFrontEndLabel', itemsKey: 'profile.skillsFrontEnd' },
                  { labelKey: 'profile.skillsBackEndLabel', itemsKey: 'profile.skillsBackEnd' },
                  { labelKey: 'profile.skillsToolsLabel', itemsKey: 'profile.skillsTools' },
                ] as const
              ).map(({ labelKey, itemsKey }) => {
                const items = t(itemsKey, { returnObjects: true }) as string[];
                if (!Array.isArray(items) || items.length === 0) return null;
                return (
                  <li key={labelKey}>
                    <span className="font-medium text-foreground">{t(labelKey)}</span>
                    <ul className="mt-1 list-disc pl-5 space-y-0.5 text-muted-foreground">
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </AccordionItem>
          <AccordionItem
            index={2}
            trigger={t('profile.goalsTitle')}
            contentClassName="text-muted-foreground"
          >
            <p className="text-sm leading-relaxed">{t('profile.goalsText')}</p>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </section>
  );
}
