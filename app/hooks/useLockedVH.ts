'use client'
import { useEffect } from 'react';

export const useLockedVH = () => {
    useEffect(() => {
        let prevHeight = window.innerHeight;

        const updateLockedVH = () => {
            document.documentElement.style.setProperty('--locked-vh', `${window.innerHeight}px`);
        };

        updateLockedVH();

        const onResize = () => {
            if (window.innerHeight !== prevHeight) {
                prevHeight = window.innerHeight;
                updateLockedVH();
            }
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
};
