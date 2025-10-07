'use client';
import {FC, useRef, useState} from 'react';
import styles from './AutoVideo.module.scss'
import Button from "@/app/components/ui/button/button";
import PlayIcon from '@/app/assets/icons/play_icon.svg'
import clsx from "clsx";

type VideoItem = { src: string; type: string; poster?: string };

const AutoVideo: FC<{ video: VideoItem; className?: string }> = ({video, className}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);

    const togglePlay = async () => {
        const v = videoRef.current;
        if (!v) return;
        try {
            if (v.paused) {
                await v.play();
                setStarted(true);
            } else {
                v.pause();
                setStarted(false);
            }
        } catch (e) {
            console.warn('Video play failed:', e);
        }
    };

    return (
        <div className={styles.videoWrapper}       onClick={togglePlay}
        >
            <video className={className} poster={video.poster ?? undefined} loop muted playsInline preload="none"
                   ref={videoRef}>
                <source src={video.src} type={video.type}/>
            </video>
            <Button variant={'outline-white'} className={clsx(styles.button, started && styles.hidden)}>
                <PlayIcon/>
                play
            </Button>
        </div>
    );
};

export default AutoVideo;
