import React, { useEffect, useRef } from 'react';
import styles from './Module-mission.module.scss';
import clsx from 'clsx';
import Button from '@/app/components/ui/button/button';
import CloseIcon from '@/app/assets/icons/close-icon.svg';

interface Props {
  className?: string;
  onClose?: () => void;
  open?: boolean;
}

const ModuleMission: React.FC<Props> = ({
  className,
  onClose,
  open = false,
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
          <h3 className={styles.title}>
            Acro Studio is a small network of gyms.
          </h3>
          <p className={styles.text}>
            Acrobatics, stretching, fly yoga, fitness for adults and their
            children. The client&apos;s request was to create an identity for
            use online and offline. The logo was based on the idea of an
            acrobatic track - the main attribute of this sport. The minimalistic
            shape combined with bright green and purple colors create an image
            associated with sports and energy, but do not burden it, preserving
            the childlike ease. In addition, a series of icons and graphic
            decorative elements were developed for social media, which can be
            used to create banners, flyers and posts.
          </p>
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
