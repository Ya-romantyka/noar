"use client";

import React, {useRef} from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./stagger-link.module.scss";
import {useCursorStyle} from "@/app/hooks/useCursorStyle";
import {useHoverFlyUpText} from "@/app/hooks/useHoverFlyUpText";

interface StaggerLinkProps {
    children: string;
    href: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    target?: "_blank" | "_self";
    yPercent?: number
}

const StaggerLink: React.FC<StaggerLinkProps> = ({
                                                     children,
                                                     href,
                                                     onClick,
                                                     target,
                                                     className,
                                                     yPercent = 165
                                                 }) => {
    const linkRef = useRef<HTMLAnchorElement>(null);

    const textRef = useRef<HTMLParagraphElement>(null);
    useCursorStyle({
        ref: linkRef,
        style: "button",
    });

    useHoverFlyUpText({
        hoverBlock: textRef,
        text: textRef,
        type: 'lines',
        className: styles.char,
        yPercent,
        duration: 0.6,
    })


    if (target === "_blank") {
        return (
            <a
                ref={linkRef}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
                className={clsx(styles.link, className)}
            >
                <span className={styles.text} ref={textRef}>{children}</span>
            </a>
        );
    }

    return (
        <Link
            ref={linkRef}
            href={href}
            onClick={onClick}
            className={clsx(styles.link, className)}
        >
            <span className={styles.text} ref={textRef}>{children}</span>
        </Link>
    );
};

export default StaggerLink;
