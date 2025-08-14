"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import styles from "./button.module.scss";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "black" | "white" | "outline-white";
  href?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className,
  variant = "black",
  href,
  icon,
  type,
  disabled,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const moveAmount = 40;

    const handleMouseMove = (event: Event) => {
      const e = event as MouseEvent;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: (x / moveAmount) * 2,
        y: (y / moveAmount) * 2,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const buttonClass = clsx(styles.button, styles[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClass}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
      >
        {children}
        {icon && icon}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {icon && icon}
    </button>
  );
}
