'use client';

import {useLockedVH} from '@/app/hooks/useLockedVH';

export const LockedVHProvider = () => {
    useLockedVH();
    return null;
};
