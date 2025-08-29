"use client";

import React, {useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import Container from "@/app/components/layout/container/container";
import TeamCard from "@/app/components/cards/team-card/team-card";

import styles from "./about-team.module.scss";
import AnimatedText from "@/app/components/ui/animated-text/animated-text";
import ModuleTeam from "@/app/components/module/module-team/Module-team";
import {useCursorStyle} from "@/app/hooks/useCursorStyle";

type TeamMember = {
    name: string;
    role: string;
    description: string;
    location: string;
    image: string;
    moduleImg: string;
    text: string;
    experience: string;
};
const teamMembers = [
    {
        name: "Vladyslav Artiushenko",
        role: "Founder",
        description: "Digital entrepreneur",
        experience: '6 years of experience',
        location: "Ukraine, Kyiv",
        text: 'From crafting unique identities to developing functional web and mobile applications, we bring your ideas to life in the digital realm, where brands gain clarity and impact.',
        image: "/images/team-card-img-1.webp",
        moduleImg: "/images/module_team.webp",
    },
    {
        name: "Vladyslav Artiushenko",
        role: "Founder",
        description: "Digital entrepreneur",
        experience: '6 years of experience',
        location: "Ukraine, Kyiv",
        text: 'From crafting unique identities to developing functional web and mobile applications, we bring your ideas to life in the digital realm, where brands gain clarity and impact.',
        image: "/images/team-card-img-1.webp",
        moduleImg: "/images/module_team.webp",
    },
    {
        name: "Vladyslav Artiushenko",
        role: "Founder",
        description: "Digital entrepreneur",
        experience: '6 years of experience',
        location: "Ukraine, Kyiv",
        text: 'From crafting unique identities to developing functional web and mobile applications, we bring your ideas to life in the digital realm, where brands gain clarity and impact.',
        image: "/images/team-card-img-1.webp",
        moduleImg: "/images/module_team.webp",
    },
];

const AboutTeam: React.FC = () => {

    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const bodyRef = useRef<HTMLDivElement>(null);

    useCursorStyle({
        ref: bodyRef,
        style: "drag",
        text: "drag",

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
                name={selectedMember?.name ?? ""}
                role={selectedMember?.role ?? ""}
                text={selectedMember?.text ?? ""}
                description={selectedMember?.description ?? ""}
                experience={selectedMember?.experience ?? ""}
                location={selectedMember?.location ?? ""}
                img={selectedMember?.moduleImg ?? ""}
                open={isOpen}
                onClose={close}
            />
        </section>
    );
};

export default AboutTeam;
