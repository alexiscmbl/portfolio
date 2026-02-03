'use client';

import { motion } from 'framer-motion';
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

  return (
    <main className="flex flex-col items-center w-full min-h-full">
      {/* Hero : avatar + home section */}
      <section
        id="home"
        className="relative flex w-full flex-col items-center justify-center px-4 pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24"
      >
        <motion.div
          initial={isMobile ? false : { opacity: 0, scale: 0.92 }}
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
      </section>

      {/* Bandeau tech horizontal sur mobile (la roue qui tourne) */}
      {isMobile && (
        <div className="relative z-0 w-full px-2 py-4 sm:py-6" aria-hidden>
          <div className="h-14 w-full overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
            <LogoLoop
              logos={techLogos}
              speed={80}
              logoHeight={28}
              gap={24}
              direction="left"
              pauseOnHover={false}
              fadeOut
              className="h-full w-full"
            />
          </div>
        </div>
      )}

      {/* Bandeau tech fixe à gauche sur desktop */}
      {!isMobile && (
        <div
          className="fixed left-0 top-1/2 z-0 hidden h-1/2 -translate-y-1/2 flex-col items-center overflow-hidden sm:flex pl-2 md:pl-4 lg:pl-6"
          aria-hidden
        >
          <LogoLoop
            logos={techLogos}
            speed={100}
            logoHeight={40}
            gap={32}
            width={64}
            direction="up"
            pauseOnHover
            scaleOnHover
            fadeOut
            className="h-full"
          />
        </div>
      )}

      {/* Sections de contenu — pleine largeur avec padding responsive */}
      <div className="relative z-10 w-full space-y-16 px-4 py-4 sm:space-y-20 sm:px-6 sm:py-6 md:space-y-24 md:px-8 lg:space-y-28 lg:px-10 xl:px-12">
        <section id="projects" className="scroll-mt-24">
          <SectionWrapper>
            <ProjectsSection />
          </SectionWrapper>
        </section>
        <section id="experience" className="scroll-mt-24">
          <SectionWrapper>
            <ExperienceSection />
          </SectionWrapper>
        </section>
        <section id="education" className="scroll-mt-24">
          <SectionWrapper>
            <EducationSection />
          </SectionWrapper>
        </section>
        <section id="profile" className="scroll-mt-24">
          <SectionWrapper>
            <ProfileSection />
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
