import { RefObject, useEffect } from 'react';

interface UseInteractiveCursorProps {
    container: RefObject<HTMLElement | null>;
    cursor: RefObject<HTMLElement | null>;
    visibleClass: string;
}

export function useInteractiveCursor({
                                         container,
                                         cursor,
                                         visibleClass,
                                     }: UseInteractiveCursorProps) {
    useEffect(() => {
        const cursorEl = cursor.current;
        const containerEl = container.current;

        if (!cursorEl || !containerEl) return;

        const header = document.querySelector('header');
        const headerHeight = header?.getBoundingClientRect().height || 0;

        const updatePosition = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            cursorEl.style.left = `${clientX}px`;
            cursorEl.style.top = `${clientY}px`;

            const bounds = containerEl.getBoundingClientRect();
            const isInside =
                clientX >= bounds.left &&
                clientX <= bounds.right &&
                clientY >= bounds.top &&
                clientY <= bounds.bottom;

            const isAboveHeader = clientY <= headerHeight;

            if (isInside && !isAboveHeader) {
                if (!cursorEl.classList.contains(visibleClass)) {
                    cursorEl.classList.add(visibleClass);
                }
            } else {
                cursorEl.classList.remove(visibleClass);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    cursorEl.classList.remove(visibleClass);
                }
            },
            { threshold: 0.01 }
        );

        window.addEventListener('mousemove', updatePosition);
        observer.observe(containerEl);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            observer.disconnect();
        };
    }, [container, cursor, visibleClass]);
}
