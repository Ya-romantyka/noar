'use client';

import { useEffect } from 'react';

export default function useSvgGradientAnimation(
    selector: string = '#strokeGradient',
    durationMs: number = 8_000,
    amplitude: number = 1.8
): void {
    useEffect(() => {
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
        if (reduced) {
            return;
        }

        const el = document.querySelector<SVGLinearGradientElement>(selector);
        if (!el) {
            return;
        }
        const grad: SVGLinearGradientElement = el;

        grad.setAttribute('gradientUnits', 'objectBoundingBox');

        grad.setAttribute('gradientTransform', `translate(${amplitude} 0)`);

        let rafId = 0;
        const t0 = performance.now();

        const tick = (now: number): void => {
            const progress = ((now - t0) % durationMs) / durationMs;
            const x = amplitude - 2 * amplitude * progress;
            grad.setAttribute('gradientTransform', `translate(${x} 0)`);
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [selector, durationMs, amplitude]);
}
