'use client';
import styles from './case-full-image.module.scss';
import Image from 'next/image';
import React, { FC, useRef } from 'react';
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
  useAutoPlayVideo(videoRef);
  return (
    <div className={styles.media}>
      {image && (
        <picture className={styles.image} data-header-white>
          <Image src={image} alt="cover" fill sizes="100vw" priority />
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
