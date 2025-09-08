'use client';

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import styles from './Point-pin-component.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function PointPinComponent() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const line = lineRef.current;
        const text = textRef.current;
        if (!wrapper || !line || !text) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
                pin: line,
                pinSpacing: false,
            },
        });

        tl.fromTo(text, { opacity: 0 }, { opacity: 1, duration: 0.1 })
            .to({}, { duration: 0.8 })
            .to(text, { opacity: 0, duration: 0.1 });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
            gsap.set(text, { clearProps: 'opacity' });
        };
    }, []);

    return (
        <div ref={wrapperRef} className={styles.pinWrapper}>
            <div ref={pinRef} className={styles.pin}>
                <div  className={styles.line}/>
                <div className={styles.textWrapper} ref={lineRef}>
                    <p className={styles.text} ref={textRef}>To the point</p>
                </div>
            </div>
        </div>
    );
}
