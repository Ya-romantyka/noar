'use client';
import {FC, useRef} from 'react';
import {useAutoPlayVideo} from '@/app/hooks/useAutoPlayVideo';

type VideoItem = { src: string; type: string; poster?: string };

const AutoVideo: FC<{ video: VideoItem; className?: string }> = ({video, className}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useAutoPlayVideo(videoRef);

    return (
        <video className={className} poster={video.poster ?? ''} loop muted playsInline preload="none" ref={videoRef}>
            <source src={video.src} type={video.type}/>
        </video>
    );
};

export default AutoVideo;
