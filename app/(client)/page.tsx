'use client';

import HomeSection from '../../components/features/HomeSection/HomeSection';
import SectionWrapper from '../../components/SectionWrapper';

export default function OnePage() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-full">
      <section
        id="home"
        className="flex flex-1 w-full justify-center items-center"
      >
        <SectionWrapper>
          <HomeSection />
        </SectionWrapper>
      </section>

      <section
        id="projects"
        className="flex-1 w-full justify-center items-center"
      >
        <SectionWrapper>Project coming soon!</SectionWrapper>
      </section>

      <section
        id="experience"
        className="flex-1 w-full justify-center items-center"
      >
        <SectionWrapper>Experience coming soon!</SectionWrapper>
      </section>

      <section
        id="profile"
        className="flex-1 w-full justify-center items-center"
      >
        <SectionWrapper>Profile coming soon!</SectionWrapper>
      </section>

      <section
        id="contact"
        className="flex-1 w-full justify-center items-center"
      >
        <SectionWrapper>Contact coming soon!</SectionWrapper>
      </section>
    </main>
  );
}
