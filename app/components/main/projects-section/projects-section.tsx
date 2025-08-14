"use client";

import styles from "./projects-section.module.scss";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Container from "@/app/components/layout/container/container";
import clsx from "clsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectStickyCard from "../../cards/project-sticky-card/project-sticky-card";
import {useIsMobile} from "@/app/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 0,
        name: "Crypto Exchange Website",
        year: "2023",
        frameworks: ["UX", "Copywrite", "UI", "Photo & Video", "Development"],
        img: "/images/project_img.webp",
        url: "",
    },
    {
        id: 1,
        name: "Crypto Exchange Website",
        year: "2023",
        frameworks: ["UX", "Copywrite", "UI", "Photo & Video", "Development"],
        img: "/images/project_img.webp",
        url: "",
    },
    {
        id: 2,
        name: "Crypto Exchange Website",
        year: "2023",
        frameworks: ["UX", "Copywrite", "UI", "Photo & Video", "Development"],
        img: "/images/project_img.webp",
        url: "",
    },
];

const ProjectsSection = () => {

    const [headerHeight, setHeaderHeight] = useState<number>(0)
    const listRef = useRef<HTMLUListElement | null>(null);
    const pinWrapperRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const isMobile=useIsMobile();

    useLayoutEffect(() => {
        if (!headerRef.current) return;

        const rect = headerRef.current.getBoundingClientRect();
        setHeaderHeight(rect.height);
    }, []);


    useEffect(() => {
        if (!listRef.current || !pinWrapperRef.current || headerHeight === 0 || !sectionRef.current) return;

        const pinTrigger = ScrollTrigger.create({
            trigger: pinWrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: listRef.current,
            invalidateOnRefresh: true,
        });

        const itemList = Array.from(listRef.current.children);
        const vh = window.innerHeight;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: pinWrapperRef.current,
                start: 'top top',
                end: 'bottom bottom',
                invalidateOnRefresh: true,
                scrub: true,
            }
        });

        const stepTime = 1.2;

        itemList.forEach((item, i) => {
            const picture = item.querySelector('picture');
            if (!picture) return;

            const targetHeight = vh - headerHeight * (i + 1);
            const topHeight = headerHeight * i;
            const heightOne = targetHeight - headerHeight;

            const pos = i * stepTime;

            tl.fromTo(item,
                { y: headerHeight },
                { y: 0, duration: 0.2 },
                pos
            );

            tl.fromTo(picture,
                isMobile
                    ? { height: 0 }
                    : { height: 0, width: "0%" },
                { height: targetHeight, width: "100%", duration: 1 },
                pos + 0.2
            );

            tl.fromTo(item,
                { top: "auto", bottom: 0 },
                { top: topHeight, bottom: "auto", duration: 0.00001 },
                pos + 1.2
            );

            if (!isMobile) {
                tl.fromTo(picture,
                    { marginLeft: "auto" },
                    { marginLeft: 0, duration: 0.00001 },
                    pos + 1.2
                );
            }

            tl.to(picture,
                { height: heightOne, duration: 0.2 },
                pos + 1.21
            );

            tl.to(picture,
                isMobile
                    ? { height: 0, duration: 1 }
                    : { height: 0, width: "0%", duration: 1 },
                pos + 1.4
            );
        });
        ScrollTrigger.refresh();
        return () => {
            pinTrigger.kill();
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [headerHeight, isMobile]);




    return (
        <section className={styles.section} ref={sectionRef}>
            <Container>
        <span
            className={clsx(styles.label, "section-label section-label--black")}
        >
          Projects
        </span>
                <h2 className={styles.title}>
                    We create digital solutions that through design, development, and
                    marketing to help brands not just grow, but lead in their industries.
                </h2>
                <p className={styles.text}>
                    Every project combines creativity and technology, tailored to meet the
                    unique needs of our clients. Whether it’s a sleek website, custom app,
                    or full digital ecosystem, we’ve got you covered.
                </p>

                <div className={styles.listWrapper} ref={pinWrapperRef}>
                    <ul className={styles.list} ref={listRef}>
                        {projects.map((project, i) => (
                            <li key={i} className={clsx(styles.item)}>
                                <ProjectStickyCard
                                    name={project.name}
                                    year={project.year}
                                    frameworks={project.frameworks}
                                    img={project.img}
                                    url={project.url}
                                    headerRef={headerRef}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
};

export default ProjectsSection;
