"use client";

import {useState, useEffect, useRef, FC, ReactNode} from "react";
import styles from "./case-gallery-swiper.module.scss";
import Container from "../../layout/container/container";
import clsx from "clsx";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import {useCursorStyle} from "@/app/hooks/useCursorStyle";

interface CaseGallerySwiperProps {
  label: string;
  title: ReactNode;
  images: string[];
}

const CaseGallerySwiper: FC<CaseGallerySwiperProps> = ({
  label,
  title,
  images,
}) => {

  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const swiperWrapperRef = useRef<HTMLDivElement>(null);

  useCursorStyle({
    ref: swiperWrapperRef,
    style: "drag",
    text: "drag",
  })

  useSplitTextAnimation(titleRef, {triggerOnScroll: true})

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className={styles.section} data-header-white>
      <Container className={styles.container}>
        <div className={styles.header}>
          <span
            className={clsx(styles.label, "section-label section-label--white")}
          >
            {label}
          </span>
          <h2 ref={titleRef} className={styles.title}>{title}</h2>
        </div>

        {isDesktop ? (
          <div className={styles.swiperWrapper} ref={swiperWrapperRef}>
            <Swiper
                spaceBetween={20}
                slidesPerView={1.3}
                loop={true}
                className={styles.swiper}
            >
              {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <picture className={styles.image}>
                      <Image src={image} fill sizes="auto" alt="" />
                    </picture>
                  </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className={styles.imageList}>
            {images.map((image, index) => (
              <picture key={index} className={styles.imageWrapper}>
                <Image
                  src={image}
                  alt=""
                  className={styles.image}
                  fill
                  sizes="100vw"
                />
              </picture>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default CaseGallerySwiper;
