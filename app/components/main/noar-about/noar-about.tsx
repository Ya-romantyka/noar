'use client'
import React, {useEffect, useRef} from 'react';
import styles from './noar-about.module.scss'
import Container from "@/app/components/layout/container/container";
import ButtonIcon from "@/public/images/button_icon.svg";
import Button from "@/app/components/ui/button/button";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import LogoAnimComponent from "@/app/components/main/logo-anim/Logo-anim-component";

gsap.registerPlugin(ScrollTrigger);


const NoarAbout = () => {

    const pinRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!pinRef.current || !circleRef.current) return;

        const circleBlock = circleRef.current.querySelector(`.${styles.circleBlock}`) as HTMLDivElement;
        const text        = circleRef.current.querySelector(`.${styles.text}`) as HTMLParagraphElement;
        const button      = circleRef.current.querySelector(`.${styles.button}`) as HTMLAnchorElement;
        if (!circleBlock || !text || !button) return;

        const targetWidth = window.innerWidth < 768 ? "300%" : "150%";
        const markerEl    = pinRef.current;

        const pinST = ScrollTrigger.create({
            id: "aboutPin",
            trigger: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: circleRef.current,
            scrub: true,
        });

        const growTween = gsap.fromTo(
            circleBlock,
            { width: "5%" },
            {
                width: targetWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: pinRef.current,
                    start: "top top",
                    end: "top+=50% top",
                    scrub: true,
                    onUpdate(self) {
                        if (self.progress >= 0.7) {
                            markerEl.setAttribute('data-header-white', '');
                        } else {
                            markerEl.removeAttribute('data-header-white');
                        }
                    },
                    onLeave() {
                        markerEl.setAttribute('data-header-white', '');
                    },
                    onLeaveBack() {
                        markerEl.removeAttribute('data-header-white');
                    },
                },
            }
        );

        const fadeTween = gsap.fromTo(
            [text, button],
            { opacity: 0 },
            {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: pinRef.current,
                    start: "top+=35% top",
                    end: "top+=40% top",
                    scrub: true,
                },
            }
        );

        return () => {
            ScrollTrigger.getById("aboutPin")?.kill();
            pinST.kill();
            growTween.scrollTrigger?.kill();
            growTween.kill();
            fadeTween.scrollTrigger?.kill();
            fadeTween.kill();
        };
    }, []);


    return (
        <div className={styles.pinWrapper}
             ref={pinRef}
        >
            <div className={styles.circleWrapper}
                 ref={circleRef}>
                <div className={styles.circleBlock}>
                    <section className={styles.section}>
                        <Container className={styles.container}>
                            <h2 className={styles.title}>noar<span>.studio</span></h2>

                            <div className={styles.svgTitle}>
                               <LogoAnimComponent/>
                            </div>

                            <div className={styles.inner}>
                                <p className={styles.text}>We are a full-cycle branding studio offering turnkey
                                    solutions
                                    and a
                                    flexible
                                    approach to individual tasks. From crafting unique identities to developing
                                    functional
                                    web
                                    and
                                    mobile applications, we bring your ideas to life in the digital realm, where brands
                                    gain
                                    clarity
                                    and
                                    impact.</p>
                                <Button href={"/contact"} className={styles.button} variant={'outline-white'}>
                                    <ButtonIcon className={styles.icon}/>
                                    Let’s Connect
                                </Button>
                            </div>
                        </Container>

                    </section>
                </div>
            </div>
        </div>
    );
};

export default NoarAbout;