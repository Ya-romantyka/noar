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
    const headerRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useIsMobile();

    useLayoutEffect(() => {
        if (!headerRef.current) return;

        const rect = headerRef.current.getBoundingClientRect();
        setHeaderHeight(rect.height);
    }, []);


    useEffect(() => {
        if (!listRef.current || headerHeight === 0) return;

        type TweenVarsWithSize = gsap.TweenVars & {
            width?: string | number;
            height?: string | number;
        };

        const ctx = gsap.context((self) => {
            const list  = listRef.current!;
            const items = Array.from(list.children) as HTMLElement[];
            const vh    = window.innerHeight;
            const isDesk = !isMobile;

            items.forEach((item, i) => {
                const targetH = vh - headerHeight * Math.min(i, 2);
                gsap.set(item, { position: 'relative', height: targetH, overflow: 'hidden', zIndex: i });
            });

            items.forEach((item, i) => {
                const picture = item.querySelector<HTMLElement>('picture');
                if (!picture) return;

                const isLast   = i === items.length - 1;
                const nextItem = !isLast ? items[i + 1] : null;

                const targetH   = vh - headerHeight * Math.min(i, 2);
                const pinStart  = `top top+=${headerHeight * i}`;

                const globalEnd = `bottom top+=${headerHeight * 3}`;

                ScrollTrigger.create({
                    trigger: item,
                    start: pinStart,
                    endTrigger: list,
                    end: globalEnd,
                    pin: item,
                    pinType: 'transform',
                });

                const baseSet: TweenVarsWithSize = { display: 'block', height: 0, marginLeft: 'auto' };
                if (isDesk) baseSet.width = '0%';
                gsap.set(picture, baseSet);

                const growFrom: TweenVarsWithSize = { height: 0 };
                const growTo:   TweenVarsWithSize = {
                    height: targetH,
                    ease: 'none',
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: pinStart,
                        scrub: true,
                    },
                };
                if (isDesk) {
                    growFrom.width = '0%';
                    growTo.width   = '100%';
                }
                gsap.fromTo(picture, growFrom, growTo);

                const shrinkEndTrigger = isLast ? list : (nextItem as Element);
                const shrinkEnd        = isLast ? globalEnd
                    : `top top+=${headerHeight * (i + 1)}`;

                if (isDesk) {
                    const crossTL = gsap.timeline({
                        defaults: { ease: 'none' },
                        scrollTrigger: {
                            trigger: item,
                            start: pinStart,
                            endTrigger: shrinkEndTrigger,
                            end: shrinkEnd,
                            scrub: true,
                            onEnter:     () => gsap.set(picture, { marginLeft: 0 }),
                            onEnterBack: () => gsap.set(picture, { marginLeft: 0 }),
                            onLeaveBack: () => gsap.set(picture, { marginLeft: 'auto' }),
                        },
                    });

                    crossTL.fromTo(
                        picture,
                        { width: '100%', height: targetH },
                        { width: '0%',   height: 0 },
                        0
                    );
                } else {
                    gsap.fromTo(
                        picture,
                        { height: targetH },
                        {
                            height: 0,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: item,
                                start: pinStart,
                                endTrigger: shrinkEndTrigger,
                                end: shrinkEnd,
                                scrub: true,
                            },
                        }
                    );
                }
            });

            const recalcHeights = () => {
                const curVh = window.innerHeight;
                items.forEach((item, i) => {
                    const h = curVh - headerHeight * Math.min(i, 2);
                    gsap.set(item, { height: h });
                });
            };
            const onResize = () => { recalcHeights(); ScrollTrigger.refresh(); };

            window.addEventListener('resize', onResize);
            ScrollTrigger.addEventListener('refreshInit', recalcHeights);

            self.add(() => {
                window.removeEventListener('resize', onResize);
                ScrollTrigger.removeEventListener('refreshInit', recalcHeights);
            });
        }, listRef);

        return () => ctx.revert();
    }, [headerHeight, isMobile]);



    return (
        <section className={styles.section} ref={sectionRef}>
            <Container >
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
            </Container>
        </section>
    );
};

export default ProjectsSection;
