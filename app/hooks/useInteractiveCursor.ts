import { RefObject, useEffect, useRef } from 'react';

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
    const lastPos = useRef<{ x: number; y: number; has: boolean }>({ x: 0, y: 0, has: false });
    const raf = useRef<number | null>(null);

    useEffect(() => {
        const cursorEl = cursor.current;
        const containerEl = container.current;
        if (!cursorEl || !containerEl) return;

        const getHeaderHeight = () =>
            document.querySelector('header')?.getBoundingClientRect().height || 0;

        const setVisible = (v: boolean) => {
            if (v) cursorEl.classList.add(visibleClass);
            else cursorEl.classList.remove(visibleClass);
        };

        const applyFromPoint = (clientX: number, clientY: number) => {
            // пересувати курсор
            cursorEl.style.left = `${clientX}px`;
            cursorEl.style.top = `${clientY}px`;

            // визначити видимість
            const bounds = containerEl.getBoundingClientRect();
            const inside =
                clientX >= bounds.left &&
                clientX <= bounds.right &&
                clientY >= bounds.top &&
                clientY <= bounds.bottom;

            const isAboveHeader = clientY <= getHeaderHeight();
            setVisible(inside && !isAboveHeader);
        };

        const updateFromMouseEvent = (e: MouseEvent) => {
            lastPos.current = { x: e.clientX, y: e.clientY, has: true };
            applyFromPoint(e.clientX, e.clientY);
        };

        // коли курсор НЕ рухається, але лейаут змінюється (скрол, IO, ресайз),
        // перевіряємо останню відому позицію й оновлюємо стан
        const applyFromLastIfAny = () => {
            if (!lastPos.current.has) return;
            if (raf.current != null) return;
            raf.current = requestAnimationFrame(() => {
                applyFromPoint(lastPos.current.x, lastPos.current.y);
                raf.current = null;
            });
        };

        // події
        window.addEventListener('mousemove', updateFromMouseEvent, { passive: true });

        // при скролі/ресайзі оновлюємо видимість за останньою позицією
        window.addEventListener('scroll', applyFromLastIfAny, { passive: true });
        window.addEventListener('resize', applyFromLastIfAny);

        // якщо контейнер входить/виходить з вʼюпорту — теж оновити за останньою позицією
        const observer = new IntersectionObserver(
            () => {
                applyFromLastIfAny();
            },
            { threshold: 0.01 }
        );
        observer.observe(containerEl);

        // якщо сторінка знову стала видимою або вікно у фокусі — оновити
        const onVisibility = () => applyFromLastIfAny();
        const onFocus = () => applyFromLastIfAny();
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('focus', onFocus);

        // коли курсор полишає вікно — ховаємо
        const onLeaveWindow = () => setVisible(false);
        window.addEventListener('mouseleave', onLeaveWindow);

        return () => {
            window.removeEventListener('mousemove', updateFromMouseEvent);
            window.removeEventListener('scroll', applyFromLastIfAny);
            window.removeEventListener('resize', applyFromLastIfAny);
            window.removeEventListener('mouseleave', onLeaveWindow);
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('focus', onFocus);
            observer.disconnect();
            if (raf.current != null) cancelAnimationFrame(raf.current);
        };
    }, [container, cursor, visibleClass]);
}
