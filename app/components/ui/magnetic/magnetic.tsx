"use client";

import { useEffect, useRef, ReactNode, forwardRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

const Magnetic = forwardRef<HTMLDivElement, MagneticProps>(
  ({ children, strength = 40, className }, ref) => {
    const innerRef = useRef<HTMLDivElement | null>(null);

    // Use passed ref or fallback to internal ref
    const combinedRef = (node: HTMLDivElement | null) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
      innerRef.current = node;
    };

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      const handleMouseMove = (event: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: (x / strength) * 2,
          y: (y / strength) * 2,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [strength]);

    return (
      <div
        ref={combinedRef}
        className={className}
        style={{ display: "inline-block" }}
      >
        {children}
      </div>
    );
  }
);

Magnetic.displayName = "Magnetic";
export default Magnetic;
