"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDeviceInfo } from "@/app/hooks/useDevice";
import Container from "@/app/components/layout/container/container";
import styles from "./contact-hero.module.scss";
import clsx from "clsx";
import ContactForm from "../form/contact-form";
import ContactInfo from "../contact-info/contact-info";
import {useAutoPlayVideo} from "@/app/hooks/useAutoPlayVideo";

export default function ContactHero() {
  const container = useRef<HTMLDivElement | null>(null);
  const splineRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useAutoPlayVideo(videoRef)
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".title-inner-row", {
        yPercent: 100,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        delay: 1,
      });

      const { isDesktop } = getDeviceInfo();

      if (isDesktop) {
        const containerEl = container.current;
        const splineEl = splineRef.current;

        if (!containerEl || !splineEl) return;

        const containerHeight = containerEl.offsetHeight;
        const splineHeight = splineEl.offsetHeight;
        const endValue = containerHeight - splineHeight;

        ScrollTrigger.create({
          trigger: containerEl,
          start: "top top",
          end: `+=${endValue}`,
          pin: `.${styles.spline}`,
          pinSpacing: false,
        });
      }
    },
    { scope: container }
  );

  // const cube = useRef<HTMLDivElement | null>(null);

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function onLoad(spline: any) {
  //   const obj = spline.findObjectByName("Cube");
  //   cube.current = obj;
  //   spline.setZoom(2);
  // }

  return (
    <section ref={container} className={clsx(styles.section, "section")}>
      <Container>
        <div className={styles.header}>
          <span className={`${styles.label} section-label`}>Contact</span>
          <h1 className={clsx(styles.title, "h1")}>
            <span className={styles.titleRow}>
              <span className={clsx(styles.innerRow, "title-inner-row")}>
                IS YOUR BIG
              </span>
            </span>
            <span className={styles.titleRow}>
              <span className={clsx(styles.innerRow, "title-inner-row")}>
                IDEA ready to
              </span>
            </span>
            <span className={styles.titleRow}>
              <span className={clsx(styles.innerRow, "title-inner-row")}>
                go wild?
              </span>
            </span>
          </h1>
          <video className={styles.video} loop muted playsInline autoPlay={true} ref={videoRef}>
            <source src="/videos/HalfCircle.mp4" type="video/mp4; codecs=hvc1" />
            <source src="/videos/HalfCircle.webm" type="video/webm" />
          </video>
          <div className={styles.text}>
            <p>Tell us all about it!</p>
            <p>
              Fill out the application and we&apos;ll circle back as soon as
              possible!
            </p>
          </div>
        </div>

        <div className={styles.body}>
          <ContactForm />
        </div>

        <ContactInfo />
      </Container>
    </section>
  );
}
