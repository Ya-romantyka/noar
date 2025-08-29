"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import styles from "./stagger-link.module.scss";
import Link from "next/link";
import clsx from "clsx";
import {useCursorStyle} from "@/app/hooks/useCursorStyle";

interface StaggerLinkProps {
  children: string;
  href: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: "_blank" | "_self";
}

const StaggerLink: React.FC<StaggerLinkProps> = ({
  children,
  href,
  onClick,
  target,
  className,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const splitInstance = useRef<SplitText | null>(null);


  useCursorStyle({
    ref: linkRef,
    style:"button"
  })

  useEffect(() => {
    if (!textRef.current || !linkRef.current) return;

    gsap.registerPlugin(SplitText);

    splitInstance.current = new SplitText(textRef.current, {
      type: "chars",
      charsClass: "char",
    });

    const chars = splitInstance.current.chars;
    const linkElement = linkRef.current;

    const handleMouseEnter = () => {
      gsap.killTweensOf(chars);
      gsap.to(chars, {
        duration: 0.15,
        yPercent: -100,
        ease: "power4.inOut",
        stagger: { each: 0.05, from: "random" },
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.killTweensOf(chars);
      gsap.to(chars, {
        duration: 0.15,
        yPercent: 0,
        ease: "power4.inOut",
        stagger: { each: 0.05, from: "random" },
        overwrite: true,
      });
    };

    linkElement.addEventListener("mouseenter", handleMouseEnter);
    linkElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      linkElement.removeEventListener("mouseenter", handleMouseEnter);
      linkElement.removeEventListener("mouseleave", handleMouseLeave);
      splitInstance.current?.revert();
    };
  }, []);

  return target === "_blank" ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={linkRef}
      onClick={onClick}
      className={clsx(styles.link, className)}
    >
      <span ref={textRef} className={styles.text}>
        {children}
      </span>
    </a>
  ) : (
    <Link
      href={href}
      ref={linkRef}
      onClick={onClick}
      className={clsx(styles.link, className)}
    >
      <span ref={textRef} className={styles.text}>
        {children}
      </span>
    </Link>
  );
};

export default StaggerLink;
