'use client';

import {useEffect} from 'react';
import {useIsMobile} from "@/app/hooks/useIsMobile";

export const useLockedVH = () => {
    const isMobile = useIsMobile();

    useEffect(() => {
        let prevWidth = window.innerWidth;

        const updateLockedVH = () => {
            const vh = isMobile ? screen.height : window.innerHeight;
            document.documentElement.style.setProperty('--locked-vh', `${vh + 1}px`);
        };

        updateLockedVH();

        const onResize = () => {
            if (window.innerWidth !== prevWidth) {
                prevWidth = window.innerWidth;
                updateLockedVH();
            }
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [isMobile]);
};
