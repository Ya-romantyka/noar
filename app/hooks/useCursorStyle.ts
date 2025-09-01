"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { useRouter } from "next/navigation";
import { CursorVariant, useCursorContext } from "@/app/providers/CursorProvider";

type CursorStyle = "big" | "button" | "drag" | "link";
type CursorTone = "white" | "black";

type Base = {
    style: CursorStyle;
    text?: string;
    icon?: boolean;
    href?: string;
    tone?: CursorTone;
};

type WithRef = { ref: RefObject<HTMLElement | null>; target?: never };
type WithTarget = { target: HTMLElement | null; ref?: never };
type WithNone = { ref?: never; target?: never };

type Params = Base & (WithRef | WithTarget | WithNone);

export function useCursorStyle(params: Params) {
    const { bind, unbind } = useCursorContext();
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
            if (performance.now() - t0 > TIMEOUT) return;
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
            tone: params.tone ?? "white",
        };

        bind(el, variant);

        const onClick = (e: MouseEvent) => {
            if (params.style === "link" && params.href) {
                e.preventDefault();
                router.push(params.href);
            }
        };
        if (params.style === "link" && params.href) el.addEventListener("click", onClick);

        const moAttr = new MutationObserver(() => bind(el, variant));
        moAttr.observe(el, { attributes: true, attributeFilter: ["class", "style", "hidden"] });

        return () => {
            if (params.style === "link" && params.href) el.removeEventListener("click", onClick);
            moAttr.disconnect();
            unbind(el);
        };
    }, [el, params.style, params.text, params.icon, params.href, params.tone, bind, unbind, router]);

    if (!("ref" in params) && !("target" in params)) {
        return innerRef as RefObject<HTMLElement | null>;
    }
    return null;
}
