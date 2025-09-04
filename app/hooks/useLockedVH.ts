'use client'
import { useEffect } from 'react';

export const useLockedVH = () => {
    useEffect(() => {
        const root = document.documentElement;

        const getViewportHeight = () => {
            const vv = typeof window.visualViewport !== 'undefined' ? window.visualViewport : null;
            const h = vv?.height ?? window.innerHeight;
            return Math.round(h);
        };

        const setVar = (h: number) => {
            root.style.setProperty('--locked-vh', `${h}px`);
        };

        setVar(getViewportHeight());

        const onOrientationChange = () => setVar(getViewportHeight());

        window.addEventListener('orientationchange', onOrientationChange);
        window.screen?.orientation?.addEventListener?.('change', onOrientationChange);

        const noopResize = () => {};
        window.addEventListener('resize', noopResize);

        return () => {
            window.removeEventListener('orientationchange', onOrientationChange);
            window.screen?.orientation?.removeEventListener?.('change', onOrientationChange as any);
            window.removeEventListener('resize', noopResize);
        };
    }, []);
};
