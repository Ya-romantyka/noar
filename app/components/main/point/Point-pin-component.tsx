'use client';

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Point-pin-component.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function PointPinComponent() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef     = useRef<HTMLDivElement>(null);
    const lineRef    = useRef<HTMLDivElement>(null);
    const textRef    = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const line = lineRef.current;
        const text = textRef.current;
        if (!wrapper || !line || !text) return;

        let heightTween: gsap.core.Tween | null = null;
        let textTl: gsap.core.Timeline | null = null;
        let textPin: ScrollTrigger | null = null;

        gsap.set(line, { height: '', opacity: 1 });
        const target = parseFloat(getComputedStyle(line).height) || 0;

        gsap.set(line, { height: 0 });
        gsap.set(text, { opacity: 0 });

        heightTween = gsap.to(line, {
            height: target,
            ease: 'none',
            scrollTrigger: {
                trigger: wrapper,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
            },
        });

        textTl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
            },
            defaults: { ease: 'none' },
        })
            .fromTo(text, { opacity: 0 }, { opacity: 1, duration: 0.2 })
            .to({}, { duration: 0.6 })
            .to(text, { opacity: 0, duration: 0.2 });

        const textWidth = Math.round(text.getBoundingClientRect().width);
        gsap.set(text, { width: textWidth });
        textPin = ScrollTrigger.create({
            trigger: wrapper,
            start: 'top center',
            end: 'bottom center',
            pin: text,
            pinSpacing: false,
        });

        return () => {
            heightTween?.scrollTrigger?.kill();
            heightTween?.kill();
            textTl?.scrollTrigger?.kill();
            textTl?.kill();
            textPin?.kill();
            gsap.set(line, { clearProps: 'height' });
            gsap.set(text, { clearProps: 'opacity,width' });
        };
    }, []);

    return (
        <div ref={wrapperRef} className={styles.pinWrapper}>
            <div ref={pinRef} className={styles.pin}>
                <div ref={lineRef} className={styles.line}/>
                <p className={styles.text} ref={textRef}>To the point</p>
            </div>
        </div>
    );
}
