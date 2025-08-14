declare module "@lenis" {
  export type LenisScrollTarget = string | number | HTMLElement;
  export type LenisEasing = (t: number) => number;

  export interface LenisScrollOptions {
    offset?: number;
    immediate?: boolean;
    lock?: boolean;
    duration?: number;
    easing?: LenisEasing;
  }

  export interface LenisOptions {
    duration?: number;
    easing?: LenisEasing;
    smooth?: boolean;
    direction?: "vertical" | "horizontal";
    gestureOrientation?: "vertical" | "horizontal" | "both";
    smoothTouch?: boolean;
    touchMultiplier?: number;
    wheelMultiplier?: number;
  }

  type LenisEvent = "scroll";

  export default class Lenis {
    constructor(options?: LenisOptions);

    raf(time: number): void;

    scrollTo(
        target: LenisScrollTarget,
        options?: LenisScrollOptions
    ): void;

    on(event: LenisEvent, callback: () => void): void;

    start(): void;
    stop(): void;
    destroy(): void;
  }
}

import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export {};

