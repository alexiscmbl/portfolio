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
        className="w-full"
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
            <p className="text-sm leading-relaxed">{t('profile.skillsText')}</p>
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
