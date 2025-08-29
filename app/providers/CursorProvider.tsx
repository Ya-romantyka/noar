"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    PropsWithChildren,
} from "react";
import gsap from "gsap";
import ButtonIcon from "@/public/images/button_icon.svg";

export type CursorStyle = "big" | "button" | "drag" | "link";

export type CursorVariant = {
    style: CursorStyle;
    text?: string;
    icon?: boolean;
};

type CursorCtx = {
    setVariant: (v: CursorVariant) => void;
    resetVariant: () => void;
};

export const CursorContext = createContext<CursorCtx | null>(null);

const STYLE_CLASS = {
    big: "big",
    button: "button",
    drag: "drag",
    link: "link",
} as const satisfies Record<CursorStyle, string>;

export function CursorProvider({ children }: PropsWithChildren) {
    const rootRef = useRef<HTMLDivElement>(null);
    const bigRef = useRef<HTMLDivElement>(null);
    const smallRef = useRef<HTMLDivElement>(null);

    const [variant, setVariant] = useState<CursorVariant>({ style: "big" });
    const resetVariant = () => setVariant({ style: "big" });

    useEffect(() => {
        const root = rootRef.current!;
        const big = bigRef.current!;
        const small = smallRef.current!;

        const canHover = window.matchMedia("(hover: hover)").matches;
        if (!canHover) return;

        gsap.set([big, small], {
            xPercent: -50,
            yPercent: -50,
            transformOrigin: "50% 50%",
        });

        type P = { x: number; y: number; t: number };
        const trail: P[] = [];
        const push = (x: number, y: number) => {
            trail.push({ x, y, t: performance.now() });
            if (trail.length > 160) trail.shift();
        };

        const show = () => root.classList.add("cursor--shown");
        push(window.innerWidth / 2, window.innerHeight / 2);

        const onPointerMove = (e: PointerEvent) => {
            if (e.pointerType === "mouse" && !e.isPrimary) return;
            push(e.clientX, e.clientY);
            if (!root.classList.contains("cursor--shown")) show();
        };

        const pressIn = () =>
            gsap.to(big, { scale: 0.9, duration: 0.1, overwrite: true });
        const pressOut = () =>
            gsap.to(big, { scale: 1, duration: 0.12, overwrite: true });

        const onPointerDown = (e: PointerEvent) => {
            try {
                (e.target as Element)?.setPointerCapture?.(e.pointerId);
            } catch {}
            pressIn();
        };
        const onPointerUp = (e: PointerEvent) => {
            try {
                (e.target as Element)?.releasePointerCapture?.(e.pointerId);
            } catch {}
            pressOut();
        };
        const onPointerCancel = () => pressOut();

        document.addEventListener("pointermove", onPointerMove, {
            passive: true,
            capture: true,
        });
        document.addEventListener("pointerdown", onPointerDown, { capture: true });
        document.addEventListener("pointerup", onPointerUp, { capture: true });
        document.addEventListener("pointercancel", onPointerCancel, {
            capture: true,
        });
        document.addEventListener("lostpointercapture", onPointerCancel, {
            capture: true,
        });

        let dragging = false;
        const onDragStart = () => {
            dragging = true;
            pressIn();
        };
        const onDragOver = (e: DragEvent) => {
            if (!dragging) return;
            if (typeof e.clientX && typeof e.clientY) {
                push(e.clientX, e.clientY);
            }
        };
        const endDrag = () => {
            dragging = false;
            pressOut();
        };

        document.addEventListener("dragstart", onDragStart, true);
        document.addEventListener("dragover", onDragOver, true);
        document.addEventListener("dragend", endDrag, true);
        document.addEventListener("drop", endDrag, true);

        const pick = (delay: number) => {
            const targetT = performance.now() - delay;
            for (let i = 1; i < trail.length; i++)
                if (trail[i].t >= targetT) return trail[i - 1];
            return trail[trail.length - 1];
        };

        let raf = 0;
        const loop = () => {
            const ps = pick(40);
            const pb = pick(120);

            gsap.set(small, { x: ps.x, y: ps.y });
            gsap.set(big, { x: pb.x, y: pb.y });

            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            document.removeEventListener("pointermove", onPointerMove, true);
            document.removeEventListener("pointerdown", onPointerDown, true);
            document.removeEventListener("pointerup", onPointerUp, true);
            document.removeEventListener("pointercancel", onPointerCancel, true);
            document.removeEventListener("lostpointercapture", onPointerCancel, true);

            document.removeEventListener("dragstart", onDragStart, true);
            document.removeEventListener("dragover", onDragOver, true);
            document.removeEventListener("dragend", endDrag, true);
            document.removeEventListener("drop", endDrag, true);

            cancelAnimationFrame(raf);
        };
    }, []);

    const bigClass = STYLE_CLASS[variant.style] ?? STYLE_CLASS.big;

    return (
        <CursorContext.Provider value={{ setVariant, resetVariant }}>
            {children}
            <div ref={rootRef} className="cursor">
                <div
                    ref={bigRef}
                    className={`cursor-ball ${bigClass}`}
                    data-style={variant.style}
                >
                    {(variant.text || variant.icon) && (
                        <div className="cursor-content">
                            {variant.icon && <ButtonIcon />}
                            {variant.text && <span>{variant.text}</span>}
                        </div>
                    )}
                </div>
                <div ref={smallRef} className="cursor-ball small" />
            </div>
        </CursorContext.Provider>
    );
}

export function useCursorContext() {
    const ctx = useContext(CursorContext);
    if (!ctx) throw new Error("useCursorContext must be used within <CursorProvider>");
    return ctx;
}
