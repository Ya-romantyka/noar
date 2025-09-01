"use client";

import React, {useMemo, useRef} from "react";
import Marquee from "react-fast-marquee";
import {usePathname} from "next/navigation";
import {useCursorStyle} from "@/app/hooks/useCursorStyle";
import styles from "./footer-marquee.module.scss";

const MarqueeComponent = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const tone = useMemo<"white" | "black">(
        () => (pathname === "/contact" || pathname?.startsWith("/services") ? "black" : "white"),
        [pathname]
    );

    useCursorStyle({
        ref: wrapperRef,
        style: "link",
        tone,
        icon: true,
        href: "/contact",
        text: "email us",
    });

    return (
        <div
            ref={wrapperRef}
            className={styles.marquee}
            role="link"
            tabIndex={0}
            aria-label="Email us"
        >
            <Marquee speed={50} gradient={false}>
                <span className={styles.marqueeText}>LET’S CONNECT</span>
                <span className={styles.marqueeCircle}/>
                <span className={styles.marqueeText}>LET’S CONNECT</span>
                <span className={styles.marqueeCircle}/>
            </Marquee>
        </div>
    );
};

export default MarqueeComponent;
