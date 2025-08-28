"use client";

import React, { useRef } from "react";
import styles from "./hero-section.module.scss";
import Container from "@/app/components/layout/container/container";
import CirclesAnimation from "@/app/components/elements/circles-animation/circles-animation";
import Magnetic from "../../ui/magnetic/magnetic";
import {useAutoPlayVideo} from "@/app/hooks/useAutoPlayVideo";
import {useScrollToTopOnReload} from "@/app/hooks/useScrollToTopOnReload";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useAutoPlayVideo(videoRef);
  useScrollToTopOnReload();

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h1 ref={titleRef} className={`${styles.title} h1`}>
            <span className={styles.titleOne}>Full-Circle</span>{" "}
            <span className={styles.titleTwo}>Brand</span>{" "}
            <span className={styles.titleTree}>Development</span>{" "}
            <span className={styles.titleFour}>Studio</span>
          </h1>
          <div className={styles.circleAnimation}>
            <CirclesAnimation isWhite={true} />
          </div>

          <Magnetic strength={40} className={styles.videoWrap}>
            <video className={styles.video} ref={videoRef} muted playsInline loop>
              <source src="/videos/Circle_2.mp4" type="video/mp4; codecs=hvc1" />
              <source src="/videos/Circle_2.webm" type="video/webm" />
            </video>
          </Magnetic>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
