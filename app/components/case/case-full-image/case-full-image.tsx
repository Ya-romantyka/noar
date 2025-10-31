'use client';
import styles from './case-full-image.module.scss';
import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAutoPlayVideo } from '@/app/hooks/useAutoPlayVideo';

interface video {
  src: string;
  type: string;
  poster?: string;
}
interface CaseFullImage {
  image?: string;
  video?: video;
}

const CaseHero: FC<CaseFullImage> = ({ image, video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useAutoPlayVideo(videoRef);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={styles.media}>
      {image && (
        <picture className={styles.image} data-header-white>
          {!isMobile ? (
            <Image src={image} alt="cover" fill sizes="100vw" priority />
          ) : (
            <Image src={image} alt="cover" width={600} height={400} priority />
          )}
        </picture>
      )}

      {video && (
        <video
          className={styles.video}
          autoPlay={false}
          poster={video.poster ?? ''}
          loop={true}
          muted={true}
          controls={false}
          playsInline
          ref={videoRef}
          preload="none"
        >
          <source src={video.src} type={video.type} />
        </video>
      )}
    </div>
  );
};

export default CaseHero;
