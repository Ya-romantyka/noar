import { RefObject, useEffect } from 'react';

type AutoPlayVideoOpts = {
  priority?: 'high' | 'normal' | 'idle';
  lazySources?: boolean;
  idleDelayMs?: number;
};

type WindowWithRIC = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
};

export function useAutoPlayVideo(
    videoRef: RefObject<HTMLVideoElement | null>,
    opts: AutoPlayVideoOpts = {}
) {
  const { priority = 'normal', lazySources = false, idleDelayMs = 500 } = opts;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playsInline = true;
    video.muted = true;

    if (priority === 'high') video.preload = 'auto';
    if (priority === 'idle') video.preload = 'none';

    let inView = false;
    let wantPlay = false;
    let allowedToLoad = priority !== 'idle';
    let destroyed = false;
    let revealed = false;
    let started = false;

    const hide = () => {
      if (!revealed) video.style.opacity = '0';
    };
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      video.style.opacity = '';
    };

    hide();

    const attachLazySources = () => {
      if (!lazySources) return;
      const sources = Array.from(video.querySelectorAll<HTMLSourceElement>('source[data-src]'));
      if (!sources.length) return;
      for (const s of sources) {
        if (!s.src && s.dataset.src) s.src = s.dataset.src;
      }
      video.load();
    };

    const safePlay = () => {
      if (!video || destroyed) return;
      if (!document.hidden) {
        const p = video.play();
        if (p && typeof p.then === 'function') {
          p.catch(() => {
            setTimeout(() => video.play().catch(() => {}), 120);
          });
        }
      }
    };

    const maybeStart = () => {
      if (!allowedToLoad) return;
      if (lazySources) attachLazySources();
      if (inView && wantPlay && !document.hidden) safePlay();
    };

    const allowAfterIdle = () => {
      if (destroyed) return;
      allowedToLoad = true;
      if (lazySources) attachLazySources();
    };

    if (priority === 'idle') {
      const afterLoad = () => {
        const w: WindowWithRIC = window;
        if (typeof w.requestIdleCallback === 'function') {
          w.requestIdleCallback(() => {
            window.setTimeout(allowAfterIdle, idleDelayMs);
          });
        } else {
          window.setTimeout(allowAfterIdle, idleDelayMs);
        }
      };
      if (document.readyState === 'complete') afterLoad();
      else window.addEventListener('load', afterLoad, { once: true });
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
          inView = !!entry?.isIntersecting;
          wantPlay = inView;
          if (inView) {
            maybeStart();
          } else if (started) {
            if (!video.paused) video.pause();
          }
        },
        { root: null, threshold: 0.2, rootMargin: '20% 0px 20% 0px' }
    );
    observer.observe(video);

    const resumeIfNeeded = () => {
      if (wantPlay && inView && !document.hidden) maybeStart();
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (!video.paused) video.pause();
      } else {
        resumeIfNeeded();
      }
    };

    const onPlaying = () => {
      started = true;
      reveal();
    };
    const onCanPlay = () => {
      if (!revealed) reveal();
    };
    const onLoadedData = () => {
      if (inView && wantPlay && allowedToLoad && video.paused && !document.hidden) safePlay();
    };
    const onPause = () => {
      if (started && wantPlay && inView && !document.hidden) safePlay();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', resumeIfNeeded);
    window.addEventListener('pageshow', resumeIfNeeded);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('pause', onPause);

    return () => {
      destroyed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', resumeIfNeeded);
      window.removeEventListener('pageshow', resumeIfNeeded);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('pause', onPause);
    };
  }, [videoRef, priority, lazySources, idleDelayMs]);
}
