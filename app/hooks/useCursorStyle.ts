"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { useRouter } from "next/navigation";
import { CursorVariant, useCursorContext } from "@/app/providers/CursorProvider";

type CursorStyle = "big" | "button" | "drag";

type Base = {
    style: CursorStyle;
    text?: string;
    icon?: boolean;
    href?: string;
};

type WithRef    = { ref: RefObject<HTMLElement | null>; target?: never };
type WithTarget = { target: HTMLElement | null;         ref?: never };
type WithNone   = { ref?: never; target?: never };

type Params = Base & (WithRef | WithTarget | WithNone);

export function useCursorStyle(params: Params) {
    const { setVariant, resetVariant } = useCursorContext();
    const router = useRouter();

    const innerRef = useRef<HTMLElement | null>(null);

    const [el, setEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let cancelled = false;
        let raf = 0;
        let mo: MutationObserver | null = null;
        const t0 = performance.now();
        const TIMEOUT = 2000;

        const getEl = (): HTMLElement | null => {
            if ("ref" in params && params.ref) return params.ref.current;
            if ("target" in params && params.target) return params.target;
            return innerRef.current;
        };

        const tick = () => {
            if (cancelled) return;
            const node = getEl();
            if (node) {
                setEl(node);
                return;
            }
            if (performance.now() - t0 > TIMEOUT) {
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        const now = getEl();
        if (now) {
            setEl(now);
        } else {
            raf = requestAnimationFrame(tick);
            try {
                mo = new MutationObserver(() => {
                    const node = getEl();
                    if (node) {
                        setEl(node);
                        mo?.disconnect();
                    }
                });
                mo.observe(document.documentElement, { childList: true, subtree: true });
            } catch {}
        }

        return () => {
            cancelled = true;
            if (raf) cancelAnimationFrame(raf);
            mo?.disconnect();
        };
    }, [("ref" in params) ? params.ref : null, ("target" in params) ? params.target : null]);

    useEffect(() => {
        if (!el) return;

        const variant: CursorVariant = {
            style: params.style,
            text: params.text,
            icon: params.icon ?? false,
        };

        const onOver = () => setVariant(variant);

        const onOut = (e: PointerEvent) => {
            const next = e.relatedTarget as Node | null;
            if (!next || !el.contains(next)) resetVariant();
        };

        el.addEventListener("pointerover", onOver as EventListener, { capture: true });
        el.addEventListener("pointerout", onOut, { capture: true });

        const onClick = (e: MouseEvent) => {
            if (params.style === "button" && params.href) {
                e.preventDefault();
                router.push(params.href);
            }
        };
        if (params.style === "button" && params.href) {
            el.addEventListener("click", onClick);
        }

        const onDisconnect = () => {
            if (!el.isConnected) resetVariant();
        };
        const mo = new MutationObserver(onDisconnect);
        try {
            mo.observe(document, { childList: true, subtree: true });
        } catch {}

        return () => {
            el.removeEventListener("pointerover", onOver as EventListener, true);
            el.removeEventListener("pointerout", onOut, true);
            if (params.style === "button" && params.href) {
                el.removeEventListener("click", onClick);
            }
            mo.disconnect();
        };
    }, [el, params.style, params.text, params.icon, params.href, setVariant, resetVariant, router]);

    if (!("ref" in params) && !("target" in params)) {
        return innerRef as RefObject<HTMLElement | null>;
    }
    return null;
}
