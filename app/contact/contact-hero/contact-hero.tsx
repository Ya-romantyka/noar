"use client";

import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {getDeviceInfo} from "@/app/hooks/useDevice";
import Container from "@/app/components/layout/container/container";
import styles from "./contact-hero.module.scss";
import clsx from "clsx";
import ContactForm from "../form/contact-form";
import ContactInfo from "../contact-info/contact-info";

export default function ContactHero() {
    const container = useRef<HTMLDivElement | null>(null);
    const formRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

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

            const {isDesktop} = getDeviceInfo();

            if (isDesktop) {
                const form = formRef.current;
                const section = container.current;
                const videoEl = videoRef.current;


                if (!form || !videoEl) return;
                const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
                const offset = 78 * remInPx;

                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    endTrigger: section,
                    end: `bottom-=${offset} top`,
                    pin: videoEl,
                    pinSpacing: false,
                });
            }
        },
        {scope: container}
    );


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
                    <video className={styles.video} loop muted playsInline autoPlay ref={videoRef}>
                        <source src="/videos/HalfCircle.mp4" type="video/mp4; codecs=hvc1"/>
                        <source src="/videos/HalfCircle.webm" type="video/webm"/>
                    </video>
                    <div className={styles.text}>
                        <p>Tell us all about it!</p>
                        <p>
                            Fill out the application and we&apos;ll circle back as soon as
                            possible!
                        </p>
                    </div>
                </div>

                <div className={styles.body} ref={formRef}>
                    <ContactForm/>
                </div>

                <ContactInfo/>
            </Container>
        </section>
    );
}
