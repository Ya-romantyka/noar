"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./circles-animation.module.scss";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface Props {
  isWhite?: boolean;
}

const CirclesAnimation: React.FC<Props> = ({ isWhite = false }) => {
  const circlesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!circlesRef.current) return;

    const circles = gsap.utils.toArray(
      circlesRef.current.children
    ) as HTMLElement[];

    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({ repeat: -1, yoyo: false });

      gsap.set(circles, { x: 0 });

      tl.to(circles[1], { duration: 1, x: "-=11rem", ease: "power2.inOut" })
        .to(
          circles[2],
          { duration: 1, x: "-=12rem", ease: "power2.inOut" },
          "-=0.2"
        )
        .to(
          circles[3],
          { duration: 1, x: "-=13rem", ease: "power2.inOut" },
          "-=0.2"
        )
        .to([circles[3], circles[2], circles[1]], {
          duration: 1,
          x: "0",
          ease: "power2.inOut",
          stagger: 0.1,
        });
    });

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({ repeat: -1, yoyo: false });

      gsap.set(circles, { x: 0 });

      tl.to(circles[1], { duration: 1.7, x: "-=64rem", ease: "power2.inOut" })
        .to(
          circles[2],
          { duration: 1.7, x: "-=68rem", ease: "power2.inOut" },
          "-=0.2"
        )
        .to(
          circles[3],
          { duration: 1.7, x: "-=72rem", ease: "power2.inOut" },
          "-=0.2"
        )
        .to([circles[3], circles[2], circles[1]], {
          duration: 1.7,
          x: "0",
          ease: "power2.inOut",
          stagger: 0.1,
        });
    });
  }, []);

  return (
    <div
        className={clsx(styles.container, {
          [styles.white]: isWhite || pathname === "/contact" || pathname === "/services",
        })}
    >
      <div ref={circlesRef} className={styles.circles}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={clsx(styles.circle, "circle")}></div>
        ))}
      </div>
    </div>
  );
};

export default CirclesAnimation;
