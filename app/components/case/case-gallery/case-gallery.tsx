'use client';

import clsx from 'clsx';
import { FC, ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './case-gallery.module.scss';
import Container from '../../layout/container/container';
import Image from 'next/image';
import useSplitTextAnimation from '@/app/hooks/useSplitTextAnimation';
import AutoVideo from '@/app/components/ui/Auto-video/AutoVideo';
import { useIsMobile } from '@/app/hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

type VideoItem = {
  src: string;
  srcMob?: string;
  type: string;
  typeMob?: string;
  poster?: string;
  fullSrc?: string;
  fullType?: string;
};
type ImageItem = {
  srcDesk: string;
  srcMob: string;
};

type MediaItem = {
  image?: ImageItem;
  video?: VideoItem;
};

interface CaseGalleryProps {
  label: string;
  title: ReactNode;
  media: MediaItem[];
  galleryClassNames?: string;
  parallaxClasses?: string[];
}

const CaseGallery: FC<CaseGalleryProps> = ({
  label,
  title,
  media,
  galleryClassNames,
  parallaxClasses,
}) => {
  let galleryClass = '';

  const isMobile = useIsMobile();

  const galleryRef = useRef<HTMLUListElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  switch (media.length) {
    case 1:
      galleryClass = styles.gallery1;
      break;
    case 2:
      galleryClass = styles.gallery2;
      break;
    case 3:
      galleryClass = styles.gallery3;
      break;
    case 4:
      galleryClass = styles.gallery4;
      break;
    case 5:
      galleryClass = styles.gallery5;
      break;
    default:
      galleryClass = styles.galleryDefault;
  }

  useEffect(() => {
    if (!galleryRef.current || !parallaxClasses) return;

    const mediaEl = galleryRef.current.querySelector<HTMLElement>(
      parallaxClasses.join(','),
    );
    if (!mediaEl) return;

    gsap.fromTo(
      mediaEl,
      { y: '10%', scale: 1.2 },
      {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
          trigger: mediaEl,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      },
    );

    ScrollTrigger.refresh();
  }, []);

  useSplitTextAnimation(titleRef, { triggerOnScroll: true });

  return (
    <section className={styles.section} data-header-white>
      <Container className={styles.container}>
        <div className={styles.header}>
          <span
            className={clsx(styles.label, 'section-label section-label--white')}
          >
            {label}
          </span>
          <h2 ref={titleRef} className={styles.title}>
            {title}
          </h2>
        </div>

        <ul
          className={clsx(styles.images, galleryClass, galleryClassNames)}
          ref={galleryRef}
        >
          {media.map((item, index) => (
            <li
              className={clsx(styles.item, {
                [styles.singleItem]: media.length === 1,
              })}
              key={index}
            >
              {item.image &&
                (isMobile ? (
                  <Image
                    src={item.image.srcMob}
                    alt={`Gallery image ${index + 1}`}
                    priority={true}
                    fill
                    sizes="100vw"                    className={styles.image}
                  />
                ) : (
                  <Image
                    src={item.image.srcDesk}
                    alt={`Gallery image ${index + 1}`}
                    priority={true}
                    fill
                    sizes="100vw"                    className={styles.image}
                  />
                ))}

              {item.video && (
                <AutoVideo video={item.video} className={styles.video} />
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default CaseGallery;
