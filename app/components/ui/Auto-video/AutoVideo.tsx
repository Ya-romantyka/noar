'use client';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './AutoVideo.module.scss';
import Button from '@/app/components/ui/button/button';
import PlayIcon from '@/app/assets/icons/play_icon.svg';
import CloseIcon from '@/app/assets/icons/close-icon.svg';
import clsx from 'clsx';
import { useAutoPlayVideo } from '@/app/hooks/useAutoPlayVideo';
import Image from "next/image";

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
  const [isPreviewReady, setIsPreviewReady] = useState(false);

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
          {video.poster && (
              <Image
                  src={video.poster}
                  alt=""
                  aria-hidden="true"
                  className={clsx(styles.poster, {
                    [styles.posterHidden]: isPreviewReady,
                  })}
                  fill
                  sizes={'100vw'}
              />
          )}

          <video
              ref={previewRef}
              className={clsx(className, styles.video, {
                [styles.videoVisible]: isPreviewReady,
              })}
              loop
              muted
              playsInline
              preload="none"
              onLoadedData={() => setIsPreviewReady(true)}
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
