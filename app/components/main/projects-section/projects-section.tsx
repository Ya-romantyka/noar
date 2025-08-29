"use client";

import styles from "./projects-section.module.scss";
import React, {useEffect,  useRef} from "react";
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

    const listRef = useRef<HTMLUListElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useIsMobile();



    useEffect(() => {
        if (!listRef.current || !headerRef.current) return;

        const ctx = gsap.context((self) => {
            const list = listRef.current!;
            const items = Array.from(list.children) as HTMLElement[];
            const vh = window.innerHeight;
            const isDesk = !isMobile;

            const getHeaderH = () =>
                headerRef.current?.getBoundingClientRect().height ?? 0;
            const headerH = getHeaderH();

            items.forEach((item, i) => {
                const targetH = vh - headerH * Math.min(i, 2);
                gsap.set(item, {
                    position: "relative",
                    height: targetH,
                    overflow: "hidden",
                    zIndex: i,
                });
            });

            const lastIndex = items.length - 1;
            const lastItem = items[lastIndex];
            const lastPinStart = `top top+=${headerH * lastIndex}`;
            const globalEndDesk = `bottom top+=${headerH * 3}`;

            items.forEach((item, i) => {
                const picture = item.querySelector<HTMLElement>("picture");
                if (!picture) return;

                const isLast = i === lastIndex;
                const nextItem = !isLast ? items[i + 1] : null;

                const targetH = vh - headerH * Math.min(i, 2);
                const pinStart = `top top+=${headerH * i}`;

                ScrollTrigger.create({
                    trigger: item,
                    start: pinStart,
                    endTrigger: isMobile ? lastItem : list,
                    end: isMobile ? lastPinStart : globalEndDesk,
                    pin: item,
                });

                gsap.set(picture, {
                    display: "block",
                    width: "100%",
                    height: targetH,
                });

                if (isDesk) {
                    gsap.set(picture, {
                        transformOrigin: "right top",
                        willChange: "transform",
                        scaleX: 0,
                        scaleY: 0,
                    });

                    gsap.to(picture, {
                        scaleX: 1,
                        scaleY: 1,
                        ease: "none",
                        immediateRender: false,
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: pinStart,
                            scrub: true,
                        },
                    });

                    const shrinkEndTrigger = isLast ? list : (nextItem as Element);
                    const shrinkEnd = isLast
                        ? globalEndDesk
                        : `top top+=${headerH * (i + 1)}`;

                    const tl = gsap.timeline({
                        defaults: { ease: "none" },
                        scrollTrigger: {
                            trigger: item,
                            start: pinStart,
                            endTrigger: shrinkEndTrigger,
                            end: shrinkEnd,
                            scrub: true,
                            onEnter: () => gsap.set(picture, { transformOrigin: "left top" }),
                            onEnterBack: () =>
                                gsap.set(picture, { transformOrigin: "left top" }),
                            onLeaveBack: () =>
                                gsap.set(picture, { transformOrigin: "right top" }),
                        },
                    });

                    tl.fromTo(
                        picture,
                        { scaleX: 1, scaleY: 1 },
                        { scaleX: 0, scaleY: 0 },
                        0
                    );
                } else {
                    gsap.set(picture, { clearProps: "transform,willChange" });
                }
            });

            const recalcHeights = () => {
                const curVh = window.innerHeight;
                const hH = getHeaderH();
                items.forEach((item, i) => {
                    const h = curVh - hH * Math.min(i, 2);
                    gsap.set(item, { height: h });
                    const picture = item.querySelector<HTMLElement>("picture");
                    if (picture) {
                        gsap.set(picture, { height: h, width: "100%" });
                        if (isMobile) gsap.set(picture, { clearProps: "transform,willChange" });
                    }
                });
            };

            const onResize = () => {
                recalcHeights();
                ScrollTrigger.refresh();
            };

            window.addEventListener("resize", onResize);
            ScrollTrigger.addEventListener("refreshInit", recalcHeights);

            self.add(() => {
                window.removeEventListener("resize", onResize);
                ScrollTrigger.removeEventListener("refreshInit", recalcHeights);
            });
        }, listRef);

        return () => ctx.revert();
    }, [isMobile]);




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
