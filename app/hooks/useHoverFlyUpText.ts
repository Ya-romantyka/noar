'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

interface UseHoverFlyUpTextOptions {
  hoverBlock: RefObject<HTMLElement | null>;
  text: RefObject<HTMLElement | null>;
  icon?: RefObject<HTMLElement | null>;
  type: 'chars' | 'words' | 'lines';
  className: string;
  yPercent?: number;
  duration?: number;
  stagger?: number;
}



export const useHoverFlyUpText = ({
                                    hoverBlock,
                                    text,
                                    icon,
                                    type,
                                    className, yPercent = 150, duration = 0.5, stagger = 0.05
                                  }: UseHoverFlyUpTextOptions) => {

  useEffect(() => {
    const textEl = text.current;
    const hoverEl = hoverBlock.current;
    const iconEl = icon?.current;

    if (!textEl || !hoverEl) return;

    const split = new SplitType(textEl, {
      types: type,
      [`${type.slice(0, -1)}Class`]: className,
    });

    const chars = Array.from(textEl.querySelectorAll(`.${className}`));
    const allElements = iconEl ? [...chars, iconEl] : chars;

    const tl = gsap.timeline({ paused: true }).to(allElements, {
      yPercent: `-${yPercent}`,
      duration,
      ease: 'power4.out',
      stagger,
    });

    const play = () => tl.play();
    const reverse = () => tl.reverse();

    hoverEl.addEventListener('mouseenter', play);
    hoverEl.addEventListener('mouseleave', reverse);

    return () => {
      split.revert();
      hoverEl.removeEventListener('mouseenter', play);
      hoverEl.removeEventListener('mouseleave', reverse);
    };
  }, [hoverBlock, text, icon, type, className]);
};
