"use client";

import clsx from "clsx";
import React, { useRef } from "react";
import styles from "./service-hero.module.scss";
import Container from "@/app/components/layout/container/container";
// import Spline from "@splinetool/react-spline";
// import Magnetic from "@/app/components/ui/magnetic/magnetic";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ServiceHeroProps = {
  device: { isMobile: boolean; isDesktop: boolean };
};

const ServiceHero = ({ device }: ServiceHeroProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  // const cube = useRef<HTMLDivElement | null>(null);

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function onLoad(spline: any) {
  //   const obj = spline.findObjectByName("Cube");
  //   cube.current = obj;
  //   spline.setZoom(2);
  // }

  useGSAP(
      () => {
        const sel = gsap.utils.selector(container);
        const tl = gsap.timeline({ delay: 1 });

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
            { width: "0%" },
            {
              width: "40%",
              ease: "power4.out",
              scrollTrigger: {
                trigger: container.current!,
                start: "bottom center",
                end: "bottom top",
                scrub: true,
              },
            }
        );
      },
      { scope: container }
  );

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <span
            className={`${styles.label} section-label section-label--black`}
          >
            Services & Approach
          </span>

          {/* {device.isDesktop && (
            <Magnetic strength={40} className={styles.spline}>
              <Spline
                className={styles.splineElement}
                ref={cube}
                onLoad={onLoad}
                scene="https://prod.spline.design/IYqbG0zcyS4sYTVf/scene.splinecode"
              />
            </Magnetic>
          )} */}

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
      </Container>
    </section>
  );
};

export default ServiceHero;
