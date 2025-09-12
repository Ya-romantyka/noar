'use client'
import React, {useRef} from "react";
import styles from "./about-video.module.scss";
import {useAutoPlayVideo} from "@/app/hooks/useAutoPlayVideo";

interface AboutVideoProps {
  src?: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}

const AboutVideo: React.FC<AboutVideoProps> = ({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = true,
  controls = false,
  className = "",
}) => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useAutoPlayVideo(videoRef, {priority:'idle', lazySources:true})
  return (
    <video
      className={`${styles.video} ${className}`}
      src={src}
      poster={poster}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      controls={controls}
      ref={videoRef}
      preload="none"
    >
      <source data-src="/videos/HORIZONT.mp4" type="video/mp4" />
    </video>
  );
};

export default AboutVideo;