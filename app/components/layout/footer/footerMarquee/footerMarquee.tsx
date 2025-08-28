import Marquee from "react-fast-marquee";
import styles from "./footer-marquee.module.scss";
import Button from "@/app/components/ui/button/button";
import ButtonIcon from "@/public/images/button_icon.svg";
import React, {useRef} from "react";
import {useIsMobile} from "@/app/hooks/useIsMobile";
import {useCanHover} from "@/app/hooks/useCanHover";
import {useInteractiveCursor} from "@/app/hooks/useInteractiveCursor";

const MarqueeComponent = () => {
    const isMobile = useIsMobile()
    const canHover = useCanHover();
    const buttonAnimRef = useRef<HTMLDivElement>(null);
    const blockRef = useRef<HTMLDivElement>(null);

    useInteractiveCursor({
        container: blockRef,
        cursor: buttonAnimRef,
        visibleClass: styles.visible,
    })
    return (
        <div className={styles.marquee} ref={blockRef}>
            <Marquee  speed={50} gradient={false}>
                <span className={styles.marqueeText}>LET’S CONNECT</span>
                <span className={styles.marqueeCircle}></span>
                <span className={styles.marqueeText}>LET’S CONNECT</span>
                <span className={styles.marqueeCircle}></span>
            </Marquee>
            {(!isMobile && canHover) && (
                <div className={styles.buttonWrapper} ref={buttonAnimRef}>
                    <Button href={"/contact"} className={styles.button} variant={"black"}>
                        <ButtonIcon className={styles.icon}/>
                        email us
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MarqueeComponent;
