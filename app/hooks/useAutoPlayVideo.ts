import { RefObject, useEffect } from 'react';

export function useAutoPlayVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playsInline = true;
    video.muted = true;

    let inView = false;
    let wantPlay = false;

    const safePlay = () => {
      if (!video.paused && !video.ended) return;
      if (document.hidden) return;
      video.play().catch(() => {

        if (wantPlay && inView && !document.hidden) {
          setTimeout(() => video.play().catch(() => {}), 120);
        }
      });
    };

    const safePause = () => {
      if (!video.paused) video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        wantPlay = inView;
        if (inView) {
          safePlay();
        } else {
          safePause();
        }
      },
      {
        root: null,
        threshold: 0.05,
        rootMargin: '15% 0px 15% 0px',
      }
    );
    observer.observe(video);

    const resumeIfNeeded = () => {
      if (wantPlay && inView && !document.hidden) safePlay();
    };

    const onVisibility = () => {
      if (document.hidden) {
        safePause();
      } else {
        resumeIfNeeded();
      }
    };

    const onFocus = () => resumeIfNeeded();
    const onPageShow = () => resumeIfNeeded();

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onFocus);
    window.addEventListener('pageshow', onPageShow);

    const onPause = () => {
      if (wantPlay && inView && !document.hidden) safePlay();
    };
    const onLoadedData = () => resumeIfNeeded();

    video.addEventListener('pause', onPause);
    video.addEventListener('loadeddata', onLoadedData);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('pageshow', onPageShow);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('loadeddata', onLoadedData);
    };
  }, [videoRef]);
}
