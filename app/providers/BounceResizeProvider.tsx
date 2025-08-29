"use client";

import { PropsWithChildren, useEffect } from "react";

type Props = {
    delay?: number;
    minDelta?: number;
};

export default function BounceResizeProvider({
                                                        children,
                                                        delay = 300,
                                                        minDelta = 1,
                                                    }: PropsWithChildren<Props>) {
    useEffect(() => {
        let prevW = window.innerWidth;
        let t: number | undefined;

        const reload = () => {
            window.location.reload();
        };

        const onResize = () => {
            const w = window.innerWidth;
            if (Math.abs(w - prevW) < minDelta) return;
            prevW = w;

            if (t) window.clearTimeout(t);
            t = window.setTimeout(reload, delay);
        };

        window.addEventListener("resize", onResize, { passive: true });
        window.addEventListener("orientationchange", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("orientationchange", onResize);
            if (t) window.clearTimeout(t);
        };
    }, [delay, minDelta]);

    return <>{children}</>;
}
