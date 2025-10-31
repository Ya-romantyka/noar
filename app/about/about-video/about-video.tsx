'use client';
// import React, {useRef} from "react";
import styles from './about-video.module.scss';
// import {useAutoPlayVideo} from "@/app/hooks/useAutoPlayVideo";
import AutoVideo from '@/app/components/ui/Auto-video/AutoVideo';

interface AboutVideoProps {
  src?: string;
  // poster?: string;
  // autoplay?: boolean;
  // loop?: boolean;
  // muted?: boolean;
  // controls?: boolean;
  className?: string;
}

const AboutVideo: React.FC<AboutVideoProps> = ({
  // src,
  // poster,
  // autoplay = false,
  // loop = false,
  // muted = true,
  // controls = false,
  className = '',
}) => {
  // const videoRef = useRef<HTMLVideoElement>(null);

  // useAutoPlayVideo(videoRef, {priority:'idle', lazySources:true})
  return (
    <AutoVideo
      video={{
        src: '/videos/HORIZONT-short.mp4',
        type: 'video/mp4',
        poster: '/images/horizont-video-poster.jpg',
        fullSrc: '/videos/HORIZONT-compressed.mp4',
      }}
      className={`${styles.video} ${className}`}
    />
  );
};

export default AboutVideo;
