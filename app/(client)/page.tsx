'use client';

import { FaJava } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiDocker, SiMysql, SiGit, SiPython } from 'react-icons/si';

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { LogoLoop } from '@/components/ui/LogoLoop';

import HomeSection from '../../components/features/HomeSection/HomeSection';
import SectionWrapper from '../../components/SectionWrapper';

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
  return (
    <main className="flex flex-col justify-center items-center w-full h-full">
      <Avatar className="h-44! w-44!" size="lg">
        <AvatarImage src="/avatar.png" alt="Avatar" />
        <AvatarFallback className='text-xl'>ACB</AvatarFallback>
        <AvatarBadge
          className="border-2 border-white"
        />
      </Avatar>
      <section
        id="home"
        className="pt-5 flex w-full justify-center items-center"
      >
        <SectionWrapper>
          <HomeSection />
        </SectionWrapper>
      </section>
      <div className='fixed pl-15 flex w-full h-1/2 items-center overflow-hidden'>
        <LogoLoop   
          logos={techLogos}
          speed={100}
          logoHeight={60}
          gap={45}
          width={130}
          direction='up'
          pauseOnHover
          scaleOnHover
          fadeOut
        />
      </div>

      <section id="projects" className="w-full justify-center items-center">
        <SectionWrapper>Project coming soon!</SectionWrapper>
      </section>

      <section id="experience" className="w-full justify-center items-center">
        <SectionWrapper>Experience coming soon!</SectionWrapper>
      </section>

      <section id="profile" className="w-full justify-center items-center">
        <SectionWrapper>Profile coming soon!</SectionWrapper>
      </section>

      <section id="contact" className="w-full justify-center items-center">
        <SectionWrapper>Contact coming soon!</SectionWrapper>
      </section>
    </main>
  );
}
