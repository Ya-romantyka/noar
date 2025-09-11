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
    const outsideRef = useRef(false);

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
        const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
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
            outsideRef.current = false;
            push(e.clientX, e.clientY);
            window.__cursorXY = { x: e.clientX, y: e.clientY };
            if (inViewport(e.clientX, e.clientY)) show();
            else hide();
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

        let dragging = false;
        const onDragStart = () => {
            dragging = true;
            pressIn();
        };
        const onDragOver = (e: DragEvent) => {
            if (!dragging) return;
            outsideRef.current = false;
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

        const onWindowOut = (e: MouseEvent) => {
            const rt = e.relatedTarget as Node | null;
            const outOfBounds =
                e.clientX <= 0 ||
                e.clientX >= window.innerWidth ||
                e.clientY <= 0 ||
                e.clientY >= window.innerHeight;
            if (!rt || outOfBounds) {
                outsideRef.current = true;
                window.__cursorXY = undefined;
                hide();
            }
        };
        const onWindowOver = (e: MouseEvent) => {
            outsideRef.current = false;
            window.__cursorXY = { x: e.clientX, y: e.clientY };
            if (inViewport(e.clientX, e.clientY)) show();
        };
        window.addEventListener("mouseout", onWindowOut, true);
        window.addEventListener("mouseover", onWindowOver, true);

        const onVis = () => {
            if (document.hidden) {
                outsideRef.current = true;
                window.__cursorXY = undefined;
                hide();
            } else {
                const p = window.__cursorXY;
                if (p && inViewport(p.x, p.y)) {
                    outsideRef.current = false;
                    show();
                }
            }
        };
        document.addEventListener("visibilitychange", onVis, true);

        const onBlur = () => {
            outsideRef.current = true;
            window.__cursorXY = undefined;
            hide();
        };
        const onFocus = () => {
            const p = window.__cursorXY;
            if (p && inViewport(p.x, p.y)) {
                outsideRef.current = false;
                show();
            }
        };
        window.addEventListener("blur", onBlur, true);
        window.addEventListener("focus", onFocus, true);

        const pick = (delay: number) => {
            const targetT = performance.now() - delay;
            for (let i = 1; i < trail.length; i++) if (trail[i].t >= targetT) return trail[i - 1];
            return trail[trail.length - 1];
        };

        let raf = 0;
        const loop = () => {
            if (!outsideRef.current) {
                const ps = pick(0);
                const pb = pick(120);
                gsap.set(small, { x: ps.x, y: ps.y });
                gsap.set(big, { x: pb.x, y: pb.y });
                const p = window.__cursorXY;
                if (!p || !inViewport(p.x, p.y)) hide();
                else show();

                if (p && inViewport(p.x, p.y)) {
                    const stack = (document.elementsFromPoint(p.x, p.y) as HTMLElement[]).filter(
                        (el) => !el.closest(".cursor")
                    );
                    let next: CursorVariant | null = null;
                    for (const el of stack) {
                        let node: HTMLElement | null = el;
                        while (node) {
                            const v = registryRef.current.get(node);
                            if (v) {
                                next = v;
                                break;
                            }
                            const nodeTone = node.getAttribute("data-cursor-tone") as CursorTone | null;
                            if (nodeTone === "black" || nodeTone === "white") {
                                next = { style: "big", tone: nodeTone };
                                break;
                            }
                            node = node.parentElement;
                        }
                        if (next) break;
                    }
                    if (!next) next = { style: "big", tone: variantRef.current.tone ?? "white" };
                    if (!isSame(variantRef.current, next)) setVariant(next);
                }
            } else {
                hide();
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const onScrollOrResize = () => {
            const p = window.__cursorXY;
            if (!p || !inViewport(p.x, p.y)) hide();
            else show();
            if (p && inViewport(p.x, p.y)) {
                const stack = (document.elementsFromPoint(p.x, p.y) as HTMLElement[]).filter(
                    (el) => !el.closest(".cursor")
                );
                let next: CursorVariant | null = null;
                for (const el of stack) {
                    let node: HTMLElement | null = el;
                    while (node) {
                        const v = registryRef.current.get(node);
                        if (v) {
                            next = v;
                            break;
                        }
                        const nodeTone = node.getAttribute("data-cursor-tone") as CursorTone | null;
                        if (nodeTone === "black" || nodeTone === "white") {
                            next = { style: "big", tone: nodeTone };
                            break;
                        }
                        node = node.parentElement;
                    }
                    if (next) break;
                }
                if (!next) next = { style: "big", tone: variantRef.current.tone ?? "white" };
                if (!isSame(variantRef.current, next)) setVariant(next);
            }
        };
        window.addEventListener("scroll", onScrollOrResize, true);
        window.addEventListener("resize", onScrollOrResize, true);

        return () => {
            document.removeEventListener("pointermove", onPointerMove, true);
            document.removeEventListener("pointerdown", onPointerDown, true);
            document.removeEventListener("pointerup", onPointerUp, true);
            document.removeEventListener("pointercancel", onPointerCancel, true);
            document.removeEventListener("lostpointercapture", onPointerCancel, true);
            window.removeEventListener("mouseout", onWindowOut, true);
            window.removeEventListener("mouseover", onWindowOver, true);
            document.removeEventListener("dragstart", onDragStart, true);
            document.removeEventListener("dragover", onDragOver, true);
            document.removeEventListener("dragend", endDrag, true);
            document.removeEventListener("drop", endDrag, true);
            document.removeEventListener("visibilitychange", onVis, true);
            window.removeEventListener("blur", onBlur, true);
            window.removeEventListener("focus", onFocus, true);
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
