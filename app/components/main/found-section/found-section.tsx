'use client';

import React, { useRef } from 'react';
import styles from './found-section.module.scss';
import Container from '@/app/components/layout/container/container';
import clsx from 'clsx';
import Button from '@/app/components/ui/button/button';
import AutoVideo from '@/app/components/ui/Auto-video/AutoVideo';
import ButtonIcon from '@/public/images/button_icon.svg';
import useSplitTextAnimation from '@/app/hooks/useSplitTextAnimation';
import { useAutoPlayVideo } from '@/app/hooks/useAutoPlayVideo';

const FoundSection = () => {
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useAutoPlayVideo(videoRef, { priority: 'idle', lazySources: true });
  useSplitTextAnimation(titleRef, { triggerOnScroll: true });
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <span
            className={clsx(styles.label, 'section-label section-label--black')}
          >
            Founded in 2022
          </span>
          <div className={styles.top}>
            <p ref={titleRef}>
              We accompany your brand from concept to execution for an immersive
              digital experience.
            </p>
            <p>Kyiv, UA | London, UK</p>
          </div>

          <div className={styles.bottom}>
            <div className={styles.scroll}>Scroll down</div>
            <Button href={''} className={styles.button} variant={'white'}>
              <ButtonIcon className={styles.icon} />
              Let’s Connect
            </Button>
          </div>
        </div>
      </Container>
      <AutoVideo
        video={{
          src: '/videos/HORIZONT-short.mp4',
          type: 'video/mp4',
          poster: '/images/horizont-video-poster.jpg',
          fullSrc: '/videos/HORIZONT-compressed.mp4',
        }}
        className={styles.video}
      />
    </section>
  );
};

export default FoundSection;
