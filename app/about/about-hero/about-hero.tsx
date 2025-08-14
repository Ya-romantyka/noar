"use client";

import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import Container from "@/app/components/layout/container/container";
import styles from "./about-hero.module.scss";
import clsx from "clsx";
import Button from "@/app/components/ui/button/button";

import ButtonIcon from "@/app/assets/icons/button-icon.svg";
import Label from "@/app/components/ui/label/label";
import LogoAnimAboutComponent from "@/app/about/logo-anim-about/Logo-anim-about-component";
import {useIsMobile} from "@/app/hooks/useIsMobile";

export default function AboutHero() {
    const container = useRef<HTMLDivElement | null>(null);

    const isMobile = useIsMobile();

    useGSAP(() => {
        gsap.from(".title-inner-row", {
            yPercent: 100,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            delay: 1,
        });
        gsap.from(".list li", {
            scale: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            delay: 2,
        });
        gsap.from(".line", {width: 0, duration: 3, ease: "power3.out"});

        const sectionEl = container.current;
        if (!sectionEl) return;

        const listEl = sectionEl.querySelector<HTMLElement>(".list");
        if (!listEl) return;
        const items = Array.from(listEl.children) as HTMLElement[];

        const parallaxSettings = items.map(() => ({
            xFactor: gsap.utils.random(-30, 30),
            yFactor: gsap.utils.random(-30, 30),
        }));

        const onMouseMove = (e: MouseEvent) => {
            const rect = sectionEl.getBoundingClientRect();
            const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
            const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

            items.forEach((el, i) => {
                const {xFactor, yFactor} = parallaxSettings[i];
                gsap.to(el, {
                    x: xNorm * xFactor,
                    y: yNorm * yFactor,
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            });
        };

        sectionEl.addEventListener("mousemove", onMouseMove);

        return () => {
            sectionEl.removeEventListener("mousemove", onMouseMove);
        };
    }, {scope: container});

    return (
        <section className={styles.section} ref={container} data-header-white>
            <Container>
                <div className={styles.model} id="about-model"></div>
                <div className={styles.topRow}>
                    <Label className={styles.label} color="white">
                        About us
                    </Label>

                    {!isMobile && (
                        <div className={styles.logoWrapper}>
                            <LogoAnimAboutComponent/>
                        </div>
                    )}

                    <div className={styles.titleWrap}>
                        <h1 className={clsx(styles.title, "h1")}>
              <span className={clsx(styles.titleRow, "title-row")}>
                <span className={clsx(styles.titleInnerRow, "title-inner-row")}>
                  brand
                </span>
              </span>
                            <span className={clsx(styles.titleRow, "title-row")}>
                <span className={clsx(styles.titleInnerRow, "title-inner-row")}>
                  <ul className={styles.circles}>
                    <li></li>
                    <li></li>
                  </ul>
                  identity
                </span>
              </span>
                            <span className={clsx(styles.titleRow, "title-row")}>
                <span className={clsx(styles.titleInnerRow, "title-inner-row")}>
                  & Digital
                </span>
              </span>
                            <span className={clsx(styles.titleRow, "title-row")}>
                <span className={clsx(styles.titleInnerRow, "title-inner-row")}>
                  Solutions
                </span>
              </span>
                        </h1>
                        <div className={clsx(styles.list, "list")}>
                            <div
                                className={clsx(styles.listItem, styles.one)}
                            >
                                <div>
                                    <span>10+ team members</span>
                                </div>
                            </div>
                            <div
                                className={clsx(styles.listItem, styles.two)}
                            >
                                <div>
                                    <span>70+ clients</span>
                                </div>
                            </div>
                            <div
                                className={clsx(styles.listItem, styles.three)}
                            >
                                <div>
                                    <span>6+ years of excellence</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isMobile && (<p className={styles.logoMob}>(noar)</p>)}
                </div>
                <div className={styles.bottomRow}>
                    <div className={clsx(styles.line, "line")}></div>
                    <span className={styles.item}>Founded in 2022</span>
                    <span className={styles.item}>Kyiv & London</span>
                    <div className={styles.text}>
                        <p>
                            From crafting unique identities to developing functional web and
                            mobile applications, we bring your ideas to life in the digital
                            realm, where brands gain clarity and impact.
                        </p>
                        <p>Kyiv, UA | London, UK</p>
                    </div>
                    <div className={styles.buttonWrap}>
                        <Button variant="white" className={styles.button}>
                            <ButtonIcon/>
                            Learn more
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
