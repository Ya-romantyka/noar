import React, {useEffect, useRef} from 'react';
import styles from './Module-mission.module.scss'
import clsx from "clsx";
import Button from "@/app/components/ui/button/button";
import CloseIcon from '@/app/assets/icons/close-icon.svg'

interface Props {
    className?: string;
    onClose?: () => void;
    open?: boolean;
}

const ModuleMission: React.FC<Props> = ({className, onClose, open = false}) => {
    const topRef = useRef<HTMLDivElement | null>(null);
    const middleRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const top = topRef.current;
        const middle = middleRef.current;
        if (!top || !middle) return;

        const setProgress = (val: number) => {
            const clamped = Math.max(0, Math.min(1, val));
            top.style.setProperty('--progress', `${(clamped * 100).toFixed(2)}%`);
        };

        const apply = () => {
            const { scrollTop, clientHeight, scrollHeight } = middle;
            if (scrollHeight <= clientHeight) {
                setProgress(1);
            } else {
                const seen = (scrollTop + clientHeight) / scrollHeight;
                setProgress(seen);
            }
            rafRef.current = null;
        };

        const onScroll = () => {
            if (rafRef.current != null) return;
            rafRef.current = requestAnimationFrame(apply);
        };

        requestAnimationFrame(apply);
        const t = setTimeout(apply, 0);

        middle.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        const ro = new ResizeObserver(onScroll);
        ro.observe(middle);

        return () => {
            middle.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            ro.disconnect();
            clearTimeout(t);
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        };
    }, [open]);



    return (
        <div className={clsx(styles.module, className, { [styles.active]: open })}  >
            <div className={styles.inner}>
                <div className={styles.top} ref={topRef}></div>
                <div className={styles.middle} ref={middleRef} data-lenis-prevent>
                    <span className={styles.label}>Mission</span>
                    <h3 className={styles.title}>The noar philosophy stems from the principles of system sciences.</h3>
                    <p className={styles.text}>We offer more than just design or development, we provide a product based
                        on
                        the unity of artifacts and user experience, deep reflection of visual and activity perception,
                        analysis of the dynamics of semantic forms in their ability to create a holistic image, as well
                        as
                        the reflection of the project&apos;s integrative meanings in the product.</p>
                    <p className={styles.text}>The goal of noar is to provide comprehensive solutions based on a
                        detailed
                        analysis of the product as an integral system, taking into account the connections and unity of
                        all
                        its structural elements, and arranging them into an emergent structure, using the core
                        organizational principles to exhaustively perform the task, internally integral and therefore
                        effective.</p>
                    <p className={styles.text}>Our main professional values are efficiency and evidence, integration and
                        consistency, dynamics and balance. The course towards the result corresponding to them
                        characterizes
                        noar and is the main reason for any of its successes and the determinant of its style.
                        Continuous
                        improvement on the way to their realization guarantees the quality and sustainable development
                        of
                        our products, integration of experience, knowledge and goals.</p>

                </div>
                <div className={styles.bottom}>
                    <Button variant="black" onClick={onClose} className={styles.button}>
                        close
                        <CloseIcon/>

                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModuleMission;