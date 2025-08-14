import React from "react";
import styles from "./about-video.module.scss";

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
  muted = false,
  controls = true,
  className = "",
}) => {
  return (
    <video
      className={`${styles.video} ${className}`}
      src={src}
      poster={poster}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      controls={controls}
    />
  );
};

export default AboutVideo;