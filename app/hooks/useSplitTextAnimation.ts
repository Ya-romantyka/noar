"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface SplitTextOptions {
  triggerOnScroll?: boolean;
  delay?: number;
}

const useSplitTextAnimation = (
  elementRef: React.RefObject<HTMLElement | null>,
  { triggerOnScroll = false, delay = 0 }: SplitTextOptions = {}
) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const split = new SplitText(elementRef.current, {
      type: "lines",
      linesClass: "line-wrap",
    });

    // Создаем обёртки для каждой строки и собираем их в массив
    const wrappers: HTMLElement[] = [];
    split.lines.forEach((line) => {
      const wrapper = document.createElement("span");
      wrapper.classList.add("line");
      wrapper.style.display = "block";
      wrapper.style.overflow = "hidden";

      while (line.firstChild) {
        wrapper.appendChild(line.firstChild);
      }
      line.appendChild(wrapper);
      wrappers.push(wrapper);
    });

    gsap.set(wrappers, { y: 100 });

    // Создаем анимацию, которая перемещает обёртки вверх до y:0
    const animation = gsap.to(wrappers, {
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay,
    });

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: elementRef.current,
        start: "top 80%",
        animation,
      });
    }

    return () => {
      split.revert();
    };
  }, [elementRef, triggerOnScroll, delay]);
};

export default useSplitTextAnimation;