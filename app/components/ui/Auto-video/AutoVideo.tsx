'use client';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './AutoVideo.module.scss';
import Button from '@/app/components/ui/button/button';
import PlayIcon from '@/app/assets/icons/play_icon.svg';
import CloseIcon from '@/app/assets/icons/close-icon.svg';
import clsx from 'clsx';
import { useAutoPlayVideo } from '@/app/hooks/useAutoPlayVideo';

type VideoItem = {
  src: string;
  fullSrc?: string;
  type: string;
  poster?: string;
};

const AutoVideo: FC<{ video: VideoItem; className?: string }> = ({
  video,
  className,
}) => {
  const previewRef = useRef<HTMLVideoElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  useAutoPlayVideo(previewRef, { priority: 'normal', lazySources: true });

  const openFull = () => {
    setOpen(true);
    window.__lenis?.stop();
  };
  const closeFull = () => {
    setOpen(false);
    fullRef.current?.pause();
    window.__lenis?.start();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const id = setTimeout(() => {
      fullRef.current?.play().catch(() => {});
    }, 30);
    return () => {
      clearTimeout(id);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className={styles.videoWrapper} onClick={openFull}>
        <video
          ref={previewRef}
          className={className}
          poster={video.poster}
          loop
          muted
          playsInline
          preload="none"
        >
          <source data-src={video.src} type={video.type} />
        </video>

        <Button className={styles.button} variant="outline-white">
          <PlayIcon /> play
        </Button>
      </div>

      {open && (
        <div
          className={clsx(styles.popup, styles.open)}
          onClick={closeFull}
          role="dialog"
          aria-modal="true"
        >
          <Button className={styles.close} variant="black" onClick={closeFull}>
            <CloseIcon /> close
          </Button>
          <video
            ref={fullRef}
            poster={video.poster}
            controls
            playsInline
            preload="auto"
          >
            <source src={video.fullSrc ?? video.src} type={video.type} />
          </video>
        </div>
      )}
    </>
  );
};

export default AutoVideo;
