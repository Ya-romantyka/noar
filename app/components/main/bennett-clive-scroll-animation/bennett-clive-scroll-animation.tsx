"use client";
import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./bennett-clive-scroll-animation.module.scss";
import Container from "@/app/components/layout/container/container";
import Button from "@/app/components/ui/button/button";
import ButtonIcon from "@/public/images/button_icon.svg";

const BennettCliveScrollAnimation = () => {
    const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const pin = pinRef.current;

        if (!section || !pin) return;

        const remToPx = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);



        const computed = getComputedStyle(section);
        const paddingTop = parseFloat(computed.paddingTop);
        const paddingBottom = parseFloat(computed.paddingBottom);
        const pinHeight = pin.offsetHeight;

        ScrollTrigger.create({
            trigger: section,
            start: () => `top+=${paddingTop + pinHeight} center`,
            end: () => `bottom-=${paddingBottom - pinHeight} center`,
            pin: pin,
            pinSpacing: false,
        });


        rowsRef.current.forEach((row) => {
            if (!row) return;
            const startExpend = window.innerWidth < 768 ? remToPx(10) : remToPx(20);
            const endExpend = window.innerWidth < 768 ? remToPx(0) : remToPx(0);
            const collapStart = window.innerWidth < 768 ? remToPx(10) : remToPx(20);
            const collapEnd = window.innerWidth < 768 ? remToPx(20) : remToPx(40);

            ScrollTrigger.create({
                trigger: row,
                start: `top-=${startExpend} center`,
                end: `top+=${endExpend} center`,
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const maxGap = window.innerWidth < 768 ? 25 : 50;
                    const minGap = 0;
                    const currentGap = minGap + (maxGap - minGap) * progress;
                    row.style.gap = `${currentGap}rem`;
                },
            });

            ScrollTrigger.create({
                trigger: row,
                start: `top+=${collapStart} center`,
                end: `top+=${collapEnd} center`,
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const maxGap = 0;
                    const minGap = window.innerWidth < 768 ? 25 : 50;
                    const currentGap = minGap + (maxGap - minGap) * progress;
                    row.style.gap = `${currentGap}rem`;
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
            rowsRef.current = [];
        };
    }, []);


    return (
        <section ref={sectionRef} className={styles.section} data-header-white>
            <Container>
                <div className={styles.pinWrapper} ref={pinRef}>
                    <Button href={"/about"} className={styles.button} variant={"outline-white"}>
                        <ButtonIcon className={styles.icon}/>
                        about us
                    </Button>
                </div>

                <div className={styles.textMob}>
                    {[
                        ["we pro", "vide a"],
                        ["produc", "t based"],
                        ["on the ", "unity of"],
                        ["artifac", "ts and"],
                        ["user exp", "erience,"],
                        ["deep ref", "lection"],
                        ["on visu", "al and"],
                        ["acti", "vity"],
                        ["perce", "ption"],
                    ].map(([left, right], index) => (
                        <div
                            key={`mob-${index}`}
                            className={styles.row}
                            ref={(el) => {
                                if (el) rowsRef.current.push(el);
                            }}
                        >
                            <p className={styles.text}>{left}</p>
                            <p className={styles.text}>{right}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.textDeck}>
                    {[
                        ["we pr", "ovide a"],
                        ["product", " based on"],
                        ["the un", "ity of"],
                        ["artifacts ", "and user"],
                        ["experien", "ce, deep"],
                        ["reflec", "tion on"],
                        ["visual an", "d activity"],
                        ["perce", "ption"],
                    ].map(([left, right], index) => (
                        <div
                            key={`deck-${index}`}
                            className={styles.row}
                            ref={(el) => {
                                if (el) rowsRef.current.push(el);
                            }}
                        >
                            <p className={styles.text}>{left}</p>
                            <p className={styles.text}>{right}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default BennettCliveScrollAnimation;
