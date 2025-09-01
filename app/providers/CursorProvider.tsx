"use client";

import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import gsap from "gsap";
import ButtonIcon from "@/public/images/button_icon.svg";

export type CursorStyle = "big" | "button" | "drag" | "link";
export type CursorTone = "white" | "black";

export type CursorVariant = {
    style: CursorStyle;
    text?: string;
    icon?: boolean;
    tone?: CursorTone;
};

type CursorCtx = {
    bind: (el: HTMLElement, variant: CursorVariant) => void;
    unbind: (el: HTMLElement) => void;
};

export const CursorContext = createContext<CursorCtx | null>(null);

const STYLE_CLASS = {
    big: "big",
    button: "button",
    drag: "drag",
    link: "link",
} as const satisfies Record<CursorStyle, string>;

declare global {
    interface Window {
        __cursorXY?: { x: number; y: number };
    }
}

export function CursorProvider({ children }: PropsWithChildren) {
    const rootRef = useRef<HTMLDivElement>(null);
    const bigRef = useRef<HTMLDivElement>(null);
    const smallRef = useRef<HTMLDivElement>(null);

    const [variant, setVariant] = useState<CursorVariant>({ style: "big", tone: "white" });
    const variantRef = useRef(variant);
    useEffect(() => {
        variantRef.current = variant;
    }, [variant]);

    const registryRef = useRef(new WeakMap<HTMLElement, CursorVariant>());

    const isSame = (a: CursorVariant, b: CursorVariant) =>
        a.style === b.style &&
        (a.text || "") === (b.text || "") &&
        !!a.icon === !!b.icon &&
        (a.tone || "white") === (b.tone || "white");

    const bind = useCallback((el: HTMLElement, v: CursorVariant) => {
        registryRef.current.set(el, v);
    }, []);

    const unbind = useCallback((el: HTMLElement) => {
        registryRef.current.delete(el);
    }, []);

    useEffect(() => {
        const root = rootRef.current!;
        const big = bigRef.current!;
        const small = smallRef.current!;
        const canHover = window.matchMedia("(hover: hover)").matches;
        if (!canHover) return;

        gsap.set([big, small], { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" });

        type P = { x: number; y: number; t: number };
        const trail: P[] = [];
        const push = (x: number, y: number) => {
            trail.push({ x, y, t: performance.now() });
            if (trail.length > 160) trail.shift();
        };

        const inViewport = (x: number, y: number) =>
            x >= 0 && y >= 0 && x <= window.innerWidth && y <= window.innerHeight;

        const show = () => root.classList.add("visible");
        const hide = () => root.classList.remove("visible");

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        push(cx, cy);
        window.__cursorXY = { x: cx, y: cy };
        hide();

        const onPointerMove = (e: PointerEvent) => {
            if (e.pointerType === "mouse" && !e.isPrimary) return;
            push(e.clientX, e.clientY);
            window.__cursorXY = { x: e.clientX, y: e.clientY };
            if (inViewport(e.clientX, e.clientY)) show();
            else hide();
        };

        const onMouseLeaveDoc = (e: MouseEvent) => {
            if (!e.relatedTarget) hide();
        };
        const onMouseEnterDoc = () => {
            const p = window.__cursorXY;
            if (p && inViewport(p.x, p.y)) show();
        };

        const pressIn = () => gsap.to(big, { scale: 0.9, duration: 0.1, overwrite: true });
        const pressOut = () => gsap.to(big, { scale: 1, duration: 0.12, overwrite: true });

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

        document.addEventListener("pointermove", onPointerMove, { passive: true, capture: true });
        document.addEventListener("pointerdown", onPointerDown, { capture: true });
        document.addEventListener("pointerup", onPointerUp, { capture: true });
        document.addEventListener("pointercancel", onPointerCancel, { capture: true });
        document.addEventListener("lostpointercapture", onPointerCancel, { capture: true });
        document.addEventListener("mouseleave", onMouseLeaveDoc, true);
        document.addEventListener("mouseenter", onMouseEnterDoc, true);

        let dragging = false;
        const onDragStart = () => {
            dragging = true;
            pressIn();
        };
        const onDragOver = (e: DragEvent) => {
            if (!dragging) return;
            push(e.clientX, e.clientY);
            window.__cursorXY = { x: e.clientX, y: e.clientY };
            if (inViewport(e.clientX, e.clientY)) show();
            else hide();
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
            for (let i = 1; i < trail.length; i++) if (trail[i].t >= targetT) return trail[i - 1];
            return trail[trail.length - 1];
        };

        const resolveVariantUnderCursor = (): CursorVariant => {
            const p = window.__cursorXY;
            const fallbackTone = (variantRef.current.tone ?? "white") as CursorTone;
            const fallback: CursorVariant = { style: "big", tone: fallbackTone };

            if (!p) return fallback;
            if (!inViewport(p.x, p.y)) return fallback;

            const stack = (document.elementsFromPoint(p.x, p.y) as HTMLElement[]).filter(
                (el) => !el.closest(".cursor")
            );

            for (const el of stack) {
                let node: HTMLElement | null = el;
                while (node) {
                    const v = registryRef.current.get(node);
                    if (v) return v;
                    const nodeTone = node.getAttribute("data-cursor-tone") as CursorTone | null;
                    if (nodeTone === "black" || nodeTone === "white") return { style: "big", tone: nodeTone };
                    node = node.parentElement;
                }
            }
            return fallback;
        };

        let raf = 0;
        const loop = () => {
            const ps = pick(0);
            const pb = pick(120);
            gsap.set(small, { x: ps.x, y: ps.y });
            gsap.set(big, { x: pb.x, y: pb.y });

            const p = window.__cursorXY;
            if (!p || !inViewport(p.x, p.y)) hide(); else show();

            const next = resolveVariantUnderCursor();
            if (!isSame(variantRef.current, next)) setVariant(next);

            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const onScrollOrResize = () => {
            const p = window.__cursorXY;
            if (!p || !inViewport(p.x, p.y)) hide(); else show();
            const next = resolveVariantUnderCursor();
            if (!isSame(variantRef.current, next)) setVariant(next);
        };
        window.addEventListener("scroll", onScrollOrResize, true);
        window.addEventListener("resize", onScrollOrResize, true);

        return () => {
            document.removeEventListener("pointermove", onPointerMove, true);
            document.removeEventListener("pointerdown", onPointerDown, true);
            document.removeEventListener("pointerup", onPointerUp, true);
            document.removeEventListener("pointercancel", onPointerCancel, true);
            document.removeEventListener("lostpointercapture", onPointerCancel, true);
            document.removeEventListener("mouseleave", onMouseLeaveDoc, true);
            document.removeEventListener("mouseenter", onMouseEnterDoc, true);
            document.removeEventListener("dragstart", onDragStart, true);
            document.removeEventListener("dragover", onDragOver, true);
            document.removeEventListener("dragend", endDrag, true);
            document.removeEventListener("drop", endDrag, true);
            window.removeEventListener("scroll", onScrollOrResize, true);
            window.removeEventListener("resize", onScrollOrResize, true);
            cancelAnimationFrame(raf);
        };
    }, []);

    const bigClass = STYLE_CLASS[variant.style] ?? STYLE_CLASS.big;
    const toneClass = variant.tone === "black" ? "black" : "white";

    const ctxValue = useMemo(() => ({ bind, unbind }), [bind, unbind]);

    return (
        <CursorContext.Provider value={ctxValue}>
            {children}
            <div ref={rootRef} className={`cursor ${bigClass}`}>
                <div
                    ref={bigRef}
                    className={`cursor-ball ${bigClass} ${toneClass}`}
                    data-style={variant.style}
                    data-tone={toneClass}
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
