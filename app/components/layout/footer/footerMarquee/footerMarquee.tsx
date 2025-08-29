import Marquee from "react-fast-marquee";
import styles from "./footer-marquee.module.scss";
import React, {useRef} from "react";
import {useCursorStyle} from "@/app/hooks/useCursorStyle";

const MarqueeComponent = () => {


    const wrapperRef = useRef<HTMLDivElement>(null);

    useCursorStyle({
        ref: wrapperRef,
        style: "link",
        icon:true,
        href:'/contact',
        text: "email us",
    });
    return (
        <div className={styles.marquee} ref={wrapperRef}>
            <Marquee speed={50} gradient={false}>
                <span className={styles.marqueeText}>LET’S CONNECT</span>
                <span className={styles.marqueeCircle}></span>
                <span className={styles.marqueeText}>LET’S CONNECT</span>
                <span className={styles.marqueeCircle}></span>
            </Marquee>
        </div>
    );
};

export default MarqueeComponent;
