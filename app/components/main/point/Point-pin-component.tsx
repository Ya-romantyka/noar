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
        const pin = pinRef.current;
        const line = lineRef.current;
        const text = textRef.current;
        if (!wrapper || !pin || !line || !text) return;


        const trigger = ScrollTrigger.create({
            trigger: wrapper,
            start: 'top center',
            end: 'bottom center',
            pin: pin,
            pinSpacing: false,
        });


        const lineTween = gsap.fromTo(line,
            {scaleY: 0},
            {
                scaleY: 1,
                transformOrigin: 'center bottom',
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                }
            }
        );

        const textTween = gsap.fromTo(text, {
           opacity: 0,
        },
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top center',
                    end: `top center-=20%`,
                    scrub:true,
                }
            })

        return () => {
            trigger?.kill();
            lineTween?.kill();
            textTween?.kill();
        };
    }, []);

    return (
        <div ref={wrapperRef} className={styles.pinWrapper} >
            <div ref={pinRef} className={styles.pin}>
                <div ref={lineRef} className={styles.line}/>
                <p className={styles.text} ref={textRef}>To the point</p>
            </div>
        </div>
    );
}
