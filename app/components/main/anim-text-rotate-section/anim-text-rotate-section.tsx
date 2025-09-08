'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import styles from './anim-text-rotate-section.module.scss';
import { useCursorStyle } from '@/app/hooks/useCursorStyle';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AnimTextRotateSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinnedRef  = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cursorTriggerRef = useRef<HTMLDivElement>(null);
    const textRef    = useRef<HTMLHeadingElement>(null);
    const buttonRef  = useRef<HTMLAnchorElement>(null);

    useCursorStyle({ style: 'big', ref: cursorTriggerRef });

    useEffect(() => {
        const section = sectionRef.current;
        const pinned  = pinnedRef.current;
        const wrapper = wrapperRef.current as HTMLElement | null;
        const text    = textRef.current;
        const button  = buttonRef.current;
        if (!section || !pinned || !wrapper || !text || !button) return;

        const ctx = gsap.context(() => {
            const split = new SplitText(text, { type: 'chars', charsClass: 'char' });
            const chars = Array.from(text.querySelectorAll<HTMLElement>('.char'));
            const allElems = [...chars, button];

            const calcTimingX = () => {
                const vw = window.innerWidth;
                const wrapRect = wrapper.getBoundingClientRect();
                const btnRect  = button.getBoundingClientRect();
                const btnCenterX = (btnRect.left + btnRect.width / 2) - wrapRect.left;
                return vw / 2 - btnCenterX;
            };

            const finalX = calcTimingX();
            const lastIndex = chars.length - 1;

            const initialPositions = allElems.map(el => {
                const rect = el.getBoundingClientRect();
                return { el, initialX: rect.left };
            });

            const lastCharEl = chars[lastIndex];
            const lastCharRect = lastCharEl.getBoundingClientRect();
            const lastCharX = lastCharRect.left;

            const scrollLength = section.offsetHeight - window.innerHeight;
            const lastCharEndScroll =
                ((window.innerWidth * 0.20 - lastCharX) / finalX) * scrollLength;

            const charMetrics = chars.map((el, index) => {
                const finalPx = parseFloat(getComputedStyle(el).fontSize);
                const reverseIndex = lastIndex - index;
                const scaleFactor = 0.10 + reverseIndex * 0.10;
                const initialPx = finalPx * scaleFactor;
                return { el, finalPx, initialPx };
            });



            charMetrics.forEach(m => {
                m.el.style.fontSize = `${m.initialPx}px`;
                gsap.set(m.el, {
                    yPercent: 200,
                    opacity: 0,
                    filter: 'blur(10px)',
                    force3D: true,
                    willChange: 'transform, filter'
                });
            });
            gsap.set(button, {
                yPercent: 200,
                opacity: 0,
                filter: 'blur(10px)',
                force3D: true,
                willChange: 'transform, filter'
            });

            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                pin: pinned,
                pinSpacing: false,
            });

            charMetrics.forEach(m => {
                gsap.to(m.el, {
                    fontSize: `${m.finalPx}px`,
                    ease: (t: number) => Math.pow(t, 0.7),
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: `${lastCharEndScroll}px top`,
                        scrub: true,
                    }
                });
            });

            initialPositions.forEach(({ el, initialX }) => {
                const startScroll = ((window.innerWidth - initialX) / calcTimingX()) * scrollLength;

                const endScroll   = ((0 - initialX) / calcTimingX()) * scrollLength;

                gsap.to(el, {
                    yPercent: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: `${startScroll}px top`,
                        end: `${endScroll}px top`,
                        scrub: true,
                    }
                });
            });

            const shift = -(wrapper.offsetWidth - window.innerWidth);

            gsap.to(wrapper, {
                x: shift,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                }
            });

            return () => {
                split.revert();
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.textWrapper}>
            <div ref={cursorTriggerRef} className={styles.cursorTrigger} />
            <div ref={pinnedRef} className={styles.pinnedContent}>
                <div ref={wrapperRef} className={styles.textInner}>
                    <h2 ref={textRef} className={styles.text}>
                        TAKE A LOOK AT MORE CASES
                    </h2>
                    <a ref={buttonRef} className={styles.button} href="#">
                        dive in
                    </a>
                </div>
            </div>
        </section>
    );
}
