'use client';

import { useState, useEffect, useRef, FC, ReactNode } from 'react';
import styles from './case-gallery-swiper.module.scss';
import Container from '../../layout/container/container';
import clsx from 'clsx';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useSplitTextAnimation from '@/app/hooks/useSplitTextAnimation';
import { useCursorStyle } from '@/app/hooks/useCursorStyle';
import { checkMediaTypeByExtension } from '@/utils/checkMediaTypeByExtension';

interface CaseGallerySwiperProps {
  label: string;
  title: ReactNode;
  images: string[];
  classNamesSwiper?: string;
}

const CaseGallerySwiper: FC<CaseGallerySwiperProps> = ({
  label,
  title,
  images,
  classNamesSwiper,
}) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const swiperWrapperRef = useRef<HTMLDivElement>(null);

  useCursorStyle({
    ref: swiperWrapperRef,
    style: 'drag',
    text: 'drag',
  });

  useSplitTextAnimation(titleRef, { triggerOnScroll: true });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

        {isDesktop ? (
          <div className={styles.swiperWrapper} ref={swiperWrapperRef}>
            <Swiper
              spaceBetween={20}
              slidesPerView="auto"
              loop
              className={clsx(styles.swiper, classNamesSwiper)}
            >
              {images.map((image, i) => {
                const isVideo = checkMediaTypeByExtension(image) === 'video';
                const key = `${isVideo ? 'vid' : 'img'}:${image}|${i}`;
                return (
                  <SwiperSlide key={key}>
                    {isVideo ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={styles.video}
                      >
                        <source src={image} type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                      </video>
                    ) : (
                      <picture className={styles.image}>
                        <Image src={image} fill sizes="auto" alt="" />
                      </picture>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div className={styles.imageList}>
            {images.map((image, i) => {
              const isVideo = checkMediaTypeByExtension(image) === 'video';
              const key = `${isVideo ? 'vid' : 'img'}:${image}|${i}`;
              return isVideo ? (
                <video
                  key={key}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.video}
                >
                  <source src={image} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              ) : (
                <picture key={key} className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt=""
                    className={styles.image}
                    fill
                    sizes="100vw"
                  />
                </picture>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default CaseGallerySwiper;
