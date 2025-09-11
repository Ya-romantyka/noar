"use client";

import clsx from "clsx";
import React, {useRef} from "react";
import styles from "./service-hero.module.scss";
import Container from "@/app/components/layout/container/container";

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {useAutoPlayVideo} from "@/app/hooks/useAutoPlayVideo";
import Magnetic from "@/app/components/ui/magnetic/magnetic";

gsap.registerPlugin(ScrollTrigger);

type ServiceHeroProps = {
    device: { isMobile: boolean; isDesktop: boolean };
};

const ServiceHero = ({device}: ServiceHeroProps) => {
    const container = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);


    useAutoPlayVideo(videoRef)
    useGSAP(
        () => {
            const sel = gsap.utils.selector(container);
            const tl = gsap.timeline({delay: 1});

            if (device.isMobile) {
                tl.from(sel(".word"), {
                    yPercent: 100,
                    skewX: -10,
                    scale: 0.8,
                    duration: 1,
                    ease: "power4.out",
                    stagger: 0.15,
                });
            }

            if (device.isDesktop) {
                tl.from(sel(".word"), {
                    yPercent: 100,
                    skewX: -10,
                    scale: 0.8,
                    duration: 1,
                    ease: "power4.out",
                    stagger: 0.15,
                });


            }

            gsap.fromTo(
                sel(".spacer"),
                {width: "0%"},
                {
                    width: device.isDesktop ? "40%" : "30%",
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current!,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );


        },
        {scope: container}
    );

    return (
        <section className={styles.section} ref={sectionRef}>
            <Container>
                <div className={styles.header}>
          <span
              className={`${styles.label} section-label section-label--black`}
          >
            Services & Approach
          </span>


                    {device.isDesktop ? (
                        <h1 ref={container} className={clsx(styles.title, "title, h1")}>
              <span className={styles.titleRow}>
                <span className={clsx(styles.word, "word")}>From</span>
              </span>
                            <span className={styles.titleRow}>
                <span className={clsx(styles.word, "word")}>Concept</span>
              </span>
                            <span className={styles.titleRow}>
                <span className={clsx(styles.word, "word")}>To</span>{" "}
                                <span className={clsx(styles.spacer, "spacer")}></span>
                <span className={clsx(styles.word, "word")}>Launch</span>
              </span>
                        </h1>
                    ) : (
                        <h1 ref={container} className={clsx(styles.title, "title, h1")}>
              <span className={styles.titleRow}>
                <span className={clsx(styles.word, "word")}>From</span>
              </span>
                            <span className={styles.titleRow}>
                <span className={clsx(styles.word, "word")}>Concept</span>{" "}
                                <span className={clsx(styles.word, "word")}>To</span>
              </span>
                            <span className={styles.titleRow}>
                <span className={clsx(styles.spacer, "spacer")}></span>
                <span className={clsx(styles.word, "word")}>Launch</span>
              </span>
                        </h1>
                    )}
                </div>
                <Magnetic strength={40} className={styles.video}>
                    <video  loop muted playsInline autoPlay={true} ref={videoRef}>
                        <source src="/videos/Sym.mp4" type="video/mp4; codecs=hvc1"/>
                        <source src="/videos/Sym.webm" type="video/webm"/>
                    </video>
                </Magnetic>

            </Container>
        </section>
    );
};

export default ServiceHero;
