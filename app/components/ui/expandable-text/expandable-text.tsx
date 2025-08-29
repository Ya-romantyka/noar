"use client";

import {ReactNode, useRef, useState} from "react";
import clsx from "clsx";
import styles from "./expandable-text.module.scss";
import Button from "@/app/components/ui/button/button";
import ButtonIcon from "@/app/assets/icons/button-icon.svg";
import ModuleMission from "@/app/components/module/module-mission/Module-mission";

interface ExpandableTextProps {
    children: ReactNode;
}

export default function ExpandableText({children}: ExpandableTextProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const textRef = useRef<HTMLDivElement | null>(null);

    const open = () => {
        setIsOpen(true);
        window.__lenis?.stop();
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        setIsOpen(false);
        window.__lenis?.start();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    };


    return (
        <div className={clsx(styles.expandable)}>
            <div className={styles.body}>
                <div ref={textRef} className={styles.text}>
                    <span>{children}</span>
                    <span>{children}</span>
                </div>
            </div>

            <div className={styles.footer}>
                <Button variant="outline-white" onClick={open} className={styles.button}>
                    <ButtonIcon/>
                    Learn more
                </Button>
            </div>

            <ModuleMission open={isOpen} onClose={close}/>

        </div>
    );
}
