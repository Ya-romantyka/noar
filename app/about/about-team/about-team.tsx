'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Container from '@/app/components/layout/container/container';
import TeamCard from '@/app/components/cards/team-card/team-card';

import styles from './about-team.module.scss';
import AnimatedText from '@/app/components/ui/animated-text/animated-text';
import ModuleTeam from '@/app/components/module/module-team/Module-team';
import { useCursorStyle } from '@/app/hooks/useCursorStyle';

type TeamMember = {
  name: string;
  role: string;
  description: string;
  description2: string;
  location: string;
  image: string;
  moduleImg: string;
  text: string;
  experience: string;
};
const teamMembers = [
  {
    name: 'Vladyslav Artiushenko',
    role: 'Founder',
    description: 'Creative Director',
    description2: 'Сommunication strategist',
    experience: '8 years of experience',
    location: 'Ukraine, Kyiv',
    text: 'As a manager, I have been involved in creating a wide variety of projects: start-ups, services, media, and government contracts. I am convinced that a user-oriented systematic approach and passion for work can tackle any task.',
    image: '/images/team/team-card-img-1.webp',
    moduleImg: '/images/team/team-card-img-1.webp',
  },
  {
    name: 'Dmytro Hrachov',
    role: 'Full-Stack Developer',
    description: 'Creative Developer',
    description2: '',
    experience: '6 years of experience',
    location: 'Ukraine, Odessa',
    text: 'I create immersive experiences in the web environment — everything to make the product interesting, gamified, and totally insane. And I also love cool cars.',
    image: '/images/team/team-card-img-5.webp',
    moduleImg: '/images/team/team-card-img-5.webp',
  },
  {
    name: 'Artem Mudrenko',
    role: 'Brand Designer',
    description: 'Typeface & CGI Creator',
    description2: '',
    experience: '5 years of experience',
    location: 'Ukraine, Vinnytsia',
    text: "I see design as a thought process where every element has a reason for existing. Colour, shape, font, texture — these are tools that help achieve a goal. I enjoy working where logic and intuition need to be combined. Where visual solutions don't just decorate, but form a complete communication system.",
    image: '/images/team/team-card-img-6.webp',
    moduleImg: '/images/team/team-card-img-6.webp',
  },
  {
    name: 'Sergii Samokhvalov',
    role: 'Full-Stack Developer',
    description: 'Web-app architecture expert',
    description2: '',
    experience: '6 years of experience',
    location: 'Ukraine, Zaporizhzhia',
    text: 'I love it when a product works smoothly and quickly. My passion is developing functional systems: from simple SPAs to complex MPAs, SSRs, and SSG architectures. Focusing on finding modern solutions and constantly improving myself, I do everything I can to ensure that users get the best experience.',
    image: '/images/team/team-card-img-7.webp',
    moduleImg: '/images/team/team-card-img-7.webp',
  },
  {
    name: 'Nestor Ozerianskyi',
    role: 'Motion Designer',
    description: '3D artist',
    description2: 'Video Editor & Sound Producer',
    experience: '5 years of experience',
    location: 'Ukraine, Kyiv',
    text: 'I adore creating experiences that evoke emotions. As a motion designer, I have won numerous prestigious advertising awards in both branding and performance marketing. I also compose my own music and play in a band.',
    image: '/images/team/team-card-img-3.webp',
    moduleImg: '/images/team/team-card-img-3.webp',
  },
  {
    name: 'Vadym Kitura',
    role: 'Creative Producer',
    description: 'Cameraman',
    description2: 'Post-production manager',
    experience: '5 years of experience',
    location: 'Warsaw, Poland (WW)',
    text: 'With dozens of successful projects under my belt, I know exactly what visuals sell products and how to form an emotional connection between the viewer and the product. In my work, I pay special attention to brand philosophy so that the result reflects not only the relevance of the advertising campaign, but also the real value of the product for the target audience.',
    image: '/images/team/team-card-img-2.webp',
    moduleImg: '/images/team/team-card-img-2.webp',
  },
  {
    name: 'Andre Solodkyi',
    role: 'Brand Strategist',
    description: 'Data & Insight strategist',
    description2: '',
    experience: '7 years of experience',
    location: 'United Kingdom, London',
    text: "I transform data into brand strategies. For me, a brand's history determines who it is in culture, and data determines where it should go. I have worked with global artists and corporations, and I know how to develop a brand.",
    image: '/images/team/team-card-img-8.webp',
    moduleImg: '/images/team/team-card-img-8.webp',
  },
  {
    name: 'Ivan Babenko',
    role: 'Full-Stack Developer',
    description: '',
    description2: '',
    experience: '3 years of experience',
    location: 'Ukraine, Kyiv',
    text: 'As a web-systems developer, I believe that programming is creative work. Web-development allows you to think outside the box and look for new combinations of frameworks, modules, and architectures for the most convenient use cases.',
    image: '/images/team/team-card-img-4.webp',
    moduleImg: '/images/team/team-card-img-4.webp',
  },
];

const AboutTeam: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  useCursorStyle({
    ref: bodyRef,
    style: 'drag',
    text: 'drag',
  });

  const open = (member: TeamMember) => {
    if (!member) return;
    setSelectedMember(member);
    setIsOpen(true);
    window.__lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setIsOpen(false);
    setSelectedMember(null);
    window.__lenis?.start();
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  return (
    <section className={styles.section} data-header-white>
      <Container>
        <div className={styles.header}>
          <span
            className={`${styles.label} section-label section-label--white`}
          >
            Team
          </span>
          <h2 className={`${styles.title} h2`}>
            <AnimatedText onScroll>
              Connecting the Dots: Meet Our Team.
            </AnimatedText>
          </h2>
        </div>

        <div className={styles.body} ref={bodyRef}>
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            className={styles.teamSwiper}
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} className={styles.teamSlide}>
                <TeamCard
                  name={member.name}
                  role={member.role}
                  description={member.description}
                  description2={member.description2}
                  location={member.location}
                  image={member.image}
                  experience={member.experience}
                  moduleImg={member.moduleImg}
                  onOpen={() => {
                    open(member);
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
      <ModuleTeam
        name={selectedMember?.name ?? ''}
        role={selectedMember?.role ?? ''}
        text={selectedMember?.text ?? ''}
        description={selectedMember?.description ?? ''}
        description2={selectedMember?.description2 ?? ''}
        experience={selectedMember?.experience ?? ''}
        location={selectedMember?.location ?? ''}
        img={selectedMember?.moduleImg ?? ''}
        open={isOpen}
        onClose={close}
      />
    </section>
  );
};

export default AboutTeam;
