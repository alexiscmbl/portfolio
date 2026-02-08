'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FaJava } from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiDocker,
  SiMysql,
  SiGit,
  SiPython,
} from 'react-icons/si';

import ContactSection from '@/components/features/ContactSection/ContactSection';
import EducationSection from '@/components/features/EducationSection/EducationSection';
import ExperienceSection from '@/components/features/ExperienceSection/ExperienceSection';
import HomeSection from '@/components/features/HomeSection/HomeSection';
import ProfileSection from '@/components/features/ProfileSection/ProfileSection';
import ProjectsSection from '@/components/features/ProjectsSection/ProjectsSection';
import SectionWrapper from '@/components/SectionWrapper';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { ProfilePhoto } from '@/components/ui/profile-photo';
import { useIsMobile } from '@/hooks/useIsMobile';

const techLogos: { node: React.ReactNode; title: string; href: string }[] = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://fr.wikipedia.org/wiki/JavaScript' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <FaJava />, title: 'Java', href: 'https://www.java.com' },
  { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },
];

export default function OnePage() {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  return (
    <main className="-mt-24 flex flex-col items-center w-full min-h-full">
      <section
        id="home"
        className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32"
      >
        <div className="flex flex-1 w-full flex-col items-center justify-center gap-15">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: isMobile ? 0 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center"
          >
            <ProfilePhoto
              src="/images/Photo_Alexis.jpeg"
              alt="Alexis Cesmat-Belliard"
              fallback="ACB"
              className="h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
            />
          </motion.div>
          <div className="mt-4 w-full max-w-2xl sm:mt-6">
            <SectionWrapper>
              <HomeSection />
            </SectionWrapper>
          </div>
          {/* Bandeau tech horizontal sur mobile */}
          {isMobile && (
            <div className="relative z-0 mt-6 w-full px-2 sm:mt-8" aria-hidden>
              <div className="h-12 w-full overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <LogoLoop
                  logos={techLogos}
                  speed={80}
                  logoHeight={28}
                  gap={24}
                  direction="right"
                  pauseOnHover={false}
                  fadeOut
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-auto flex flex-col items-center gap-1.5 pb-6 pt-4 sm:pb-8"
          aria-hidden
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t('scrollHint')}
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-muted-foreground"
          >
            <ChevronDown className="size-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Bandeau tech fixe à gauche sur desktop (z-20 pour rester au-dessus du contenu et recevoir le hover au scroll) */}
      {!isMobile && (
        <div
          className="fixed left-0 top-1/2 z-20 hidden h-1/2 -translate-y-1/2 flex-col items-center overflow-hidden sm:flex pl-2 md:pl-4 lg:pl-6"
          aria-hidden
        >
          <LogoLoop
            logos={techLogos}
            speed={100}
            logoHeight={40}
            gap={32}
            width={64}
            direction="down"
            pauseOnHover
            scaleOnHover
            fadeOut
            className="h-full"
          />
        </div>
      )}

      {/* Sections de contenu */}
      <div className="relative z-10 w-full space-y-16 px-4 py-4 sm:space-y-20 sm:px-6 sm:py-6 md:space-y-24 md:px-8 lg:space-y-28 lg:px-10 xl:px-12">
        <section id="profile" className="scroll-mt-24">
          <SectionWrapper>
            <ProfileSection />
          </SectionWrapper>
        </section>
        {/* Expérience + Formation côte à côte sur desktop avec séparateur */}
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_auto_1fr] md:gap-x-12 lg:gap-x-16 md:items-start">
            <section id="experience" className="scroll-mt-24">
              <SectionWrapper>
                <ExperienceSection />
              </SectionWrapper>
            </section>
            <div
              className="hidden w-px shrink-0 self-stretch bg-border md:block"
              aria-hidden
            />
            <section id="education" className="scroll-mt-24">
              <SectionWrapper>
                <EducationSection />
              </SectionWrapper>
            </section>
          </div>
        </div>
        <section id="projects" className="scroll-mt-24">
          <SectionWrapper>
            <ProjectsSection />
          </SectionWrapper>
        </section>
        <section id="contact" className="scroll-mt-24 pb-8 sm:pb-12">
          <SectionWrapper>
            <ContactSection />
          </SectionWrapper>
        </section>
      </div>
    </main>
  );
}
