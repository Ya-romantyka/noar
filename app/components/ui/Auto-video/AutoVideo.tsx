'use client';
import {FC, useRef} from 'react';
import {useAutoPlayVideo} from '@/app/hooks/useAutoPlayVideo';

type VideoItem = { src: string; type: string; poster?: string };

const AutoVideo: FC<{ video: VideoItem; className?: string }> = ({video, className}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useAutoPlayVideo(videoRef, {
        priority:'idle',
        lazySources:true
    });
    return (
        <video className={className} poster={video.poster ?? undefined} loop muted playsInline preload="none" ref={videoRef}>
            <source data-src={video.src} type={video.type}/>
        </video>
    );
};

export default AutoVideo;
