"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";

interface AnimatedTextProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onScroll?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  as = "div",
  children,
  className = "",
  delay = 0,
  onScroll = false,
}) => {
  const textRef = useRef<HTMLElement | null>(null);

  useSplitTextAnimation(textRef, { triggerOnScroll: onScroll, delay });

  useEffect(() => {
    if (!onScroll && textRef.current) {
      gsap.from(textRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [onScroll]);

  const Tag = as;

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  );
};

export default AnimatedText;
