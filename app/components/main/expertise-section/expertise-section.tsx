'use client';

import React, { useEffect, useRef } from 'react';
import styles from './expertise-section.module.scss';
import clsx from 'clsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Container from '@/app/components/layout/container/container';
import Button from '@/app/components/ui/button/button';

import ButtonIcon from '@/public/images/button_icon.svg';
import Magnetic from '../../ui/magnetic/magnetic';
import { useAutoPlayVideo } from '@/app/hooks/useAutoPlayVideo';

gsap.registerPlugin(ScrollTrigger);

const ExpertiseSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useAutoPlayVideo(videoRef);

  useEffect(() => {
    if (!parallaxRef.current || !sectionRef.current) return;

    gsap.set(parallaxRef.current, { top: '80vh' });

    const tween = gsap.to(parallaxRef.current, {
      top: '5vh',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom center',
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className={styles.section} data-header-white ref={sectionRef}>
      <Container>
        <span
          className={clsx(styles.label, 'section-label section-label--white')}
        >
          Our expertise
        </span>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.itemLabel}>01 Design</span>
            <ul className={styles.itemList}>
              <li>Web Design</li>
              <li>UI / UX Design</li>
              <li>Graphics</li>
              <li>2D / 3D Motion</li>
              <li>Branding & Identity</li>
            </ul>
          </li>

          <li className={styles.item}>
            <span className={styles.itemLabel}>
              02 Video / Photo Production
            </span>
            <ul className={styles.itemList}>
              <li>Scriptwriting</li>
              <li>Set-Design</li>
              <li>Filming</li>
              <li>Post-production</li>
            </ul>
          </li>

          <li className={styles.item}>
            <span className={styles.itemLabel}>03 Development</span>
            <ul className={styles.itemList}>
              <li>JavaScript</li>
              <li>Python</li>
              <li>HTML / CSS</li>
              <li>PHP</li>
            </ul>
          </li>
        </ul>
        <div className={styles.pinBlock}>
          <div className={styles.videoParallax} ref={parallaxRef}>
            <Magnetic strength={40} className={styles.videoWrap}>
              <video
                className={styles.video}
                ref={videoRef}
                muted
                playsInline
                loop
              >
                <source src="/videos/Paral.mp4" type="video/mp4; codecs=hvc1" />
                <source src="/videos/Paral.webm" type="video/webm" />
              </video>
            </Magnetic>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            href="/services"
            className={styles.button}
            variant={'outline-white'}
          >
            <ButtonIcon className={styles.icon} />
            Services
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ExpertiseSection;
