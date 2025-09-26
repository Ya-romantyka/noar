'use client';
import React, { ReactNode, useEffect, useRef } from 'react';
import styles from './Module-mission.module.scss';
import clsx from 'clsx';
import Button from '@/app/components/ui/button/button';
import CloseIcon from '@/app/assets/icons/close-icon.svg';

interface Props {
  className?: string;
  onClose?: () => void;
  open?: boolean;
  title: string;
  text: string | ReactNode;
}

const ModuleMission: React.FC<Props> = ({
  className,
  onClose,
  open = false,
  title,
  text,
}) => {
  const topRef = useRef<HTMLDivElement | null>(null);
  const middleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const top = topRef.current;
    const middle = middleRef.current;
    if (!top || !middle) return;

    const setProgress = (val: number) => {
      const clamped = Math.max(0, Math.min(1, val));
      top.style.setProperty('--progress', `${(clamped * 100).toFixed(2)}%`);
    };

    let rafId: number | null = null;
    const schedule = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        const { scrollTop, clientHeight, scrollHeight } = middle;
        if (scrollHeight <= clientHeight) {
          setProgress(1);
        } else {
          const seen = (scrollTop + clientHeight) / scrollHeight;
          setProgress(seen);
        }
        rafId = null;
      });
    };

    const onScroll = () => schedule();

    const DEBOUNCE_MS = 80;
    let roTimer: number | null = null;
    const onResizeObserved = () => {
      if (roTimer !== null) window.clearTimeout(roTimer);
      roTimer = window.setTimeout(() => {
        roTimer = null;
        schedule();
      }, DEBOUNCE_MS);
    };

    schedule();
    const t = window.setTimeout(schedule, 0);

    middle.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(onResizeObserved);
    ro.observe(middle);

    return () => {
      middle.removeEventListener('scroll', onScroll);
      ro.disconnect();
      window.clearTimeout(t);
      if (roTimer !== null) window.clearTimeout(roTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [open]);

  return (
    <div className={clsx(styles.module, className, { [styles.active]: open })}>
      <div className={styles.inner}>
        <div className={styles.top} ref={topRef}></div>
        <div className={styles.middle} ref={middleRef} data-lenis-prevent>
          <span className={styles.label}>Mission</span>
          <h3 className={styles.title}>{title}</h3>
          {typeof text === 'object' ? (
            text
          ) : (
            <p className={styles.text}>{text}</p>
          )}
        </div>
        <div className={styles.bottom}>
          <Button variant="black" onClick={onClose} className={styles.button}>
            close
            <CloseIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleMission;
