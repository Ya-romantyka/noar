"use client";

import {RefObject, useEffect, useRef} from "react";
import {CursorVariant, useCursorContext} from "@/app/providers/CursorProvider";
import {useRouter} from "next/navigation";


type CursorStyle = "big" | "button" | "drag";

type Base = {
    style: CursorStyle;
    text?: string;
    icon?: boolean;
    href?: string;
};

type WithRef = { ref: RefObject<HTMLElement | null>; target?: never };
type WithTarget = { target: HTMLElement | null; ref?: never };
type WithNone = { ref?: never; target?: never };

type Params = Base & (WithRef | WithTarget | WithNone);

export function useCursorStyle(params: Params) {
    const {setVariant, resetVariant} = useCursorContext();
    const innerRef = useRef<HTMLElement | null>(null);
    const router = useRouter();
    const {style, text, icon = false, href} = params;

    const getElement = (): HTMLElement | null => {
        if ("ref" in params && params.ref) return params.ref.current;
        if ("target" in params && params.target) return params.target;
        return innerRef.current;
    };

    useEffect(() => {
        const el = getElement();
        if (!el) return;

        const variant: CursorVariant = {style, text, icon};

        const onEnter = () => setVariant(variant);
        const onLeave = () => resetVariant();

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        const onClick = (e: MouseEvent) => {
            if (style === "button" && href) {
                e.preventDefault();
                router.push(href)
            }
        };
        if (style === "button" && href) {
            el.addEventListener("click", onClick);
        }

        return () => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
            if (style === "button" && href) {
                el.removeEventListener("click", onClick);
            }
        };
    }, [style, text, icon, href, setVariant, resetVariant]);

    if (!("ref" in params) && !("target" in params)) {
        return innerRef as RefObject<HTMLElement | null>;
    }
    return null;
}
