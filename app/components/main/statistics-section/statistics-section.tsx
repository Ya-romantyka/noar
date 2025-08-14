'use client'

import React, { useEffect, useRef } from 'react';
import styles from './statistics-section.module.scss';
import Container from "@/app/components/layout/container/container";
import Button from "@/app/components/ui/button/button";
import ButtonIcon from "@/public/images/button_icon.svg";

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatisticsSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const numberRefs = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        numberRefs.current.forEach((el) => {
            const finalValue = parseInt(el.dataset.value || '0', 10);

            gsap.fromTo(
                el,
                { innerText: 0 },
                {
                    innerText: finalValue,
                    duration: 2,
                    ease: 'power1.out',
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                    onUpdate: function () {
                        el.innerText = Math.floor(Number(el.innerText)).toString();
                    }
                }
            );
        });
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <Container>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <h2 className={styles.itemNumber}>
                            <span
                                className={styles.number}
                                data-value="70"
                                ref={el => {
                                    if (el) numberRefs.current[0] = el;
                                }}
                            >
                                0
                            </span>
                            <span className={styles.plus}>+</span>
                        </h2>
                        <p className={styles.itemText}>Clients</p>
                    </li>

                    <li className={styles.item}>
                        <h2 className={styles.itemNumber}>
                            <span
                                className={styles.number}
                                data-value="6"
                                ref={el => {
                                    if (el) numberRefs.current[1] = el;
                                }}
                            >
                                0
                            </span>
                            <span className={styles.plus}>+</span>
                        </h2>
                        <p className={styles.itemText}>Years of experience</p>
                    </li>

                    <li className={styles.item}>
                        <h2 className={styles.itemNumber}>
                            <span
                                className={styles.number}
                                data-value="10"
                                ref={el => {
                                    if (el) numberRefs.current[2] = el;
                                }}
                            >
                                0
                            </span>
                            {/*<span className={styles.plus}>+</span>*/}
                        </h2>
                        <p className={styles.itemText}>Team members</p>
                    </li>
                </ul>
                <p className={styles.text}>
                    Let&apos;s make<br />great things happen
                </p>
                <Button href={""} className={styles.button} variant={'white'}>
                    <ButtonIcon className={styles.icon} />
                    Let’s Connect
                </Button>
            </Container>
        </section>
    );
};

export default StatisticsSection;
